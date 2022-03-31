import { HttpStatus } from "@marblejs/http";
import userSchema from "../../schemas/userSchema";
import tokenSchema from "../../schemas/tokenSchema";
import jwt from 'jsonwebtoken'
import 'dotenv/config'
type loginObj = { userName : string, password : string }

const token = (user : string) => {
    const Token = jwt.sign({ userName : user },`secret`)
    return Token
}

const loginUser = async (body : loginObj) => {
        const findByUsername = await userSchema.find({
             "userName" : `${body.userName}`
        })
        const findpassword = await userSchema.find({
            "userName" : `${body.userName}`,
            "password" : `${body.password}`
        })
        if(findByUsername.length === 0){
          return {
            status : HttpStatus.BAD_REQUEST,
            message : `UserName Not Found, pls Create Account ... `
          }
        }
        else{
            if(findpassword.length != 0){
                const findToken = await tokenSchema.find({})
                if(findToken.length == 0){
                    const createToken = await tokenSchema.create({
                        userName : body.userName,
                        token : 'secret'
                    })
                    return {
                        status : HttpStatus.OK,
                        message : `Login Successful`
                    }
                }else{
                    if(findToken[0].userName === body.userName){
                        const updateToken = await tokenSchema.updateOne(
                            {"userName" : `${findToken[0].userName}`},
                            {$set : {userName : body.userName,token : token(body.userName)}}
                        )
                        return {
                            status : HttpStatus.OK,
                            message : `Login Successfull`
                        }
                    }else{
                        return {
                            status : HttpStatus.BAD_REQUEST,
                            message : `Logout First, User ${findToken[0].userName} is Already Logged In`
                        }
                    }
                    
                }
            }else{
                return {
                    status : HttpStatus.BAD_REQUEST,
                    message : `Wrong User Credentials, pls check UserName and Password`
                }
            }
        }
}

export default loginUser