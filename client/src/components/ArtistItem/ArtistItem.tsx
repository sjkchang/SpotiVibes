import React from "react";
import "./ArtistItem.css";
import TooltipImage from "../TooltipImage/TooltipImage";
import { Artist } from "spotify-types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleSeeds } from "../../redux/slices/seedsSlice";

interface ArtistProps extends React.HTMLAttributes<any> {
    artist?: Artist;
}

function ArtistItem({ artist }: ArtistProps) {
    const seeds = useAppSelector((state: any) => state.seeds);
    const dispatch = useAppDispatch();

    if (artist) {
        return (
            <div className="Artist">
                <TooltipImage
                    toggled={() => {
                        return seeds.uris.includes(artist.uri);
                    }}
                    toggle={() => dispatch(toggleSeeds(artist.uri))}
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
