import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import GenreBox from "../components/GenreBox/GenreBox";

export const GeneratePlaylist = () => {
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        const cookies = new Cookies();
        const seedTracks = cookies.get("selected_seed_tracks") || [];
        const seedTrackTitles = cookies.get("selected_seed_track_titles") || [];

        console.log(seedTracks);
        setTracks(seedTrackTitles);
    }, []);

    return (
        <div className='GeneratePlaylist'>
            <div>
                <GenreBox />
                <p>Selected Tracks:</p>
                <ol>
                    {tracks.map((title, index) => {
                        return <li>{title}</li>;
                    })}
                </ol>
            </div>
        </div>
    );
};

export default GeneratePlaylist;
