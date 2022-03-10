import { HttpStatus } from '@marblejs/http';
import userSchema from '../../schemas/userSchema';

type userObj = { firstName : string, lastName : string, userName : string, email : string, password : string }

const postUser = async (body : userObj) => {
    try{
        const findByUsername = await userSchema.find({ "userName" : `${body.userName}`})
        if(findByUsername.length != 0){
          return {
            status : HttpStatus.BAD_REQUEST,
            message : `userName With ${body.userName} is Already Created !`
          }
        }else{
          var createUser = await userSchema.create(body)
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
      }catch(error){
        return error
    }
}

export default postUser