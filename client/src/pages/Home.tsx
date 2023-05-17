import React, { useEffect, useState } from "react";
import TopItems from "./TopItems/TopItems";
import { Artist, Track } from "spotify-types";
import { getTopArtists, getTopTracks } from "../spotify/service";

import "./Home.css";
import Nav from "../components/Nav/Nav";
import SelectedSeeds from "../components/SelectedSeeds/SelectedSeeds";

function Home({ logout }: any) {
    const [seeds, setSeeds] = useState<Array<string>>([]);

    let toggleSeed = (uri: string): void => {
        console.log("Clicked");
    };

    let includesSeed = (uri: string): boolean => {
        return seeds.includes(uri);
    };

    return (
        <div>
            <Nav></Nav>
            <SelectedSeeds />
            <TopItems
                className="top-item-children"
                toggleSeed={toggleSeed}
                includesSeed={includesSeed}
            ></TopItems>

            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default Home;
