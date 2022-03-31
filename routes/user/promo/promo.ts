import { mergeMap,map} from "rxjs/operators";
import {combineRoutes, r} from '@marblejs/http';
import authentication from "../../../authentication/authToken";
import addPromoToCart from '../../../controllers/user/promo/addPromo'
import removePromoToCart from '../../../controllers/user/promo/removePromo'
import getPromo from "../../../controllers/user/promo/getPromo";
import validatePromoParam from "../../../validations/promo/validatePromoParam";

type promoObj = { promoCode : string , startDate : Date, endDate : Date, discount : number }

const addPromo$ = r.pipe(
    r.matchPath('/addPromo/:promoCode'),
    r.matchType('POST'),
    r.useEffect(req$ => req$.pipe(
        // mergeMap(req => authentication(req)),
        validatePromoParam,
        mergeMap(req => addPromoToCart(req.params.promoCode)),
        map(body => ({ body }))
    ))
)

const getPromo$ = r.pipe(
    r.matchPath(''),
    r.matchType('GET'),
    r.useEffect(req$ => req$.pipe(
        mergeMap(req => authentication(req)),
        mergeMap(getPromo),
        map(body => ({ body }))
    ))
)

const removePromo$ = r.pipe(
    r.matchPath('/removePromo/:promoCode'),
    r.matchType('DELETE'),
    r.useEffect(req$ => req$.pipe(
        mergeMap(req => authentication(req)),
        mergeMap(req => removePromoToCart(req.params.promoCode)),
        map(body => ({ body }))
    ))
)

const userPromo$ = combineRoutes('/promo', [
    getPromo$,
    addPromo$,
    removePromo$
]);

export default userPromo$