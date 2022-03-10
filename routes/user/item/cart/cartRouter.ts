import { mergeMap,map, catchError } from "rxjs/operators";
import { createServer, combineRoutes, httpListener, r, HttpError, HttpStatus } from '@marblejs/http';
import { getItemById, getItemCollection } from "../../../../controllers/user/item/getItem";
import { pipe } from "fp-ts/lib/function";
import 'dotenv/config'
import jwt from 'jsonwebtoken';
import getItemValidation from "../../../../validations/item/validateItemParams";
import validateToken from "../../../../validations/item/validateToken"
import addToCart from "../../../../controllers/user/cart/addToCart";
import addToCartValidation from "../../../../validations/cart/validateAddToCart";
import getCartDetails from "../../../../controllers/user/cart/getCartDetails";
import { string } from "fp-ts";

type tokenObj = { token : string }

const authentication1 = async(body: any) => {
    const verifyAuth = jwt.verify(body.headers.token,`${process.env.TOKEN}`)
      return body
}

const addToCart$ = r.pipe(
    r.matchPath('/:item'),
    r.matchType('POST'),
    r.useEffect(req$ => req$.pipe(
        mergeMap(req => pipe(
            authentication1(req)
        )),
        addToCartValidation,
        mergeMap(req => pipe(
            addToCart(req.params.item)
        )),     
        map(body => ({ body })),
    ))
);

// const getCart$ = r.pipe(
//     r.matchPath('/'),
//     r.matchType('GET'),
//     r.useEffect(req$ => req$.pipe(
//         mergeMap(req => pipe(
//             authentication("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Ik5hcmVuZHJhMTEiLCJpYXQiOjE2NDY5MDU2OTJ9.iza3f7g9K_2OX9mS06Y4vg1EaDhXt1d8MHfvEQLtYoM")
//         )),
//         mergeMap(getCartDetails),
//         map(body => ({ body }))
//     ))
// )

const userCart$ = combineRoutes('/cart',[
    addToCart$
])

export default userCart$