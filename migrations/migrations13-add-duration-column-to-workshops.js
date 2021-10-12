'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'workshops',
        'duration',
        {
          type: Sequelize.DataTypes.INTEGER,
          defaultValue: 4
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
      await queryInterface.removeColumn('workshops', 'duration', { transaction });
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
