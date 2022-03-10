import { HttpStatus } from '@marblejs/http';
import { from,of, throwError } from 'rxjs'
import User from '../../userDetails'

type userObj = { firstName : string, lastName : string, userName : string, email : string, password : string }

const updateUser = (body : userObj): any => {
    return `No Code To Update ... `
}

export default updateUser