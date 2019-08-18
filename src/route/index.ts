import hotRouter from "./hotRouter"
import recommendRouter from "./recommendRouter"
import rankRouter from "./rankRouter"
import searchRouter from "./searchRouter"
import singerRouter from "./singerRouter"
const router = require("koa-router")()

router.use("/hot", hotRouter.routes())
router.use("/recommend", recommendRouter.routes())
router.use("/rank", rankRouter.routes())
router.use("/search", searchRouter.routes())
router.use("/singer", singerRouter.routes())

export default router