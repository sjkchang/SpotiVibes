import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import GenreBox from "../components/GenreBox/GenreBox";
import TraitSlider from "../components/TraitSlider/TraitSlider";
import SeedController from "../utils/seeds";

import axios from "axios";

export const GeneratePlaylist = () => {
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [seeds, setSeeds] = useState({});
  const seedController = new SeedController();

  useEffect(() => {
    const seeds = seedController.getSeeds();
    const formatedSeeds = seedController.getSeedsAsJson();

    setTracks(seeds.seed_tracks);
    setArtists(seeds.seed_artists);
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
    let body = {
      seeds: seeds,
      title: "Test Tilte",
      description: "Test Description",
    };
    console.log(seeds);
    let res = axios.post("api/spotify/generate_playlist", body);
  };

  return (
    <div className="GeneratePlaylist">
      <div>
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
        <button
          onClick={() => {
            submit();
          }}
        >
          Check Seed
        </button>
      </div>
    </div>
  );
};

export default GeneratePlaylist;
