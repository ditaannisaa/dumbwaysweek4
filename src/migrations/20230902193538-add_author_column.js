'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'projects', // table name
      'author', // new field name
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
  )},

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('projects', 'author')
  }
}
