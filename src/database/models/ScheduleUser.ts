import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { User } from './user.model';

@Table({
    tableName: 'schedule_user',
    timestamps: false,
})
export class ScheduleUser extends Model {

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false,
    })
    user_id: number;

    @BelongsTo(() => User)
    user: User;

    @Column({
        type: DataType.TIME,
        allowNull: true,
        unique: false,
    })
    start_hour: string;

    @Column({
        type: DataType.TIME,
        allowNull: true,
        unique: false,
    })
    end_hour: string;

    @Column({
        type: DataType.NUMBER,
        allowNull: true,
    })
    day: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false,
    })
    created_by: number;

    @BelongsTo(() => User)
    created: User;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false,
    })
    updated_by: number;

    @BelongsTo(() => User)
    updated: User;
}
