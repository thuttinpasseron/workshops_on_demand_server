"use strict";
module.exports = (sequelize, DataTypes) => {
  const Workshop = sequelize.define(
    "Workshop",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
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
