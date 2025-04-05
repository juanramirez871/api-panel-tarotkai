import { QueryInterface, DataTypes, Sequelize } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable('schedule_user', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      }
    },
    start_hour: {
      type: DataTypes.TIME,
      allowNull: true,
      unique: false,
    },
    end_hour: {
      type: DataTypes.TIME,
      allowNull: true,
      unique: false,
    },
    day: {
      type: DataTypes.TINYINT,
      allowNull: true,
      unique: false,
      comment: "1 = lunes, 2 = martes, 3 = miercoles, 4 = jueves, 5 = viernes, 6 = sabado, 7 = domingo"
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
      allowNull: false,
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
    ALTER TABLE schedule_user 
    MODIFY updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
  `);
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('schedule_user');
}
