import { requestValidator$, t } from "@marblejs/middleware-io";
import { string } from "fp-ts";

const postPromoValidation = requestValidator$({
    body : t.type({
        promoCode : t.string,
        startDate : t.string,
        endDate : t.string,
        discount : t.number
    })
})

export default postPromoValidation