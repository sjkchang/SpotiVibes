import React, { useEffect, useState } from "react";
import "./UsersTopItems.css";
import CardRow from "../../components/CardRow/CardRow";
import SpotifyTypes from "spotify-types";
import {
    getTopTracks,
    getTopArtists,
    getPlaylists,
} from "../../spotify/service";

import {
    SpotifyTypesEnum,
    TimeRangeEnum,
    TopItemsQuery,
} from "../../spotify/types";

function UsersTopItems() {
    const [tracks, setTracks] = useState<Array<SpotifyTypes.Track>>();
    const [artists, setArtists] = useState<Array<SpotifyTypes.Artist>>();
    const [playlists, setPlaylists] = useState<Array<SpotifyTypes.Playlist>>();

    useEffect(() => {
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
    }, []);

    if (tracks && artists && playlists) {
        return (
            <div>
                <h1>Top Tracks</h1>
                <CardRow items={tracks} />
                <h1>Top Artists</h1>
                <CardRow items={artists} />
                <h1>Your Playlists</h1>
                <CardRow items={playlists} />
            </div>
        );
    } else {
        return <div>loading</div>;
    }
}

export default UsersTopItems;
