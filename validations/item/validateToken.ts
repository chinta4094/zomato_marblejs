import { requestValidator$, t } from "@marblejs/middleware-io";

const validateToken = requestValidator$({
    headers : t.type({
        token : t.string
    })
})

export default validateToken