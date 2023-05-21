import React, { useEffect, useState } from "react";
import SpotifyTypes from "spotify-types";
import { searchSpotify, SearchResult } from "../../spotify/service";
import { useParams } from "react-router-dom";
import BrickList from "../../components/BrickList/BrickList";
import CardGrid from "../../components/CardGrid/CardGrid";

function Search() {
    const [search, setSearch] = useState<string>();
    const [searchResult, setSearchResult] = useState<SearchResult>();

    const [tracks, setTracks] = useState<Array<SpotifyTypes.Track>>();
    const [artists, setArtists] = useState<Array<SpotifyTypes.Artist>>();
    const [playlists, setPlaylists] = useState<Array<SpotifyTypes.Playlist>>();

    useEffect(() => {
        if (search) {
            if (search.trim()) {
                searchSpotify({ queryString: search })
                    .then((response) => {
                        setSearchResult(response);
                        setTracks(response.tracks.items);
                        setArtists(response.artists.items);
                        setPlaylists(response.playlists.items);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        } else {
            setTracks([]);
            setArtists([]);
            setPlaylists([]);
        }
    }, [search]);

    if (tracks && artists && playlists) {
        return (
            <div>
                <h3>Search</h3>
                <input
                    type="search"
                    onChange={(event) => {
                        setSearch(event.target.value);
                    }}
                ></input>
                <BrickList items={tracks} />
                <BrickList items={artists} />
                <CardGrid items={playlists} />
            </div>
        );
    } else {
        return (
            <div>
                <h3>Search</h3>
                <input
                    type="search"
                    onChange={(event) => {
                        setSearch(event.target.value);
                    }}
                ></input>
            </div>
        );
    }
}

export default Search;
