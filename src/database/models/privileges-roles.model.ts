import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Module } from './modules.model';
import { Role } from './roles.model';
import { Privilege } from './privileges.model';
import { User } from './user.model';

@Table({
  tableName: 'privileges_roles',
  timestamps: false,
})
export class privilegeRole extends Model {
  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  role_id: number;

  @BelongsTo(() => Role)
  role: Role;

  @ForeignKey(() => Privilege)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  privilege_id: number;

  @BelongsTo(() => Privilege)
  privilege: Privilege;

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
