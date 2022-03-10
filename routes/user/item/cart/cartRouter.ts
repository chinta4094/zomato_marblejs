import { mergeMap,map, catchError } from "rxjs/operators";
import { createServer, combineRoutes, httpListener, r, HttpError, HttpStatus } from '@marblejs/http';
import { getItemById, getItemCollection } from "../../../../controllers/user/item/getItem";
import { pipe } from "fp-ts/lib/function";
import 'dotenv/config'
import jwt from 'jsonwebtoken';
import getItemValidation from "../../../../validations/item/validateItemParams";
import tokenItemValidation from "../../../../validations/item/validateToken"
import addToCart from "../../../../controllers/user/cart/addToCart";
import addToCartValidation from "../../../../validations/cart/validateAddToCart";
import getCartDetails from "../../../../controllers/user/cart/getCartDetails";

type tokenObj = { token : string }
const authentication = async(body : tokenObj) => {
  const verifyAuth = jwt.verify(body.token,`${process.env.TOKEN}`)
  return verifyAuth
}

const addToCart$ = r.pipe(
    r.matchPath('/:item'),
    r.matchType('POST'),
    r.useEffect(req$ => req$.pipe(
        addToCartValidation,
        mergeMap(req => pipe(
            addToCart(req.params.item)
        )),
        map(body => ({ body }))
    ))
)

const getCart$ = r.pipe(
    r.matchPath('/'),
    r.matchType('GET'),
    r.useEffect(req$ => req$.pipe(
        tokenItemValidation,
        mergeMap(req => pipe(
            authentication(req.headers as { token : string})
        )),
        mergeMap(getCartDetails),
        map(body => ({ body }))
    ))
)

const userCart$ = combineRoutes('/cart',[
    addToCart$,
    getCart$
])

export default userCart$