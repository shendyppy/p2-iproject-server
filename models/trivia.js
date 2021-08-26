"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Trivia extends Model {
    static associate(models) {
      Trivia.belongsTo(models.User, {
        foreignKey: "UserId",
      });
    }
  }
  Trivia.init(
    {
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Category can not be empty`,
          },
          notNull: {
            msg: `Category can not be empty`,
          },
        },
      },
      correct_answer: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Correct answer can not be empty`,
          },
          notNull: {
            msg: `Correct answer can not be empty`,
          },
        },
      },
      difficulty: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Difficulty can not be empty`,
          },
          notNull: {
            msg: `Difficulty can not be empty`,
          },
        },
      },
      question: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Question can not be empty`,
          },
          notNull: {
            msg: `Question can not be empty`,
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `UserId can not be empty`,
          },
          notNull: {
            msg: `UserId can not be empty`,
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Trivia",
    }
  );
  return Trivia;
};
