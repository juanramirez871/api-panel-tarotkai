import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable('modules', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    icon: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: false
    },
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('modules');
}
