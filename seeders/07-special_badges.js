module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert(
      'special_badges',
      [
        {
          id: 0,
          badgeImg: 'https://us-central1-grommet-designer.cloudfunctions.net/images/jay-giang-hpe-com/explorer.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 1,
          badgeImg: 'https://us-central1-grommet-designer.cloudfunctions.net/images/jay-giang-hpe-com/expert.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          badgeImg: 'https://us-central1-grommet-designer.cloudfunctions.net/images/jay-giang-hpe-com/star.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          badgeImg: 'https://us-central1-grommet-designer.cloudfunctions.net/images/jay-giang-hpe-com/superstar.jpg',
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