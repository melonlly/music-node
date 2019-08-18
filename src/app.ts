import Koa from "koa"
import compress from "koa-compress" // 压缩
import koaBody from "koa-body" // 处理前端提交的数据
import helmet from "koa-helmet" // web安全
// import passport from "koa-passport" // 权限校验
import dotenv from "dotenv" // 读取.env文件（node全局变量）
import api from "./route/index"

dotenv.config()

const app = new Koa()

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