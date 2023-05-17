import React from "react";
import { Track } from "spotify-types";
import TooltipImage from "../TooltipImage/TooltipImage";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleSeeds } from "../../redux/slices/seedsSlice";
import "./TrackItem.css";

interface TrackProps extends React.HTMLAttributes<any> {
    track?: Track;
}

function TrackItem({ track }: TrackProps) {
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

    if (track) {
        return (
            <div className="Track">
                <TooltipImage
                    toggled={() => {
                        return seeds.uris.includes(track.uri);
                    }}
                    toggle={() => dispatch(toggleSeeds(track.uri))}
                    image_url={track.album.images[2].url}
                    tip="Set as Seed"
                />

                <div className="track-info">
                    <div className="track-data">
                        <div className="track-title">
                            <a href="/"> {track.name}</a>
                        </div>
                        <span className="track-album-info">
                            <span>
                                {track.artists[0].name} | {track.album.name}
                            </span>
                        </span>
                    </div>
                    <div>{parseMsToTime(track.duration_ms)}</div>
                </div>
            </div>
        );
    } else {
        return <div className="Track">Track Not Assigned</div>;
    }
}

export default TrackItem;

/*
<button
                onClick={() => {
                    toggleSeed(item.uri);
                }}
            >
                {includesSeed(item.uri) ? "Remove Seed" : "Add Seed"}
            </button>
*/
