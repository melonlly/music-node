import RecommendController from "../controllers/RecommendController"
const router = require("koa-router")()
const recommendController = new RecommendController()

// import * as passportConfig from "../config/passport" // 权限校验

export default router
    .get("/nav/", recommendController.navPics)
    // .get("/nav/", passportConfig.isAuthenticated, recommendController.navPics)