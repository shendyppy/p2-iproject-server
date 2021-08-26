"use strict";

const { hashPassword } = require("../helpers/bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          nickname: "test1",
          email: "test1@mail.com",
          password: hashPassword("test1"),
          points: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nickname: "test2",
          email: "test2@mail.com",
          password: hashPassword("test2"),
          points: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
