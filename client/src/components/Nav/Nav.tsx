import "./Nav.css";
import React, { useEffect, useState } from "react";
import SpotifyTypes from "spotify-types";
import { getTracks, getArtists } from "../../spotify/service";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Popover from "../Popover/Popover";
import ImageOverlayIcon from "../ImageOverlayIcon/ImageOverlayIcon";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { toggleSeeds } from "../../redux/slices/seedsSlice";
import SignOutIcon from "../../icons/SignOutIcon";
import RecentIcon from "../../icons/RecentIcon";
import HomeIcon from "../../icons/HomeIcon";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouse,
    faSquarePlus,
    faRightFromBracket,
    faSeedling,
} from "@fortawesome/free-solid-svg-icons";

import {} from "@fortawesome/free-regular-svg-icons";

import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

interface NavProps {
    logout: () => void;
}

function Nav({ logout }: NavProps) {
    const [artists, setArtists] = useState<Array<SpotifyTypes.Artist>>([]);
    const [tracks, setTracks] = useState<Array<SpotifyTypes.Track>>([]);

    const seeds = useAppSelector((state: any) => state.seeds);
    const dispatch = useAppDispatch();

    useEffect(() => {
        let trackUris: Array<string> = [];
        let artistUris: Array<string> = [];
        if (seeds.uris.length > 0) {
            for (let seed of seeds.uris) {
                let uri_components = seed.split(":");
                if (uri_components.length === 3) {
                    if (uri_components[1] === "track") {
                        trackUris.push(uri_components[2]);
                    }
                    if (uri_components[1] === "artist") {
                        artistUris.push(uri_components[2]);
                    }
                }
            }
        }
        getTracks(trackUris)
            .then((tracks) => {
                setTracks(tracks);
            })
            .catch((error) => {
                console.log(error);
            });

        getArtists(artistUris)
            .then((artists) => {
                setArtists(artists);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [seeds]);

    return (
        <nav className="Nav">
            <div className="Menu">
                <NavLink className="MenuItem" to="/">
                    <div>
                        <FontAwesomeIcon icon={faHouse} size="xl" />
                        <div className="NavLabel">Home</div>
                    </div>
                </NavLink>
                <NavLink className="MenuItem" to="/generate">
                    <div>
                        <FontAwesomeIcon icon={faSquarePlus} size="xl" />
                        <div className="NavLabel">Generate Plalyist</div>
                    </div>
                </NavLink>
                <NavLink className="MenuItem" to="/logout">
                    <div onClick={() => logout()}>
                        <FontAwesomeIcon icon={faRightFromBracket} size="xl" />
                    </div>
                </NavLink>
            </div>
            <div className="Seeds">
                <div className="MenuItem">
                    <div>
                        <FontAwesomeIcon icon={faSeedling} size="xl" />
                        <div className="NavLabel">Your Seeds</div>
                    </div>
                </div>
                {tracks.map((track, idx) => {
                    return (
                        <Popover
                            trigger={
                                <div>
                                    <ImageOverlayIcon
                                        image_url={track.album.images[0].url}
                                        Icon={<InfoCircledIcon />}
                                    />
                                </div>
                            }
                            content={
                                <div>
                                    <button
                                        onClick={() => {
                                            dispatch(toggleSeeds(track.uri));
                                        }}
                                    >
                                        {seeds.uris.includes(track.uri)
                                            ? "Remove Seed"
                                            : "Add Seed"}
                                    </button>
                                </div>
                            }
                            align="end"
                            side="right"
                        />
                    );
                })}
                {artists.map((artist, idx) => {
                    return (
                        <Popover
                            trigger={
                                <div>
                                    <ImageOverlayIcon
                                        image_url={artist.images[0].url}
                                        Icon={<InfoCircledIcon />}
                                        rounded={true}
                                    />
                                </div>
                            }
                            content={
                                <div>
                                    <button
                                        onClick={() => {
                                            dispatch(toggleSeeds(artist.uri));
                                        }}
                                    >
                                        {seeds.uris.includes(artist.uri)
                                            ? "Remove Seed"
                                            : "Add Seed"}
                                    </button>
                                </div>
                            }
                            align="end"
                            side="right"
                        />
                    );
                })}
            </div>
        </nav>
    );
}

export default Nav;
