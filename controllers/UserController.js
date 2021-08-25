const { checkPassword } = require("../helpers/bcrypt");
const { signToken, verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static async getUserInfo(req, res, next) {
    try {
      const { access_token } = req.headers;
      const payload = verifyToken(access_token);

      const { id, nickname, points } = payload;

      res.status(200).json({ id, nickname, points });
    } catch (err) {
      next(err);
    }
  }

  static async register(req, res, next) {
    try {
      const data = {
        nickname: req.body.nickname,
        email: req.body.email,
        password: req.body.password,
        points: 0,
      };

      const output = await User.create(data);
      res.status(201).json({
        id: output.id,
        nickname: output.nickname,
        points: 0,
      });
    } catch (err) {
      next(err);
    }
  }
  static async login(req, res, next) {
    try {
      const data = {
        email: req.body.email,
        password: req.body.password,
      };
      const found = await User.findOne({
        where: {
          email: data.email,
        },
      });
      if (!found) {
        throw {
          name: `CustomError`,
          status: 401,
          message: `Wrong Input For Your Email/Password`,
        };
      }

      const verified = checkPassword(data.password, found.password);

      if (!verified) {
        throw {
          name: `CustomError`,
          status: 401,
          message: `Wrong Input For Your Email/Password`,
        };
      }

      const access_token = signToken({
        id: found.id,
        nickname: found.nickname,
        points: found.points,
      });
      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
