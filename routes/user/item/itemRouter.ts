import { mergeMap,map } from "rxjs/operators";
import { combineRoutes, r} from '@marblejs/http';
import { getItemById, getItemCollection } from "../../../controllers/user/item/getItem";
import { pipe } from "fp-ts/lib/function";
import 'dotenv/config'
import authentication from '../../../authentication/authToken'
import getItemValidation from "../../../validations/item/validateItemParams";

const getItem$ = r.pipe(
    r.matchPath('/'),
    r.matchType('GET'),
    r.useEffect(req$ => req$.pipe(
        mergeMap(req => pipe(
          authentication(req)
        )),
        mergeMap(getItemCollection),
        map(body => ({ body }))
    ))
)

const getItemByUser$ = r.pipe(
    r.matchPath('/:name'),
    r.matchType('GET'),
    r.useEffect(req$ => req$.pipe(
      mergeMap(req => pipe(
        authentication(req)
      )),
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