import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { User } from './user.model';

@Table({
  tableName: 'roles',
  timestamps: false,
})
export class Role extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  created_by: number;

  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  updated_by: number;

  @HasMany(() => User)
  users: User[];
}
