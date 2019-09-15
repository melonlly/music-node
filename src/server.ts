// import net from "net"
import { configure, getLogger } from "log4js" // 日志记录
// import ipc from "node-ipc"
import errorHandler from "./middleware/errorHandler" // 异常处理
import app from "./app"
import config from "./config/config"
import Connection from "./utils/Connection"
// import clientConfig from "./config/client"
// import request from "./utils/request"
import datasource from "./config/datasource"
import User from "./models/impl/tableModels/User";

configure({
    appenders: { cheese: { type: "file", filename: `${__dirname}/logs/music.${new Date().toLocaleDateString()}.log` } },
    categories: { default: { appenders: ["cheese"], level: "all" } }
})
const logger = getLogger("cheese")

// clientConfig.socketRoot = `${__dirname}/tmp/`
// // 发起client连接到server
// ipc.connectTo("server", () => {
//     ipc.of.world.on(
//         "connect", () => {
//             ipc.log("## connected to server ##")
//             ipc.of.world.emit( "message", "hello" )
//         }
//     )
//     ipc.of.world.on(
//         "disconnect", () => ipc.log("## disconnected from world ##")
//     )
//     ipc.of.world.on(
//         "message", (data: any) => ipc.log("## got a message from server : ", data)
//     )
// })

// node未捕获异常拦截
process.on("uncaughtException", err => logger.error(new Date(), " uncaughtException:", err.message, err.stack))

// 异常处理
app.use(errorHandler)

// 挂载日志模块
// app.use(async (ctx: any, next: Function) => {
//     ctx.logger = logger
//     await next()
// })
// global.logger = logger

const server = app.listen(config.PORT, () => {
    console.log(`App is running at http://127.0.0.1:${config.PORT} in ${process.env.NODE_ENV} mode`)

    // 初始化数据库连接
    const conIns = new Connection("mysql", datasource.mysql)
    conIns.connection.addModels([
        User
    ])
    console.log(conIns.connection.models)

    // request.sendMsg({
    //     logger: logger,
    //     routes: "/user/list",
    //     params: {
    //         msg: "你好 server"
    //     }
    // })

    // const client = new net.Socket()
    // client.setEncoding("utf-8")
    // client.connect({
    //     port: 8080,
    //     host: "127.0.0.1"
    // }, () => {
    //     client.write("你好 server \r\n")
    // })

    // client.on("data", data => {
    //     logger.info(`server：${data.toString()}`)
    //     client.end()
    // })

    // client.on("close", () => {
    //     logger.info("Connection closed")
    // })

    // client.on("error", error => {
    //     logger.info(`server error：${error}`)
    //     client.destroy()
    // })

})

export default server