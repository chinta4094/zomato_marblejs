import { mergeMap,map} from "rxjs/operators";
import {combineRoutes, r} from '@marblejs/http';
import postUserValidation from "../../../validations/user/validateUserReq";
import postUser from '../../../controllers/user/createUser'
import updateUser from '../../../controllers/user/updateUser'
import { pipe } from "fp-ts/lib/function";
import validateUserLogin from "../../../validations/user/validateUserLoginReq";
import loginUser from "../../../controllers/user/loginUser";
import { logoutUser, authentication } from "../../../controllers/user/logoutUser";
// import items$ from '../item/itemRouter'

type userObj = { firstName : string, lastName : string, userName : string, email : string, password : string }
type tokenObj = { token : string }

const postUser$ = r.pipe(
    r.matchPath('/'),
    r.matchType('POST'),
    r.useEffect(req$ => req$.pipe(
      postUserValidation,
      mergeMap(req => postUser(req.body as userObj)),
      map(body => ({ body })),
    ))
);

const Login$ = r.pipe(
  r.matchPath('/login'),
  r.matchType('POST'),
  r.useEffect(req$ => req$.pipe(
    validateUserLogin,
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
  
const userUser$ = combineRoutes('/', [
    postUser$,
    Login$,
    logoutUser$
]);

export default userUser$



