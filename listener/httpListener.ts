import { httpListener } from "@marblejs/http";
import { logger$ } from "@marblejs/middleware-logger";
import { bodyParser$ } from "@marblejs/middleware-body";
import api$ from "../routes";

const middlewares = [
    logger$(),
    bodyParser$()
]

const effects = [
    api$
]

const eventListener = httpListener({ middlewares, effects })

export default eventListener