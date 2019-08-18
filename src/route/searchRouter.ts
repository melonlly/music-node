import SearchController from "../controllers/SearchController"
const router = require("koa-router")()
const searchController = new SearchController()

export default router
    .get("/searchList/", searchController.search)