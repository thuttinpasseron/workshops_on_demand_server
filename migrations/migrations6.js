/**
 * Actions summary:
 *
 * updateTable "students", deps: []
 *
 **/
var info = {
  revision: '',
  name: 'add students for greenlake',
  created: '2021-05-10T09:25:12.421Z',
  comment: '',
};
const N = 2000;
module.exports = {
  up: (queryInterface) => {
    const arr3 = [...Array(N + 1).keys()].slice(1);
    const entries3 = arr3.map((key) => ({
      createdAt: new Date(),
      updatedAt: new Date(),
      // customerId: 0,
      url: `https://notebooks4.hpedev.io/user/student${key}/lab?`,
      username: `student${key}`,
      password: 'MyNewPassword',
      location: 'greenlake',
    }));
    let entries = [...entries3];
    return queryInterface.bulkInsert('students', entries, { returning: true });
  },
  down: (queryInterface) => queryInterface.bulkDelete('students', null, {}),
};
