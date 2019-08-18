import SingerController from "../controllers/SingerController"
const router = require("koa-router")()
const singerController = new SingerController()

import * as passportConfig from "../config/passport" // 权限校验

export default router
    .get("/list/", singerController.singerList)
    .get("/:mid/", passportConfig.isAuthenticated, singerController.singerDetail)