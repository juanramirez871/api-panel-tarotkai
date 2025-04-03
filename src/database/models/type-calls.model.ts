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
  tableName: 'type_calls',
  timestamps: false,
})
export class TypeCall extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: false,
  })
  description: string;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
    unique: false,
  })
  free_time: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  delete: boolean;

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
