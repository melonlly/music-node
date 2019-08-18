import fetch from "node-fetch"
import { Context } from "koa";
import { global } from "melon";

class SearchController {
    constructor() { }

    /**
     * 查询关键字
     */
    async search(ctx: Context) {
        const query = ctx.query || {}
        ctx.body = await fetch(
            `https://shc.y.qq.com/soso/fcgi-bin/search_for_qq_cp?_=1559123852733&g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=${encodeURI(query.key || "")}&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=${query.page || "1"}&remoteplace=txt.mqq.all`,
            {
                method: "GET",
                timeout: 60000,
                // 重写请求头，防止QQ的'禁止跨域访问'警告
                headers: {
                    referer: "https://y.qq.com/m/index.html",
                    origin: "https://y.qq.com"
                }
            }
        )
            .then(res => res.json())
            .then(
                // 成功
                data => {
                    const code = data.code
                    if (code == 0) {
                        return {
                            code,
                            data: data.data,
                            msg: ""
                        }
                    } else {
                        return {
                            code: -1,
                            data: [],
                            msg: ""
                        }
                    }
                },
                // 失败
                err => {
                    global.logger.error(err);
                    return {
                        code: -1,
                        data: [],
                        msg: ""
                    }
                }
            )
    }
}

export default SearchController