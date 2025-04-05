import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import { User } from './user.model';

@Table({
  tableName: 'customers',
  timestamps: false,
})
export class Customer extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  country: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  city: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  delete: boolean;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: true,
  })
  created_by: number;

  @BelongsTo(() => User, { foreignKey: 'created_by', as: 'creator' })
  created: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  updated_by: number;

  @BelongsTo(() => User, { foreignKey: 'updated_by', as: 'updater' })
  updated: User;
}
