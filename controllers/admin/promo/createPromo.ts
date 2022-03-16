import { HttpStatus } from "@marblejs/http";
import { number, string } from "fp-ts";
import promoSchema from "../../../schemas/promoSchema";

type promoObj = { promoCode : string , startDate : Date, endDate : Date, discount : number }

const createPromo = async (promo : promoObj) => {
    const findPromo = await promoSchema.find({ "promoCode" : promo.promoCode });
    if(findPromo.length == 0){
        const createPromo = await promoSchema.create(promo)
        return {
            status : HttpStatus.OK,
            message : `Promo ${promo.promoCode} Successfully Created `
        }
    }else{
        return {
            status : HttpStatus.BAD_REQUEST,
            message : `Promo ${promo.promoCode} Is Already Present  `
        }
    }
}

export default createPromo