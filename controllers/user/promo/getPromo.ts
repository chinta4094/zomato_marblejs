import { HttpStatus } from "@marblejs/http";
import promoCartSchema from "../../../schemas/promoCartSchema";
import promoSchema from "../../../schemas/promoSchema";
import tokenSchema from "../../../schemas/tokenSchema";

const getPromo = async() => {
    const findUser = await tokenSchema.find({})
    if(findUser.length != 0){
        const getPromo = await promoSchema.find({})
        const filterPromo = []
        for(var i=0;i<getPromo.length;i++){
            filterPromo[i] = {
                promoCode : getPromo[i].promoCode,
                startDate : getPromo[i].startDate,
                endDate : getPromo[i].endDate
            }
        }
        return {
            status : HttpStatus.OK,
            details : filterPromo
        }
    }else{
        return `User Not Logged In`
    }
}

export default getPromo