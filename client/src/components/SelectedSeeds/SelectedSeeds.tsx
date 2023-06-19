import React, { useEffect, useState } from "react";
import SpotifyTypes from "spotify-types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components/macro";
import { Button, theme, sizes } from "../../styles";

import SeedImage from "../SeedImage";
import useSpotifyApi from "../../hooks/useSpotfiyApi";
import useViewport from "../../hooks/useViewport";
import SelectedSeedsNav from "./SelectedSeedsNav";
import SelectedSeedsPopout from "./SelectedSeedsPopout";
const { colors } = theme;

export interface TrackSet {
    tracks: Array<SpotifyTypes.Track>;
}

export interface ArtistSet {
    artists: Array<SpotifyTypes.Artist>;
}

function SelectedSeeds() {
    const { width, height } = useViewport();
    const seeds = useAppSelector((state: any) => state.seeds);
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
        <div>
            {width > sizes.phablet ? (
                <SelectedSeedsNav tracks={tracks} artists={artists} />
            ) : (
                <SelectedSeedsPopout />
            )}
        </div>
    );
}

export default SelectedSeeds;
