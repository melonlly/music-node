import Koa from "koa"
import compress from "koa-compress" // 压缩
import cors from "@koa/cors" // 跨域
import koaBody from "koa-body" // 处理前端提交的数据
import helmet from "koa-helmet" // web安全
// import passport from "koa-passport" // 权限校验
import dotenv from "dotenv" // 读取.env文件（node全局变量）
import api from "./route/index"

dotenv.config()

const app = new Koa()

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
const router = require("koa-router")()
router.use("/api", api.routes())
app.use(router.routes())

app.use(compress())
app.use(koaBody())
app.use(ctx => {
    ctx.body = `Request Body: ${JSON.stringify(ctx.request.body)}`;
})

// session


// 安全
app.use(helmet())

// user校验


export default app