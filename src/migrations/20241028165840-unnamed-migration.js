"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "roleId", {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: "Role",
        key: "id", //
      },
      onUpdate: "CASCADE", // Optional: What to do when the referenced role is updated
      onDelete: "SET NULL", // Optional: What to do when the referenced role is deleted
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "roleId");
  },
};
