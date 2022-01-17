import React, { useState, useEffect } from "react";
import "./Track.css";
import Cookies from "universal-cookie";

export const Track = (props) => {
    const [selected, setSelected] = useState(false);
    const cookies = new Cookies();

    useEffect(() => {
        let seed_tracks = cookies.get("selected_seed_tracks") || [];
        if (seed_tracks.indexOf(props.track.id) > -1) {
            setSelected(true);
        } else {
            setSelected(false);
        }
    }, []);

    const toggleSelected = () => {
        let seed_tracks = cookies.get("selected_seed_tracks") || [];
        let seed_track_titles = cookies.get("selected_seed_track_titles") || [];

        //If it is selected we want to unselect it and remove it from the cookie
        if (selected) {
            const index = seed_tracks.indexOf(props.track.id);
            if (index > -1) {
                seed_tracks.splice(index, 1);
                seed_track_titles.splice(index, 1);
            }
        } else {
            //We can only have at max 5 seed songs at a time
            // Do not select new item if all 5 are selected
            if (seed_tracks.length >= 5) {
                seed_tracks.splice(0, seed_tracks.length - 4);
                seed_track_titles.splice(0, seed_track_titles.length - 4);
            }
            seed_tracks.push(props.track.id);
            seed_track_titles.push(props.track.name);
        }
        setSelected(!selected);
        cookies.set("selected_seed_tracks", seed_tracks);
        cookies.set("selected_seed_track_titles", seed_track_titles);
    };

    return (
        <li className='Track'>
            <img src={props.track.album.images[0].url} alt='album art'></img>
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
