import { HttpStatus } from "@marblejs/http";
import cartSchema from "../../../schemas/cartSchema";
import itemSchema from "../../../schemas/itemSchema";
import tokenSchema from "../../../schemas/tokenSchema";
import userSchema from "../../../schemas/userSchema";

const addToCart = async (item : string) =>{
    const findUser = await tokenSchema.find({})
    const getUsername = await userSchema.find({ "userName" : `${findUser[0].userName}` })
    const findCart = await cartSchema.find({ "itemName" : `${item}`, "userName" : `${findUser[0].userName}` })
    const findItem = await itemSchema.find({ "name" : item })
    if(findCart.length == 0){
        const addToCart = await cartSchema.create({
            userName : getUsername[0].userName,
            itemName : item,
            itemCost : findItem[0].cost,
            quantity : 1
        })
        return addToCart
    }else{
        const updateCart = await cartSchema.updateOne(
            {"userName" : `${findCart[0].userName}`,"itemName" : item},
            {$set : {"quantity" : ++findCart[0].quantity}}
        )
        return {
            status : HttpStatus.OK,
            details : {
                userName : getUsername[0].userName,
                itemName : item,
                itemCost : findCart[0].cost,
                quantity : findCart[0].quantity
            }
        }
    }
}

export default addToCart