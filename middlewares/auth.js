const { verifyToken } = require("../helpers/jwt.js");
const { User, Trivia } = require("../models");

async function authentication(req, res, next) {
  try {
    if (!req.headers.access_token) {
      throw {
        name: `CustomError`,
        status: 401,
        message: `Please login first!`,
      };
    }

    const { access_token } = req.headers;
    const payload = verifyToken(access_token);

    if (!payload) {
      throw {
        name: `CustomError`,
        status: 401,
        message: `Please login first!`,
      };
    }

    const { id, nickname } = payload;
    const found = await User.findByPk(id);

    if (!found) {
      throw {
        name: `CustomError`,
        status: 401,
        message: `Please login first!`,
      };
    }

    req.user = { id, nickname };
    next();
  } catch (err) {
    next(err);
  }
}

async function authorization(req, res, next) {
  try {
    const id = req.params.id;
    const UserId = req.user.id;
    const foundTrivia = await Trivia.findByPk(id);

    if (foundTrivia) {
      if (foundTrivia.UserId === UserId) {
        next();
      } else {
        throw {
          name: `CustomError`,
          status: 403,
          message: `Forbidden Error`,
        };
      }
    } else {
      throw {
        name: `CustomError`,
        status: 404,
        message: `Not Found`,
      };
    }
  } catch (err) {
    next(err);
  }
}
module.exports = {
  authentication,
  authorization,
};
