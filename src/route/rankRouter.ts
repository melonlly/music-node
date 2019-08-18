import RankController from "../controllers/RankController"
const router = require("koa-router")()
const rankController = new RankController()

import * as passportConfig from "../config/passport" // 权限校验

export default router
    .get("/list/", rankController.rankList)
    .get("/:id/", passportConfig.isAuthenticated, rankController.rankDetail)