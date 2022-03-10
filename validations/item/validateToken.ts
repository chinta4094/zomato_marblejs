import { requestValidator$, t } from "@marblejs/middleware-io";

const tokenItemValidation = requestValidator$({
    headers : t.type({
        token : t.string
    })
})

export default tokenItemValidation