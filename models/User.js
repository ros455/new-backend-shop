import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        require: true,
        type: String,
        unique: true,
    },
    password: {
        require: true,
        type: String,
    },
    name: {
        require: true,
        type: String,
    },
    isadmin: {
        type: Boolean,
        default: false,
        require: true,
    },
    avatarUrl: {
        type: String,
    }
},{timestamps: true,})

export default mongoose.model('User',UserSchema)