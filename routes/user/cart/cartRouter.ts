import { mergeMap, map } from "rxjs/operators";
import { combineRoutes, r } from '@marblejs/http';
import { pipe } from "fp-ts/lib/function";
import 'dotenv/config'
import addToCart from "../../../controllers/user/cart/addToCart";
import getCartDetails from "../../../controllers/user/cart/getCartDetails";
import removeFromCart from "../../../controllers/user/cart/removeFromCart";
import authentication from "../../../authentication/authToken";
import addToCartValidation from "../../../validations/cart/validateAddToCart";

const addToCart$ = r.pipe(
    r.matchPath('/add/:item'),
    r.matchType('POST'),
    r.useEffect(req$ => req$.pipe(
        mergeMap(req => pipe(
            authentication(req)
        )),
        addToCartValidation,
        mergeMap(req => pipe(
            addToCart(req.params.item)
        )),     
        map(body => ({ body })),
    ))
);

const removeFromCart$ = r.pipe(
    r.matchPath('/remove/:item'),
    r.matchType('DELETE'),
    r.useEffect(req$ => req$.pipe(
        mergeMap(req => pipe(
            authentication(req)
        )),
        addToCartValidation,
        mergeMap(req => pipe(
            removeFromCart(req.params.item)
        )),     
        map(body => ({ body })),
    ))
);

const getCart$ = r.pipe(
    r.matchPath('/'),
    r.matchType('GET'),
    r.useEffect(req$ => req$.pipe(
        mergeMap(req => pipe(
            authentication(req)
        )),
        mergeMap(getCartDetails),
        map(body => ({ body }))
    ))
)

const userCart$ = combineRoutes('/cart',[
    getCart$,
    addToCart$,
    removeFromCart$
])

export default userCart$


