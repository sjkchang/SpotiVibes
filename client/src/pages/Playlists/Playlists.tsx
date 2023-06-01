import { Playlist } from "spotify-types";
import "./Playlists.css";
import React, { useEffect, useState } from "react";
import { getPlaylists } from "../../spotify/service";
import BrickList from "../../components/BrickList/BrickList";
import CardGrid from "../../components/CardGrid/CardGrid";

function Playlists() {
    let [playlists, setPlaylists] = useState<Array<Playlist>>([]);

    useEffect(() => {
        if (playlists.length === 0) {
            getPlaylists(50, 0)
                .then((playlists) => {
                    setPlaylists(playlists);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [playlists]);

    return (
        <div className="Playlists">
            <h1>Playlists</h1>
            <CardGrid items={playlists} />
        </div>
    );
}

export default Playlists;
