"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("challenges", [
      {
        name: "The Container Challenge",
        notebook: "TheContainerChallenge",
        description:
          "This challenge is undoubtedly the most complicated one as it's an end-to-end developer experience. Your mission here will be to build a Grommet sample app (or reuse the one from the Grommet Challenge), package it in a container, and then run that container in a Kubernetes Cluster. This challenge touches on several technologies, such as front-end web application design, Docker containers and Kubernetes. Be ready for an intense moment when all the pieces of the puzzle will suddenly make total sense.",
        capacity: 20,
        range: [1, 20],
        sessionType: "Coding Challenge",
        location: "grenoble",
        preRequisite: "WKSHP-HPECP-API, WKSHP-API101, WKSHP-GIT101",
        active: false,
        replayLink: "/replays/0",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "The Redfish Challenge",
        notebook: "TheRedfishChallenge",
        description:
          "Your mission here will be to write the smallest possible program (in terms of number of Redfish API calls) that retrieves the complete Device Inventory list from an HPE iLO 5, and to display the following properties for each device: Location, Product Name, Firmware Version (if applicable) and Status. Remember, you only have so much time. Be quick and be sharp!",
        capacity: 20,
        range: [76, 95],
        sessionType: "Coding Challenge",
        location: "grenoble",
        preRequisite: "WKSHP-API101, WKSHP-GIT101",
        active: false,
        replayLink: "/replays/10",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "The HPE OneView Challenge",
        notebook: "TheHPEOneViewChallenge",
        description:
          "Your mission, should you choose to accept it, is to implement vSphere VSAN on an HPE Synergy Composable Infrastructure. You will be asked to prepare a server profile template according to published best practices, and do it in a scripted way so that you can deploy it across your enterprise in different datacenters and different Synergy environments.",
        capacity: 20,
        range: [151, 170],
        sessionType: "Coding Challenge",
        location: "grenoble",
        preRequisite: "WKSHP-API101, WKSHP-GIT101",
        active: false,
        replayLink: "/replays/8",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        name: "The Grommet Challenge",
        notebook: "TheGrommetChallenge",
        description:
          "A new mission awaits! In this challenge, you will take on a UX designer persona and show your creative side using Grommet to design your own little web app UI. You will start with the Grommet Designer, generate code from your design, push that code to GitHub, and finally deploy the app on Netlify. Beginner through expert designers and developers are all welcome. This challenge is all about unleashing your creativity!",
        capacity: 20,
        range: [526, 545],
        sessionType: "Coding Challenge",
        location: "grenoble",
        preRequisite: "WKSHP-GIT101",
        active: false,
        replayLink: "/replays/7",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Workshops", null, {});
  }
};
