import React, { useState, useEffect } from "react";
import "./Track.css";
import Cookies from "universal-cookie";
import SeedController from "../../utils/seeds";

export const Track = (props) => {
  const [selected, setSelected] = useState(false);
  const cookies = new Cookies();
  const seedController = new SeedController();

  useEffect(() => {
    setSelected(seedController.containsUri(props.track.id));
  }, []);

  const toggleSelected = () => {
    console.log(seedController.getSeedsAsJson());
    if (selected) {
      seedController.removeSeed(props.track.id);
      setSelected(false);
    } else {
      seedController.addSeed(props.track.id, "track", props.track.name);
      setSelected(true);
    }
  };

  return (
    <li className="Track">
      <img src={props.track.album.images[0].url} alt="album art"></img>
      <p>Title: {props.track.name} </p>
      <p>Artist: {props.track.artists[0].name} </p>
      <p>Album: {props.track.album.name} </p>
      <p>Duration: {props.track.duration_ms} </p>
      <button onClick={toggleSelected}>
        {selected ? "Unselect" : "Select"}
      </button>
    </li>
  );
};

export default Track;
