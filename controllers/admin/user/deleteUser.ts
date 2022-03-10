import { HttpError, HttpStatus } from '@marblejs/http';
import { from,of, throwError } from 'rxjs'
import userSchema from '../../../schemas/userSchema';

const deleteUser = async (userName : string) => {
  try{
      var findById = await userSchema.find({ "userName" : userName })
      if(findById.length != 0){
        const deleteUserById = await userSchema.deleteOne({ "userName" : userName })
        if(deleteUserById){
          return {
            status : HttpStatus.OK,
            message : `Deleted ${userName} Successful`
          }
        }else{
          return{
            status : HttpStatus.BAD_REQUEST,
            error : throwError(new Error(`Delete Error from DB`))
          }
        }
      }else{
        return{
          status : HttpStatus.BAD_REQUEST,
          message : `No User With userName ${userName}`
        }
      }
    }catch (error){
      return error
    }
}

export default deleteUser