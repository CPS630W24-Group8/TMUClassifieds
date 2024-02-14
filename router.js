const express = require("express");
const router = express.Router();

const { register, login } = require("./auth");

router.get("/", (request, response) => {
	response.send("Sever is up and running");
})

router.route("/register").post(register);
router.route("/login").post(login);

module.exports = router;