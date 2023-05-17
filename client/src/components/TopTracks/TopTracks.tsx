import React, { useEffect, useState } from "react";
import { Track } from "spotify-types";
import ComponentList from "../ComponentList/ComponentList";

import { getTopTracks } from "../../spotify/service";
import TrackItem from "../TrackItem/TrackItem";

import {
    SpotifyTypesEnum,
    TimeRangeEnum,
    TopItemsQuery,
} from "../../spotify/types";

interface TopTracksProps extends React.HTMLAttributes<any> {
    timeRange: TimeRangeEnum;
    toggleSeed: (uri: string) => void;
    includesSeed: (uri: string) => boolean;
}

function TopTracks({ timeRange, toggleSeed, includesSeed }: TopTracksProps) {
    const [tracks, setTracks] = useState<Array<Track>>([]);
    const [loading, setLoading] = useState(false);

    let maxItems = 50;

    const seeMoreItems = (type: string) => {
        fetchTracks(timeRange, 10, tracks.length)
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
            fetchTracks(timeRange, 10, 0)
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
    }, [tracks]);

    if (loading) {
        return (
            <div>
                <h3>Tracks</h3>
                Loading
            </div>
        );
    }

    return (
        <div>
            <h3>Tracks</h3>
            <ComponentList className="top-item-children" items={tracks}>
                <TrackItem />
            </ComponentList>
            <button
                disabled={tracks.length >= maxItems ? true : false}
                onClick={() => seeMoreItems("tracks")}
            >
                See More
            </button>
        </div>
    );
}

export default TopTracks;
