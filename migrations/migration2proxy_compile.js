'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'customers',
        'proxy',
        {
          type: Sequelize.DataTypes.STRING,
        },
        { transaction }
      );
      await queryInterface.addColumn(
        'workshops',
        'compile',
        {
          type: Sequelize.DataTypes.STRING(1234),
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
      await queryInterface.removeColumn('customers', 'proxy', { transaction });
      await queryInterface.removeColumn('workshops', 'compile', {
        transaction,
      });
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
