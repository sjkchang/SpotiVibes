import React, { useEffect, useState } from "react";
import SpotifyTypes from "spotify-types";
import { getArtist } from "../../spotify/service";
import { useParams } from "react-router-dom";
import BrickList from "../../components/BrickList/BrickList";
import styled from "styled-components/macro";
import { theme, mixins } from "../../styles";
const { colors, fontSizes } = theme;

function Artist() {
    const [artist, setArtist] = useState<SpotifyTypes.Artist>();
    const [artistTopTracks, setArtistTopTracks] =
        useState<Array<SpotifyTypes.Track>>();
    const [loading, setLoading] = useState(false);

    let { id } = useParams();

    useEffect(() => {
        setLoading(true);
        if (id) {
            getArtist(id)
                .then((result) => {
                    setArtist(result[0]);

                    setArtistTopTracks(result[1]);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);

    const PageWrapper = styled.div`
        padding: 50px 5vw 0px 5vw;
    `;

    const Artist = styled.div`
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

    if (artist && artistTopTracks) {
        let image =
            artist.images.length > 0
                ? artist.images[0].url
                : "https://freeimage.host/i/album-cover-placeholder.HlHy9Yx";
        return (
            <PageWrapper>
                <Artist>
                    <Info>
                        <Image src={image} />
                        <Name>{artist.name}</Name>
                        <Followers>
                            {artist.followers.total.toLocaleString()} Followers
                        </Followers>
                        <h5>Popularity: {artist.popularity}%</h5>
                    </Info>
                    <TrackList>
                        <TrackLabel>Popular</TrackLabel>
                        <BrickList items={artistTopTracks}></BrickList>
                    </TrackList>
                </Artist>
            </PageWrapper>
        );
    }

    return (
        <div>
            <h3>Tracks</h3>
            Loading
        </div>
    );
}

export default Artist;
