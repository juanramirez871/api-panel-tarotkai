import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import { Role } from './roles.model';

@Table({
  tableName: 'users',
  timestamps: false,
})
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: true,
  })
  extension: string;

  @Column({
    type: DataType.TINYINT.UNSIGNED,
    allowNull: true,
    unique: false,
  })
  typeWork: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  delete: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  active: boolean;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: true,
  })
  role_id: number;

  @BelongsTo(() => Role)
  role: Role;

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
