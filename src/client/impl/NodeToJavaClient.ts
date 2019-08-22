import net from "net"
import Client from "../Client"
import clientConfig from "../../config/client" // 客户端配置文件
import List from "../../models/impl/List"
import { getLogger } from "log4js";

const logger = getLogger("cheese")

class NodeToJavaClient implements Client {
    name: String = clientConfig.id
    host: String = clientConfig.networkHost
    port: Number = clientConfig.networkPort
    invoke(routes: String, params: any) {
        const list = new List()
        
        // 封装请求数据
        let header: any = {
            routes: routes,
            params: JSON.stringify(params)
        }
        header = JSON.stringify(header)

        const client = new net.Socket()
        client.setEncoding("utf-8")
        // client.connect(path.join("'\\\\?\\pipe','\\server'"), () => {
        client.connect({
            port: 8080,
            host: "127.0.0.1"
        }, () => {
            client.write(header)
        })

        client.on("data", data => {
            logger.info(`server：${data.toString()}`)
            client.end()
        })

        client.on("close", () => {
            logger.info("Connection closed")
        })

        client.on("error", error => {
            logger.info(`server error：${error}`)
            client.destroy()
        })

        return list
    }
}

export default NodeToJavaClient