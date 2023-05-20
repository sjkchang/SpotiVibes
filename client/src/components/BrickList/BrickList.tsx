import React from "react";
import SpotifyTypes from "spotify-types";
import Brick from "../Brick/Brick";
import "./BrickList.css";

interface BrickListProps {
    items:
        | Array<SpotifyTypes.Artist>
        | Array<SpotifyTypes.Track>
        | Array<SpotifyTypes.Playlist>;
}

function BrickList({ items }: BrickListProps) {
    return (
        <div className="BrickContainer">
            {items.map((item, i) => (
                <div key={i}>
                    <Brick item={item} />
                </div>
            ))}
        </div>
    );
}

export default BrickList;
