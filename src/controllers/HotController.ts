import fetch from "node-fetch"
import { Context } from "koa";
import { global } from "melon";

class HotController {
    constructor() {}

    async songList(ctx: Context) {
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
                        code,
                        data: data.data.songList,
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
                global.logger.error(err)
                return {
                    code: -1,
                    data: [],
                    msg: ""
                }
            }
        )
    }

    async getHotKeys(ctx: Context) {
        ctx.body = await fetch(
            `https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?_=1559097149205&g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1`,
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
                if ( code == "0" ) {
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
                global.logger.error(err)
                return {
                    code: -1,
                    data: [],
                    msg: ""
                }
            }
        )
    }
}

export default HotController