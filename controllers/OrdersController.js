import OrdersModel from '../models/Order.js'

export const create = async (req,res) => {
    try{
        const data = new OrdersModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            fatherName: req.body.fatherName,
            phone: req.body.phone,
            email: req.body.email,
            city: req.body.city,
            postNumber: req.body.postNumber,
            comment: req.body.comment,
            order: req.body.order,
            totalSum: req.body.totalSum,
            status: req.body.status,
        })

        const order = await data.save();

        res.json(order)
    } catch(err) {
        console.log('err:',err)
    }
}

export const update = async (req,res) => {
    try{
        const orderId = req.params.id

        await OrdersModel.updateOne(
            {_id: orderId},
            {
                status: req.body.status,
            }
        )
        res.json({sucsses: true})
    } catch(e) {
        console.log(e)
    }
}

export const getAll = async (req,res) => {
    try{
        const orders = await OrdersModel.find()
        res.json(orders)
    } catch(err) {
        console.log(err)
    }
}

export const getOne = async (req,res) => {
    try{
        const orderId = req.params.id;
        OrdersModel.findOne(
            {_id: orderId},
            (err,doc) => {
                if(err) {
                    return res.status(500).json({
                        messege: "Filed to get post"
                    })
                }
                if(!doc) {
                    return res.status(404).json({
                        messege: 'Post not found'
                    })
                }
                res.json(doc)
            }
            )
        
    } catch (e){
        console.log(e)
        res.status(500).json({
            messege: "Failed to get posts"
        })
    }
}

export const remove = async (req,res) => {
    try{
        const orderId = req.params.id

        OrdersModel.findByIdAndDelete(
            {_id: orderId},
            (err,doc) => {
                if(err) {
                    return res.status(500).join({message: 'Filed remove post'})
                }
                if(!doc) {
                    return res.status(404).join({message: 'Post not found'})
                } 
                res.json({sucsses: true})
            }
        )
    } catch(e) {
        console.log(e)
    }
}