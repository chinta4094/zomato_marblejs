import { requestValidator$, t } from "@marblejs/middleware-io";

const validateUserLogin = requestValidator$({
    body : t.type({
        userName : t.string,
        password : t.string
    })
})

export default validateUserLogin