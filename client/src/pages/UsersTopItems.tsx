import React, { useEffect, useState } from "react";
import SpotifyTypes from "spotify-types";
import { TimeRangeEnum } from "../spotify/types";
import BrickList from "../components/Brick/layouts/BrickList/BrickList";
import Playlists from "./Playlists";
import styled from "styled-components/macro";
import { theme, media } from "../styles";
import useSpotifyApi from "../hooks/useSpotfiyApi";
import { ScaleLoader, SyncLoader } from "react-spinners";

const TopItems = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
    margin-top: 20px;
    ${media.tablet`
        display: block;
        justify-content: space-between;
        flex-wrap: wrap;
  `};
`;

function UsersTopItems() {
    let topTracks = useSpotifyApi<SpotifyTypes.Paging<SpotifyTypes.Track>>(
        {
            url: "https://api.spotify.com/v1/me/top/tracks",
            method: "get",
            body: {
                time_range: TimeRangeEnum.Medium,
                limit: 20,
                offset: 0,
            },
        },
        []
    );
    let topArtists = useSpotifyApi<SpotifyTypes.Paging<SpotifyTypes.Artist>>(
        {
            url: "https://api.spotify.com/v1/me/top/artists",
            method: "get",
            body: {
                time_range: TimeRangeEnum.Medium,
                limit: 20,
                offset: 0,
            },
        },
        []
    );

    return (
        <div>
            <TopItems>
                <div>
                    <h1>Your Top Tracks</h1>
                    {topTracks.response && (
                        <BrickList items={topTracks.response.items} />
                    )}
                    {topTracks.error && topTracks.error.message}
                    {topTracks.loading && <SyncLoader color="#36d7b7" />}
                </div>
                <div>
                    <h1>Your Top Artists</h1>
                    {topArtists.response && (
                        <BrickList items={topArtists.response.items} />
                    )}
                    {topArtists.error && topArtists.error.message}
                    {topArtists.loading && <SyncLoader color="#36d7b7" />}
                </div>
            </TopItems>
            <Playlists />
        </div>
    );
}

export default UsersTopItems;
