import fetch from "node-fetch"
import { Context } from "koa";
import { getLogger } from "log4js";
import { route, GET, POST, before } from "awilix-koa";
import config from "../config/config"
import bodyparser from "koa-bodyparser"
import Result from "../models/impl/Result";

const logger = getLogger("cheese")

@route(`${config.baseRouter}/song`)
class SongController {

    // 歌词
    @route("/lyrics/:mid")
    @GET()
    async getLyrics(ctx: Context) {
        const mid = ctx.params.mid || ""
        ctx.body = await fetch(
            `https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&nobase64=1&musicid=${mid}&songtype=0&_=1568381749440&jsonpCallback=jsonp1`,
            {
                method: "GET",
                timeout: 60000,
                headers: {
                    referer: "https://i.y.qq.com/v8/playsong.html",
                    origin: "https://i.y.qq.com"
                }
            }
        )
            .then(res => res.text())
            .then(
                // 成功
                body => {
                    logger.info(`/song/lyrics/:mid`)
                    logger.info(ctx.params)
                    logger.info(body)
                    if (body.indexOf("lyric") > -1) {
                        let lyric = body.split("lyric")[1]
                        lyric = lyric.replace('":"', "")
                        lyric = lyric.replace('"})', "")
                        return {
                            status: 0,
                            data: {
                                lyric
                            },
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
                    logger.error(err);
                    return {
                        status: -1,
                        data: [],
                        msg: ""
                    }
                }
            )
    }

    // media
    @route("/media")
    @POST()
    @before([bodyparser()])
    async getMedia(ctx: Context) {
        const params = ctx.request.body
        const mid = params.mid || ""
        const mediaMid = params.mediamid || ""
        const result = new Result()

        const vkey = await fetch(
            `http://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?g_tk=0&loginUin=453692541&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&cid=205361747&uin=453692541&songmid=${ mid }&filename=C400${ mediaMid }.m4a&guid=8457034985`,
            {
                method: "GET",
                timeout: 60000,
                headers: {
                    referer: "https://y.qq.com/portal/player.html",
                    origin: "https://y.qq.com"
                }
            }
        )
            .then(res => res.json())
            .then(
                // 成功
                data => {
                    logger.info(`/song/media`)
                    logger.info(params)
                    logger.info(data, data.data.items[0])
                    return data.data.items[0].vkey || ""
                },
                // 失败
                err => {
                    logger.error(err);
                    return ""
                }
            )
        
        result.data = {
            media: `http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400${ mediaMid }.m4a?guid=8457034985&vkey=${ vkey }&uin=0&fromtag=38`
        }

        ctx.body = result
    }

}

export default SongController
