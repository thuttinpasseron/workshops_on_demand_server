/* eslint-disable */
'use strict';
/**
 * @swagger
 *  components:
 *    schemas:
 *      Replay:
 *        type: object
 *        required:
 *          - avatar
 *          - title
 *          - desc
 *          - presenter
 *          - role
 *          - videoLink
 *        properties:
 *          id:
 *            type: integer
 *          avatar: 
 *            type: string
 *          title:
 *            type: string
 *            description: replay title
 *          desc:
 *            type: string
 *          presenter:
 *            type: string
 *          role:
 *            type: string
 *          videoLink: 
 *            type: string
 *          createdAt:
 *            type: string
 *            format: date-time
 *          updatedAt:
 *            type: string
 *            format: date-time
 *        example:
 *           avatar: /img/SpeakerImages/Denis.png
 *           title: Intro to the HPE Ezmeral Container Platform REST API
 *           desc: Calling all developers, data analysts and IT architects. Learn how to interact with the HPE Ezmeral Container Platform programmatically through its REST API. In this hands-on workshop, you'll learn how to perform authentication, deploy distributed multi-mode applications for AI/ML and data analytics and interpret/respond to REST API calls. We'll walk you through, step by step, and, by the end of the session, you'll be deploying a TensorFlow application framework and other simple applications. No previous programming experience required.
 *           presenter: Denis Choukroun
 *           role: Cloud Solution Architect
 *           videoLink: https://vimeo.com/445302013
 */
module.exports = (sequelize, DataTypes) => {
  const Replay = sequelize.define(
    'replays',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      avatar: DataTypes.STRING,
      title: DataTypes.STRING,
      desc: DataTypes.TEXT,
      presenter: DataTypes.STRING,
      role: DataTypes.STRING,
      videoLink: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {}
  );
  return Replay;
};

/* eslint-enable */
