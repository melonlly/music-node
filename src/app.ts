import Koa from "koa"
import compress from "koa-compress" // 压缩
import cors from "@koa/cors" // 跨域
import helmet from "koa-helmet" // web安全
import session from "koa-session" // session
// import passport from "koa-passport" // 权限校验
import dotenv from "dotenv" // 读取.env文件（node全局变量）
// import api from "./route/index"
import { createContainer, Lifetime } from "awilix"
import { loadControllers, scopePerRequest } from "awilix-koa"
import config from "./config/config"

dotenv.config()

const app = new Koa()

// session
app.keys = [config.key] // 设置签名的cookie的密钥
app.use(session({
    key: "melon double click six six six",
    maxAge: 86400000, // cookie有效期，默认为1天（ms）
    overwrite: true, // 是否能重写
    httpOnly: true,
    signed: true,
    rolling: false, // 强制在每个响应上设置会话标识符cookie。过期被重置为原始maxAge，重置过期倒计时
    renew: false, // 当会话快过期时续订会话，这样我们就可以始终保持用户登录
}, app))

// 创建DI容器
const container = createContainer()
// 注入Model（即services）
container.loadModules(
    [
        [__dirname + "/models/impl/tableModels/*.js", Lifetime.SCOPED]
    ],
    {
        formatName: "camelCase"
    }
)
app.use(scopePerRequest(container))
app.use(loadControllers(__dirname + "/controllers/*.js", { cwd: __dirname }))

// 跨域
app.use(
    /**
     * @param {Object} [options] 
     *  - {String|Function(ctx)} origin `Access-Control-Allow-Origin`, default is request Origin header
     *  - {String|Array} allowMethods `Access-Control-Allow-Methods`, default is 'GET,HEAD,PUT,POST,DELETE,PATCH'
     *  - {String|Array} exposeHeaders `Access-Control-Expose-Headers`
     *  - {String|Array} allowHeaders `Access-Control-Allow-Headers`
     *  - {String|Number} maxAge `Access-Control-Max-Age` in seconds
     *  - {Boolean} credentials `Access-Control-Allow-Credentials`
     *  - {Boolean} keepHeadersOnError Add set headers to `err.header` if an error is thrown
     */
    cors(
        {
            origin: "http://127.0.0.1:8080",
            allowMethods: ["GET", "POST", "DELETE", "OPTIONS"],
            exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
            allowHeaders: ["Content-Type", "Authorization", "Accept", "x-requested-with"],
            maxAge: 100,
        }
    )
)

// 路由
// const router = require("koa-router")()
// router.use("/api", api.routes())
// app.use(router.routes())

// 压缩
app.use(compress())

// 安全
app.use(helmet())


export default app