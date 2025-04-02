import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Module } from './modules.model';

@Table({
  tableName: 'privileges',
  timestamps: false,
})
export class Privilege extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @ForeignKey(() => Module)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  module_id: number;

  @BelongsTo(() => Module)
  module: Module;
}
