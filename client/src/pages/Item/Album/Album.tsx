import React, { useEffect, useState } from "react";
import SpotifyTypes from "spotify-types";
import { getAlbum } from "../../../spotify/service";
import { useParams } from "react-router-dom";
import {
    SpotifyTypesEnum,
    TimeRangeEnum,
    TopItemsQuery,
} from "../../../spotify/types";
import BrickList from "../../../components/BrickList/BrickList";

function Album() {
    const [album, setAlbum] = useState<SpotifyTypes.Album>();
    const [albumTracks, setAlbumTracks] = useState<Array<SpotifyTypes.Track>>(
        []
    );

    let { id } = useParams();

    useEffect(() => {
        if (id) {
            getAlbum(id)
                .then((result) => {
                    setAlbum(result[0]);

                    let tracks = [];
                    for (let track of result[1]) {
                        track.album = result[0];
                        tracks.push(track);
                    }

                    setAlbumTracks(tracks);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);

    if (album) {
        let image =
            album.images.length > 0
                ? album.images[0].url
                : "https://freeimage.host/i/album-cover-placeholder.HlHy9Yx";

        let length = albumTracks.length;
        return (
            <div className="Playlist">
                <div className="PlaylistInfo">
                    <div className="PlaylistImage">
                        <img className="Image" src={image}></img>
                    </div>
                    <div className="PlaylistName">{album.name}</div>
                    <div className="PlaylistDescription">
                        By: {album.artists[0].name}
                    </div>

                    <div className="PlaylistCount">
                        {album.total_tracks} Tracks
                    </div>
                </div>

                <BrickList items={albumTracks}></BrickList>
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

export default Album;
