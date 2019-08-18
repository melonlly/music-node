import Result from "../Result"

/**
 * @name List
 * @description 结果集model - 数组类型 List
 */
class List implements Result {
    code: Number
    msg: string
    data: Array<any>
    constructor() {
        this.code = 0
        this.msg = "success"
    }
}

export default List