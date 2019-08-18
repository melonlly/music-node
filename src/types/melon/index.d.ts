// /// <reference types="node" />

import { Logger } from "log4js"
import Connection from "../../utils/Connection"
// import { Context } from "koa"

// declare module "koa" {
//     interface MContext extends Context {
//         logger: Logger
//     }
// }

declare interface Global extends NodeJS.Global {
    logger: Logger
    mysql: Connection
}
declare const global: Global