'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('projects', [{
         projectname: 'Malam-malam',
         startdate: "2022-08-29",
         enddate:"2023-08-29",
         content: "Malam ini sangat sunyi.",
         has_nodejs: true,
         has_nextjs: true,
         has_reactjs: false,
         has_typescript: false,
         image: "img.jpg",
         dateduration: "3 bulan",
         createdAt: new Date(),
         updatedAt: new Date()
       }], {}); 
      
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
