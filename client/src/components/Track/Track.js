import React, { useState, useEffect } from "react";
import "./Track.css";
import Cookies from "universal-cookie";

export const Track = (props) => {
  const [selected, setSelected] = useState(false);
  const cookies = new Cookies();

  useEffect(() => {
    let tracks = cookies.get("seed_tracks") || [];
    if (tracks.indexOf(props.track.id) >= 0) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, []);

  const toggleSelected = () => {
    let seed_tracks = cookies.get("seed_tracks") || [];
    let total_seeds = cookies.get("total_seeds") || 0;

    if (selected) {
      seed_tracks.splice(seed_tracks.indexOf(props.track.id), 1);
      total_seeds--;
      setSelected(false);
    } else {
      if (total_seeds >= 4) {
        alert("Max Number of Seeds Selected. Unselect a seed");
      } else {
        seed_tracks.push(props.track.id);
        total_seeds++;
        setSelected(true);
      }
    }
    cookies.set("total_seeds", total_seeds);
    cookies.set("seed_tracks", seed_tracks);
  };

  return (
    <li className="Track">
      <img
        className="album-art"
        src={props.track.album.images[0].url}
        alt="album art"
      ></img>
      <div className="track-info">
        <p> {props.track.name} </p>
        <p> {props.track.artists[0].name} </p>
      </div>

      <p> {props.track.album.name} </p>
      <p>Duration: {props.track.duration_ms} </p>
      <button onClick={toggleSelected}>
        {selected ? "Unselect" : "Select"}
      </button>
    </li>
  );
};

export default Track;
