import { HttpStatus } from '@marblejs/http';
import { of } from 'rxjs'
import userSchema from '../../../schemas/userSchema';
import User from '../../../userDetails'

const getUserCollection = async () => {
    try{
      const filterUser = []
      const findAll = await userSchema.find({})
      for(var i=0;i<findAll.length;i++){
        filterUser[i] = {
          userName : findAll[i].userName,
          email : findAll[i].email
        }
      }
      return filterUser
    }catch (error){
      return error
    }
}
  
const getUserById = async (userName: string) => {
    try{
      var findById = await userSchema.find({ "userName" : userName })
      if(findById.length != 0){
        return {
          status : HttpStatus.OK,
          details : {
            userName : findById[0].userName,
            email : findById[0].email
          }
        }
      }else{
        return{
          status : HttpStatus.BAD_REQUEST,
          message : `No User With Id ${userName}`
        }
      }
    }catch (error){
      return error
    }
}
export { getUserCollection , getUserById }