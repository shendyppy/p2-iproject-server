const router = require("express").Router();
const TriviaController = require("../controllers/TriviaController");
const authentication = require("../middlewares/auth");

router.use(authentication);

router.get("/myTrivia", TriviaController.mySavedTrivia);
router.post("/", TriviaController.saveThisTrivia);
router.delete("/:id", TriviaController.deleteTrivia);

module.exports = router;
