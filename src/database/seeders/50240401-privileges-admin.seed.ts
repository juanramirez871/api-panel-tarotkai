import { QueryInterface } from 'sequelize';

export default {
    async up(queryInterface: QueryInterface) {
        await queryInterface.bulkInsert('privileges_roles', [
            {
                privilege_id: 30,
                role_id: 1,
                created_by: 1,
                updated_at: 1
            },
            {
                privilege_id: 31,
                role_id: 1,
                created_by: 1,
                updated_at: 1
            },
            {
                privilege_id: 32,
                role_id: 1,
                created_by: 1,
                updated_at: 1
            },
        ]);
    },

    async down(queryInterface: QueryInterface) {
        await queryInterface.bulkDelete('privileges_roles', {
            email: ['admin@admin.com'],
        });
    },
};
