import React, { useState, useEffect } from "react";
import "./Track.css";
import axios from "axios";
import Cookies from "universal-cookie";

export const Track = (props) => {
    const [selected, setSelected] = useState(props.selected);
    const cookies = new Cookies();

    const toggleSelected = () => {
        let seed_tracks = cookies.get("selected_seed_tracks") || [];

        //If it is selected we want to unselect it and remove it from the cookie
        if (selected) {
            const index = seed_tracks.indexOf(props.track.id);
            if (index > -1) {
                seed_tracks.splice(index, 1);
            }
        } else {
            //We can only have at max 5 seed songs at a time
            // Do not select new item if all 5 are selected
            if (seed_tracks.length >= 5) {
                seed_tracks.splice(0, seed_tracks.length - 4);
            }
            seed_tracks.push(props.track.id);
        }
        setSelected(!selected);
        cookies.set("selected_seed_tracks", seed_tracks);
    };

    return (
        <li className='Track'>
            <img src={props.track.album.images[0].url}></img>
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
