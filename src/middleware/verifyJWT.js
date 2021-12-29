const jwt = require("jsonwebtoken");
const spotify = require("../services/Spotify");

const verifyJWT = async (req, res, next) => {
    console.log("here");
    const token = req.cookies.jwt;
    if (token) {
        let data = jwt.verify(token, process.env.SECRET_KEY);

        //If Token is expired. Refresh it
        if (data.last_refreshed + data.expires_in > Date.now() - 100) {
            // The -100 is just an arbitrary margin of error
            let access_token;
            try {
                access_token = await refresh_token(data.refresh_token);
            } catch (error) {
                throw error;
            }

            //Sign new jwt with updated data
            data.access_token = access_token;
            data.last_refreshed = Date.now();
            let new_token = jwt.sign(data, process.env.SECRET_KEY);
            res.cookie("jwt", new_token, {
                httpOnly: true,
                secure: true,
                maxAge: 3600000,
            });

            //Set access token for next middleware/controller
            res.locals.access_token = access_token;
        } else {
            res.locals.access_token = data.access_token;
        }
    } else {
        return res.status(401).send("User is not properly authenticated");
    }
    next();
};

const refresh_token = async (refresh_token) => {
    try {
        spotify.setRefreshToken(refresh_token);
        let data = await spotify.refreshAccessToken();
        if (data.body) {
            return data.body.access_token;
        }
    } catch (error) {
        throw error;
    }
};

module.exports = verifyJWT;
