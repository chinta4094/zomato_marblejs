import { requestValidator$, t } from "@marblejs/middleware-io";

const getItemValidation = requestValidator$({
    params : t.type({
        name : t.string
    }),
    headers : t.type({
        token : t.string
    })
})

export default getItemValidation