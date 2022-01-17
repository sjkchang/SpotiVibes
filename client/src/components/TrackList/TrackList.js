import React from "react";
import "./TrackList.css";
import Track from "../Track/Track";

export const TrackList = ({ tracks }) => {
    return (
        <div className='TrackList'>
            <ul className='track-list'>
                {tracks.map((track, index) => {
                    return <Track track={track} key={index} />;
                })}
            </ul>
        </div>
    );
};

export default TrackList;
