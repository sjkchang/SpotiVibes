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

interface TopItemsListProps extends React.HTMLAttributes<any> {
    timeRange: TimeRangeEnum;
}

function TopItemsList({ timeRange }: TopItemsListProps) {
    const [artists, setArtists] = useState<Array<SpotifyTypes.Artist>>([]);
    const [loading, setLoading] = useState(false);

    let maxItems = 50;

    const seeMoreItems = (type: string) => {
        let query = new TopItemsQuery(
            SpotifyTypesEnum.Tracks,
            timeRange,
            10,
            artists.length
        );
        getTopArtists(query)
            .then((newItems) => {
                setArtists((artists) => [...artists, ...newItems]);
            })
            .catch((error) => {});
    };

    useEffect(() => {
        if (artists.length === 0) {
            setLoading(true);
            let query = new TopItemsQuery(
                SpotifyTypesEnum.Tracks,
                timeRange,
                10,
                0
            );
            getTopArtists(query)
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
                <h3>Artists</h3>
            </div>
            <BrickList items={artists} />
            <button
                className="btn"
                disabled={artists.length >= maxItems ? true : false}
                onClick={() => seeMoreItems("artists")}
            >
                See More
            </button>
        </div>
    );
}

export default TopItemsList;
