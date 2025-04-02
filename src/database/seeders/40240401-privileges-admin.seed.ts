import { QueryInterface } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface) {
    const privileges = [
      {
        name: 'Modulo de llamadas',
        module_id: 1,
      },
      {
        name: 'Crear llamadas',
        module_id: 1,
      },
      {
        name: 'Crear clientes',
        module_id: 1,
      },


      {
        name: 'Modulo de reservas',
        module_id: 2,
      },
      {
        name: 'Crear reservas',
        module_id: 2,
      },
      {
        name: 'Editar reservas',
        module_id: 2,
      },
      {
        name: 'Eliminar reservas',
        module_id: 2,
      },
      {
        name: 'Ver  reservas',
        module_id: 2,
      },


      {
        name: 'Modulo de clientes',
        module_id: 3,
      },
      {
        name: 'ver clientes',
        module_id: 3,
      },
      {
        name: 'Editar clientes',
        module_id: 3,
      },
      {
        name: 'Eliminar clientes',
        module_id: 3,
      },
      {
        name: 'Crear de clientes',
        module_id: 3,
      },


      {
        name: 'Modulo de metas',
        module_id: 4,
      },
      {
        name: 'Ver meta anual',
        module_id: 4,
      },
      {
        name: 'Ver meta mensual',
        module_id: 4,
      },
      {
        name: 'Ver meta semanal',
        module_id: 4,
      },
      {
        name: 'Ver metas individuales',
        module_id: 4,
      },


      {
        name: 'Modulo de reportes',
        module_id: 5,
      },
      {
        name: 'Descargar excel de reportes',
        module_id: 5,
      },
      {
        name: 'Ver reportes',
        module_id: 5,
      },


      {
        name: 'Modulo de metricas',
        module_id: 6,
      },
      {
        name: 'Ver metricas de llamadas generales',
        module_id: 6,
      },
      {
        name: 'Ver metricas de clientes generales',
        module_id: 6,
      },
      {
        name: 'Ver metricas de centrales',
        module_id: 6,
      },
      {
        name: 'Ver metricas de tarotistas',
        module_id: 6,
      },


      {
        name: 'Modulo de usuarios',
        module_id: 7,
      },
      {
        name: 'Modulo de permisos',
        module_id: 7,
      },
      {
        name: 'Modulo de tipo de llamadas',
        module_id: 7,
      },


      {
        name: 'Crear roles',
        module_id: 8,
      },
      {
        name: ' Eliminar roles',
        module_id: 8,
      },
      {
        name: 'Modificar privilegios',
        module_id: 8,
      },


      {
        name: 'ver usuarios',
        module_id: 9,
      },
      {
        name: 'editar usuarios',
        module_id: 9,
      },
      {
        name: ' Eliminar usuarios',
        module_id: 9,
      },


      {
        name: 'Ver tipos de llamadas',
        module_id: 10,
      },
      {
        name: 'Editar tipos de llamadas',
        module_id: 10,
      },
      {
        name: 'Eliminar tipos de llamadas',
        module_id: 10,
      },
      {
        name: 'Crear tipos de llamadas',
        module_id: 10,
      },
    ];

    await queryInterface.bulkInsert('privileges', privileges);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('privileges', {
      name: ['Editar usuario', 'Ver reportes', 'Gestionar reservas'],
    });
  },
};
