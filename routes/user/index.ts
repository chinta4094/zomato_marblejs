import { combineRoutes } from "@marblejs/http";
import userCart$ from "./cart/cartRouter";
import userItem$ from "./item/itemRouter";
import userPromo$ from "./promo/promo";
import userUser$ from "./user/userRouter";

const user$ = combineRoutes('/user', [
    userItem$,
    userUser$,
    userCart$,
    userPromo$
]);

export default user$