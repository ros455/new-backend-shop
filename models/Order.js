import mongoose from "mongoose";

const OrdersSchema = new mongoose.Schema({
    firstName: {
        require: true,
        type: String
    },
    lastName: {
        require: true,
        type: String
    },    
    fatherName: {
        require: true,
        type: String
    },
    phone: {
        require: true,
        type: String
    },
    email: {
        type: String,
    },
    city: {
        require: true,
        type: String
    },
    postNumber: {
        require: true,
        type: String,
    },
    comment: {
        type: String
    },
    order: {
        type: Array,
    },
    totalSum: {
        type: Number,
    },
    status: {
        type: String,
        default: "Нове"
    }
},{timestamps: true,});

export default mongoose.model('Order',OrdersSchema)