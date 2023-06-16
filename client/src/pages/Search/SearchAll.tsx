import React from "react";
import { SearchResult } from "../../spotify/service";
import BrickList from "../../components/Brick/layouts/BrickList/BrickList";
import useSpotifyApi from "../../hooks/useSpotfiyApi";
import fuzzysort from "fuzzysort";
import SpotifyTypes from "spotify-types";
import { current } from "@reduxjs/toolkit";
import Card from "../../components/Card/Card";
import styled from "styled-components";
import CardGrid from "../../components/Card/layouts/CardGrid";

const SearchResults = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const Header = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`;

const TopResult = styled.div`
    min-width: 260px;
`;

const Tracks = styled.div``;

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
                type: ["artist", "track", "playlist"].toString(),
                limit: 6,
            },
        },
        [search]
    );

    if (response) {
        let { items: tracks } = response.tracks;
        let { items: playlists } = response.playlists;
        let { items: artists } = response.artists;

        if (
            tracks.length == 0 &&
            artists.length == 0 &&
            playlists.length == 0
        ) {
            return <div>No results found for "{search}"</div>;
        }

        const topTrack =
            tracks.length > 0
                ? fuzzysort.go(search, [tracks[0]], { key: "name" })
                : [null];
        const topArtist =
            artists.length > 0
                ? fuzzysort.go(search, [artists[0]], { key: "name" })
                : [null];
        const topPlaylist =
            playlists.length > 0
                ? fuzzysort.go(search, [playlists[0]], {
                      key: "name",
                  })
                : [null];

        let topResult = [topTrack[0], topArtist[0], topPlaylist[0]].reduce(
            (prev, current) => {
                if (!prev) return current;
                if (!current) return prev;
                return prev.score > current.score ? prev : current;
            }
        );

        return (
            <SearchResults>
                <Header>
                    {topResult && (
                        <TopResult>
                            <h1>Top Result</h1>
                            <Card item={topResult.obj} />
                        </TopResult>
                    )}
                    {tracks && (
                        <Tracks>
                            <h1>Songs</h1>
                            <BrickList items={tracks.slice(0, 4)} />
                        </Tracks>
                    )}
                </Header>

                {artists && (
                    <Tracks>
                        <h1>Artists</h1>
                        <CardGrid items={artists} />
                    </Tracks>
                )}
                {playlists && (
                    <Tracks>
                        <h1>Playlists</h1>
                        <CardGrid items={playlists} />
                    </Tracks>
                )}
            </SearchResults>
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
