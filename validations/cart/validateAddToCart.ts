import { requestValidator$, t } from "@marblejs/middleware-io";

const addToCartValidation = requestValidator$({
    params : t.type({
        item : t.string
    })
})

export default addToCartValidation