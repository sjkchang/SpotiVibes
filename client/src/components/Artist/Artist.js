import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import SeedController from "../../utils/seeds";

export const Artist = (props) => {
  const [selected, setSelected] = useState(false);
  const seedController = new SeedController();

  useEffect(() => {
    setSelected(seedController.containsUri(props.artist.id));
  }, []);

  const toggleSelected = () => {
    if (selected) {
      seedController.removeSeed(props.artist.id);
      setSelected(false);
    } else {
      let success = seedController.addSeed(
        props.artist.id,
        "artist",
        props.artist.name
      );
      if (success) {
        setSelected(true);
      } else {
        alert("Max Number of Seeds Selected. Unselect a seed");
      }
    }
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
