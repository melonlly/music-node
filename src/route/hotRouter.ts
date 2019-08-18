import HotController from "../controllers/HotController"
const router = require("koa-router")()
const hotController = new HotController()

export default router
    .get("/song/", hotController.songList)
    .get("/key/", hotController.getHotKeys)