import { Playlist } from "spotify-types";
import "./Playlists.css";
import React, { useEffect, useState } from "react";
import { getPlaylists } from "../../spotify/service";
import BrickList from "../../components/BrickList/BrickList";
import CardGrid from "../../components/CardGrid/CardGrid";

function Playlists() {
    let [playlists, setPlaylists] = useState<Array<Playlist>>([]);

    async function fetchPlaylists(limit: number, offset: number) {
        let response = await getPlaylists(limit, offset);
        return response;
    }

    useEffect(() => {
        if (playlists.length === 0) {
            fetchPlaylists(20, 0)
                .then((playlists) => {
                    console.log(playlists);
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
            <BrickList items={playlists} />
        </div>
    );
}

export default Playlists;
