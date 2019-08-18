import Result from "../models/Result"

/**
 * @name Client
 * @description 客户端 Interface
 * @param name              Server名称
 * @param host              主机ip
 * @param port              服务端口
 * @param invoke:Function   调用Server
 */
interface Client {
    name: String,
    host: String,
    port: Number,
    invoke(routes: String, params: any): Result
}

export default Client