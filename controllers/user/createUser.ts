import { HttpStatus } from '@marblejs/http';
import { findAncestor } from 'typescript';
import sendmail from '../../email/email'
import tokenSchema from '../../schemas/tokenSchema';
import userSchema from '../../schemas/userSchema';

type userObj = { firstName : string, lastName : string, userName : string, email : string, password : string }

const postUser = async (body : userObj) => {
    try{
        const findUser = await tokenSchema.find({})
        if(findUser.length == 0){
          const findByUsername = await userSchema.find({ "userName" : `${body.userName}`})
          if(findByUsername.length != 0){
            return {
              status : HttpStatus.BAD_REQUEST,
              message : `userName With ${body.userName} is Already Created !`
            }
          }else{
            var createUser = await userSchema.create(body)
            sendmail(body.userName,body.email)
            if(createUser){
              return {
                status : HttpStatus.OK,
                message : `Created A User ${body.userName}`
              }
            }else{
              return{
                status : HttpStatus.BAD_REQUEST,
                message : `User Not Created, Pls Try Again`
              }
            }
          }
        }else{
          return `To Create Account, You Need To Logout First ...`
        }
      }catch(error){
        return error
    }
}

export default postUser