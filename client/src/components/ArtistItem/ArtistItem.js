import React from "react";
import "./ArtistItem.css";
import TooltipImage from "../TooltipImage/TooltipImage";

function ArtistItem({ item, includesSeed, toggleSeed }) {
    return (
        <div className="Artist">
            <TooltipImage
                toggled={() => includesSeed(item.uri)}
                toggle={() => toggleSeed(item.uri)}
                uri={item.uri}
                image_url={item.images[2].url}
                rounded={true}
                tip="Set as Seed"
            />
            <div className="artist-info">
                <div className="artist-name">
                    <a href=""> {item.name}</a>
                </div>
            </div>
        </div>
    );
}

export default ArtistItem;
