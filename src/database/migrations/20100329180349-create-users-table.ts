import { QueryInterface, DataTypes, Sequelize } from 'sequelize';

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
      allowNull: true,
      unique: true,
    },
    extension: {
      type: DataTypes.STRING(10),
      allowNull: true,
      unique: true,
    },
    typeWork: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: true,
      unique: false,
      defaultValue: 3,
      comment: "1 = central, 2 = tarotista, 3 = otro"
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: false,
    },
    role_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'roles',
        key: 'id',
      },
    },
    delete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      unique: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    created_by: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    updated_by: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  });

  await queryInterface.sequelize.query(`
    ALTER TABLE users 
    MODIFY updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
  `);

  await queryInterface.addIndex('users', ['email'], {
    unique: true,
    name: 'users_email_unique_index',
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeIndex('users', 'users_email_unique_index');
  await queryInterface.dropTable('users');
}
