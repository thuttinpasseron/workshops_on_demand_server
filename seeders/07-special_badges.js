module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert(
      'special_badges',
      [
        {
          id: 1,
          badgeImg: 'https://us-central1-grommet-designer.cloudfunctions.net/images/jay-giang-hpe-com/3_workshops_apprentice.jpg',
          title: 'Congratulations on receiving your Apprentice Badge!',
          description: 'You have been awarded the Apprentice Badge for completed 3 workshops.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          badgeImg: 'https://us-central1-grommet-designer.cloudfunctions.net/images/jay-giang-hpe-com/5_workshops_pathfinder.jpg',
          title: 'Congratulations on receiving your Pathfinder Badge!',
          description: 'You have been awarded the Apprentice Badge for completed 5 workshops.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          badgeImg: 'https://us-central1-grommet-designer.cloudfunctions.net/images/jay-giang-hpe-com/7_workshops_squire.jpg',
          title: 'Congratulations on receiving your Squire Badge!',
          description: 'You have been awarded the Apprentice Badge for completed 7 workshops.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          badgeImg: 'https://us-central1-grommet-designer.cloudfunctions.net/images/jay-giang-hpe-com/10_workshops_adventurer.jpg',
          title: 'Congratulations on receiving your Adventurer Badge!',
          description: 'You have been awarded the Apprentice Badge for completed 10 workshops.',
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