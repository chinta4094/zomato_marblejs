import { HttpStatus } from '@marblejs/http';
import itemSchema from '../../../schemas/itemSchema';

const getItemCollection = async () => {
    const filterUser = []
    const findAll = await itemSchema.find({})
    for(var i=0;i<findAll.length;i++){
      filterUser[i] = {
        name : findAll[i].name,
        cost : findAll[i].cost
      }
    }
    return filterUser
}
  
const getItemById = async (name: string) => {
    var findById = await itemSchema.find({ "name" : `${name}` })
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
        message : `No Item With name ${name}`
      }
    }
}
export { getItemCollection, getItemById }