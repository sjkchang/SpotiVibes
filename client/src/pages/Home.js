import React, { useEffect, useState, useCallback } from "react";
import UserProfile from "../components/UserProfile";
import Genres from "../components/Genres";
import ArtistItem from "../components/ArtistItem/ArtistItem";
import TrackItem from "../components/TrackItem/TrackItem";
import TestComponent from "../components/TestComponent";

import { getTopItems } from "../spotify/service";

import "./Home.css";
import ComponentList from "../components/ComponentList/ComponentList";

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

    const [tracks, setTracks] = useState([]);
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchAPI(type, term, offset) {
        let response = await getTopItems(type, term, 10, offset);
        return response["items"];
    }

    useEffect(() => {
        if (tracks.length == 0) {
            fetchAPI("tracks", "medium_term", 0)
                .then((tracks) => {
                    setTracks(tracks);
                    setLoading(false);
                })
                .catch((error) => {
                    setTracks([{ name: "Error: Not Logged In" }]);
                    console.log(error);
                });
        }

        if (artists.length == 0) {
            fetchAPI("artists", "medium_term", 0)
                .then((artists) => {
                    setArtists(artists);
                    setLoading(false);
                })
                .catch((error) => {
                    setArtists([{ name: "Error: Not Logged In" }]);
                    console.log(error);
                });
        }
    }, []);

    const seeMoreItems = (type) => {
        console.log("See more");
        if (type == "tracks") {
            fetchAPI("tracks", "medium_term", tracks.length)
                .then((newItems) => {
                    console.log(newItems);
                    setTracks((tracks) => [...tracks, ...newItems]);
                })
                .catch((error) => {});
        } else if (type == "artists") {
            fetchAPI("artists", "medium_term", artists.length)
                .then((newItems) => {
                    console.log(newItems);
                    setArtists((artists) => [...artists, ...newItems]);
                })
                .catch((error) => {});
        }
    };

    return (
        <div>
            <button onClick={logout}>Logout</button>
            <UserProfile />
            <div className="top-items">
                <div>
                    <ComponentList
                        className="top-item-children"
                        items={artists}
                    >
                        <ArtistItem
                            includesSeed={includesSeed}
                            toggleSeed={toggleSeed}
                        />
                    </ComponentList>
                    <button
                        disabled={artists.length >= 50 ? true : false}
                        onClick={() => seeMoreItems("artists")}
                    >
                        See More
                    </button>
                </div>
                <div>
                    <ComponentList className="top-item-children" items={tracks}>
                        <TrackItem
                            includesSeed={includesSeed}
                            toggleSeed={toggleSeed}
                        />
                    </ComponentList>
                    <button
                        disabled={tracks.length >= 50 ? true : false}
                        onClick={() => seeMoreItems("tracks")}
                    >
                        See More
                    </button>
                </div>
            </div>

            <Genres seeds={seeds} setSeeds={setSeeds} />
        </div>
    );
}

export default Home;
