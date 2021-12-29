const express = require("express");

const { authController } = require("../controllers");

const authRouter = express.Router();

authRouter.get("/url", authController.auth_url);
authRouter.get("/callback", authController.handle_callback);
authRouter.get("/logout", authController.logout);
authRouter.get("/loggedIn", authController.is_logged_in);

module.exports = {
    authRouter,
};
