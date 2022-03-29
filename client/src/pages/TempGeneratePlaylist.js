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
    const cookies = new Cookies();
    const seeds = seedController.getSeeds();
    const formatedSeeds = seedController.getSeedsAsJson();

    setTracks(seeds.seed_tracks);
    setArtists(seeds.seed_artists);
    setSeeds(formatedSeeds);
  }, []);

  const updateSeeds = (seeds) => {
    let tempSeeds = seeds;

    setSeeds(seeds);
  };

  return (
    <div className="GeneratePlaylist">
      <div>
        <GenreBox />
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
          name="Accousticness"
          min={0}
          max={1}
          step={0.05}
          updateSeeds={updateSeeds}
        />
      </div>
    </div>
  );
};

export default GeneratePlaylist;

/*
onAfterChange={(value) => {
            let newSeed = seeds;
            newSeed["min-accousticness"] = value[0];
            newSeed["target-accousticness"] = value[1];
            newSeed["max-accousticness"] = value[2];
            setSeeds(newSeed);
          }}
*/
