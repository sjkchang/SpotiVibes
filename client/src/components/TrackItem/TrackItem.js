import React from "react";
import TooltipImage from "../TooltipImage/TooltipImage";
import "./TrackItem.css";

function TrackItem({ item, includesSeed, toggleSeed }) {
    function parseMsToTime(milliseconds) {
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

    return (
        <div className="Track">
            <TooltipImage
                toggled={() => includesSeed(item.uri)}
                toggle={() => toggleSeed(item.uri)}
                uri={item.uri}
                image_url={item.album.images[2].url}
                tip="Set as Seed"
            />

            <div className="track-info">
                <div className="track-data">
                    <div className="track-title">
                        <a href=""> {item.name}</a>
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
