import { QueryInterface } from 'sequelize';

const ModulesWithSubmodules = [
    { name: 'llamadas', icon: 'Phone', route: "calls" },
    { name: 'reservas', icon: 'MessageBox', route: "reservations" },
    { name: 'clientes', icon: 'User', route: "" },
    { name: 'metas', icon: 'Star', route: "goals" },
    { name: 'reportes', icon: 'Document', route: "reports" },
    { name: 'metricas', icon: 'Histogram', route: "metrics" },
    { name: 'configuracion', icon: 'setting', route: "configuration" },
    { name: 'configuracion_permisos', icon: 'Lock', route: "privileges" },
    { name: 'configuracion_usuarios', icon: 'User', route: "users" },
    { name: 'configuracion_tipo_de_llamada', icon: 'Iphone', route: "type-calls" },
];

export default {
    async up(queryInterface: QueryInterface) {
        await queryInterface.bulkInsert('modules', ModulesWithSubmodules);
    },

    async down(queryInterface: QueryInterface) {
        await queryInterface.bulkDelete('modules', {
            name: ModulesWithSubmodules.map(m => m.name),
        });
    },
};
