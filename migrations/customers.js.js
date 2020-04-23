"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("customers", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      company: Sequelize.STRING,
      workshopList: Sequelize.TEXT,
      startDate: Sequelize.DATE,
      endDate: Sequelize.DATE,
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      lastEmailSent: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("customers");
  }
};
