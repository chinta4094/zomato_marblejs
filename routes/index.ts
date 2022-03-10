import adminUser$ from './admin';
import userUser$ from './user';
import { combineRoutes } from '@marblejs/http';

const api$ = combineRoutes('/api/v1',[
    adminUser$,
    userUser$
])

export default api$