const getDates = () => {
  const startDate = new Date();
  const endDate = new Date();
  //start.setDate(start.getDate() - 9 + key);
  endDate.setHours(endDate.getHours() + 4);
  return { startDate, endDate };
};
module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      "customers",
      [
        {
          name: "pramod sareddy",
          email: "abc@hpe.com",
          company: "HPE",
          // workshopList: [
          //   "Discover Grommet an HPE Open Source project to develop apps"
          // ],
          ...getDates(),
          sessionName:
            "Discover Grommet an HPE Open Source project to develop apps",
          location: "",
          sessionType: "",
          hours: 4,
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
