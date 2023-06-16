import React from "react";
import SpotifyTypes from "spotify-types";
import { PlusIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { toggleSeeds } from "../../../redux/slices/seedsSlice";

import {
    StyledCard,
    CardImage,
    Title,
    Description,
    HoverIcon,
} from "../CardStyles";

interface CardProps {
    track: SpotifyTypes.Track;
}

function TrackCard({ track }: CardProps) {
    const seeds = useAppSelector((state: any) => state.seeds);
    const dispatch = useAppDispatch();

    return (
        <StyledCard
            onClick={(e) => {
                window.location.href = "/track/" + track.id;
            }}
        >
            <CardImage>
                <img alt="track" src={track.album.images[0].url} />
                <HoverIcon
                    show={seeds.uris.includes(track.uri)}
                    onClick={(e) => {
                        dispatch(toggleSeeds(track.uri));
                        if (e && e.stopPropagation) e.stopPropagation();
                    }}
                >
                    {seeds.uris.includes(track.uri) ? (
                        <Cross1Icon />
                    ) : (
                        <PlusIcon />
                    )}
                </HoverIcon>
            </CardImage>
            <Title>
                <span>{track.name}</span>
            </Title>
            <Description>
                <span>{"track"}</span>
            </Description>
        </StyledCard>
    );
}

export default TrackCard;
