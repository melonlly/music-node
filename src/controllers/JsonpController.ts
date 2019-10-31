import { Context } from "koa";
import { getLogger } from "log4js";
import { route, GET } from "awilix-koa";
import config from "../config/config"

const logger = getLogger("cheese")

@route(`${config.baseRouter}/jsonp`)
class JsonpController {
    constructor() { }

    @route("/test")
    @GET()
    async jsonpTest(ctx: Context) {
        const query = ctx.query
        const callback = query.callback
        const name = query.name
        const data = {
            name
        }
        ctx.body = `${ callback }(${ data })`
    }
}

export default JsonpController