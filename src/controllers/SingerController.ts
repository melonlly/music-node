import fetch from "node-fetch"
import { Context } from "koa";
import { getLogger } from "log4js";

const logger = getLogger("cheese")

class SingerController {
    constructor() { }

    /**
     * 获取歌手列表（QQ音乐限制不能一次获取全部数据）
     *  设置param中的index参数1到27，对应歌手名称首字母ABCD...XYZ#
     */
    async singerList(ctx: Context) {
        ctx.body = await require("../data/singer-list.json")
    }

    /**
     * 获取歌手详情、相关热门歌曲
     */
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
                                name: musicData.songname,
                                singer_name: singer.name,
                                // interval: musicData.interval, // 时长
                                interval: 235, // 光年之外的时长
                                // 光年之外
                                url: "http://isure.stream.qqmusic.qq.com/C400002E3MtF0IAMMY.m4a?guid=5505496852&vkey=56D8F121464214067C8ED61B7BE3202879D874BED80100118E8A5B7AFC4F1CFDE4DEEAC21AE4CA53C32A19B2819C4016DB0CED6E9DF9777D&uin=0&fromtag=38",
                                // 歌词
                                lyrics: "[ti&#58;光年之外&#32;&#40;《太空旅客（Passengers）》电影中国区主题曲&#41;]&#10;[ar&#58;G&#46;E&#46;M&#46;&#32;邓紫棋]&#10;[al&#58;光年之外]&#10;[by&#58;]&#10;[offset&#58;0]&#10;[00&#58;00&#46;00]光年之外&#32;&#40;《太空旅客（Passengers）》电影中国区主题曲&#41;&#32;&#45;&#32;G&#46;E&#46;M&#46;&#32;邓紫棋&#32;&#40;Gem&#32;Tang&#41;&#10;[00&#58;02&#46;55]词：G&#46;E&#46;M&#46;&#32;邓紫棋&#10;[00&#58;05&#46;10]曲：G&#46;E&#46;M&#46;&#32;邓紫棋&#10;[00&#58;07&#46;66]编曲：Lupo&#32;Groinig&#10;[00&#58;10&#46;21]监制：Lupo&#32;Groinig&#10;[00&#58;12&#46;77]感受停在我发端的指尖&#10;[00&#58;16&#46;68]如何瞬间冻结时间&#10;[00&#58;21&#46;80]&#10;[00&#58;23&#46;58]记住望着我坚定的双眼&#10;[00&#58;27&#46;62]也许已经没有明天&#10;[00&#58;32&#46;66]&#10;[00&#58;34&#46;24]面对浩瀚的星海&#10;[00&#58;36&#46;19]&#10;[00&#58;36&#46;71]我们微小得像尘埃&#10;[00&#58;39&#46;27]漂浮在一片无奈&#10;[00&#58;43&#46;49]&#10;[00&#58;45&#46;13]缘分让我们相遇乱世以外&#10;[00&#58;49&#46;40]&#10;[00&#58;50&#46;50]命运却要我们危难中相爱&#10;[00&#58;54&#46;72]&#10;[00&#58;55&#46;92]也许未来遥远在光年之外&#10;[01&#58;00&#46;36]&#10;[01&#58;01&#46;48]我愿守候未知里为你等待&#10;[01&#58;05&#46;58]我没想到为了你我能疯狂到&#10;[01&#58;09&#46;69]&#10;[01&#58;10&#46;87]山崩海啸没有你根本不想逃&#10;[01&#58;15&#46;38]&#10;[01&#58;16&#46;36]我的大脑为了你已经疯狂到&#10;[01&#58;20&#46;68]&#10;[01&#58;21&#46;76]脉搏心跳没有你根本不重要&#10;[01&#58;26&#46;27]&#10;[01&#58;29&#46;07]一双围在我胸口的臂弯&#10;[01&#58;33&#46;17]足够抵挡天旋地转&#10;[01&#58;38&#46;49]&#10;[01&#58;40&#46;02]一种执迷不放手的倔强&#10;[01&#58;44&#46;05]足以点燃所有希望&#10;[01&#58;49&#46;25]&#10;[01&#58;50&#46;59]宇宙磅礡而冷漠&#10;[01&#58;53&#46;09]我们的爱微小却闪烁&#10;[01&#58;55&#46;63]颠簸却如此忘我&#10;[02&#58;00&#46;02]&#10;[02&#58;01&#46;44]缘分让我们相遇乱世以外&#10;[02&#58;06&#46;36]&#10;[02&#58;06&#46;90]命运却要我们危难中相爱&#10;[02&#58;11&#46;28]&#10;[02&#58;12&#46;37]也许未来遥远在光年之外&#10;[02&#58;17&#46;11]&#10;[02&#58;17&#46;80]我愿守候未知里为你等待&#10;[02&#58;21&#46;80]我没想到为了你我能疯狂到&#10;[02&#58;26&#46;07]&#10;[02&#58;27&#46;27]山崩海啸没有你根本不想逃&#10;[02&#58;31&#46;63]&#10;[02&#58;32&#46;71]我的大脑为了你已经疯狂到&#10;[02&#58;37&#46;06]&#10;[02&#58;38&#46;17]脉搏心跳没有你根本不重要&#10;[02&#58;42&#46;46]&#10;[02&#58;44&#46;17]也许航道以外是醒不来的梦&#10;[02&#58;53&#46;78]&#10;[02&#58;56&#46;71]乱世以外是纯粹的相拥&#10;[03&#58;05&#46;27]&#10;[03&#58;05&#46;86]我没想到为了你我能疯狂到&#10;[03&#58;09&#46;84]&#10;[03&#58;10&#46;92]山崩海啸没有你根本不想逃&#10;[03&#58;15&#46;36]&#10;[03&#58;16&#46;39]我的大脑为了你已经疯狂到&#10;[03&#58;20&#46;65]&#10;[03&#58;21&#46;82]脉搏心跳没有你根本不重要&#10;[03&#58;26&#46;12]&#10;[03&#58;27&#46;70]相遇乱世以外危难中相爱&#10;[03&#58;37&#46;72]&#10;[03&#58;38&#46;66]相遇乱世以外危难中相爱&#10;[03&#58;48&#46;53]&#10;[03&#58;49&#46;07]我没想到",
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