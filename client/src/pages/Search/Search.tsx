import React, { useEffect, useState } from "react";
import SpotifyTypes from "spotify-types";
import {
    searchSpotify,
    SearchResult,
    getTopTracks,
    getTopArtists,
    getPlaylists,
} from "../../spotify/service";
import { useParams } from "react-router-dom";
import BrickList from "../../components/BrickList/BrickList";
import CardGrid from "../../components/CardGrid/CardGrid";
import GeneratePlaylist from "../GeneratePlaylists/GeneratePlaylist";
import "./Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {
    SpotifyTypesEnum,
    TimeRangeEnum,
    TopItemsQuery,
} from "../../spotify/types";
import CardRow from "../../components/CardRow/CardRow";

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
            let query = new TopItemsQuery(
                SpotifyTypesEnum.Tracks,
                TimeRangeEnum.Long,
                20,
                0
            );
            getTopTracks(query)
                .then((tracks) => {
                    setTracks(tracks);
                })
                .catch((error) => {
                    console.log(error);
                });
            getTopArtists(query)
                .then((artists) => {
                    setArtists(artists);
                })
                .catch((error) => {
                    console.log(error);
                });
            getPlaylists(20, 0)
                .then((playlists) => {
                    setPlaylists(playlists);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [search]);

    if (tracks && artists && playlists) {
        if (search) {
            return (
                <div>
                    <div className="SearchBar">
                        <FontAwesomeIcon
                            className="input-icon"
                            icon={faMagnifyingGlass}
                        />
                        <input
                            className="SearchInput"
                            type="search"
                            placeholder="What are you looking for"
                            onChange={(event) => {
                                setSearch(event.target.value);
                            }}
                        ></input>
                    </div>

                    <h1>Tracks</h1>
                    <CardRow items={tracks} />
                    <h1>Artists</h1>
                    <CardRow items={artists} />
                    <h1>Playlists</h1>
                    <CardRow items={playlists} />
                </div>
            );
        } else {
            return (
                <div>
                    <div className="SearchBar">
                        <FontAwesomeIcon
                            className="input-icon"
                            icon={faMagnifyingGlass}
                        />
                        <input
                            className="SearchInput"
                            type="search"
                            placeholder="What are you looking for"
                            onChange={(event) => {
                                setSearch(event.target.value);
                            }}
                        ></input>
                    </div>

                    <h1>Top Tracks</h1>
                    <CardRow items={tracks} />
                    <h1>Top Artists</h1>
                    <CardRow items={artists} />
                    <h1>Your Playlists</h1>
                    <CardRow items={playlists} />
                </div>
            );
        }
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
