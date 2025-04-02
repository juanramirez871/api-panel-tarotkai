import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable('users', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    extension: {
      type: DataTypes.STRING(10),
      allowNull: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: false,
    },
    role_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'id',
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  await queryInterface.addIndex('users', ['email'], {
    unique: true,
    name: 'users_email_unique_index',
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeIndex('users', 'users_email_unique_index');
  await queryInterface.dropTable('users');
}
