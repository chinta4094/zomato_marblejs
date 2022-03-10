import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userName : String,
    itemName : String,
    itemCost : Number,
    quantity : Number
})

export default mongoose.model('cartdetails',cartSchema)