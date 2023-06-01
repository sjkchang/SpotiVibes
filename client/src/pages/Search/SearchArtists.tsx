import React, { useEffect, useState } from "react";
import SpotifyTypes from "spotify-types";
import { searchSpotify } from "../../spotify/service";
import "./Search.css";
import CardGrid from "../../components/CardGrid/CardGrid";

interface SearchResultsProps {
    search: string;
}

function Search({ search }: SearchResultsProps) {
    const [loading, setLoading] = useState<boolean>(false);

    const [artists, setArtists] = useState<Array<SpotifyTypes.Artist>>([]);

    useEffect(() => {
        setLoading(true);
        if (search.trim()) {
            searchSpotify({ queryString: search, type: ["playlist"] })
                .then((response) => {
                    setArtists(response.artists.items);

                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [search]);

    if (artists.length == 0 && !loading) {
        return <div>No results found for "{search}"</div>;
    }
    return (
        <div>
            {artists.length > 0 ? (
                <div>
                    <h1>Results</h1>
                    <CardGrid items={artists} />
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}

export default Search;
