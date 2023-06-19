import React, { useEffect, useState } from "react";
import SpotifyTypes from "spotify-types";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { toggleSeeds } from "../../../redux/slices/seedsSlice";
import { parseMsToTime } from "../../../utils/TIme";

import Popover from "../../Popover";
import ImageOverlayIcon from "../../ImageOverlayIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import AudioFeatureRadarChart from "../../AudioFeatureRadarChart/AudioFeatureRadarChart";
import { Feature } from "../../../pages/GeneratePlaylists/GeneratePlaylist";
import { getTrackFeatures } from "../../../spotify/service";
import { Button } from "../../../styles";
import SeedImage from "../../SeedImage";

import { Brick, BrickTitle, BrickDescription, BrickInfo } from "../BrickStyles";
import styled from "styled-components";
import { theme, mixins } from "../../../styles";
const { colors } = theme;

const TrackInfo = styled(BrickInfo)`
    display: grid;
    grid-template-columns: 1fr max-content;
`;

const TrackData = styled.div`
    ${mixins.overflowEllipsis}
    padding-right: 20px;
`;

const Duration = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
`;

interface TrackProps extends React.HTMLAttributes<any> {
    track: SpotifyTypes.Track;
}

function TrackBrick({ track }: TrackProps) {
    let image = "https://freeimage.host/i/album-cover-placeholder.HlHy9Yx";
    if (track.album.images.length > 0)
        image = track.album.images[track.album.images.length - 1].url;

    return (
        <Brick>
            <SeedImage
                item={track}
                uri={track.uri}
                backgroundColor={colors.lightTertiary}
            />

            <TrackInfo
                onClick={() => {
                    window.location.href = "/track/" + track.id;
                }}
            >
                <TrackData>
                    <BrickTitle>
                        <span>{track.name}</span>
                    </BrickTitle>
                    <BrickDescription>
                        <span>
                            <a href={"/artist/" + track.artists[0].id}>
                                {track.artists[0].name}
                            </a>
                            {" | "}
                            <a href={"/album/" + track.album.id}>
                                {track.album.name}
                            </a>
                        </span>
                    </BrickDescription>
                </TrackData>
                <Duration>{parseMsToTime(track.duration_ms)}</Duration>
            </TrackInfo>
        </Brick>
    );
}

export default TrackBrick;

/*
<button
                onClick={() => {
                    toggleSeed(item.uri);
                }}
            >
                {includesSeed(item.uri) ? "Remove Seed" : "Add Seed"}
            </button>
*/
