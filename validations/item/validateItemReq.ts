import { requestValidator$, t } from "@marblejs/middleware-io";

const postItemValidation = requestValidator$({
    body : t.type({
        name : t.string,
        cost : t.number
    })
})

export default postItemValidation