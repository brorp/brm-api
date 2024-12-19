'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = [{
      id: uuid(),
      name: "BRM AGRO",
      phone_number: "(+855) 8127 3458",
      email: "INFO@BRM-AGRO.COM",
      address: "#77, Street 291, Sangkat Boeung Kak 2, Khan Tuol Kouk, Phnom Penh, Cambodia",
      createdAt: new Date(),
      updatedAt: new Date()
    }]
    await queryInterface.bulkInsert("Companies", data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Companies", null, {})
  }
};
