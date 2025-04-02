import { QueryInterface } from 'sequelize';

const ModulesWithSubmodules = {
    CALLS: 'llamadas',
    RESERVATIONS: 'reservas',
    CLIENTS: 'clientes',
    GOALS: 'metas',
    REPORTS: 'reportes',
    METRICS: 'metricas',
    CONFIGURATION: 'configuracion',
    CONFIGURATION_PERMISSIONS: 'configuracion_permisos',
    CONFIGURATION_USERS: 'configuracion_usuarios',
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
