module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert(
      'special_badges',
      [
        {
          id: 1,
          badgeImg: 'https://us-central1-grommet-designer.cloudfunctions.net/images/jay-giang-hpe-com/3_workshops_apprentice.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          badgeImg: 'https://us-central1-grommet-designer.cloudfunctions.net/images/jay-giang-hpe-com/5_workshops_pathfinder.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          badgeImg: 'https://us-central1-grommet-designer.cloudfunctions.net/images/jay-giang-hpe-com/7_workshops_squire.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          badgeImg: 'https://us-central1-grommet-designer.cloudfunctions.net/images/jay-giang-hpe-com/10_workshops_adventurer.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {
        returning: true,
      }
    ),

  down: (queryInterface) => queryInterface.bulkDelete('special_badges', null, {}),
};