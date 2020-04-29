"use strict";
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    "student",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      url: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      assigned: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {}
  );

  // Student.associate = models => {
  //   Student.belongsTo(models.customer, {
  //     foreignKey: {
  //       field: "customerId",
  //       allowNull: false
  //     }
  //   });
  // };
  return Student;
};
