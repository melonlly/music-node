import { Context } from "koa";
import bodyparser from "koa-bodyparser"
import { getLogger } from "log4js";
import config from "../config/config"
import { route, POST, before } from "awilix-koa";
import User from "../models/impl/tableModels/User";
import { decrypt, encrypt } from "../utils/utils"
import Result from "../models/impl/Result";

const logger = getLogger("cheese")

@route(`${ config.baseRouter }/user`)
class UserController {
    constructor() {}

    @route("/login")
    @POST()
    @before([bodyparser()])
    async login(ctx: Context) {
        const params = ctx.request.body
        const name = params.name
        const password = params.password && decrypt(params.password)
        const result = new Result()
        const user = await User.findOne({
            where: {
                name,
                password
            }
        }).catch(Error, (err: Error) => {
            console.error(`用户查询异常：${ err.message }`)
            logger.error(`用户查询异常：${ err.message }`)
        })
        if (user) {
            user.password = encrypt(user.password)
            result.data = user
            // 登录成功
            ctx.session["@session-user-id"] = user.id
            ctx.session["@session-user-name"] = user.name
            ctx.session["@session-password"] = user.password
        }
        ctx.body = result
    }

    @route("/register")
    @POST()
    @before([bodyparser()])
    async register(ctx: Context) {
        const params = ctx.request.body
        const name = params.name
        const password = params.password && decrypt(params.password)
        const result = new Result()
        const user = await User.create({
            where: {
                name,
                password
            }
        }).catch(Error, (err: Error) => {
            console.error(`用户注册异常：${ err.message }`)
            logger.error(`用户注册异常：${ err.message }`)
        })
        if (!user) {
            result.status = -1
            result.msg = "用户注册失败"
        } else {
            user.password = encrypt(user.password)
            result.data = user
            // 注册 -> 登录成功
            ctx.session["@session-user-id"] = user.id
            ctx.session["@session-user-name"] = user.name
            ctx.session["@session-password"] = user.password
        }
        ctx.body = result
    }
}

export default UserController