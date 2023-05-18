import { Playlist } from "spotify-types";
import "./Playlists.css";
import React, { useEffect, useState } from "react";
import { getPlaylists } from "../../spotify/service";
import CardScroll from "../../components/CardScroll/CardScroll";

function Playlists() {
    let [playlists, setPlaylists] = useState<Array<Playlist>>([]);

    async function fetchPlaylists(limit: number, offset: number) {
        let response = await getPlaylists(limit, offset);
        console.log("Response: ");
        console.log(response);
        return response;
    }

    useEffect(() => {
        if (playlists.length === 0) {
            fetchPlaylists(20, 0)
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
            <CardScroll items={playlists} />
        </div>
    );
}

export default Playlists;
