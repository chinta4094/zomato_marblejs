import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
    userName : String,
    token : String
})

export default mongoose.model("tokendetails",tokenSchema)