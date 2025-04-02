import { QueryInterface } from 'sequelize';

const ModulesWithSubmodules = {
    CALLS: 'llamadas',
    REPORTS: 'reportes',
    GOALS: 'metas',
    METRICS: 'metricas',
    RESERVATIONS: 'reservas',
    CLIENTS: 'clientes',
    CONFIGURATION_USERS: 'configuracion_usuarios',
    CONFIGURATION_PERMISSIONS: 'configuracion_permisos',
    CONFIGURATION_CALL_TYPE: 'configuracion_tipo_de_llamada',
}

export default {
    async up(queryInterface: QueryInterface) {
        const modules = Object.values(ModulesWithSubmodules).map((name) => ({
            name,
            createdAt: new Date(),
            updatedAt: new Date(),
        }));

        await queryInterface.bulkInsert('modules', modules);
    },

    async down(queryInterface: QueryInterface) {
        await queryInterface.bulkDelete('modules', {
            name: Object.values(ModulesWithSubmodules),
        });
    },
};
