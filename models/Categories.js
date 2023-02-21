import mongoose from "mongoose";

const CategoriesSchema = new mongoose.Schema({
    category: {
        unique: true,
        type: String,
    },
})

export default mongoose.model('Category',CategoriesSchema)