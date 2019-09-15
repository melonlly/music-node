import TableModel from "../../TableModel"
import { Table, Column, Model, DataType } from "sequelize-typescript"

@Table({
    tableName: "t_user",
    timestamps: false
})
class User extends Model<User> implements TableModel {
    tableName: string

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    })
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