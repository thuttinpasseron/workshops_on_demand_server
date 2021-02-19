// import dotenv from "dotenv";
// dotenv.config();
// const N = process.env.NO_OF_STUDENT_ACCOUNTS;
const N = 2000;

module.exports = {
  up: (queryInterface) => {
    const arr = [...Array(N + 1).keys()].slice(1);
    const entries1 = arr.map((key) => ({
      createdAt: new Date(),
      updatedAt: new Date(),
      //   customerId: 0,
      url: `https://notebooks3.hpedev.io/user/student${key}/lab?`,
      username: `student${key}`,
      password: 'MyNewPassword',
      location: 'mougins',
    }));

    const arr2 = [...Array(N + 1).keys()].slice(1);
    const entries2 = arr2.map((key) => ({
      createdAt: new Date(),
      updatedAt: new Date(),
      //   customerId: 0,
      url: `https://notebooks2.hpedev.io/user/student${key}/lab?`,
      username: `student${key}`,
      password: 'MyNewPassword',
      location: 'grenoble',
    }));

    const arr3 = [...Array(N + 1).keys()].slice(1);
    const entries3 = arr3.map((key) => ({
      createdAt: new Date(),
      updatedAt: new Date(),
      //   customerId: 0,
      url: `https://notebooks4.hpedev.io/user/student${key}/lab?`,
      username: `student${key}`,
      password: 'MyNewPassword',
      location: 'greenlake',
    }));

    let entries = [...entries1, ...entries2, ...entries3];

    return queryInterface.bulkInsert('students', entries, { returning: true });
  },
  down: (queryInterface) => queryInterface.bulkDelete('students', null, {}),
};
