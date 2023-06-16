import React from "react";
import SpotifyTypes from "spotify-types";
import TrackBrick from "./items/TrackBrick";
import ArtistBrick from "./items/ArtistBrick";
import PlaylistBrick from "./items/PlaylistBrick";
import { isArtist, isTrack, isPlaylist } from "../../spotify/types";

interface BrickProps {
    item: SpotifyTypes.Artist | SpotifyTypes.Track | SpotifyTypes.Playlist;
}

function Brick({ item }: BrickProps) {
    if (isArtist(item)) {
        return <ArtistBrick artist={item} />;
    } else if (isTrack(item)) {
        return <TrackBrick track={item} />;
    } else if (isPlaylist(item)) {
        return <PlaylistBrick playlist={item} />;
    } else {
        return <p>Invalid Type</p>;
    }
}

export default Brick;
