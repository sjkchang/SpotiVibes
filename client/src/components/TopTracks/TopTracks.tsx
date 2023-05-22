import React, { useEffect, useState } from "react";
import SpotifyTypes from "spotify-types";
import { getTopTracks } from "../../spotify/service";

import {
    SpotifyTypesEnum,
    TimeRangeEnum,
    TopItemsQuery,
} from "../../spotify/types";
import BrickList from "../BrickList/BrickList";

interface TopTracksProps extends React.HTMLAttributes<any> {
    timeRange: TimeRangeEnum;
}

function TopTracks({ timeRange }: TopTracksProps) {
    const [tracks, setTracks] = useState<Array<SpotifyTypes.Track>>([]);
    const [loading, setLoading] = useState(false);

    let maxItems = 50;

    const seeMoreItems = (type: string) => {
        let query = new TopItemsQuery(
            SpotifyTypesEnum.Tracks,
            timeRange,
            10,
            tracks.length
        );
        getTopTracks(query)
            .then((newItems) => {
                setTracks((tracks) => [...tracks, ...newItems]);
            })
            .catch((error) => {});
    };

    useEffect(() => {
        if (tracks.length === 0) {
            setLoading(true);
            let query = new TopItemsQuery(
                SpotifyTypesEnum.Tracks,
                timeRange,
                10,
                0
            );
            getTopTracks(query)
                .then((tracks) => {
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

            <BrickList items={tracks}></BrickList>
        </div>
    );
}

export default TopTracks;
