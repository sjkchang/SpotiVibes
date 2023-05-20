import React from "react";
import SpotifyTypes from "spotify-types";
import Card from "../Card/Card";
import "./CardScroll.css";

interface CardScrollProps {
    items:
        | Array<SpotifyTypes.Artist>
        | Array<SpotifyTypes.Track>
        | Array<SpotifyTypes.Playlist>;
}

function CardScroll({ items }: CardScrollProps) {
    return (
        <div className="CardScroll">
            <div className="ScrollArea">
                {items.map((item, i) => (
                    <div key={i} className="rotation-wrapper-outer">
                        <div className="rotation-wrapper-inner">
                            <Card item={item}></Card>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CardScroll;
