import "./Card.css";
import React from "react";
import SpotifyTypes from "spotify-types";
import { PlusIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleSeeds } from "../../redux/slices/seedsSlice";
import { isArtist, isAlbum, isTrack, isPlaylist } from "../../spotify/types";
interface CardProps {
    item?:
        | SpotifyTypes.Artist
        | SpotifyTypes.Track
        | SpotifyTypes.Playlist
        | SpotifyTypes.Album;
    fixedSize?: boolean;
}

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
        description = (
            <div>
                <a href={"/artist/" + item.artists[0].id}>
                    {item.artists[0].name}
                </a>
                {" | "}
                <a href={"/album/" + item.album.id}>{item.album.name}</a>
            </div>
        );
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
