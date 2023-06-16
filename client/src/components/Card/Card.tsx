import React from "react";
import SpotifyTypes from "spotify-types";
import ArtistCard from "./items/ArtistCard";
import PlaylistCard from "./items/PlaylistCard";
import TrackCard from "./items/TrackCard";

import { isArtist, isAlbum, isTrack, isPlaylist } from "../../spotify/types";

interface BrickProps {
    item:
        | SpotifyTypes.Artist
        | SpotifyTypes.Track
        | SpotifyTypes.Playlist
        | SpotifyTypes.Album;
}

function Card({ item }: BrickProps) {
    if (isArtist(item)) {
        return <ArtistCard artist={item} />;
    } else if (isTrack(item)) {
        return <TrackCard track={item} />;
    } else if (isPlaylist(item)) {
        return <PlaylistCard playlist={item} />;
    } else {
        return <p>Invalid Type</p>;
    }
}

export default Card;
