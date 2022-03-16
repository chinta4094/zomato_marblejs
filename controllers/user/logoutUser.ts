import tokenSchema from "../../schemas/tokenSchema";

const logoutUser = async () => {
    const findUser = await tokenSchema.find({})
    if(findUser.length != 0){
        const deleteUserToken = await tokenSchema.deleteOne({ "userName" : `${findUser[0].userName}` })
        return `Logout Successfully`
    }else{
        return `No User Logged To Logout`
    }
}

export default logoutUser