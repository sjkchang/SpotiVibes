import React, { useEffect, useState } from "react";
import SpotifyTypes from "spotify-types";
import { getArtist } from "../../spotify/service";
import { useParams } from "react-router-dom";

import {
    SpotifyTypesEnum,
    TimeRangeEnum,
    TopItemsQuery,
} from "../../spotify/types";
import BrickList from "../../components/BrickList/BrickList";

function Artist() {
    const [artist, setArtist] = useState<SpotifyTypes.Artist>();
    const [artistTopTracks, setArtistTopTracks] =
        useState<Array<SpotifyTypes.Track>>();
    const [loading, setLoading] = useState(false);

    let { id } = useParams();

    useEffect(() => {
        setLoading(true);
        if (id) {
            getArtist(id)
                .then((result) => {
                    console.log(result);
                    setArtist(result[0]);

                    setArtistTopTracks(result[1]);
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

    if (artist && artistTopTracks) {
        return (
            <div className="Playlist">
                {artist.name}
                <BrickList items={artistTopTracks}></BrickList>
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

export default Artist;
