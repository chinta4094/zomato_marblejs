import { HttpError, HttpStatus } from "@marblejs/http";
import cartSchema from "../../../schemas/cartSchema";
import tokenSchema from "../../../schemas/tokenSchema";
import promoCartSchema from "../../../schemas/promoCartSchema";
import promoSchema from "../../../schemas/promoSchema";

const getCartDetails = async () => {
    const findUser = await tokenSchema.find({})
    if(findUser.length != 0){
        const findPromoCode = await promoCartSchema.find({})
        const findCart = await cartSchema.find({ "userName" : findUser[0].userName })
        if(findCart.length != 0){
            if(findPromoCode.length != 0){
                const findDiscount = await promoSchema.find({ "promoCode" : findPromoCode[0].promoCode })
                const filterCart = []
                var totalAmount = 0
                const getCart = await cartSchema.find({"userName" : findUser[0].userName})
                for(var i=0;i<getCart.length;i++){
                    filterCart[i] = {
                        itemName : getCart[i].itemName,
                        itemCost : getCart[i].itemCost,
                        quantity : getCart[i].quantity,
                        total : getCart[i].itemCost * getCart[i].quantity
                    }
                    totalAmount += filterCart[i].total
                }
                return {
                    status : HttpStatus.OK,
                    message : `Cart Details Of User ${findUser[0].userName}, Shown Below`,
                    promoCode : findPromoCode[0].promoCode,
                    details : filterCart,
                    cartAmount : totalAmount,
                    Discount : findDiscount[0].discount,
                    totalAmount : totalAmount - findDiscount[0].discount
                }
            }else{
                return {
                    status : HttpStatus.BAD_REQUEST,
                    message : `Pls Add PromoCode For Discount`
                }
            }
        }else{
            return {
                status : HttpStatus.BAD_REQUEST,
                message : `No Item In Cart`
            }
        }
    }else{
        return `User Not Logged In`
    }
}

export default getCartDetails