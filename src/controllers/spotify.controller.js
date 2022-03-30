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

const get_top_tracks = async (req, res) => {
  spotify.setAccessToken(res.locals.access_token);

  let data;
  try {
    data = await spotify.getMyTopTracks({
      limit: 50,
      time_range: "medium_term",
    });
    res.send(data.body);
  } catch (error) {
    console.log(error);
  }
};

const get_top_artists = async (req, res) => {
  spotify.setAccessToken(res.locals.access_token);
  let data;
  try {
    data = await spotify.getMyTopArtists({
      limit: 50,
      time_range: "medium_term",
    });
    res.send(data.body);
  } catch (error) {
    console.log(error);
  }
};

const generate_playlist = async (req, res) => {
  spotify.setAccessToken(res.locals.access_token);

  let body = req.body;
  let seeds = body.seeds;
  console.log(body);
  let recommendations;
  if (seeds) recommendations = await spotify.getRecommendations(seeds);
  else return res.status(400).send("Failed to generate playlist");

  let playlist = await spotify.createPlaylist(body.title, {
    description: body.description,
    public: true,
  });

  let playlist_id = playlist.body.id;
  console.log(playlist_id);
  let tracks = recommendations.body.tracks;
  track_uris = [];

  for (track of tracks) {
    track_uris.push(track.uri);
  }

  spotify.addTracksToPlaylist(playlist_id, track_uris);

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
  get_top_tracks,
  get_top_artists,
  generate_playlist,
  get_genres,
};
