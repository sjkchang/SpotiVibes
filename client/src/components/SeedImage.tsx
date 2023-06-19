import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toggleSeeds } from "../redux/slices/seedsSlice";

import Popover from "./Popover";
import ImageOverlayIcon from "./ImageOverlayIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

import { Button } from "../styles";
import SpotifyTypes from "spotify-types";
import { isArtist } from "../spotify/types";
import AudioFeatureRadarChart from "./AudioFeatureRadarChart/AudioFeatureRadarChart";

interface TrackProps extends React.HTMLAttributes<any> {
    item: SpotifyTypes.Track | SpotifyTypes.Artist;
    popoutContent?: string | JSX.Element | JSX.Element[];
    uri: string;
    align?: "start" | "end" | "center";
    side?: "bottom" | "right" | "top" | "left";
    sideOffset?: number;
    backgroundColor?: string;
}

function SeedImage({
    item,
    uri,
    popoutContent,
    align = "start",
    side = "bottom",
    sideOffset = 5,
    backgroundColor,
}: TrackProps) {
    const seeds = useAppSelector((state: any) => state.seeds);
    const dispatch = useAppDispatch();

    let imageHref;
    if (isArtist(item)) {
        if (item.images.length > 0) {
            imageHref = item.images[item.images.length - 1].url;
        } else {
            imageHref = "https://i.stack.imgur.com/l60Hf.png";
        }

        return (
            <Popover
                trigger={
                    <div>
                        <ImageOverlayIcon
                            image_url={imageHref}
                            Icon={<FontAwesomeIcon icon={faCircleInfo} />}
                            shape="circle"
                        />
                    </div>
                }
                content={
                    <div>
                        <h2>{item.name}</h2>
                        <h4>Popularity: {item.popularity}%</h4>
                        <Button
                            onClick={() => {
                                dispatch(toggleSeeds(uri));
                            }}
                        >
                            {seeds.uris.includes(uri)
                                ? "Remove Seed"
                                : "Add Seed"}
                        </Button>
                    </div>
                }
                side={side}
                align={align}
                sideOffset={sideOffset}
                backgroundColor={backgroundColor}
            />
        );
    } else {
        if (item.album.images.length > 0) {
            imageHref = item.album.images[item.album.images.length - 1].url;
        } else {
            imageHref = "https://i.stack.imgur.com/l60Hf.png";
        }

        return (
            <Popover
                trigger={
                    <div>
                        <ImageOverlayIcon
                            image_url={imageHref}
                            Icon={<FontAwesomeIcon icon={faCircleInfo} />}
                            shape="rounded"
                        />
                    </div>
                }
                content={
                    <div>
                        <h2>Track Features</h2>
                        <AudioFeatureRadarChart item={item} />
                        <Button
                            onClick={() => {
                                dispatch(toggleSeeds(uri));
                            }}
                        >
                            {seeds.uris.includes(uri)
                                ? "Remove Seed"
                                : "Add Seed"}
                        </Button>
                    </div>
                }
                side={side}
                align={align}
                sideOffset={sideOffset}
                backgroundColor={backgroundColor}
            />
        );
    }
}

export default SeedImage;
