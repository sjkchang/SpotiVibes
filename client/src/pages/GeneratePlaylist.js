import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import GenreBox from "../components/GenreBox/GenreBox";
import TraitSlider from "../components/TraitSlider/TraitSlider";

import axios from "axios";

export const GeneratePlaylist = () => {
  const [title, setTitle] = useState("Untitled Playlist");
  const [description, setDescription] = useState("");

  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [seeds, setSeeds] = useState({});
  const cookies = new Cookies();

  useEffect(() => {
    const seed_tracks = cookies.get("seed_tracks");
    const seed_artists = cookies.get("seed_artists");

    setTracks(seed_tracks);
    setArtists(seed_artists);
    let formatedSeeds = {
      seed_tracks: seed_tracks,
      seed_artists: seed_artists,
    };
    setSeeds(formatedSeeds);
  }, []);

  const updateSeeds = (seed) => {
    for (let key in seed) {
      seeds[key] = seed[key];
    }

    setSeeds(seeds);
  };

  const disableSeed = (keys) => {
    for (let key of keys) {
      delete seeds[key];
    }
  };

  const updateGenre = (genre) => {
    seeds["seed_genres"] = genre;
    setSeeds(seeds);
  };

  const submit = () => {
    seeds["limit"] = 100;
    setSeeds(seeds);
    let body = {
      seeds: seeds,
      title: title,
      description: description,
    };
    console.log(seeds);
    let res = axios.post("api/spotify/generate_playlist", body);
  };

  return (
    <div className="GeneratePlaylist">
      <div>
        <label for="title">Enter playlist title:</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Playlist Title"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <label for="title">Enter playlist description:</label>
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Playlist Description"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <GenreBox updateGenre={updateGenre} />
        <p>Selected Tracks:</p>
        <ol>
          {tracks.map((track, index) => {
            return <li>{track.name}</li>;
          })}
        </ol>

        <p>Selected Artists:</p>
        <ol>
          {artists.map((artist, index) => {
            return <li>{artist.name}</li>;
          })}
        </ol>
        <TraitSlider
          name="acousticness"
          min={0}
          max={1}
          step={0.05}
          updateSeeds={updateSeeds}
          disableSeed={disableSeed}
        />
        <TraitSlider
          name="energy"
          min={0}
          max={1}
          step={0.05}
          updateSeeds={updateSeeds}
          disableSeed={disableSeed}
        />
        <TraitSlider
          name="speechiness"
          min={0}
          max={1}
          step={0.05}
          updateSeeds={updateSeeds}
          disableSeed={disableSeed}
        />
        <TraitSlider
          name="valence"
          min={0}
          max={1}
          step={0.05}
          updateSeeds={updateSeeds}
          disableSeed={disableSeed}
        />
        <TraitSlider
          name="danceability"
          min={0}
          max={1}
          step={0.05}
          updateSeeds={updateSeeds}
          disableSeed={disableSeed}
        />
        <TraitSlider
          name="instrumentalness"
          min={0}
          max={1}
          step={0.05}
          updateSeeds={updateSeeds}
          disableSeed={disableSeed}
        />
        <button
          onClick={() => {
            submit();
          }}
        >
          Generate Playlist
        </button>
      </div>
    </div>
  );
};

export default GeneratePlaylist;
