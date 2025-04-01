import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'roles',
  timestamps: true,
})
export class Role extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;
}
