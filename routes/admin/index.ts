import { combineRoutes } from "@marblejs/http";
import adminItem$ from "./item/createItemRouter";
import adminPromo$ from "./promo/promo";
import adminUser$ from "./user/userRouter";

const admin$ = combineRoutes('/admin', [
    adminItem$,
    adminUser$,
    adminPromo$
]);

export default admin$