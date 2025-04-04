import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'modules',
  timestamps: false,
})
export class Module extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: false,
  })
  icon: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: false,
  })
  route: string;
}
