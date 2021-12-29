const spotify = require("../services/Spotify");
const jwt = require("jsonwebtoken");

const auth_url = (req, res) => {
    var scopes = [
        "user-read-private",
        "user-read-email",
        "user-library-read",
        "user-library-modify",
        "user-read-playback-position",
        "user-top-read",
        "user-read-recently-played",
        "playlist-modify-private",
        "playlist-read-collaborative",
        "playlist-read-private",
        "playlist-modify-public",
    ];
    let state = "some-state-of-my-choice";
    var authorizeURL = spotify.createAuthorizeURL(scopes, state);
    res.redirect(authorizeURL);
};

const handle_callback = async (req, res) => {
    let code = req.query.code;
    let token;
    try {
        let data = await spotify.authorizationCodeGrant(code);
        if (data.body) {
            data.body.last_refreshed = Date.now();
            token = jwt.sign(data.body, process.env.SECRET_KEY);
            res.cookie("jwt", token, {
                httpOnly: true,
                secure: true,
                maxAge: 3600000,
            });
        }
    } catch (error) {
        console.log(error);
    }
    res.redirect("/");
};

const logout = (req, res) => {
    res.clearCookie("jwt");
    res.redirect("/");
};

const is_logged_in = (req, res) => {
    const token = req.cookies.jwt;
    if (token) {
        let data = jwt.verify(token, process.env.SECRET_KEY);
        if (data) {
            return res.json({ loggedIn: true });
        }
    }
    return res.json({ loggedIn: false });
};

module.exports = {
    auth_url,
    handle_callback,
    logout,
    is_logged_in,
};
