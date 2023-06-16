import React from "react";
import SpotifyTypes from "spotify-types";
import Card from "../Card";

import styled from "styled-components";

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 20px;
`;

interface CardGridProps {
    items:
        | Array<SpotifyTypes.Artist>
        | Array<SpotifyTypes.Track>
        | Array<SpotifyTypes.Playlist>
        | Array<SpotifyTypes.Album>;
}

function CardGrid({ items }: CardGridProps) {
    return (
        <Grid>
            {items.map((item, i) => (
                <div key={i}>
                    <Card item={item}></Card>
                </div>
            ))}
        </Grid>
    );
}

export default CardGrid;
