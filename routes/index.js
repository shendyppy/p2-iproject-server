const router = require("express").Router();
const UserController = require("../controllers/UserController");
const authentication = require("../middlewares/auth");
const GoogleAuthController = require("../controllers/googleAuthController");

router.post("/authgoogle", GoogleAuthController.getAuthGoogle);
router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.use(authentication);
router.get("/info", UserController.getUserInfo);

module.exports = router;
