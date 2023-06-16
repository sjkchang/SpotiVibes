import React, { useEffect } from "react";
import SpotifyTypes from "spotify-types";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components/macro";
import { theme } from "../styles";

import SeedImage from "./SeedImage";
import useSpotifyApi from "../hooks/useSpotfiyApi";
import Popover from "./Popover";
const { colors } = theme;

const SeedPopover = styled.div``;

const Seeds = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Trigger = styled(FontAwesomeIcon)`
    margin-top: 40px;
    margin-right: 40px;
    position: fixed;
    top: 0;
    right: 0;
    padding: 12px;
    width: 33px;
    height: 33px;
    border-radius: 50%;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    background-color: ${colors.accent};

    &:hover {
        background-color: ${colors.tertiary};
    }
`;

interface TrackSet {
    tracks: Array<SpotifyTypes.Track>;
}

interface ArtistSet {
    artists: Array<SpotifyTypes.Artist>;
}

function SelectedSeeds() {
    const seeds = useAppSelector((state: any) => state.seeds);
    const dispatch = useAppDispatch();

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

    const artists = useSpotifyApi<ArtistSet>(
        {
            url: "https://api.spotify.com/v1/artists",
            method: "get",
            body: {
                ids: artistUris.toString(),
            },
        },
        [seeds]
    );
    const tracks = useSpotifyApi<TrackSet>(
        {
            url: "https://api.spotify.com/v1/tracks",
            method: "get",
            body: {
                ids: trackUris.toString(),
            },
        },
        [seeds]
    );

    return (
        <SeedPopover>
            <Popover
                contentWidth={85}
                includeClose={false}
                trigger={<Trigger icon={faSeedling} size="lg" />}
                content={
                    <Seeds>
                        {tracks.response && (
                            <>
                                {tracks.response.tracks.map((track, idx) => {
                                    return (
                                        <SeedImage
                                            item={track}
                                            uri={track.uri}
                                            side="left"
                                            align="start"
                                        />
                                    );
                                })}
                            </>
                        )}
                        {artists.response && (
                            <>
                                {artists.response.artists.map((artist, idx) => {
                                    return (
                                        <SeedImage
                                            item={artist}
                                            uri={artist.uri}
                                            side="left"
                                            align="start"
                                        />
                                    );
                                })}
                            </>
                        )}
                    </Seeds>
                }
            />
        </SeedPopover>
    );
}

export default SelectedSeeds;
