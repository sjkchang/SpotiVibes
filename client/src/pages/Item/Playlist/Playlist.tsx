import React, { useEffect, useState } from "react";
import SpotifyTypes from "spotify-types";
import { getPlaylist } from "../../../spotify/service";
import { useParams } from "react-router-dom";
import "./Playlist.css";
import {
    SpotifyTypesEnum,
    TimeRangeEnum,
    TopItemsQuery,
} from "../../../spotify/types";
import BrickList from "../../../components/BrickList/BrickList";

function Playlist() {
    const [playlist, setPlaylist] = useState<SpotifyTypes.Playlist>();
    const [playlistTracks, setPlaylistTracks] =
        useState<Array<SpotifyTypes.Track>>();

    let { id } = useParams();

    useEffect(() => {
        if (id) {
            getPlaylist(id)
                .then((result) => {
                    setPlaylist(result[0]);

                    let tracks: Array<SpotifyTypes.Track> = [];
                    for (let track of result[1]) {
                        tracks.push(track.track);
                    }

                    setPlaylistTracks(tracks);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);

    if (playlist && playlistTracks) {
        let image =
            playlist.images.length > 0
                ? playlist.images[0].url
                : "https://freeimage.host/i/album-cover-placeholder.HlHy9Yx";

        let length = playlistTracks.length;
        return (
            <div className="Playlist">
                <div className="PlaylistInfo">
                    <div className="PlaylistImage">
                        <img className="Image" src={image}></img>
                    </div>
                    <div className="PlaylistName">{playlist.name}</div>
                    <div className="PlaylistDescription">
                        By: {playlist.owner.display_name}
                    </div>
                    <div className="PlaylistDescription">
                        {playlist.description}
                    </div>
                    <div className="PlaylistCount">{length} Tracks</div>
                </div>

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
