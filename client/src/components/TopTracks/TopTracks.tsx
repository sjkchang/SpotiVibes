import React, { useEffect, useState } from "react";
import SpotifyTypes from "spotify-types";
import { getTopTracks } from "../../spotify/service";

import {
    SpotifyTypesEnum,
    TimeRangeEnum,
    TopItemsQuery,
} from "../../spotify/types";
import BrickList from "../BrickList/BrickList";

const NUM_ITEMS_PER_LOAD = 20;
const MAX_ITEMS = 50;

function TopTracks() {
    const [timeRange, setTimeRange] = useState<TimeRangeEnum>(
        TimeRangeEnum.Medium
    );

    const [tracks, setTracks] = useState<Array<SpotifyTypes.Track>>([]);
    const [itemsExhausted, setItemsExhausted] = useState<boolean>(false);

    const changeTimeFrame = (timeRange: TimeRangeEnum) => {
        setTracks([]);
        setTimeRange(timeRange);
        setItemsExhausted(false);
    };

    const seeMoreItems = (type: string) => {
        let query = new TopItemsQuery(
            SpotifyTypesEnum.Tracks,
            timeRange,
            NUM_ITEMS_PER_LOAD,
            tracks.length
        );
        getTopTracks(query)
            .then((newItems) => {
                let combinedArray = [...tracks, ...newItems];
                if (combinedArray.length < tracks.length + NUM_ITEMS_PER_LOAD) {
                    setItemsExhausted(true);
                }
                setTracks(combinedArray);
            })
            .catch((error) => {});
    };

    useEffect(() => {
        if (tracks.length === 0) {
            let query = new TopItemsQuery(
                SpotifyTypesEnum.Tracks,
                timeRange,
                NUM_ITEMS_PER_LOAD,
                0
            );
            getTopTracks(query)
                .then((tracks) => {
                    setTracks(tracks);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [tracks, timeRange]);

    return (
        <div className="Top-Tracks">
            <div className="top-header">
                <h1>Top Tracks</h1>
                <button onClick={() => changeTimeFrame(TimeRangeEnum.Short)}>
                    Short
                </button>
                <button onClick={() => changeTimeFrame(TimeRangeEnum.Medium)}>
                    Medium
                </button>
                <button onClick={() => changeTimeFrame(TimeRangeEnum.Long)}>
                    Long
                </button>
            </div>

            <BrickList items={tracks}></BrickList>
            <button
                className="btn"
                disabled={
                    tracks.length >= MAX_ITEMS || itemsExhausted ? true : false
                }
                onClick={() => seeMoreItems("tracks")}
            >
                See More
            </button>
        </div>
    );
}

export default TopTracks;
