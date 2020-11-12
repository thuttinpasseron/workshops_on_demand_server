"use strict";

var Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable "workshops", deps: []
 * createTable "students", deps: []
 * createTable "customers", deps: []
 *
 **/

var info = {
  revision: 1,
  name: "test",
  created: "2020-04-24T02:31:23.794Z",
  comment: "",
};

var migrationCommands = [
  {
    fn: "createTable",
    params: [
      "workshops",
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
        },
        notebook: {
          type: Sequelize.STRING,
        },
        description: {
          type: Sequelize.TEXT,
        },
        active: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        capacity: {
          type: Sequelize.INTEGER,
        },
        priority: {
          type: Sequelize.INTEGER,
        },
        range: {
          type: Sequelize.ARRAY(Sequelize.INTEGER),
        },
        reset: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        ldap: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        sessionId: {
          type: Sequelize.INTEGER,
        },
        sessionType: {
          type: Sequelize.STRING,
        },
        location: {
          type: Sequelize.STRING,
        },
        avatar: {
          type: Sequelize.STRING,
        },
        role: {
          type: Sequelize.STRING,
        },
        preRequisite: {
          type: Sequelize.TEXT,
        },
        replayLink: {
          type: Sequelize.TEXT,
        },
        createdAt: {
          type: Sequelize.DATE,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {},
    ],
  },
  {
    fn: "createTable",
    params: [
      "challenges",
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
        },
        notebook: {
          type: Sequelize.STRING,
        },
        description: {
          type: Sequelize.TEXT,
        },
        active: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        capacity: {
          type: Sequelize.INTEGER,
        },
        range: {
          type: Sequelize.ARRAY(Sequelize.INTEGER),
        },
        sessionId: {
          type: Sequelize.INTEGER,
        },
        sessionType: {
          type: Sequelize.STRING,
        },
        location: {
          type: Sequelize.STRING,
        },
        avatar: {
          type: Sequelize.STRING,
        },
        role: {
          type: Sequelize.STRING,
        },
        preRequisite: {
          type: Sequelize.TEXT,
        },
        replayLink: {
          type: Sequelize.TEXT,
        },
        createdAt: {
          type: Sequelize.DATE,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {},
    ],
  },
  {
    fn: "createTable",
    params: [
      "students",
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        url: Sequelize.STRING,
        username: Sequelize.STRING,
        password: Sequelize.STRING,
        assigned: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        location: Sequelize.STRING,
        createdAt: {
          type: Sequelize.DATE,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {},
    ],
  },
  {
    fn: "createTable",
    params: [
      "customers",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        company: Sequelize.STRING,
        //workshopList: Sequelize.ARRAY(Sequelize.STRING),
        sessionName: Sequelize.STRING,
        sessionType: Sequelize.STRING,
        location: Sequelize.STRING,
        notebook: {
          type: Sequelize.STRING,
        },
        hours: Sequelize.INTEGER,
        startDate: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        endDate: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        active: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        lastEmailSent: Sequelize.STRING,
        studentId: {
          type: Sequelize.INTEGER,
          onUpdate: "NO ACTION",
          onDelete: "NO ACTION",
          references: {
            model: "students",
            key: "id",
          },
          //   allowNull: false,
          //   defaultValue: 0
        },
        // workshopId: {
        //   type: Sequelize.INTEGER,
        //   onUpdate: "NO ACTION",
        //   onDelete: "NO ACTION",
        //   references: {
        //     model: "workshops",
        //     key: "id"
        //   }
        //   //   allowNull: false,
        //   //   defaultValue: 0
        // },
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
          console.log("[#" + index + "] execute: " + command.fn);
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
