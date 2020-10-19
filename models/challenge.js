"use strict";
/**
 * @swagger
 *  components:
 *    schemas:
 *      Challenge:
 *        type: object
 *        required:
 *          - name
 *          - jupyterName
 *          - capacity
 *        properties:
 *          id:
 *            type: integer
 *          name:
 *            type: string
 *          notebook:
 *            type: string
 *          description:
 *            type: string
 *          capacity:
 *            type: integer
 *          range:
 *            type: array
 *          sessionId:
 *            type: integer
 *          sessionType:
 *            type: string
 *          location:
 *            type: string
 *          avatar:
 *            type: string
 *          role:
 *            type: string
 *          preRequisite:
 *            type: string
 *          replayLink:
 *            type: string
 *          active:
 *            type: boolean
 *          createdAt:
 *            type: string
 *            format: date-time
 *          updatedAt:
 *            type: string
 *            format: date-time
 *        example:
 *           name: Grommet
 *           capacity: 20
 *           jupyterName: CHLG-Grommet
 */
module.exports = (sequelize, DataTypes) => {
  const Challenge = sequelize.define(
    "challenge",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      notebook: DataTypes.STRING,
      description: DataTypes.TEXT,
      capacity: DataTypes.INTEGER,
      range: DataTypes.ARRAY(DataTypes.INTEGER),
      sessionId: DataTypes.INTEGER,
      sessionType: DataTypes.STRING,
      location: DataTypes.STRING,
      avatar: DataTypes.STRING,
      role: DataTypes.STRING,
      preRequisite: DataTypes.TEXT,
      replayLink: DataTypes.STRING,
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
  Challenge.associate = function(models) {
    // associations can be defined here
  };
  return Challenge;
};
