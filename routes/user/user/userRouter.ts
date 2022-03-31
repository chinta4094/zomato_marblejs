import { mergeMap,map} from "rxjs/operators";
import {combineRoutes, r} from '@marblejs/http';
import postUser from '../../../controllers/user/createUser'
import updateUser from '../../../controllers/user/updateUser'
import { pipe } from "fp-ts/lib/function";
import loginUser from "../../../controllers/user/loginUser";
import logoutUser  from "../../../controllers/user/logoutUser";
import authentication from "../../../authentication/authToken";
import { validateUser } from '../../../validations/user/validateCreateUser'
// import items$ from '../item/itemRouter'

type userObj = { firstName : string, lastName : string, userName : string, email : string, password : string }
type passwordObj = { oldPassword : string , newPassword : string }

const postUser$ = r.pipe(
    r.matchPath('/'),
    r.matchType('POST'),
    r.useEffect(req$ => req$.pipe(
      mergeMap(req => postUser(req.body as userObj)),
      map(body => ({ body })),
    ))
);

const Login$ = r.pipe(
  r.matchPath('/login'),
  r.matchType('POST'),
  r.useEffect(req$ => req$.pipe(
    mergeMap(req => pipe(
      loginUser(req.body as { userName : string, password : string })
    )),
    map(body => ({ body }))
  ))
)

const logoutUser$ = r.pipe(
    r.matchPath('/logout'),
    r.matchType('DELETE'),
    r.useEffect(req$ => req$.pipe(
      mergeMap(logoutUser),
      map(body => ({ body }))
    )),
);

const updateuser$ = r.pipe(
  r.matchPath('/Changepassword'),
  r.matchType('PUT'),
  r.useEffect(req$ => req$.pipe(
    // mergeMap(req => authentication(req)),
    mergeMap(req => updateUser(req.body as passwordObj)),
    map(body => ({ body }))
  ))
)
  
const userUser$ = combineRoutes('/', [
    postUser$,
    Login$,
    logoutUser$,
    updateuser$
]);

export default userUser$



