import React from "react";
import SpotifyTypes from "spotify-types";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { toggleSeeds } from "../../../redux/slices/seedsSlice";
import Popover from "../../Popover";
import ImageOverlayIcon from "../../ImageOverlayIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { Brick, BrickTitle, BrickInfo } from "../BrickStyles";
import SeedImage from "../../SeedImage";

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
        <Brick>
            <SeedImage item={artist} uri={artist.uri} />

            <BrickInfo
                onClick={() => {
                    window.location.href = "/artist/" + artist.id;
                }}
            >
                <BrickTitle>
                    <span>{artist.name}</span>
                </BrickTitle>
            </BrickInfo>
        </Brick>
    );
}

export default ArtistBrick;
