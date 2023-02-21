import CategoriesModel from '../models/Categories.js'

export const create = async (req,res) => {
    try{
        const data = new CategoriesModel({
            category: req.body.category,
        })
        const category = await data.save();
        res.json(category)
    } catch(err) {
        console.log('err:',err)
    }
}

export const getAll = async (req,res) => {
    try{
        const data = await CategoriesModel.find()
        
        res.json(data)
    } catch(e) {
        console.log(e)
    }
}

export const remove = async (req,res) => {
    try{
        const categoryId = req.params.id

        CategoriesModel.findByIdAndDelete(
            {_id: categoryId},
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

export const update = async (req,res) => {
    try{
        const categoryId = req.params.id

        await CategoriesModel.updateOne(
            {_id: categoryId},
            {
                category: req.body.category,
            }
        )
        res.json({sucsses: true})
    } catch(e) {
        console.log(e)
    }
}

export const getOne = async (req,res) => {
    try{
        const categoryId = req.params.id;
        CategoriesModel.findOne(
            {_id: categoryId},
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