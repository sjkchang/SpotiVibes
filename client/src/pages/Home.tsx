import React, { useEffect, useState } from "react";

import { Artist, Track } from "spotify-types";
import { getTopArtists, getTopTracks } from "../spotify/service";

import TopItemsList from "../components/TopItemsList/TopItemsList";
import "./Home.css";

function Home({ logout }: any) {
    const [seeds, setSeeds] = useState<Array<string>>([]);

    let toggleSeed = (uri: string): void => {
        if (includesSeed(uri)) {
            setSeeds((seeds) => {
                return seeds.filter((seeds) => seeds !== uri);
            });
        } else {
            if (seeds.length < 5) {
                setSeeds((seeds): Array<string> => [...seeds, uri]);
            }
        }
        console.log("Clicked");
    };

    let includesSeed = (uri: string): boolean => {
        return seeds.includes(uri);
    };

    return (
        <div>
            <TopItemsList
                className="top-item-children"
                maxItems={50}
                toggleSeed={toggleSeed}
                includesSeed={includesSeed}
            ></TopItemsList>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default Home;
