import UserModel from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config();

export const register = async (req,res) => {
    try{
        const pass = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(pass,salt);

        const data = new UserModel({
            email: req.body.email,
            name: req.body.name,
            avatarUrl: req.body.imageUrl,
            isadmin: req.body.isadmin,
            password: hash,
        })

        const user = await data.save();

        const token = jwt.sign(
            {id: user._id},
            `${process.env.key}`,
            {expiresIn: '30d'}
        )

        const {password, ...userData} = user._doc

        res.json({...userData, token})

    } catch (err) {
        console.log('err:',err)
    }
}

export const login = async (req,res) => {
    try{
        const user = await UserModel.findOne({email: req.body.email});

        if(!user) {
            return res.status(404).json({
                messege: 'User not found',
            })
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.password);

        if(!isValidPass) {
            return res.status(404).json({
                messege: 'Password not found',
            })
        }

        const token = jwt.sign(
            {id: user._id},
            `${process.env.key}`,
            {expiresIn: '30d'}
        )

        const {password, ...userData} = user._doc

        res.json({...userData, token})
        
    } catch(e) {
        console.log(e)
    }
}

export const getMe = async (req,res) => {
    try{
        const user = await UserModel.findById(req.userId);

        if(!user) {
            return res.status(404).json({
                messege: 'User not found'
            })
        }

        const {password, ...userData} = user._doc
        res.json(userData);
    } catch(e) {
        console.log(e)
        res.status(500).json({
            messege: "Not accsess"
        })
    }
}

export const getAll = async (req,res) => {
    try{
        const user = await UserModel.find()
        
        res.json(user)
    } catch(e) {
        console.log(e)
    }
}

export const update = async (req,res) => {
    try{
        const userId = req.params.id

        await UserModel.updateOne(
            {_id: userId},
            {
                isadmin: req.body.isadmin,
            }
        )

        res.json({sucsses: true})
    } catch(e) {
        console.log(e)
    }
}