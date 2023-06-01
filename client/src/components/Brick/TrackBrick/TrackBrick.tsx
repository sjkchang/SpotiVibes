import React from "react";
import { Track } from "spotify-types";
import TooltipImage from "../../TooltipImage/TooltipImage";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { toggleSeeds } from "../../../redux/slices/seedsSlice";
import "./TrackBrick.css";

interface TrackProps extends React.HTMLAttributes<any> {
    track: Track;
}

function TrackBrick({ track }: TrackProps) {
    const seeds = useAppSelector((state: any) => state.seeds);
    const dispatch = useAppDispatch();

    function parseMsToTime(milliseconds: number): string {
        //Get remainder from hours and convert to minutes
        var minutes = milliseconds / (1000 * 60);
        var absoluteMinutes = Math.floor(minutes);
        var m = absoluteMinutes;

        //Get remainder from minutes and convert to seconds
        var seconds = (minutes - absoluteMinutes) * 60;
        var absoluteSeconds = Math.floor(seconds);
        var s = absoluteSeconds > 9 ? absoluteSeconds : "0" + absoluteSeconds;

        return m + ":" + s;
    }

    let image: string;
    if (track.album.images.length > 0) {
        image = track.album.images[track.album.images.length - 1].url;
    } else {
        image = "https://freeimage.host/i/album-cover-placeholder.HlHy9Yx";
    }

    return (
        <div className="TrackBrick">
            <TooltipImage
                toggled={() => {
                    return seeds.uris.includes(track.uri);
                }}
                toggle={() => dispatch(toggleSeeds(track.uri))}
                image_url={image}
                tip="Set as Seed"
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
                            {""} | {""}
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
