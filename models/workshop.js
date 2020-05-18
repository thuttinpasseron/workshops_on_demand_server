"use strict";
/**
 * @swagger
 *  components:
 *    schemas:
 *      Workshop:
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
 *          jupyterName:
 *            type: string
 *          description:
 *            type: string
 *          capacity:
 *            type: integer
 *          preRequisite:
 *            type: string
 *          replayAvailable:
 *            type: boolean
 *          videoUrl:
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
 *           jupyterName: WKSHP-Grommet
 */
module.exports = (sequelize, DataTypes) => {
  const Workshop = sequelize.define(
    "workshop",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      jupyterName: DataTypes.STRING,
      description: DataTypes.TEXT,
      capacity: DataTypes.INTEGER,
      preRequisite: DataTypes.TEXT,
      replayAvailable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      videoUrl: DataTypes.TEXT,
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
  Workshop.associate = function(models) {
    // associations can be defined here
  };
  return Workshop;
};
