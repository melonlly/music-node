const handler = async (ctx: any, next: Function) => {

    try {
        ctx.error = (code: any = 500, message: string = "服务器错误") => {
            if (typeof code === "string") {
                message = code
                code = 500
            }
            ctx.logger.error(code, message)
            ctx.throw(code, message)
        }

        await next()
    } catch (error) {
        ctx.body = {
            status: error.status,
            message: error.message
        }
        
        // 异常情况下，需要手动触发 error 事件
        ctx.app.emit("error", error, ctx)
    }

}

export default handler