import { HttpStatus } from "@marblejs/http";
import promoSchema from "../../../schemas/promoSchema";
import promoCartSchema from "../../../schemas/promoCartSchema";
import tokenSchema from "../../../schemas/tokenSchema"
import cartSchema from "../../../schemas/cartSchema";

const addPromoToCart = async (promo : string) => {
    const findUser = await tokenSchema.find({})
    if(findUser.length != 0) {
        const findCartUser = await cartSchema.find({ "userName" : findUser[0].userName})
        if(findCartUser.length != 0){
            const findPromo = await promoSchema.find({ "promoCode" : promo });
            const findPromoCart = await promoCartSchema.find({ "promoCode" : promo })
            if(findPromoCart.length == 0){
                // validate promoCode Date
                const toMonthDateYear: any = new Date()
                const startDate = findPromo[0].startDate
                const endDate = findPromo[0].endDate
                var Difference_In_Time = startDate - toMonthDateYear
                var Difference_In_Time1 = endDate - toMonthDateYear
                var Difference_In_Days = Math.ceil(Difference_In_Time / (1000 * 3600 * 24));
                var Difference_In_Days1 = Math.ceil(Difference_In_Time1 / (1000 * 3600 * 24))
                if(Difference_In_Days > 0 ){
                    return { 
                        status : HttpStatus.BAD_REQUEST,
                        message : "promoCode Not Started Yet"
                    }
                }
                else if(Difference_In_Days <= 0 && Difference_In_Days1 >= 0){
                    const add = {
                        userName : findUser[0].userName,
                        promoCode : findPromo[0].promoCode
                    }
                    const addPromoCart = await promoCartSchema.create(add)
                    return {
                        status : HttpStatus.OK,
                        message : `PromoCode ${promo} Is Add To Cart`
                    }
                }else{
                    return {
                        status : HttpStatus.BAD_REQUEST,
                        message : "promoCode is Expired"
                    }
                }
            }else{
                return `Promo Already Exist, To Add Another Promo. Remove This ${promo} First`
            }
        }else{
            return `No Item In Cart To Add PromoCode`
        }
    }else{
        return `User Not Logged In`
    }
}

export default addPromoToCart