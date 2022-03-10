import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name : String,
    cost : Number,
})

export default mongoose.model("itemdetails",itemSchema)