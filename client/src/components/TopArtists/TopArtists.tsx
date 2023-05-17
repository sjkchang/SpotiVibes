import React, { useEffect, useState } from "react";
import { Artist } from "spotify-types";
import ComponentList from "../ComponentList/ComponentList";

import { getTopArtists, getTopTracks } from "../../spotify/service";
import ArtistItem from "../ArtistItem/ArtistItem";

import {
    SpotifyTypesEnum,
    TimeRangeEnum,
    TopItemsQuery,
} from "../../spotify/types";

interface TopItemsListProps extends React.HTMLAttributes<any> {
    timeRange: TimeRangeEnum;
    toggleSeed: (uri: string) => void;
    includesSeed: (uri: string) => boolean;
}

function TopItemsList({
    timeRange,
    toggleSeed,
    includesSeed,
}: TopItemsListProps) {
    const [artists, setArtists] = useState<Array<Artist>>([]);
    const [loading, setLoading] = useState(false);

    let maxItems = 50;

    const seeMoreItems = (type: string) => {
        fetchArtists(timeRange, 10, artists.length)
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
            fetchArtists(timeRange, 10, 0)
                .then((artists) => {
                    setArtists(artists);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [artists]);

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
            <h3>Artists</h3>
            <ComponentList className="top-item-children" items={artists}>
                <ArtistItem />
            </ComponentList>
            <button
                disabled={artists.length >= maxItems ? true : false}
                onClick={() => seeMoreItems("artists")}
            >
                See More
            </button>
        </div>
    );
}

export default TopItemsList;
