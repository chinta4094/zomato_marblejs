import { mergeMap,map} from "rxjs/operators";
import {combineRoutes, r} from '@marblejs/http';
import getUserValidation from "../../../validations/user/validateUserParams";
import { getUserCollection , getUserById } from '../../../controllers/admin/user/getUser'
import deleteUser from '../../../controllers/admin/user/deleteUser'
import { pipe } from "fp-ts/lib/function";

  
const getUserList$ = r.pipe(
    r.matchPath('/'),
    r.matchType('GET'),
    r.useEffect(req$ => req$.pipe(
      mergeMap(getUserCollection),
      map(body => ({body})),
    )),
);
  
const getUserByUsername$ = r.pipe(
    r.matchPath('/:userName'),
    r.matchType('GET'),
    r.useEffect(req$ => req$.pipe(
      getUserValidation,
      mergeMap(req => pipe(
        getUserById(req.params.userName)
      )),
      map(body => ({ body })),
    )),
);
  
const deleteUser$ = r.pipe(
    r.matchPath('/:userName'),
    r.matchType('DELETE'),
    r.useEffect(req$ => req$.pipe(
      getUserValidation,
      mergeMap(req => pipe(
        deleteUser(req.params.userName)
      )),
      map(body => ({ body }))
    )),
);
  
const adminUser$ = combineRoutes('/user', [
    getUserList$,
    getUserByUsername$,
    deleteUser$
]);

export default adminUser$
