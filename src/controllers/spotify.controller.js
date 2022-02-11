const spotify = require("../services/Spotify");
const { verifyJWT } = require("../middleware");

const index = (req, res) => {
    res.send(res.locals.access_token);
};

const me = async (req, res) => {
    spotify.setAccessToken(res.locals.access_token);
    try {
        let data = await spotify.getMe();
        res.send(data.body);
        console.log(data);
    } catch (error) {
        console.log(error);
    }
};

const get_playlists = async (req, res) => {
    spotify.setAccessToken(res.locals.access_token);

    let user = req.params.user;
    let data;
    try {
        if (user) {
            data = await spotify.getUserPlaylists(user);
        } else {
            data = await spotify.getUserPlaylists();
        }
        res.send(data.body);
    } catch (error) {
        console.log(error);
    }
};

const get_playlist = async (req, res) => {
    spotify.setAccessToken(res.locals.access_token);

    let playlist_uri = req.params.uri;
    if (!playlist_uri) return res.status(404).send("Missing URL Parameter");
    let data;
    try {
        data = await spotify.getPlaylist(playlist_uri);
        res.send(data.body);
    } catch (error) {
        console.log(error);
    }
};

const get_top_tracks = async (req, res) => {
    spotify.setAccessToken(res.locals.access_token);

    let data;
    try {
        data = await spotify.getMyTopTracks();
        res.send(data.body);
    } catch (error) {
        console.log(error);
    }
};

const get_top_artists = async (req, res) => {
    spotify.setAccessToken(res.locals.access_token);
    let data;
    try {
        data = await spotify.getMyTopArtists();
        res.send(data.body);
    } catch (error) {
        console.log(error);
    }
};

const get_recommmendations = async (req, res) => {
    spotify.setAccessToken(res.locals.access_token);

    //let seeds = req.body.seeds;
    let seeds;
    console.log(req);
    let recommendations;
    if (seeds) recommendations = await spotify.getRecommendations(seeds);
    else
        recommendations = await spotify.getRecommendations({
            seed_artists: ["56C8IMUO9RKB5uFPWDU11D", "3QyqTTQgSUaa449m8u6vpR"],
            seed_genres: ["acoustic"],
        });

    res.send(recommendations);
};

const get_genres = async (req, res) => {
    spotify.setAccessToken(res.locals.access_token);

    let genres = await spotify.getAvailableGenreSeeds();
    res.send(genres.body);
};

module.exports = {
    index,
    me,
    get_playlists,
    get_playlist,
    get_top_tracks,
    get_top_artists,
    get_recommmendations,
    get_genres,
};
