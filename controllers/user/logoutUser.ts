import tokenSchema from "../../schemas/tokenSchema";
import jwt from 'jsonwebtoken'
import { string } from "fp-ts";

type userObj = { userName : string, password : number }
type tokenObj = { token : string }

const authentication = async(body : tokenObj) => {
  const verifyAuth = jwt.verify(body.token,`${process.env.TOKEN}`)
  return verifyAuth
}

const logoutUser = async () => {
    const findUser = await tokenSchema.find({})
    const deleteUserToken = await tokenSchema.deleteOne({ "userName" : `${findUser[0].userName}`})
    return `Logout Successfully`
}

export { logoutUser, authentication }