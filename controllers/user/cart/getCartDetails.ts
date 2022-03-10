import cartSchema from "../../../schemas/cartSchema";
import tokenSchema from "../../../schemas/tokenSchema";

const getCartDetails = async () => {
    const findUser = await tokenSchema.find({})
    if(findUser.length != 0){
        const getcart = await cartSchema.find({"userName" : findUser[0].userName})
        return getcart
    }
}

export default getCartDetails