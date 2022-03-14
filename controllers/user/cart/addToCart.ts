import { HttpStatus } from "@marblejs/http";
import { string } from "fp-ts";
import cartSchema from "../../../schemas/cartSchema";
import itemSchema from "../../../schemas/itemSchema";
import tokenSchema from "../../../schemas/tokenSchema";
import userSchema from "../../../schemas/userSchema";

const addToCart = async (item : string) =>{
    const findUser = await tokenSchema.find({})
    const findCart = await cartSchema.find({ "itemName" : `${item}`, "userName" : `${findUser[0].userName}` })
    if(findCart.length == 0){
        const createItem = {
            userName : findCart[0].userName,
            itemName : item,
            itemCost : findCart[0].cost,
            quantity : 1
        }
        const addToCart = await cartSchema.create(createItem)
        return {
            status : HttpStatus.OK,
            message : `Successfully ${createItem.itemName} Added To Cart`,
            quantity : createItem.quantity
        }
    }else{
        const updateCart = await cartSchema.updateOne(
            {"userName" : `${findCart[0].userName}`,"itemName" : item},
            {$set : {"quantity" : ++findCart[0].quantity}}
        )
        return {
            status : HttpStatus.OK,
            message : `Successfully ${findCart[0].itemName} Added To Cart`,
            quantity : findCart[0].quantity
        }
    }
}

export default addToCart