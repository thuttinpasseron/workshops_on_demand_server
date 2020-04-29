const email = process.env.EMAIL_ADDRESS;
module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      "customers",
      [
        {
          name: "pramod",
          email,
          company: "HPE",
          workshopList: ["RedFish API101", "HPE OneView API"],
          startDate: new Date(),
          endDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "reddy",
          email,
          company: "HPE",
          workshopList: ["RedFish API101", "HPE OneView API"],
          startDate: new Date(),
          endDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "sareddy",
          email,
          company: "HPE",
          workshopList: [
            "Discover Grommet an HPE Open Source project to develop apps"
          ],
          startDate: new Date(),
          endDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {
        returning: true
      }
    ),

  down: queryInterface => queryInterface.bulkDelete("customers", null, {})
};
