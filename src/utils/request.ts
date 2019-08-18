import NodeToJavaClient from "../client/impl/NodeToJavaClient"
import List from "../models/impl/List";
import { global } from "melon";

export default {
    // 发送信息
    sendMsg: (options: {routes: String, params: Object}) => {
        const routes = options.routes || "" // 路由信息
        const params = options.params || {} // 执行参数
    
        const client = new NodeToJavaClient() // 请求客户端
        const results: List = client.invoke(routes, params)
        
        global.logger.info(results)
        
    }
}