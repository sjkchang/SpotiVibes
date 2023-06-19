import React, { useEffect, useState } from "react";
import useSpotifyApi from "../hooks/useSpotfiyApi";
import CardGrid from "../components/Card/layouts/CardGrid";
import SpotifyTypes from "spotify-types";
import BrickList from "../components/Brick/layouts/BrickList/BrickList";
import { SyncLoader } from "react-spinners";

function Playlists() {
    let { response, loading, error } = useSpotifyApi<
        SpotifyTypes.Paging<SpotifyTypes.Playlist>
    >({
        url: "https://api.spotify.com/v1/me/playlists",
        method: "get",
        body: {
            limit: 10,
            offset: 0,
        },
    });

    const [playlists, setPlaylists] = useState<Array<SpotifyTypes.Playlist>>(
        []
    );
    useEffect(() => {
        if (response !== undefined) {
            setPlaylists(response.items);
        }
    }, [response]);

    return (
        <div className="Playlists">
            <h1>Playlists</h1>
            {playlists && <CardGrid items={playlists} />}
            {error && error.message}
            {loading && <SyncLoader />}
        </div>
    );
}

export default Playlists;
