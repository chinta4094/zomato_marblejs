import { requestValidator$, t } from "@marblejs/middleware-io";

const getItemValidation = requestValidator$({
    params : t.type({
        name : t.string
    })
})

export default getItemValidation