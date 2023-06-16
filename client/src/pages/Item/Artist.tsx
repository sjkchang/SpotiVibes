import React, { useEffect, useState } from "react";
import SpotifyTypes from "spotify-types";
import { getArtist } from "../../spotify/service";
import { useParams } from "react-router-dom";
import BrickList from "../../components/Brick/layouts/BrickList/BrickList";
import styled from "styled-components/macro";
import { theme, mixins } from "../../styles";
import useSpotifyApi from "../../hooks/useSpotfiyApi";
const { colors, fontSizes } = theme;

const PageWrapper = styled.div`
    padding: 50px 5vw 0px 5vw;
`;

const ArtistPage = styled.div`
    display: flex;
    flex-grow: 1;
    flex-wrap: wrap;
    gap: 40px;
    justify-content: center;
`;

const Info = styled.div`
    text-align: center;
    min-width: 250px;
    width: 250px;
`;

const Image = styled.img`
    border-radius: 50%;
    aspect-ratio: 1/1;
`;

const Name = styled.h1``;
const Followers = styled.h4`
    color: ${colors.secondary};
`;

const TrackList = styled.div`
    flex-grow: 1;
    max-width: 800px;
`;

const TrackLabel = styled.div`
    text-decoration: none;
    font-weight: 700;
    font-size: 24px;
    margin-bottom: 20px;
`;

interface TrackSet {
    tracks: Array<SpotifyTypes.Track>;
}

function Artist() {
    let { id } = useParams();
    const artist = useSpotifyApi<SpotifyTypes.Artist>({
        url: "https://api.spotify.com/v1/artists/" + id,
        method: "get",
    });
    const artistTracks = useSpotifyApi<TrackSet>({
        url: "https://api.spotify.com/v1/artists/" + id + "/top-tracks",
        method: "get",
        body: {
            market: "US",
        },
    });

    let image = "https://freeimage.host/i/album-cover-placeholder.HlHy9Yx";
    if (artist.response) {
        if (artist.response.images.length > 0)
            image = artist.response.images[0].url;
    }

    return (
        <PageWrapper>
            <ArtistPage>
                {artist.response && (
                    <Info>
                        <Image src={image} />
                        <Name>{artist.response.name}</Name>
                        <Followers>
                            {artist.response.followers.total.toLocaleString()}{" "}
                            Followers
                        </Followers>
                        <h5>Popularity: {artist.response.popularity}%</h5>
                    </Info>
                )}

                <TrackList>
                    <TrackLabel>Popular Tracks</TrackLabel>
                    {artistTracks.response && (
                        <BrickList
                            items={artistTracks.response.tracks}
                        ></BrickList>
                    )}
                </TrackList>
            </ArtistPage>
        </PageWrapper>
    );
}

export default Artist;
