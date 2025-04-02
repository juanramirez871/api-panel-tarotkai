import {
  Table,
  Column,
  Model,
  DataType,
} from 'sequelize-typescript';

@Table({
  tableName: 'type_calls',
  timestamps: true,
})
export class TypeCall extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
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
}
