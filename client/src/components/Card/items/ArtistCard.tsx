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
    RoundedImage,
    HoverIcon,
} from "../CardStyles";

interface CardProps {
    artist: SpotifyTypes.Artist;
}

function ArtistCard({ artist }: CardProps) {
    const seeds = useAppSelector((state: any) => state.seeds);
    const dispatch = useAppDispatch();

    let image_href = "https://i.stack.imgur.com/l60Hf.png";
    if (artist.images.length > 0)
        image_href = artist.images[artist.images.length - 1].url;

    return (
        <StyledCard
            onClick={(e) => {
                window.location.href = "/artist/" + artist.id;
            }}
        >
            <CardImage>
                <RoundedImage alt="artist" src={image_href} />
                <HoverIcon
                    show={seeds.uris.includes(artist.uri)}
                    className="HoverIcon"
                    onClick={(e) => {
                        dispatch(toggleSeeds(artist.uri));
                        if (e && e.stopPropagation) e.stopPropagation();
                    }}
                >
                    {seeds.uris.includes(artist.uri) ? (
                        <Cross1Icon />
                    ) : (
                        <PlusIcon />
                    )}
                </HoverIcon>
            </CardImage>
            <Title>
                <span>{artist.name}</span>
            </Title>
            <Description>
                <span>{"Artist"}</span>
            </Description>
        </StyledCard>
    );
}

export default ArtistCard;
