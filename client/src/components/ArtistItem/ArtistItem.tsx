import React from "react";
import "./ArtistItem.css";
import TooltipImage from "../TooltipImage/TooltipImage";
import { Artist } from "spotify-types";

interface ArtistProps extends React.HTMLAttributes<any> {
    artist?: Artist;
    includesSeed: (uri: string) => boolean;
    toggleSeed: (uri: string) => void;
}

function ArtistItem({ artist, includesSeed, toggleSeed }: ArtistProps) {
    if (artist) {
        return (
            <div className="Artist">
                <TooltipImage
                    toggled={() => includesSeed(artist.uri)}
                    toggle={() => toggleSeed(artist.uri)}
                    image_url={artist.images[2].url}
                    rounded={true}
                    tip="Set as Seed"
                />
                <div className="artist-info">
                    <div className="artist-name">
                        <a href="/"> {artist.name}</a>
                    </div>
                </div>
            </div>
        );
    } else {
        return <div className="Artist">Artist Not Supplied</div>;
    }
}

export default ArtistItem;
