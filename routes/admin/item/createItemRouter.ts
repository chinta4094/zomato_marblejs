import { mergeMap,map} from "rxjs/operators";
import {combineRoutes, r} from '@marblejs/http';
import postItemValidation from "../../../validations/item/validateItemReq";
import createItem from "../../../controllers/admin/item/createItem";
import authentication from "../../../authentication/authToken";

const postItem$ = r.pipe(
    r.matchPath('/createItem'),
    r.matchType('POST'),
    r.useEffect(req$ => req$.pipe(
        // mergeMap(req => authentication(req)),
        postItemValidation,
        mergeMap(req => 
            createItem(req.body as { name : string, cost : number})
        ),
        map(body => ({ body }))
    ))
)

const adminItem$ = combineRoutes('/item', [
    postItem$
]);

export default adminItem$