import { HttpStatus } from "@marblejs/http";
import tokenSchema from "../../schemas/tokenSchema";

const logoutUser = async () => {
    const findUser = await tokenSchema.find({})
    if(findUser.length != 0){
        const deleteUserToken = await tokenSchema.deleteOne({ "userName" : `${findUser[0].userName}` })
        return {
            status : HttpStatus.OK,
            message : `Logout Successfully`
        }
    }else{
        return {
            status : HttpStatus.BAD_REQUEST,
            message : `No User Logged To Logout`
        }
    }
}

export default logoutUser