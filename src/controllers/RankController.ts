import fetch from "node-fetch"
import List from "../models/impl/List";
import { Context } from "koa";
import { global } from "melon";

class RankController {
    constructor() { }

    /**
     * 获取排行榜列表
     */
    async rankList(ctx: Context) {
        ctx.body = await fetch(
            `https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?_=1558785854987&g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1`,
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
                    if (code == 0) {
                        return {
                            code,
                            data: data.data.topList,
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

    /**
     * 排行榜详情
     */
    async rankDetail(ctx: Context) {
        const result = new List()
        const id = ctx.params.id || ""
        const data = await require(`../data/top-list/${id}.json`)
        if (data && data.toplistData) {
            result.code = 0
            result.data = data
        } else {
            result.code = -1
            result.data = []
        }
        ctx.body = result
    }
}

export default RankController