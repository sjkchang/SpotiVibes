import React, { useEffect, useState } from "react";
import SpotifyTypes from "spotify-types";
import { getRecentTracks } from "../../spotify/service";
import { useParams } from "react-router-dom";
import BrickList from "../../components/Brick/layouts/BrickList/BrickList";

function Recent() {
    const [tracks, setTracks] = useState<Array<SpotifyTypes.Track>>();

    useEffect(() => {
        getRecentTracks()
            .then((tracks) => {
                setTracks(tracks);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    if (tracks) {
        return (
            <div className="Recent">
                <h1 className="RecentHeader"> Recently Played</h1>
                <BrickList items={tracks} />
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

export default Recent;
