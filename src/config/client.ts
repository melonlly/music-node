export default {
    // app空间名（唯一）
    appspace: "music.",
    // 创建socket根目录
    socketRoot: "/tmp/",
    // 服务id（唯一）
    id: "music",
    // 待连接主机ip（本地或远程）
    networkHost: "127.0.0.1",
    // 待连接主机
    networkPort: 8080,
    // 套接字上发送的数据的默认编码。主要用于rawBuffer设置为true时
    encoding: "utf8",
    // 如果是true，数据将作为原始节点缓冲区发送和接收，而不是作为JSON对象
    rawBuffer: false,
    // 是否同步请求
    sync: false,
    // true：不打日志  false：打日志
    silent: false,
    logInColor: true,
    logDepth: 5,
    // 日志处理函数
    logger: console.log,
    // 最多连接数
    maxConnections: 100,
    // 如果连接丢失，客户机将在尝试重新连接到服务器之前等待
    retry: 500,
    // 如果设置，则表示在每次断开连接并完全终止特定连接之前重试的最大次数
    maxRetries: false,
    /**
     * 缺省值为false意味着客户端将继续重试，在重试间隔期间无限地连接到服务器。
     * 如果设置为任意数字，客户端将在每次断开连接后超过该数字时停止重试。
     * 如果实时设置为true，无论maxretry如何，它都会立即停止连接。
     * 如果设置为0，客户机将不会尝试重新连接。
     */
    stopRetrying: false,
    /**
     * 默认值为true，表示模块将负责在启动之前删除IPC套接字。
     * 如果在集群环境中使用node-ipc，而同一套接字上有多个侦听器，则必须将此设置为false，然后在自己的代码中删除套接字。
     */
    unlink: true,
    // 主要用于指定客户机应该通过哪个接口连接
    interfaces: {
        localAddress: false,
        localPort: false,
        family: false,
        hints: false,
        lookup: false
    }
}