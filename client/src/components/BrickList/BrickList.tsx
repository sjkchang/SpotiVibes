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
        <div className="row">
            {items.map((item) => (
                <Brick item={item} />
            ))}
        </div>
    );
}

export default BrickList;
