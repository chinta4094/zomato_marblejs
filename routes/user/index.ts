import { combineRoutes } from "@marblejs/http";
import userCart$ from "./item/cart/cartRouter";
import userItem$ from "./item/itemRouter";
import userUser$ from "./user/userRouter";

const user$ = combineRoutes('/user', [
    userItem$,
    userUser$,
    userCart$
]);

export default user$