import React, { useEffect, useState } from "react";
import SpotifyTypes from "spotify-types";
import { getTopTracks } from "../../spotify/service";

import {
    SpotifyTypesEnum,
    TimeRangeEnum,
    TopItemsQuery,
} from "../../spotify/types";
import CardScroll from "../CardScroll/CardScroll";

interface TopTracksProps extends React.HTMLAttributes<any> {
    timeRange: TimeRangeEnum;
}

function TopTracks({ timeRange }: TopTracksProps) {
    const [tracks, setTracks] = useState<Array<SpotifyTypes.Track>>([]);
    const [loading, setLoading] = useState(false);

    let maxItems = 50;

    const seeMoreItems = (type: string) => {
        fetchTracks(timeRange, 20, tracks.length)
            .then((newItems) => {
                setTracks((tracks) => [...tracks, ...newItems]);
            })
            .catch((error) => {});
    };

    async function fetchTracks(
        time_range: TimeRangeEnum,
        limit: number,
        offset: number
    ) {
        let query = new TopItemsQuery(
            SpotifyTypesEnum.Tracks,
            time_range,
            limit,
            offset
        );
        let response = await getTopTracks(query);
        return response;
    }

    useEffect(() => {
        if (tracks.length === 0) {
            setLoading(true);
            fetchTracks(timeRange, 20, 0)
                .then((tracks) => {
                    console.log("tracks:");
                    console.log(tracks);
                    setTracks(tracks);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [tracks, timeRange]);

    if (loading) {
        return (
            <div>
                <h3>Tracks</h3>
                Loading
            </div>
        );
    }

    return (
        <div className="Top-Tracks">
            <div className="top-header">
                <h2>Tracks</h2>
                <button
                    className="btn"
                    disabled={tracks.length >= maxItems ? true : false}
                    onClick={() => seeMoreItems("tracks")}
                >
                    See More
                </button>
            </div>

            <CardScroll items={tracks}></CardScroll>
        </div>
    );
}

export default TopTracks;
