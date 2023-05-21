import React, { useEffect, useState } from "react";
import SpotifyTypes from "spotify-types";
import { getTrack } from "../../spotify/service";
import { useParams } from "react-router-dom";

function Track() {
    const [track, setTrack] = useState<SpotifyTypes.Track>();

    const [loading, setLoading] = useState(false);

    let { id } = useParams();

    useEffect(() => {
        setLoading(true);
        if (id) {
            getTrack(id)
                .then((result) => {
                    setTrack(result);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [id]);

    if (loading) {
        return (
            <div>
                <h3>Tracks</h3>
                Loading
            </div>
        );
    }

    if (track) {
        return <div className="Playlist">{track.name}</div>;
    }

    return (
        <div>
            <h3>Tracks</h3>
            Loading
        </div>
    );
}

export default Track;
