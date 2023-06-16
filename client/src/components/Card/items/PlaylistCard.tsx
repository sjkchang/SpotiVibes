import React from "react";
import SpotifyTypes from "spotify-types";
import { PlusIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { toggleSeeds } from "../../../redux/slices/seedsSlice";

import { StyledCard, CardImage, Title, Description } from "../CardStyles";

interface CardProps {
    playlist: SpotifyTypes.Playlist;
}

function PlaylistCard({ playlist }: CardProps) {
    const seeds = useAppSelector((state: any) => state.seeds);
    const dispatch = useAppDispatch();

    return (
        <StyledCard
            onClick={(e) => {
                window.location.href = "/playlist/" + playlist.id;
            }}
        >
            <CardImage>
                <img alt="playlist" src={playlist.images[0].url} />
            </CardImage>
            <Title>
                <span>{playlist.name}</span>
            </Title>
            <Description>
                <span>{"Playlist"}</span>
            </Description>
        </StyledCard>
    );
}

export default PlaylistCard;
