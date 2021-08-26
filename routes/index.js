const router = require("express").Router();
const userRouter = require("./user");
const triviaRouter = require("./trivia");

router.use("/", userRouter);
router.use("/trivia", triviaRouter);

module.exports = router;
