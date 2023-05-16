import React, { useEffect, useState } from "react";
import { Track, Artist } from "spotify-types";
import ComponentList from "../ComponentList/ComponentList";

import { getTopArtists, getTopTracks } from "../../spotify/service";
import TrackItem from "../TrackItem/TrackItem";
import ArtistItem from "../ArtistItem/ArtistItem";

import {
    SpotifyTypesEnum,
    TimeRangeEnum,
    TopItemsQuery,
} from "../../spotify/types";

interface TopItemsListProps extends React.HTMLAttributes<any> {
    maxItems: number;
    toggleSeed: (uri: string) => void;
    includesSeed: (uri: string) => boolean;
}

function TopItemsList({
    maxItems,
    toggleSeed,
    includesSeed,
}: TopItemsListProps) {
    const [tracks, setTracks] = useState<Array<Track>>([]);
    const [artists, setArtists] = useState<Array<Artist>>([]);

    const seeMoreItems = (type: string) => {
        console.log("See more");
        if (type === "tracks") {
            fetchTracks(TimeRangeEnum.Medium, 10, tracks.length)
                .then((newItems) => {
                    setTracks((tracks) => [...tracks, ...newItems]);
                })
                .catch((error) => {});
        } else if (type === "artists") {
            fetchArtists(TimeRangeEnum.Medium, 10, artists.length)
                .then((newItems) => {
                    setArtists((artists) => [...artists, ...newItems]);
                })
                .catch((error) => {});
        }
    };

    async function fetchTracks(
        time_range: TimeRangeEnum,
        limit: number,
        offset: number
    ) {
        let query = new TopItemsQuery(
            SpotifyTypesEnum.Tracks,
            TimeRangeEnum.Medium,
            limit,
            offset
        );
        let response = await getTopTracks(query);
        console.log("Response: ");
        console.log(response);
        return response;
    }

    async function fetchArtists(
        time_range: TimeRangeEnum,
        limit: number,
        offset: number
    ) {
        let query = new TopItemsQuery(
            SpotifyTypesEnum.Tracks,
            TimeRangeEnum.Medium,
            limit,
            offset
        );
        let response = await getTopArtists(query);
        console.log("Response: ");
        console.log(response);
        return response;
    }

    useEffect(() => {
        if (tracks.length === 0) {
            fetchTracks(TimeRangeEnum.Medium, 10, 0)
                .then((tracks) => {
                    console.log("tracks:");
                    console.log(tracks);
                    setTracks(tracks);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        if (artists.length === 0) {
            fetchArtists(TimeRangeEnum.Medium, 10, 0)
                .then((artists) => {
                    setArtists(artists);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [tracks, artists]);

    return (
        <div className="top-items">
            <div>
                <ComponentList className="top-item-children" items={artists}>
                    <ArtistItem
                        includesSeed={includesSeed}
                        toggleSeed={toggleSeed}
                    />
                </ComponentList>
                <button
                    disabled={artists.length >= maxItems ? true : false}
                    onClick={() => seeMoreItems("artists")}
                >
                    See More
                </button>
            </div>
            <div>
                <ComponentList className="top-item-children" items={tracks}>
                    <TrackItem
                        includesSeed={includesSeed}
                        toggleSeed={toggleSeed}
                    />
                </ComponentList>
                <button
                    disabled={tracks.length >= maxItems ? true : false}
                    onClick={() => seeMoreItems("tracks")}
                >
                    See More
                </button>
            </div>
        </div>
    );
}

export default TopItemsList;
