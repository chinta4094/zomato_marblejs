import { HttpStatus } from "@marblejs/http";
import cartSchema from "../../../schemas/cartSchema";
import itemSchema from "../../../schemas/itemSchema";
import tokenSchema from "../../../schemas/tokenSchema";

const removeFromCart = async (item : string) => {
    const findUser = await tokenSchema.find({})
    if(findUser.length != 0){
        const findCart = await cartSchema.find({ "itemName" : `${item}`, "userName" : `${findUser[0].userName}` })
        var findItem = await itemSchema.find({ "name" : `${item}` })
        if(findItem.length != 0){
            if(findCart[0].quantity > 1){
                const updateCart = await cartSchema.updateOne(
                    {"userName" : `${findCart[0].userName}`,"itemName" : item},
                    { $set : {"quantity" : --findCart[0].quantity} }
                )
                return {
                    status : HttpStatus.OK,
                    message : `Successfully ${findCart[0].itemName} Removed From Cart`,
                    quantity : findCart[0].quantity
                }
            }else{
                const deleteCart = await cartSchema.deleteOne(
                    {"userName" : `${findCart[0].userName}`,"itemName" : item}
                )
                return {
                    status : HttpStatus.OK,
                    message : `Remove Item ${findCart[0].itemName} From Cart`
                }
            }
        }else{
            return `Item ${item} is Not Found In Your Cart List`
        }
    }else{
        return `User Not Logged In`
    }
}

export default removeFromCart