'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      projectname: {
        allowNull: false,
        type: Sequelize.STRING
      },
      startdate: {
        allowNull: false,
        type: Sequelize.STRING
      },
      enddate: {
        allowNull: false,
        type: Sequelize.STRING
      },
      content: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      has_nodejs: {
        type: Sequelize.BOOLEAN
      },
      has_nextjs: {
        type: Sequelize.BOOLEAN
      },
      has_reactjs: {
        type: Sequelize.BOOLEAN
      },
      has_typescript: {
        type: Sequelize.BOOLEAN
      },
      image: {
        type: Sequelize.STRING
      },
      dateduration: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('projects');
  }
};