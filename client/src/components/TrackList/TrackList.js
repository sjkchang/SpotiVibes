import React, { useState, useEffect } from "react";
import "./TrackList.css";
import Track from "../Track/Track";
import Cookies from "universal-cookie";

export const TrackList = ({ tracks }) => {
    const [seedSongs, setSeedSongs] = useState([]);

    useEffect(() => {
        const cookies = new Cookies();
        const seedTrackUris = cookies.get("selected_seed_tracks") || [];
        console.log("Seed track uris: " + seedTrackUris.toString());
        setSeedSongs(seedTrackUris);
    }, []);
    return (
        <div className='TrackList'>
            <ul className='track-list'>
                {tracks.map((track, index) => {
                    return (
                        <Track
                            track={track}
                            key={index}
                            selected={seedSongs.includes(track.id)}
                        />
                    );
                })}
            </ul>
        </div>
    );
};

export default TrackList;
