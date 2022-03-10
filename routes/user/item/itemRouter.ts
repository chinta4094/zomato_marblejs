import { mergeMap,map, catchError } from "rxjs/operators";
import { createServer, combineRoutes, httpListener, r, HttpError, HttpStatus } from '@marblejs/http';
import { getItemById, getItemCollection } from "../../../controllers/user/item/getItem";
import { pipe } from "fp-ts/lib/function";
import 'dotenv/config'
import jwt from 'jsonwebtoken';
import getItemValidation from "../../../validations/item/validateItemParams";
import tokenItemValidation from "../../../validations/item/validateToken"
import userCarts$ from '../item/itemRouter'


type tokenObj = { token : string }
const authentication = async(body : tokenObj) => {
  const verifyAuth = jwt.verify(body.token,`${process.env.TOKEN}`)
  return verifyAuth
}

const getItem$ = r.pipe(
    r.matchPath('/'),
    r.matchType('GET'),
    r.useEffect(req$ => req$.pipe(
        tokenItemValidation,
        mergeMap(req => pipe(
          authentication(req.headers as tokenObj)
        )),
        mergeMap(getItemCollection),
        map(body => ({ body }))
    ))
)

const getItemByUser$ = r.pipe(
    r.matchPath('/:name'),
    r.matchType('GET'),
    r.useEffect(req$ => req$.pipe(
      getItemValidation,
      map(req => pipe(
        getItemById(req.params.name)
      )),
      map(body => ({ body })),
    )),
);

const userItems$ = combineRoutes('/item',[
    getItem$,
    getItemByUser$
])

export default userItems$