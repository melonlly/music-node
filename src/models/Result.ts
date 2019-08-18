import Model from "./Model"

/**
 * @name Result
 * @description 结果集类型
 * @param code: Number  错误码
 * @param msg: String   错误信息
 * @param data: any     数据
 */
interface Result extends Model {
    code: Number
    msg: string
    data: any
}

export default Result