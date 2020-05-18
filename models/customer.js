/* eslint-disable */
"use strict";
/**
 * @swagger
 *  components:
 *    schemas:
 *      Customer:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - company
 *        properties:
 *          id:
 *            type: integer
 *          name:
 *            type: string
 *            description: name of the customer
 *          email:
 *            type: string
 *            description: email of the customer
 *          company:
 *            type: string
 *            description: company name of the customer
 *          workshop:
 *            type: string
 *            description: name of workshop registered by the customer
 *          jupyterWorkshop:
 *            type: string
 *            description: name of workshop in jupyterhub registered by the customer
 *          hours:
 *            type: boolean
 *          startDate:
 *            type: string
 *            format: date-time
 *            description: workshop start date
 *          endDate:
 *            type: string
 *            format: date-time
 *            description: workshop end date
 *          active:
 *            type: boolean
 *            description: customer will be active between the workshop start and end date
 *          lastEmailSent:
 *            type: string
 *            description: lastEmailSent can be welcome | credentials |  expiring | expired
 *          createdAt:
 *            type: string
 *            format: date-time
 *          updatedAt:
 *            type: string
 *            format: date-time
 *        example:
 *           name: Alexander
 *           email: fake@email.com
 *           company: someCompany
 *           workshop: Grommet
 *           active: false
 *           lastEmailSent: welcome
 */
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    "customer",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      company: DataTypes.STRING,
      //workshopList: DataTypes.ARRAY(DataTypes.STRING),
      workshop: DataTypes.STRING,
      jupyterWorkshop: DataTypes.STRING,
      hours: DataTypes.INTEGER,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      lastEmailSent: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {}
  );
  Customer.associate = models => {
    Customer.belongsTo(models.student, {
      foreignKey: {
        field: "studentId"
        //allowNull: false,
        // defaultValue: 0
      }
    });
  };
  // Customer.associate = models => {
  //   Customer.belongsTo(models.workshop, {
  //     foreignKey: {
  //       field: "workshopId"
  //       //allowNull: false,
  //       // defaultValue: 0
  //     }
  //   });
  // };
  return Customer;
};
/* eslint-enable */
