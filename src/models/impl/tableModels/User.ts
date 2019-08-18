import TableModel from "../../TableModel"
import { Table, Column, Model, DataType, AllowNull, AutoIncrement, PrimaryKey } from "sequelize-typescript"
import Dao from "../../../dao/Dao";

@Table({
    tableName: "t_user"
})
class User extends Dao implements TableModel {
    tableName: string

    @Column({
        type: DataType.INTEGER
    })
    @AllowNull(false)
    @AutoIncrement
    @PrimaryKey
    id: number

    @Column({
        type: DataType.STRING
    })
    avatar: string

    @Column({
        type: DataType.STRING
    })
    name: string

    @Column({
        type: DataType.STRING
    })
    sex: string

    @Column({
        type: DataType.DATE
    })
    birthday: Date

    @Column({
        type: DataType.STRING
    })
    address: string

    @Column({
        type: DataType.STRING
    })
    description: string

    @Column({
        type: DataType.STRING
    })
    password: string

    @Column({
        type: DataType.STRING
    })
    mobile: string
    
}

export default User