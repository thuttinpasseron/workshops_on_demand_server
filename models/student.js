"use strict";
/**
 * @swagger
 *  components:
 *    schemas:
 *      Student:
 *        type: object
 *        required:
 *          - url
 *          - username
 *          - password
 *        properties:
 *          url:
 *            type: string
 *            description: URL for the JupyterHub student, needs to be unique.
 *          username:
 *            type: string
 *            description: username for the JupyterHub student, needs to be unique.
 *          password:
 *            type: string
 *            format: password
 *            description: password for the JupyterHub student.
 *          assigned:
 *            type: boolean
 *            description: By default false and will be true if assigned to a customer.
 *          active:
 *            type: boolean
 *          createdAt:
 *            type: string
 *            format: date-time
 *          updatedAt:
 *            type: string
 *            format: date-time
 *        example:
 *           name: somestudent
 *           email: fake@email.com
 */
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
