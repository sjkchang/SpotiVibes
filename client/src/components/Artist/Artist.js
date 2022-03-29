import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import SeedController from "../../utils/seeds";

export const Artist = (props) => {
  const [selected, setSelected] = useState(false);
  const seedController = new SeedController();
  const cookies = new Cookies();

  useEffect(() => {
    let artists = cookies.get("seed_artists") || [];
    if (artists.indexOf(props.artist.id) >= 0) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, []);

  const toggleSelected = () => {
    let seed_artists = cookies.get("seed_artists") || [];
    let total_seeds = cookies.get("total_seeds") || 0;

    if (selected) {
      seed_artists.splice(seed_artists.indexOf(props.artist.id), 1);
      total_seeds--;
      setSelected(false);
    } else {
      if (total_seeds >= 4) {
        alert("Max Number of Seeds Selected. Unselect a seed");
      } else {
        seed_artists.push(props.artist.id);
        total_seeds++;
        setSelected(true);
      }
    }
    cookies.set("total_seeds", total_seeds);
    cookies.set("seed_artists", seed_artists);
  };

  return (
    <li className="Artist">
      <img src={props.artist.images[0].url} alt={props.artist.name}></img>
      <p>{props.artist.name}</p>
      <button onClick={toggleSelected}>
        {selected ? "Unselect" : "Select"}
      </button>
    </li>
  );
};

export default Artist;
