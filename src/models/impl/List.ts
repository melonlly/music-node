import Result from "./Result"

/**
 * @name List
 * @description 结果集model - 数组类型 List
 */
class List extends Result {
    status: Number
    msg: string
    data: Array<any>
    constructor() {
        super()
        this.status = 0
        this.msg = "success"
    }
}

export default List