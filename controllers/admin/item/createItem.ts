import { HttpStatus } from "@marblejs/http";
import itemSchema from "../../../schemas/itemSchema";

const createItem = async (body : { name : string, cost : number }) => {
    const findItem = await itemSchema.find({ "name" : `${body.name}`})
    if(findItem.length == 0){
        const postItem = await itemSchema.create(body)
        return {
            status : HttpStatus.OK,
            message : `Item ${body.name} is Created`
        }
    }else{
        return {
            status : HttpStatus.BAD_REQUEST,
            message : `Item ${body.name} Already Exist`
        }
    }
}

export default createItem