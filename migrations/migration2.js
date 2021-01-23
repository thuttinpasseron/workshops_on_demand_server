'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "workshops", deps: []
 * createTable "students", deps: []
 * createTable "customers", deps: []
 *
 **/

var info = {
  revision: 2,
  name: 'test',
  created: '2021-01-20T02:31:23.794Z',
  comment: '',
};

var migrationCommands = [
  {
    fn: 'createTable',
    params: [
      'users',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        username: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
        roleId: {
          type: Sequelize.INTEGER,
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION',
          references: {
            model: 'users',
            key: 'id',
          },
          // allowNull: false,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      },
      {},
    ],
  },
  {
    fn: 'createTable',
    params: [
      'roles',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: Sequelize.STRING,
        userId: {
          type: Sequelize.INTEGER,
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION',
          references: {
            model: 'roles',
            key: 'id',
          },
          // allowNull: false,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
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
};
