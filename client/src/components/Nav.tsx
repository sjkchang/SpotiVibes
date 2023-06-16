import React, { useEffect, useState } from "react";
import SpotifyTypes from "spotify-types";
import { getTracks, getArtists } from "../spotify/service";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Popover from "./Popover";
import ImageOverlayIcon from "./ImageOverlayIcon";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { toggleSeeds } from "../redux/slices/seedsSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouse,
    faSquarePlus,
    faRightFromBracket,
    faSeedling,
    faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";

import { theme, mixins, media } from "../styles";
import SeedImage from "./SeedImage";
const { colors } = theme;

const Navbar = styled.nav`
    ${mixins.coverShadow};
    ${mixins.flexBetween};
    flex-direction: column;
    min-height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    width: ${theme.navWidth};
    background-color: ${colors.tertiary};
    text-align: center;
    z-index: 99;
    ${media.phablet`
    top: auto;
    bottom: 0;
    right: 0;
    width: 100%;
    min-height: ${theme.navHeight};
    height: ${theme.navHeight};
    flex-direction: row;

  `};
    & > * {
        width: 100%;
        ${media.phablet`
      height: 100%;
    `};
    }
`;

const Menu = styled.ul`
    display: flex;
    flex-direction: column;
    ${media.phablet`
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
  `};
    width: 80%;
    background-color: ${colors.accent};
    border-radius: 20px;
    padding: 5px;
`;
const MenuItem = styled.div<{ top?: boolean; bottom?: boolean }>`
    color: ${colors.secondary};
    font-size: 11px;
    ${media.phablet`
        flex-grow: 1;
        flex-basis: 100%;
        height: 100%;
    `};
    a {
        display: block;
        padding: 15px 0;
        border-left: 5px solid transparent;
        width: 100%;
        height: 100%;
        ${media.phablet`
            ${mixins.flexCenter};
            flex-direction: column;
            padding: 0;
            border-left: 0;
            border-top: 3px solid transparent;
        `};
        &:hover,
        &:focus,
        &.active {
            color: ${colors.primary};
            background-color: ${colors.tertiary};

            border-top-right-radius: ${(p) => (p.top ? 20 : 0)}px;
            border-top-left-radius: ${(p) => (p.top ? 20 : 0)}px;

            border-bottom-right-radius: ${(p) => (p.bottom ? 20 : 0)}px;
            border-bottom-left-radius: ${(p) => (p.bottom ? 20 : 0)}px;
            ${media.phablet`
                border-left: 0;
                border-top: 3px solid ${colors.spotifyGreen};
            `};
        }
    }
    svg {
        width: 20px;
        height: 20px;
        margin-bottom: 7px;
    }
`;

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
        <Navbar>
            <Menu>
                <MenuItem top={true}>
                    <NavLink className="MenuItem" to="/">
                        <div>
                            <FontAwesomeIcon icon={faHouse} size="xl" />
                            <div className="NavLabel">Home</div>
                        </div>
                    </NavLink>
                </MenuItem>
                <MenuItem>
                    <NavLink className="MenuItem" to="/generate">
                        <div>
                            <FontAwesomeIcon icon={faSquarePlus} size="xl" />
                            <div className="NavLabel">Generate Plalyist</div>
                        </div>
                    </NavLink>
                </MenuItem>

                <MenuItem bottom={true}>
                    <NavLink className="MenuItem" to="/logout">
                        <div onClick={() => logout()}>
                            <FontAwesomeIcon
                                icon={faRightFromBracket}
                                size="xl"
                            />
                        </div>
                    </NavLink>
                </MenuItem>
            </Menu>
            <div className="Seeds">
                <div className="MenuItem">
                    <div>
                        <FontAwesomeIcon icon={faSeedling} size="xl" />
                        <div className="NavLabel">Your Seeds</div>
                    </div>
                </div>
                {tracks.map((track, idx) => {
                    return (
                        <SeedImage
                            item={track}
                            uri={track.uri}
                            side="right"
                            align="center"
                        />
                    );
                })}
                {artists.map((artist, idx) => {
                    return (
                        <SeedImage
                            item={artist}
                            uri={artist.uri}
                            side="right"
                            align="center"
                        />
                    );
                })}
            </div>
        </Navbar>
    );
}

export default Nav;