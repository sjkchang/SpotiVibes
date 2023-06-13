import React, { useEffect, useState } from "react";
import SpotifyTypes from "spotify-types";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { toggleSeeds } from "../../../redux/slices/seedsSlice";
import { parseMsToTime } from "../../../utils/TIme";
import "./TrackBrick.css";

import Popover from "../../Popover/Popover";
import ImageOverlayIcon from "../../ImageOverlayIcon/ImageOverlayIcon";
import { PlusIcon, Cross2Icon, InfoCircledIcon } from "@radix-ui/react-icons";
import AudioFeatureRadarChart from "../../AudioFeatureRadarChart/AudioFeatureRadarChart";
import { Feature } from "../../../pages/GeneratePlaylists/GeneratePlaylist";
import { getTrackFeatures } from "../../../spotify/service";
interface TrackProps extends React.HTMLAttributes<any> {
    track: SpotifyTypes.Track;
}

function TrackBrick({ track }: TrackProps) {
    const [features, setFeatures] = useState<SpotifyTypes.AudioFeatures>();

    let sliderFeatures: Array<Feature> = [];
    if (features) {
        sliderFeatures = [
            {
                label: "speechiness",
                value: features.speechiness,
            },
            {
                label: "acoustic",
                value: features.acousticness,
            },
            {
                label: "danceable",
                value: features.danceability,
            },
            {
                label: "instrumentalness",
                value: features.instrumentalness,
            },
            {
                label: "energy",
                value: features.energy,
            },
            {
                label: "liveness",
                value: features.liveness,
            },
        ];
    }

    useEffect(() => {
        getTrackFeatures(track.id)
            .then((result) => {
                setFeatures(result);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const seeds = useAppSelector((state: any) => state.seeds);
    const dispatch = useAppDispatch();

    let image: string;
    if (track.album.images.length > 0) {
        image = track.album.images[track.album.images.length - 1].url;
    } else {
        image = "https://freeimage.host/i/album-cover-placeholder.HlHy9Yx";
    }

    return (
        <div className="TrackBrick">
            <Popover
                trigger={
                    <div>
                        <ImageOverlayIcon
                            image_url={image}
                            Icon={<InfoCircledIcon />}
                        />
                    </div>
                }
                content={
                    <div>
                        <AudioFeatureRadarChart
                            features={sliderFeatures}
                            width={300}
                        />
                        <button
                            onClick={() => {
                                dispatch(toggleSeeds(track.uri));
                            }}
                        >
                            {seeds.uris.includes(track.uri)
                                ? "Remove Seed"
                                : "Add Seed"}
                        </button>
                    </div>
                }
                side="bottom"
                align="start"
            />

            <div className="track-info">
                <div className="track-data">
                    <div className="track-title">
                        <a href={"/track/" + track.id}> {track.name}</a>
                    </div>
                    <span className="track-album-info">
                        <span>
                            <a href={"/artist/" + track.artists[0].id}>
                                {track.artists[0].name}
                            </a>
                            {" | "}
                            <a href={"/album/" + track.album.id}>
                                {track.album.name}
                            </a>
                        </span>
                    </span>
                </div>
                <div className="track-duration">
                    {parseMsToTime(track.duration_ms)}
                </div>
            </div>
        </div>
    );
}

export default TrackBrick;

/*
<button
                onClick={() => {
                    toggleSeed(item.uri);
                }}
            >
                {includesSeed(item.uri) ? "Remove Seed" : "Add Seed"}
            </button>
*/
