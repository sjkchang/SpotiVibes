import React from "react";
import "./ArtistBrick.css";
import SpotifyTypes from "spotify-types";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { toggleSeeds } from "../../../redux/slices/seedsSlice";
import Popover from "../../Popover/Popover";
import ImageOverlayIcon from "../../ImageOverlayIcon/ImageOverlayIcon";
import { PlusIcon, Cross2Icon, InfoCircledIcon } from "@radix-ui/react-icons";

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
            <Popover
                trigger={
                    <div>
                        <ImageOverlayIcon
                            image_url={image}
                            Icon={<InfoCircledIcon />}
                            rounded={true}
                        />
                    </div>
                }
                content={
                    <div>
                        <button
                            onClick={() => {
                                dispatch(toggleSeeds(artist.uri));
                            }}
                        >
                            {seeds.uris.includes(artist.uri)
                                ? "Remove Seed"
                                : "Add Seed"}
                        </button>
                    </div>
                }
                align="start"
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
