import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import GenreBox from "../components/GenreBox/GenreBox";
import TraitSlider from "../components/TraitSlider/TraitSlider";

import axios from "axios";

export const GeneratePlaylist = () => {
  const [tracks, setTracks] = useState([]);
  const [trackTitles, setTrackTitles] = useState([]);
  const [seeds, setSeeds] = useState({});

  useEffect(() => {
    const cookies = new Cookies();
    const seedTracks = cookies.get("selected_seed_tracks") || [];
    const seedTrackTitles = cookies.get("selected_seed_track_titles") || [];

    setTracks(seedTracks);
    setSeeds({ seed_tracks: seedTracks });
    setTrackTitles(seedTrackTitles);
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
          {trackTitles.map((title, index) => {
            return <li>{title}</li>;
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
