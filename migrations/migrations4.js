'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'workshops',
        'varpass',
        {
          type: Sequelize.DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
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
return queryInterface.createTable('workshops', { id: Sequelize.INTEGER });
*/
  },
  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('workshops', 'varpass', {
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
return queryInterface.dropTable('workshops');
*/
  },
};
