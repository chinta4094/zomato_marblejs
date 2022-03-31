import { requestValidator$, t } from "@marblejs/middleware-io";

const validatePromoParam = requestValidator$({
    params : t.type({
        promoCode : t.string
    })
})

export default validatePromoParam