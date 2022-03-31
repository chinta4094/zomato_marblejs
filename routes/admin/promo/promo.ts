import { mergeMap,map} from "rxjs/operators";
import {combineRoutes, r} from '@marblejs/http';
import postItemValidation from "../../../validations/item/validateItemReq";
import createItem from "../../../controllers/admin/item/createItem";
import authentication from "../../../authentication/authToken";
import { pipe } from "fp-ts/lib/function";
import postPromoValidation from "../../../validations/promo/validatePromo";
import createPromo from "../../../controllers/admin/promo/createPromo";
import addPromoToCart from '../../../controllers/user/promo/addPromo'

type promoObj = { promoCode : string , startDate : Date, endDate : Date, discount : number }

const promo$ = r.pipe(
    r.matchPath('/'),
    r.matchType('POST'),
    r.useEffect(req$ => req$.pipe(
        // mergeMap(req => authentication(req)),
        mergeMap(req => createPromo(req.body as promoObj)),
        map(body => ({ body }))
    ))
)

const adminPromo$ = combineRoutes('/promo', [
    promo$
]);

export default adminPromo$