import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String,
    email: String,
    password: String
})

export default mongoose.model("userdetails", userSchema)
