import React from "react";
import "./ArtistItem.css";
import TooltipImage from "../TooltipImage/TooltipImage";
import SpotifyTypes from "spotify-types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleSeeds } from "../../redux/slices/seedsSlice";

interface ArtistProps extends React.HTMLAttributes<any> {
    item?: SpotifyTypes.Artist;
}

function ArtistItem({ item }: ArtistProps) {
    const seeds = useAppSelector((state: any) => state.seeds);
    const dispatch = useAppDispatch();

    if (item) {
        return (
            <div className="Artist">
                <TooltipImage
                    toggled={() => {
                        return seeds.uris.includes(item.uri);
                    }}
                    toggle={() => dispatch(toggleSeeds(item.uri))}
                    image_url={item.images[2].url}
                    rounded={true}
                    tip="Set as Seed"
                />
                <div className="artist-info">
                    <div className="artist-name">
                        <a href="/"> {item.name}</a>
                    </div>
                </div>
            </div>
        );
    } else {
        return <div className="Artist">Artist Not Supplied</div>;
    }
}

export default ArtistItem;
