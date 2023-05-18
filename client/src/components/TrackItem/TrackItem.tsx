import React from "react";
import { Track } from "spotify-types";
import TooltipImage from "../TooltipImage/TooltipImage";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleSeeds } from "../../redux/slices/seedsSlice";
import "./TrackItem.css";

interface TrackProps extends React.HTMLAttributes<any> {
    item?: Track;
}

function TrackItem({ item }: TrackProps) {
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

    if (item) {
        return (
            <div className="Track">
                <TooltipImage
                    toggled={() => {
                        return seeds.uris.includes(item.uri);
                    }}
                    toggle={() => dispatch(toggleSeeds(item.uri))}
                    image_url={item.album.images[2].url}
                    tip="Set as Seed"
                />

                <div className="track-info">
                    <div className="track-data">
                        <div className="track-title">
                            <a href="/"> {item.name}</a>
                        </div>
                        <span className="track-album-info">
                            <span>
                                {item.artists[0].name} | {item.album.name}
                            </span>
                        </span>
                    </div>
                    <div>{parseMsToTime(item.duration_ms)}</div>
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
