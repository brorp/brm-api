'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Teams", "is_executive", {
      type: Sequelize.BOOLEAN
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Teams", "is_executive")
  }
};
