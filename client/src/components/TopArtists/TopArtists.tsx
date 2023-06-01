import React, { useEffect, useState } from "react";
import SpotifyTypes from "spotify-types";
import { getTopArtists } from "../../spotify/service";

import {
    SpotifyTypesEnum,
    TimeRangeEnum,
    TopItemsQuery,
} from "../../spotify/types";
import CardGrid from "../CardGrid/CardGrid";
import BrickList from "../BrickList/BrickList";

const NUM_ITEMS_PER_LOAD = 10;
const MAX_ITEMS = 50;

function TopItemsList() {
    const [timeRange, setTimeRange] = useState<TimeRangeEnum>(
        TimeRangeEnum.Medium
    );
    const [artists, setArtists] = useState<Array<SpotifyTypes.Artist>>([]);
    const [itemsExhausted, setItemsExhausted] = useState<boolean>(false);

    const changeTimeFrame = (timeRange: TimeRangeEnum) => {
        setArtists([]);
        setTimeRange(timeRange);
        setItemsExhausted(false);
    };

    const seeMoreItems = (type: string) => {
        let query = new TopItemsQuery(
            SpotifyTypesEnum.Tracks,
            timeRange,
            NUM_ITEMS_PER_LOAD,
            artists.length
        );
        getTopArtists(query)
            .then((newItems) => {
                let combinedArray = [...artists, ...newItems];
                if (
                    combinedArray.length <
                    artists.length + NUM_ITEMS_PER_LOAD
                ) {
                    setItemsExhausted(true);
                }

                setArtists(combinedArray);
            })
            .catch((error) => {});
    };

    useEffect(() => {
        if (artists.length === 0) {
            let query = new TopItemsQuery(
                SpotifyTypesEnum.Tracks,
                timeRange,
                NUM_ITEMS_PER_LOAD,
                0
            );
            getTopArtists(query)
                .then((artists) => {
                    setArtists(artists);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [artists, timeRange]);

    return (
        <div>
            <div className="top-header">
                <h1>Top Artists</h1>
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
            <CardGrid items={artists} />
            <button
                className="btn"
                disabled={
                    artists.length >= MAX_ITEMS || itemsExhausted ? true : false
                }
                onClick={() => seeMoreItems("artists")}
            >
                See More
            </button>
        </div>
    );
}

export default TopItemsList;
