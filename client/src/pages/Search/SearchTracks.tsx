import React, { useEffect, useState } from "react";
import SpotifyTypes from "spotify-types";
import { searchSpotify } from "../../spotify/service";
import "./Search.css";
import CardRow from "../../components/CardRow/CardRow";
import BrickList from "../../components/BrickList/BrickList";

interface SearchResultsProps {
    search: string;
}

function Search({ search }: SearchResultsProps) {
    const [loading, setLoading] = useState<boolean>(false);

    const [tracks, setTracks] = useState<Array<SpotifyTypes.Track>>([]);

    useEffect(() => {
        setLoading(true);
        if (search.trim()) {
            searchSpotify({ queryString: search, type: ["track"] })
                .then((response) => {
                    setTracks(response.tracks.items);

                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [search]);

    if (tracks.length == 0 && !loading) {
        return <div>No results found for "{search}"</div>;
    }
    return (
        <div>
            {tracks.length > 0 ? (
                <div>
                    <h1>Results</h1>
                    <BrickList items={tracks} />
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}

export default Search;
