import mongoose from "mongoose";

const promoSchema = new mongoose.Schema({
    promoCode : String,
    startDate : Date,
    endDate : Date,
    discount : Number
})

export default mongoose.model('promoDetails',promoSchema)