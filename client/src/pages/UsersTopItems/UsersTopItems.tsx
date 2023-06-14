import React, { useEffect, useState } from "react";
import "./UsersTopItems.css";
import CardRow from "../../components/CardRow/CardRow";
import SpotifyTypes from "spotify-types";
import {
    getTopTracks,
    getTopArtists,
    getPlaylists,
} from "../../spotify/service";

import {
    SpotifyTypesEnum,
    TimeRangeEnum,
    TopItemsQuery,
} from "../../spotify/types";
import BrickList from "../../components/BrickList/BrickList";
import CardGrid from "../../components/CardGrid/CardGrid";
import Playlists from "../Playlists/Playlists";
import styled from "styled-components/macro";
import { theme, media } from "../../styles";

const TopItems = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
    ${media.tablet`
        display: block;
        justify-content: space-between;
        flex-wrap: wrap;
  `};
`;

function UsersTopItems() {
    const [tracks, setTracks] = useState<Array<SpotifyTypes.Track>>();
    const [artists, setArtists] = useState<Array<SpotifyTypes.Artist>>();
    const [playlists, setPlaylists] = useState<Array<SpotifyTypes.Playlist>>();

    useEffect(() => {
        let query = new TopItemsQuery(
            SpotifyTypesEnum.Tracks,
            TimeRangeEnum.Long,
            20,
            0
        );
        getTopTracks(query)
            .then((tracks) => {
                setTracks(tracks);
            })
            .catch((error) => {
                console.log(error);
            });
        getTopArtists(query)
            .then((artists) => {
                setArtists(artists);
            })
            .catch((error) => {
                console.log(error);
            });
        getPlaylists(20, 0)
            .then((playlists) => {
                setPlaylists(playlists);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    if (tracks && artists && playlists) {
        return (
            <div>
                <TopItems>
                    <div className="TopList">
                        <h1>Your Top Tracks</h1>
                        <BrickList items={tracks} />
                    </div>
                    <div className="TopList">
                        <h1>Your Top Artists</h1>
                        <BrickList items={artists} />
                    </div>
                </TopItems>

                <Playlists />
            </div>
        );
    } else {
        return <div>loading</div>;
    }
}

export default UsersTopItems;
