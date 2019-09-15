import fetch from "node-fetch"
import { Context } from "koa";
import { getLogger } from "log4js";
import { route, GET } from "awilix-koa";
import config from "../config/config"

const logger = getLogger("cheese")

@route(`${ config.baseRouter }/recommend`)
class RecommendController {
    constructor() { }

    /*
        nav图片
    */
    @route("/nav")
    @GET()
    async navPics(ctx: Context) {
        ctx.body = await fetch(
            `https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1549528667549`,
            {
                method: "GET",
                timeout: 60000
            }
        )
            .then(res => res.json())
            .then(
                // 成功
                data => {
                    const code = data.code
                    if (code == "0") {
                        return {
                            status: code,
                            data: data.data.slider,
                            msg: ""
                        }
                    } else {
                        return {
                            status: -1,
                            data: [],
                            msg: ""
                        }
                    }
                },
                // 失败
                err => {
                    logger.error(err)
                    return {
                        status: -1,
                        data: [],
                        msg: ""
                    }
                }
            )
    }
}

export default RecommendController