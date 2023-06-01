import React, { useEffect, useState } from "react";
import SpotifyTypes from "spotify-types";
import { searchSpotify } from "../../spotify/service";
import "./Search.css";
import CardRow from "../../components/CardRow/CardRow";
import BrickList from "../../components/BrickList/BrickList";
import CardGrid from "../../components/CardGrid/CardGrid";

interface SearchResultsProps {
    search: string;
}

function Search({ search }: SearchResultsProps) {
    const [loading, setLoading] = useState<boolean>(false);

    const [playlists, setPlaylists] = useState<Array<SpotifyTypes.Playlist>>(
        []
    );

    useEffect(() => {
        setLoading(true);
        if (search.trim()) {
            searchSpotify({ queryString: search, type: ["playlist"] })
                .then((response) => {
                    setPlaylists(response.playlists.items);

                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [search]);

    if (playlists.length == 0 && !loading) {
        return <div>No results found for "{search}"</div>;
    }
    return (
        <div>
            {playlists.length > 0 ? (
                <div>
                    <h1>Results</h1>
                    <CardGrid items={playlists} />
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}

export default Search;
