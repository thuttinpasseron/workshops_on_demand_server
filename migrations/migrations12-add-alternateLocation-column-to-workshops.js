'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'workshops',
        'alternateLocation',
        {
          type: Sequelize.DataTypes.ARRAY(Sequelize.TEXT),
        },
        { transaction }
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
    /*
Add altering commands here.
Return a promise to correctly handle asynchronicity.
Example:
return queryInterface.createTable('users', { id: Sequelize.INTEGER });
*/
  },
  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('workshops', 'alternateLocation', { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
    /*
Add reverting commands here.
Return a promise to correctly handle asynchronicity.
Example:
return queryInterface.dropTable('users');
*/
  },
};
