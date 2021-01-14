/* eslint-disable */
'use strict';
/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - password
 *          - company
 *          - role
 *          - active
 *        properties:
 *          id:
 *            type: integer
 *          name:
 *            type: string
 *            description: name of the user
 *          email:
 *            type: string
 *            description: email of the user
 *          password:
 *            type: string
 *            description: hash password of the user
 *          company:
 *            type: string
 *            description: company name of the user
 *          role:
 *            type: string
 *            description: role of user either admin or  user
 *          active:
 *            type: boolean
 *            description: User is active or inactive
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
 *           role: admin
 *           active: false
 */
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      company: DataTypes.STRING,
      role: DataTypes.STRING,
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {}
  );
  return User;
};
/* eslint-enable */
