import { QueryInterface } from 'sequelize';

export default {
    async up(queryInterface: QueryInterface) {
        await queryInterface.bulkInsert('users', [
            {
                name: 'Admin User',
                email: 'admin@admin.com',
                extension: 100,
                password: '$2a$12$Qc28DPNbLc/xdfezAx5MpOF6hf/RFx1BJ5o6puDJQXzOJSaFyoeoi',
                role_id: 1,
                typeWork: 3,
                created_at: new Date(),
                updated_at: new Date(),
            },
        ]);
    },

    async down(queryInterface: QueryInterface) {
        await queryInterface.bulkDelete('users', {
            email: ['admin@admin.com'],
        });
    },
};
