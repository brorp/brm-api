'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Blogs', 'meta_description', {
      type: Sequelize.TEXT,
      allowNull: true, // Set this to false if the column should not allow nulls
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Blogs', 'meta_description', {
      type: Sequelize.STRING,
      allowNull: true, // Match the previous `allowNull` state
    });
  }
};
