import React from "react";
import { SearchResult } from "../../spotify/service";
import CardGrid from "../../components/Card/layouts/CardGrid";
import useSpotifyApi from "../../hooks/useSpotfiyApi";
import { ScaleLoader } from "react-spinners";

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
                type: "artist",
            },
        },
        [search]
    );

    if (response) {
        let { items: artists } = response.artists;
        if (artists.length == 0) {
            return <div>No results found for "{search}"</div>;
        }
        return (
            <div>
                <h1>Results</h1>
                <CardGrid items={artists} />
            </div>
        );
    }

    return (
        <div>
            {loading && <ScaleLoader color="#36d7b7" />}
            {error && <h1>{error.message}</h1>}
        </div>
    );
}

export default Search;
