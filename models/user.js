"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Trivia, {
        foreignKey: "UserId",
      });
    }
  }
  User.init(
    {
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: `Nickname is required`,
          },
          notNull: {
            msg: `Nickname is required`,
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: `Email is required`,
          },
          notNull: {
            msg: `Email is required`,
          },
          isEmail: {
            msg: `This field should be an e-mail input`,
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Password is required`,
          },
          notNull: {
            msg: `Password is required`,
          },
          len: {
            min: [5],
            msg: `Password should be more than 5 characters`,
          },
        },
      },
      points: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (instance) => {
          instance.password = hashPassword(instance.password);
        },
      },
    }
  );
  return User;
};
