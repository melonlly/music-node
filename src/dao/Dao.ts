import { Model } from "sequelize-typescript";

/**
 * 基础Dao
 *      增删改查
 */
class Dao<M = Model> extends Model<M> {

    // 插入
    insert(where: any) {
        Dao
            .findOrCreate({ where })
            .then(([result, created]: [any, boolean]) => {
                if (created) {
                    // 新创建

                } else {
                    // 已存在

                }
            })
    }

    // 修改
    update(where: any, update: any) {
        Dao
            .update(update, { where })
            .then((ok: any) => {
                console.log(ok)
            }).catch((err: any) => {
                console.log(err)
            })

    }

    // 删除
    delete(where: any) {
        Dao
            .destroy({ where })
            .then((ok: any) => {
                console.log(ok)
            }).catch((err: any) => {
                console.log(err)
            })
    }

    // 查询
    query(where: any) {
        
    }

}

export default Dao