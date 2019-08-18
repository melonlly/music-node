import Model from "./Model"

/**
 * @name TableModel
 * @description 表-实例映射模型
 * @param tableName: string 表名
 */
interface TableModel extends Model {
    tableName: string
}

export default TableModel