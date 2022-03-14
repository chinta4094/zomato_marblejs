import { HttpError, HttpStatus } from "@marblejs/http";
import cartSchema from "../../../schemas/cartSchema";
import tokenSchema from "../../../schemas/tokenSchema";

const getCartDetails = async () => {
    const findUser = await tokenSchema.find({})
    const filterCart = []
    if(findUser.length != 0){
        const getCart = await cartSchema.find({"userName" : findUser[0].userName})
        for(var i=0;i<getCart.length;i++){
            filterCart[i] = {
                itemName : getCart[i].itemName,
                itemCost : getCart[i].itemCost,
                quantity : getCart[i].quantity
            }
        }
        return {
            status : HttpStatus.OK,
            message : `Cart Details Of User ${findUser[0].userName}, Shown Below`,
            details : filterCart
        }
    }else{
        return `Pls Add Item To Cart`
    }
}

export default getCartDetails