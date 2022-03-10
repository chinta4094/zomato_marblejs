import { requestValidator$, t } from "@marblejs/middleware-io";

const getUserValidation = requestValidator$({
    params : t.type({
        userName : t.string
    })
})

export default getUserValidation