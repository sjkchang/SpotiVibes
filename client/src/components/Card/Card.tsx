import "./Card.css";
import React from "react";
import SpotifyTypes from "spotify-types";
import { PlusIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleSeeds } from "../../redux/slices/seedsSlice";

interface CardProps {
    item?:
        | SpotifyTypes.Artist
        | SpotifyTypes.Track
        | SpotifyTypes.Playlist
        | SpotifyTypes.Album;
    fixedSize?: boolean;
}

const isArtist = (
    item:
        | SpotifyTypes.Artist
        | SpotifyTypes.Track
        | SpotifyTypes.Playlist
        | SpotifyTypes.Album
        | undefined
): item is SpotifyTypes.Artist =>
    (item as SpotifyTypes.Artist).uri.includes("artist");
const isTrack = (
    item:
        | SpotifyTypes.Artist
        | SpotifyTypes.Track
        | SpotifyTypes.Playlist
        | SpotifyTypes.Album
        | undefined
): item is SpotifyTypes.Track =>
    (item as SpotifyTypes.Track).uri.includes("track");
const isPlaylist = (
    item:
        | SpotifyTypes.Artist
        | SpotifyTypes.Track
        | SpotifyTypes.Playlist
        | SpotifyTypes.Album
        | undefined
): item is SpotifyTypes.Playlist =>
    (item as SpotifyTypes.Playlist).uri.includes("playlist");
const isAlbum = (
    item:
        | SpotifyTypes.Artist
        | SpotifyTypes.Track
        | SpotifyTypes.Playlist
        | SpotifyTypes.Album
        | undefined
): item is SpotifyTypes.Album =>
    (item as SpotifyTypes.Album).uri.includes("album");

function Card({ item, fixedSize }: CardProps) {
    let type: string = "";
    let title;
    let description;
    let image;

    let className = fixedSize ? "Card CardFixedSize" : "Card";

    const seeds = useAppSelector((state: any) => state.seeds);
    const dispatch = useAppDispatch();

    let uri;
    if (item) {
        uri = item.uri;
    } else {
        uri = "";
    }

    if (isArtist(item)) {
        type = "Artist";
        if (item.images.length !== 0) {
            image = item.images[0].url;
        }
        title = item.name;
        description = "Artist";
    } else if (isTrack(item)) {
        type = "Track";
        if (item.album.images.length !== 0) {
            image = item.album.images[0].url;
        }
        title = item.name;
        description = item.artists[0].name + " | " + item.album.name;
    } else if (isPlaylist(item)) {
        type = "Playlist";
        if (item.images.length !== 0) {
            image = item.images[0].url;
        }
        title = item.name;
        description = "Playlist";
    } else if (isAlbum(item)) {
        type = "Album";
        if (item.images.length !== 0) {
            image = item.images[0].url;
        }
        title = item.name;
        description = item.artists[0].name;
    }

    if (item) {
        let link = "/" + type + "/" + item.id;
        if (type === "Playlist") {
            return (
                <div
                    className={className}
                    onClick={(e) => {
                        window.location.href = link;
                    }}
                >
                    <div className="CardImage">
                        <img src={image} alt="playlist" />
                    </div>
                    <div className="Title">{title}</div>
                    <div className="Description">{description}</div>
                </div>
            );
        } else {
            return (
                <div
                    className={className}
                    onClick={(e) => {
                        window.location.href = link;
                    }}
                >
                    <div className="CardImage">
                        <img
                            alt="artist"
                            className={isArtist(item) ? "RoundedImage" : ""}
                            src={image}
                        />
                        <div
                            onClick={(e) => {
                                dispatch(toggleSeeds(item.uri));
                                if (e && e.stopPropagation) e.stopPropagation();
                            }}
                        >
                            {seeds.uris.includes(uri) ? (
                                <div className="HoverIcon always-on">
                                    <Cross1Icon />
                                </div>
                            ) : (
                                <div className="HoverIcon">
                                    <PlusIcon />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="Title">
                        <span>{title}</span>
                    </div>
                    <div className="Description">
                        <span>{description}</span>
                    </div>
                </div>
            );
        }
    }

    return <div>Error fetching playlists</div>;
}

export default Card;
