import { HttpStatus } from "@marblejs/http";
import promoCartSchema from "../../../schemas/promoCartSchema";
import tokenSchema from "../../../schemas/tokenSchema";

const removePromoCart = async(promo : string) => {
    const findUser = await tokenSchema.find({})
    if(findUser.length != 0){
        const removePromo = await promoCartSchema.deleteOne({ "promoCode" : promo })
        return {
            status : HttpStatus.OK,
            message : `promoCode Removed Successfully`
        }
    }else{
        return `User Not Logged In`
    }
}

export default removePromoCart