'use strict';
/** @type {import('sequelize-cli').Migration} */
const {uuid} = require('uuidv4')
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = [{
      id: uuid(),
      title: "News",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id: uuid(),
      title: "Sustainability",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id: uuid(),
      title: "Economy",
      createdAt: new Date(),
      updatedAt: new Date()
    }]
    await queryInterface.bulkInsert("Categories", data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {})
  }
};
