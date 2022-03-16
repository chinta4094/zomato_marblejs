import mongoose from "mongoose";

const promoCartSchema = new mongoose.Schema({
    userName : String,
    promoCode : String
})

export default mongoose.model('promocartdetails',promoCartSchema)