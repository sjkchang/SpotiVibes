import React, { useEffect, useState } from "react";
import SpotifyTypes from "spotify-types";
import { getTopArtists } from "../../spotify/service";

import {
    SpotifyTypesEnum,
    TimeRangeEnum,
    TopItemsQuery,
} from "../../spotify/types";
import CardScroll from "../CardScroll/CardScroll";

interface TopItemsListProps extends React.HTMLAttributes<any> {
    timeRange: TimeRangeEnum;
}

function TopItemsList({ timeRange }: TopItemsListProps) {
    const [artists, setArtists] = useState<Array<SpotifyTypes.Artist>>([]);
    const [loading, setLoading] = useState(false);

    let maxItems = 50;

    const seeMoreItems = (type: string) => {
        fetchArtists(timeRange, 20, artists.length)
            .then((newItems) => {
                setArtists((artists) => [...artists, ...newItems]);
            })
            .catch((error) => {});
    };

    async function fetchArtists(
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
        let response = await getTopArtists(query);
        console.log("Response: ");
        console.log(response);
        return response;
    }

    useEffect(() => {
        if (artists.length === 0) {
            setLoading(true);
            fetchArtists(timeRange, 20, 0)
                .then((artists) => {
                    setArtists(artists);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [artists, timeRange]);

    if (loading) {
        return (
            <div>
                <h3>Artists</h3>
                Loading
            </div>
        );
    }

    return (
        <div>
            <div className="top-header">
                <h2>Artists</h2>
                <button
                    className="btn"
                    disabled={artists.length >= maxItems ? true : false}
                    onClick={() => seeMoreItems("artists")}
                >
                    See More
                </button>
            </div>
            <CardScroll items={artists} />
        </div>
    );
}

export default TopItemsList;
