import { combineRoutes } from "@marblejs/http";
import adminItem$ from "./item/createItemRouter";
import adminUser$ from "./user/userRouter";

const admin$ = combineRoutes('/admin', [
    adminItem$,
    adminUser$
]);

export default admin$