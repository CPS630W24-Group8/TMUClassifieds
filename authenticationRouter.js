const express = require("express");
const router = express.Router();

const { register, login, changeEmail, changePassword } = require("./auth");

router.get("/", (request, response) => {
	response.send("Server is up and running");
})

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/change-email").post(changeEmail);
router.route("/change-password").post(changePassword);

module.exports = router;