import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable('privileges_roles', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    privilege_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'privileges',
        key: 'id',
      },
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

  await queryInterface.addConstraint('privileges_roles', {
    fields: ['role_id', 'privilege_id'],
    type: 'unique',
    name: 'unique_role_privilege',
  })
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('privileges_roles');
}
