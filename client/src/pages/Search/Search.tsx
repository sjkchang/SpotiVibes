import React, { useEffect, useState } from "react";
import SpotifyTypes from "spotify-types";
import { searchSpotify } from "../../spotify/service";
import "./Search.css";
import CardRow from "../../components/CardRow/CardRow";

interface SearchResultsProps {
    search: string;
}

function Search({ search }: SearchResultsProps) {
    const [loading, setLoading] = useState<boolean>(false);

    const [tracks, setTracks] = useState<Array<SpotifyTypes.Track>>([]);
    const [artists, setArtists] = useState<Array<SpotifyTypes.Artist>>([]);
    const [playlists, setPlaylists] = useState<Array<SpotifyTypes.Playlist>>(
        []
    );

    useEffect(() => {
        setLoading(true);
        if (search.trim()) {
            searchSpotify({ queryString: search })
                .then((response) => {
                    setTracks(response.tracks.items);
                    setArtists(response.artists.items);
                    setPlaylists(response.playlists.items);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [search]);

    if (
        tracks.length == 0 &&
        artists.length == 0 &&
        playlists.length == 0 &&
        !loading
    ) {
        return <div>No results found for "{search}"</div>;
    }
    return (
        <div>
            {tracks.length > 0 ? (
                <div>
                    <h1>Tracks</h1>
                    <CardRow items={tracks} />
                </div>
            ) : (
                <></>
            )}

            {artists.length > 0 ? (
                <div>
                    <h1>Artists</h1>
                    <CardRow items={artists} />
                </div>
            ) : (
                <></>
            )}

            {playlists.length > 0 ? (
                <div>
                    <h1>Playlists</h1>
                    <CardRow items={playlists} />
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}

export default Search;
