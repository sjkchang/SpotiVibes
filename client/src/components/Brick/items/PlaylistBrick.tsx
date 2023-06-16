import React from "react";
import { Playlist } from "spotify-types";
import { Brick, BrickTitle, BrickDescription, BrickInfo } from "../BrickStyles";
import styled from "styled-components";
import { theme, mixins } from "../../../styles";
const { colors } = theme;

const Image = styled.img`
    width: 50px;
    min-width: 50px;
    height: 50px;
    min-height: 50px;
`;

const PlaylistInfo = styled.div`
    margin-left: 20px;
    font-size: 1.1rem;
`;

interface PlaylistBrickProps extends React.HTMLAttributes<any> {
    playlist: Playlist;
}

function PlaylistBrick({ playlist }: PlaylistBrickProps) {
    let image: string;
    if (playlist.images.length > 0) {
        image = playlist.images[playlist.images.length - 1].url;
    } else {
        image = "https://freeimage.host/i/album-cover-placeholder.HlHy9Yx";
    }

    return (
        <Brick
            onClick={() => {
                window.location.href = "/playlist/" + playlist.id;
            }}
        >
            <Image src={image} />

            <BrickInfo>
                <BrickTitle>
                    <span>{playlist.name}</span>
                </BrickTitle>
                <BrickDescription>
                    <span>Playlist | {playlist.owner.display_name} </span>
                </BrickDescription>
            </BrickInfo>
        </Brick>
    );
}

export default PlaylistBrick;
