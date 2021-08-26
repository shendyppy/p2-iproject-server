const router = require("express").Router();
const TriviaController = require("../controllers/TriviaController");
const { authentication, authorization } = require("../middlewares/auth");

router.use(authentication);

router.get("/myTrivia", TriviaController.mySavedTrivia);
router.post("/", TriviaController.saveThisTrivia);
router.delete("/:id", authorization, TriviaController.deleteTrivia);

module.exports = router;
