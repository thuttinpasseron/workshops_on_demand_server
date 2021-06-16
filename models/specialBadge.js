/* eslint-disable */
'use strict';
// /**
//  * @swagger
//  *  components:
//  *    schemas:
//  *      SpecialBadge:
//  *        type: object
//  *        required:
//  *          - badgeImg
//  *        properties:
//  *          id:
//  *            type: integer
//  *          badgeImg: 
//  *            type: string
//  *          createdAt:
//  *            type: string
//  *            format: date-time
//  *          updatedAt:
//  *            type: string
//  *            format: date-time
//  *        example:
//  *           avatar: https://us-central1-grommet-designer.cloudfunctions.net/images/jay-giang-hpe-com/explorer.jpg
//  */
module.exports = (sequelize, DataTypes) => {
  const SpecialBadge = sequelize.define(
    'special_badge',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      badgeImg: DataTypes.STRING
    },
    {}
  );
  return SpecialBadge;
};

/* eslint-enable */
