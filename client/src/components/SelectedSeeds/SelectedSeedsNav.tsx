import React, { useEffect, useState } from "react";
import SpotifyTypes from "spotify-types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components/macro";
import { Button, theme } from "../../styles";

import SeedImage from "../SeedImage";
import { AxiosError } from "axios";
import { ArtistSet, TrackSet } from "./SelectedSeeds";

import { ClipLoader, ScaleLoader } from "react-spinners";
const { colors } = theme;

const Seeds = styled.div`
    color: ${colors.secondary};
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: ${colors.background};
    border-radius: 10px;
    padding: 5px;
    padding-bottom: 10px;
    gap: 10px;
    align-items: center;
`;

interface SelectedSeedsNavProps {
    tracks: {
        response: TrackSet | undefined;
        error: Error | AxiosError<unknown, any> | undefined;
        loading: boolean;
    };
    artists: {
        response: ArtistSet | undefined;
        error: Error | AxiosError<unknown, any> | undefined;
        loading: boolean;
    };
}

function SelectedSeedsNav({ tracks, artists }: SelectedSeedsNavProps) {
    return (
        <Seeds>
            <FontAwesomeIcon
                style={{ marginTop: 10, marginBottom: 5 }}
                icon={faSeedling}
                size="2x"
            />
            {tracks.response && (
                <>
                    {tracks.response.tracks.map((track, idx) => {
                        return (
                            <SeedImage
                                item={track}
                                uri={track.uri}
                                side="left"
                                align="start"
                                sideOffset={25}
                                backgroundColor={colors.lightTertiary}
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
                                sideOffset={25}
                                backgroundColor={colors.lightTertiary}
                            />
                        );
                    })}
                </>
            )}
            {(tracks.loading || artists.loading) && (
                <ClipLoader color="#36d7b7" />
            )}
        </Seeds>
    );
}

export default SelectedSeedsNav;
