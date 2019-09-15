import fetch from "node-fetch"
import { Context } from "koa";
import { getLogger } from "log4js";
import { route, GET } from "awilix-koa";
import config from "../config/config"

const logger = getLogger("cheese")

@route(`${ config.baseRouter }/singer`)
class SingerController {
    constructor() {}

    /**
     * 获取歌手列表（QQ音乐限制不能一次获取全部数据）
     *  设置param中的index参数1到27，对应歌手名称首字母ABCD...XYZ#
     */
    @route("/list")
    @GET()
    async singerList(ctx: Context) {
        ctx.body = await require("../data/singer-list.json")
    }

    /**
     * 获取歌手详情、相关热门歌曲
     */
    @route("/:mid")
    @GET()
    async singerDetail(ctx: Context) {
        const mid = ctx.params.mid || ""
        ctx.body = await fetch(
            `https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&ct=24&singermid=${mid}&order=listen&begin=0&num=30&songstatus=1`,
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
                        const _data = data.data
                        // 歌手信息
                        const singer = {
                            id: _data.singer_id,
                            mid: _data.singer_mid,
                            name: _data.singer_name
                        }
                        // 歌曲列表
                        const songs: any = []
                        const songList = _data.list
                        songList.forEach(({ musicData }: any) => {
                            songs.push({
                                id: musicData.songid,
                                mid: musicData.songmid,
                                mediamid: musicData.strMediaMid,
                                name: musicData.songname,
                                singer_name: singer.name,
                                interval: musicData.interval, // 时长
                                // interval: 235, // 光年之外的时长
                                // 光年之外
                                url: "",
                                // 歌词
                                lyrics: "",
                                // 所属专辑
                                album: {
                                    id: musicData.albumid,
                                    mid: musicData.albummid,
                                    name: musicData.albumname
                                }
                            })
                        })
                        return {
                            status: code,
                            data: { singer, songs }
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

}

export default SingerController