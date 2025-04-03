import { QueryInterface } from 'sequelize';

export default {
    async up(queryInterface: QueryInterface) {
        await queryInterface.bulkInsert('roles', [
            {
                name: 'Admin',
                created_at: new Date(),
                updated_at: new Date(),
                created_by: 1,
                updated_by: 1,
            },
        ]);
    },

    async down(queryInterface: QueryInterface) {
        await queryInterface.bulkDelete('roles', {
            name: ['Admin'],
        });
    },
};
