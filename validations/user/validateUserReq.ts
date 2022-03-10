import { requestValidator$, t } from "@marblejs/middleware-io";

const postUserValidation = requestValidator$({
    body : t.type({
        firstName : t.string,
        lastName : t.string,
        userName : t.string,
        email : t.string,
        password : t.string
    })
})

export default postUserValidation