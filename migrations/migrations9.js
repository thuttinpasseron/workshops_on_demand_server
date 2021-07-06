'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "special_badges", deps: []
 *
 **/

var info = {
  revision: '',
  name: 'special-badges',
  created: '2021-06-09T09:25:12.421Z',
  comment: '',
};

var migrationCommands = [
  {
    fn: 'createTable',
    params: [
      'special_badges',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: Sequelize.STRING,
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        badgeImg: Sequelize.STRING,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.TEXT,
      },
      {},
    ],
  },
];

module.exports = {
  pos: 0,
  up: function (queryInterface, Sequelize) {
    var index = this.pos;
    return new Promise(function (resolve, reject) {
      function next() {
        if (index < migrationCommands.length) {
          let command = migrationCommands[index];
          console.log('[#' + index + '] execute: ' + command.fn);
          index++;
          queryInterface[command.fn]
            .apply(queryInterface, command.params)
            .then(next, reject);
        } else resolve();
      }
      next();
    });
  },
  info: info,
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('special_badges');
  },
};