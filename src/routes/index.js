const express = require("express");
const { verifyJWT } = require("../middleware");

const { authController, spotifyController } = require("../controllers");

const authRouter = express.Router();

authRouter.get("/login", authController.login);
authRouter.get("/callback", authController.handle_callback);
authRouter.get("/logout", authController.logout);
authRouter.get("/loggedIn", authController.is_logged_in);

const spotifyRouter = express.Router();
spotifyRouter.use(verifyJWT);
spotifyRouter.get("/", spotifyController.index);
spotifyRouter.get("/me", spotifyController.me);
spotifyRouter.post("/generate_playlist", spotifyController.generate_playlist);
spotifyRouter.get("/genres", spotifyController.get_genres);
spotifyRouter.get("/top-tracks", spotifyController.get_top_tracks);
spotifyRouter.get("/top-artists", spotifyController.get_top_artists);

module.exports = {
  authRouter,
  spotifyRouter,
};
