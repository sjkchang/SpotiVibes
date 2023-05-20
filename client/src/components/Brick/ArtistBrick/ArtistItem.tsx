import React from "react";
import "./ArtistBrick.css";
import TooltipImage from "../../TooltipImage/TooltipImage";
import SpotifyTypes from "spotify-types";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { toggleSeeds } from "../../../redux/slices/seedsSlice";

interface ArtistProps extends React.HTMLAttributes<any> {
    artist: SpotifyTypes.Artist;
}

function ArtistBrick({ artist }: ArtistProps) {
    const seeds = useAppSelector((state: any) => state.seeds);
    const dispatch = useAppDispatch();

    let image: string;
    if (artist.images.length > 0) {
        image = artist.images[artist.images.length - 1].url;
    } else {
        image = "https://i.stack.imgur.com/l60Hf.png";
    }

    return (
        <div className="Artist">
            <TooltipImage
                toggled={() => {
                    return seeds.uris.includes(artist.uri);
                }}
                toggle={() => dispatch(toggleSeeds(artist.uri))}
                image_url={image}
                rounded={true}
                tip="Set as Seed"
            />
            <div className="artist-info">
                <div className="artist-name">
                    <a href={"/artist/" + artist.id}> {artist.name}</a>
                </div>
            </div>
        </div>
    );
}

export default ArtistBrick;
