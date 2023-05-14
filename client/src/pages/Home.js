import React, { useEffect, useState } from "react";
import TopItems from "../components/TopItems";
import UserProfile from "../components/UserProfile";
import Genres from "../components/Genres";
import ArtistItem from "../components/ArtistItem/ArtistItem";
import TrackItem from "../components/TrackItem/TrackItem";
import "./Home.css";

function Home({ logout }) {
    const [seeds, setSeeds] = useState([]);
    useEffect(() => {
        console.log(seeds);
    });

    let toggleSeed = (uri) => {
        if (includesSeed(uri)) {
            setSeeds((seeds) => {
                return seeds.filter((seeds) => seeds != uri);
            });
        } else {
            if (seeds.length < 5) {
                setSeeds((seeds) => [...seeds, uri]);
            }
        }
        console.log("Clicked");
    };

    let includesSeed = (uri) => {
        return seeds.includes(uri);
    };

    return (
        <div>
            <button onClick={logout}>Logout</button>
            <UserProfile />
            <div className="top-items">
                <TopItems className="top-item-children">
                    <ArtistItem
                        includesSeed={includesSeed}
                        toggleSeed={toggleSeed}
                    />
                </TopItems>
                <TopItems className="top-item-children">
                    <TrackItem
                        includesSeed={includesSeed}
                        toggleSeed={toggleSeed}
                    />
                </TopItems>
            </div>

            <Genres seeds={seeds} setSeeds={setSeeds} />
        </div>
    );
}

export default Home;
