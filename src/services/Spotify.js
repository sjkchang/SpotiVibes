const SpotifyWebApi = require("spotify-web-api-node");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

console.log(process.env.CLIENT_ID);

let spotify = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
});

module.exports = spotify;
