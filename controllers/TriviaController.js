const { Trivia, User } = require("../models");

class TriviaController {
  static async mySavedTrivia(req, res, next) {
    try {
      const id = +req.user.id;

      const output = await Trivia.findAll({
        where: {
          UserId: id,
        },
        include: {
          model: User,
          attributes: ["id", "nickname"],
        },
      });

      res.status(200).json(output);
    } catch (err) {
      next(err);
    }
  }

  static async saveThisTrivia(req, res, next) {
    try {
      const { category, correct_answer, difficulty, question } = req.body;
      const id = +req.user.id;
      const data = {
        category: category,
        correct_answer: correct_answer,
        difficulty: difficulty,
        question: question,
        UserId: id,
      };
      const output = await Trivia.create(data);
      res.status(200).json(output);
    } catch (err) {
      next(err);
    }
  }

  static async deleteTrivia(req, res, next) {
    const id = +req.params.id;
    try {
      const found = await Trivia.findByPk(id);
      if (!found) {
        throw {
          name: `CustomError`,
          status: 404,
          message: `Not Found`,
        };
      }
      await Trivia.destroy({
        where: { id: id },
      });
      res.status(200).json({ message: "Trivia has been successfully deleted" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TriviaController;
