import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Module } from './modules.model';
import { Role } from './roles.model';
import { Privilege } from './privileges.model';

@Table({
  tableName: 'privileges_roles',
  timestamps: true,
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
}
