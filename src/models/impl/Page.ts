import Result from "../Result"

/**
 * @name Page
 * @description 分页结果集model
 * @constructor
 *      code: Number    错误码
 *      msg: String     错误信息
 *      data: any       数据
 *      total: Number   总条数
 *      pages: Number   总页数
 *      index: Number   当前页码
 *      size: Number    每页大小
 */
class Page implements Result {
    status: Number
    msg: string
    data: any
    total: Number
    pages: Number
    index: Number
    size: Number
    constructor(
        status: Number = 0,
        msg: string = "success",
        data: any,
        total: Number = 0,
        pages: Number = 0,
        index: Number = 1,
        size: Number = 10
    ) {
        this.status = 0
        this.msg = "success"
        this.total = 0
        this.pages = 0
        this.index = 1
        this.size = 10
    }
}

export default Page