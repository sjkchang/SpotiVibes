import React from "react";
import SpotifyTypes from "spotify-types";
import Card from "../Card/Card";
import "./CardRow.css";

interface CardRowProps {
    items:
        | Array<SpotifyTypes.Artist>
        | Array<SpotifyTypes.Track>
        | Array<SpotifyTypes.Playlist>
        | Array<SpotifyTypes.Album>;
}

function CardRow({ items }: CardRowProps) {
    return (
        <div className="CardRow">
            {items.map((item, i) => (
                <div key={i}>
                    <Card item={item} fixedSize={true}></Card>
                </div>
            ))}
        </div>
    );
}

export default CardRow;
