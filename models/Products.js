import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema({
    title: {
        require: true,
        type: String,
    },
    description: {
        require: true,
        type: String,
    },
    category: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    count: {
        type: Number,
        default: 1,
    },
    language: {
        type: String
    },
    palette: {
        type: String
    },
    year: {
        type: Number
    },
    pageCount: {
        type: Number
    },
    author: {
        type: String
    },
    publishingHouse: {
        type: String
    },
    rating: {
        type: Array,
        default: [5,5,5,5,5]
    },
    activeRaitingUsers: {
        type:Array,
        default: [],
    },
    star: {
        type: Number,
        default:5,
    },
    imageUrl: {
        type: String,
    }
})

export default mongoose.model('Product',ProductsSchema)