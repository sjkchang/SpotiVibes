import React from "react";
import { SearchResult } from "../../spotify/service";
import CardGrid from "../../components/Card/layouts/CardGrid";
import useSpotifyApi from "../../hooks/useSpotfiyApi";

interface SearchResultsProps {
    search: string;
}

function Search({ search }: SearchResultsProps) {
    const { response, error, loading } = useSpotifyApi<SearchResult>(
        {
            url: "https://api.spotify.com/v1/search",
            method: "get",
            body: {
                q: search,
                type: "playlist",
            },
        },
        [search]
    );

    if (response) {
        let { items: playlists } = response.playlists;
        if (playlists.length == 0) {
            return <div>No results found for "{search}"</div>;
        }
        return (
            <div>
                <h1>Results</h1>
                <CardGrid items={playlists} />
            </div>
        );
    }
    return (
        <div>
            {loading && <h1>loading</h1>}
            {error && <h1>{error}</h1>}
        </div>
    );
}

export default Search;
