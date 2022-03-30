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

  const convertTime = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  return (
    <li className="Track">
      <img
        className="album-art"
        src={props.track.album.images[0].url}
        alt="album art"
      ></img>
      <div className="track-info">
        <div className="track-text">
          <p className="title"> {props.track.name} </p>
          <p>
            {props.track.artists[0].name} · {props.track.album.name}
          </p>
        </div>
        <p>{convertTime(props.track.duration_ms)} </p>
      </div>

      <button onClick={toggleSelected}>
        {selected ? "Unselect" : "Select"}
      </button>
    </li>
  );
};

export default Track;
