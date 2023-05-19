import "./Brick.css";
import React from "react";
import SpotifyTypes from "spotify-types";
import TrackBrick from "./TrackBrick/TrackBrick";
import ArtistBrick from "./ArtistBrick/ArtistItem";
import PlaylistBrick from "./PlaylistBrick/PlaylistBrick";

interface BrickProps {
    item: SpotifyTypes.Artist | SpotifyTypes.Track | SpotifyTypes.Playlist;
}

const isArtist = (
    item:
        | SpotifyTypes.Artist
        | SpotifyTypes.Track
        | SpotifyTypes.Playlist
        | undefined
): item is SpotifyTypes.Artist =>
    (item as SpotifyTypes.Artist).uri.includes("artist");
const isTrack = (
    item:
        | SpotifyTypes.Artist
        | SpotifyTypes.Track
        | SpotifyTypes.Playlist
        | undefined
): item is SpotifyTypes.Track =>
    (item as SpotifyTypes.Track).uri.includes("track");
const isPlaylist = (
    item:
        | SpotifyTypes.Artist
        | SpotifyTypes.Track
        | SpotifyTypes.Playlist
        | undefined
): item is SpotifyTypes.Playlist =>
    (item as SpotifyTypes.Playlist).uri.includes("playlist");

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
