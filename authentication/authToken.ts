import jwt from 'jsonwebtoken'

const authentication = async(body : any) => {
    const verifyAuth = jwt.verify(body.headers.token,`${process.env.TOKEN}`)
    return body
}

export default authentication