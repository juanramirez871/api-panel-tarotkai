import { QueryInterface } from 'sequelize';

const ModulesWithSubmodules = [
    { name: 'llamadas', icon: 'Phone' },
    { name: 'reservas', icon: 'MessageBox' },
    { name: 'clientes', icon: 'User' },
    { name: 'metas', icon: 'Star' },
    { name: 'reportes', icon: 'Document' },
    { name: 'metricas', icon: 'Histogram' },
    { name: 'configuracion', icon: 'setting' },
    { name: 'configuracion_permisos', icon: 'Lock' },
    { name: 'configuracion_usuarios', icon: 'User' },
    { name: 'configuracion_tipo_de_llamada', icon: 'Iphone' },
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
