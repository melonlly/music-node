import { global } from "melon";
import { Sequelize } from "sequelize-typescript"

class Connection {
    // 数据库类型
    dialect: string
    // 连接配置
    config: any
    // 连接实例（pool）
    connection: any
    // 初始化连接（默认都创建连接池）
    constructor(dialect: string, config: any) {
        this.dialect = dialect
        this.config = config 
        this.connection = undefined
        const getConFn = getCon[dialect]
        if (getConFn) {
            this.connection = getConFn(config)
        }
        if (this.connection) {
            global.logger.info(`${dialect}:连接创建成功！`)
        } else {
            global.logger.info(`${dialect}:连接创建失败！`)
        }
    }
}

const getCon: any = {
    "mysql": ({
        database, user, password, host, port
    }: any) => {
        return new Sequelize(database, user, password, {
            host: host,
            port: port,
            dialect: "mysql",
            storage: ":memory:",
            modelPaths: [`${__dirname}/../../models/impl/tableModels/*.ts`],
            pool: {
                max: 5, // 最大连接数
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