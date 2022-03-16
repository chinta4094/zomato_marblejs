import { HttpStatus } from '@marblejs/http';
import itemSchema from '../../../schemas/itemSchema';
import tokenSchema from '../../../schemas/tokenSchema';

const getItemCollection = async () => {
    const finduser = await tokenSchema.find({})
    if(finduser.length != 0){
      const filterUser = []
      const findAll = await itemSchema.find({})
      for(var i=0;i<findAll.length;i++){
        filterUser[i] = {
          name : findAll[i].name,
          cost : findAll[i].cost
        }
      }
      return {
        status : HttpStatus.OK,
        details : filterUser
      }
    }else{
      return `User Not Logged In`
    }
}
  
const getItemById = async (item: any) => {
    var findById = await itemSchema.find({ "name" : `${item.params.name}` })
    if(findById.length != 0){
      return {
        status : HttpStatus.OK,
        details : {
          name : findById[0].name,
          cost : findById[0].cost
        }
      }
    }else{
      return{
        status : HttpStatus.BAD_REQUEST,
        message : `No Item With name ${item.params.name}`
      }
    }
}
export { getItemCollection, getItemById }