const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const { User } = require("../models");
const { signToken } = require("../helpers/jwt");

class GoogleAuthController {
  static async getAuthGoogle(req, res, next) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: req.body.id_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const { email } = ticket.getPayload();

      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          nickname: email,
          email,
          points: 0,
        },
      });

      const access_token = signToken({
        id: user.id,
        nickname: user.nickname,
        email: user.email,
        points: 0,
        isGoogle: true,
      });

      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = GoogleAuthController;
