import { QueryInterface } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface) {
    const privileges = [
      {
        name: 'Modulo de llamadas',
        module_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Crear llamadas',
        module_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Crear clientes',
        module_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },


      {
        name: 'Modulo de reservas',
        module_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Crear reservas',
        module_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Editar reservas',
        module_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Eliminar reservas',
        module_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ver  reservas',
        module_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },


      {
        name: 'Modulo de clientes',
        module_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'ver clientes',
        module_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Editar clientes',
        module_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Eliminar clientes',
        module_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Crear de clientes',
        module_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
  

      {
        name: 'Modulo de metas',
        module_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ver meta anual',
        module_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ver meta mensual',
        module_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ver meta semanal',
        module_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ver metas individuales',
        module_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },


      {
        name: 'Modulo de reportes',
        module_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Descargar excel de reportes',
        module_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ver reportes',
        module_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },


      {
        name: 'Modulo de metricas',
        module_id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ver metricas de llamadas generales',
        module_id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ver metricas de clientes generales',
        module_id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ver metricas de centrales',
        module_id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ver metricas de tarotistas',
        module_id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },


      {
        name: 'Modulo de usuarios',
        module_id: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Modulo de permisos',
        module_id: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Modulo de tipo de llamadas',
        module_id: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },


      {
        name: 'Crear roles',
        module_id: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: ' Eliminar roles',
        module_id: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Modificar privilegios',
        module_id: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      

      {
        name: 'ver usuarios',
        module_id: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'editar usuarios',
        module_id: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: ' Eliminar usuarios',
        module_id: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },


      {
        name: 'Ver tipos de llamadas',
        module_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Editar tipos de llamadas',
        module_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Eliminar tipos de llamadas',
        module_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Crear tipos de llamadas',
        module_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
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
