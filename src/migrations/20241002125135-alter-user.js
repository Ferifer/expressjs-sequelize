"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "lastLogin", {
      type: Sequelize.DATE,
      allowNull: true, // Adjust this according to your needs
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "lastLogin");
  },
};
