import React from "react";
import SpotifyTypes from "spotify-types";
import Card from "../Card/Card";
import "./CardGrid.css";

interface CardGridProps {
    items:
        | Array<SpotifyTypes.Artist>
        | Array<SpotifyTypes.Track>
        | Array<SpotifyTypes.Playlist>
        | Array<SpotifyTypes.Album>;
}

function CardGrid({ items }: CardGridProps) {
    return (
        <div className="CardGrid">
            {items.map((item, i) => (
                <div key={i}>
                    <Card item={item}></Card>
                </div>
            ))}
        </div>
    );
}

export default CardGrid;
