import { HttpStatus } from '@marblejs/http';
import tokenSchema from '../../schemas/tokenSchema';
import userSchema from '../../schemas/userSchema'

type userObj = { oldPassword : string, newPassword : string }

const updateUser = async (body : userObj) => {
    const finduser = await tokenSchema.find({})
    if(finduser.length != 0){
        const findOldPassword = await userSchema.find({ "password" : body.oldPassword })
        if(findOldPassword.length != 0){
            const update = await userSchema.updateOne(
                { "password" : body.oldPassword},
                {$set : 
                    {"password" : body.newPassword}
                }
            )
            const deleteUser = await tokenSchema.deleteOne({ "userName" : finduser[0].userName })
            return {
                status : HttpStatus.OK,
                message : `updated Successfully, Pls Login ... `
            }
        }else{
            return {
                status : HttpStatus.BAD_REQUEST,
                message :`Old Password is Wrong`
            }
        }
    }else{
        return `User Not Logged In`
    }
}

export default updateUser