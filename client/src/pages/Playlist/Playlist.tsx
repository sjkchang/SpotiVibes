import React, { useEffect, useState } from "react";
import SpotifyTypes from "spotify-types";
import { getPlaylist } from "../../spotify/service";
import { useParams } from "react-router-dom";

import {
    SpotifyTypesEnum,
    TimeRangeEnum,
    TopItemsQuery,
} from "../../spotify/types";
import BrickList from "../../components/BrickList/BrickList";

function Playlist() {
    const [playlist, setPlaylist] = useState<SpotifyTypes.Playlist>();
    const [playlistTracks, setPlaylistTracks] =
        useState<Array<SpotifyTypes.Track>>();
    const [loading, setLoading] = useState(false);

    let { id } = useParams();

    useEffect(() => {
        setLoading(true);
        if (id) {
            getPlaylist(id)
                .then((result) => {
                    console.log(result);
                    setPlaylist(result[0]);

                    let tracks: Array<SpotifyTypes.Track> = [];
                    for (let track of result[1]) {
                        tracks.push(track.track);
                    }

                    setPlaylistTracks(tracks);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);

    if (loading) {
        return (
            <div>
                <h3>Tracks</h3>
                Loading
            </div>
        );
    }

    if (playlist && playlistTracks) {
        return (
            <div className="Playlist">
                {playlist.name}
                <BrickList items={playlistTracks}></BrickList>
            </div>
        );
    }

    return (
        <div>
            <h3>Tracks</h3>
            Loading
        </div>
    );
}

export default Playlist;
