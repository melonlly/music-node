type Connections = {
    [mysql: string]: (config: any) => Sequelize
}

import { Sequelize } from "sequelize-typescript"
import { getLogger } from "log4js";

const logger = getLogger("cheese")

class Connection {
    // 数据库类型
    dialect: string
    // 连接配置
    config: any
    // 连接实例（pool）
    connection: Sequelize
    // 初始化连接（默认都创建连接池）
    constructor(dialect: string, config: any) {
        this.dialect = dialect
        this.config = config 
        this.connection = undefined
        const getConFn = getCon[dialect]
        try {
            if (getConFn) {
                this.connection = getConFn(config)
            }
            if (this.connection) {
                console.log(`${dialect}:连接创建成功！`)
                logger.info(`${dialect}:连接创建成功！`)
            } else {
                console.log(`${dialect}:连接创建失败！`)
                logger.error(`${dialect}:连接创建失败！`)
            }
        } catch (error) {
            console.log(error)
            logger.error(`${dialect}:连接创建失败！`)
            logger.error(error)
        }
    }
}

const getCon: Connections = {
    "mysql": ({
        database, user, password, host, port
    }: any): Sequelize => {
        return new Sequelize(database, user, password, {
            host: host,
            port: port,
            dialect: "mysql",
            storage: ":memory:",
            // modelPaths: [`${__dirname}/../../models/impl/tableModels/*.js`],
            pool: {
                max: 10, // 最大连接数
                min: 0, // 最小连接数
                acquire: 30000, // 连接超时时间 - 30秒
                idle: 10000 // 等待释放空闲时间 - 10秒
            }
        })
    }
}

const closeCon = {
    "mysql": (connection: Connection) => {
        connection = undefined
    }
}

export default Connection