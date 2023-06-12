import React from "react";
import { Playlist } from "spotify-types";
import "./PlaylistBrick.css";

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
        <div className="Brick">
            <img className="brick-image" src={image} />

            <div className="brick-info">
                <div className="brick-data">
                    <div className="brick-title">
                        <a href={"/playlist/" + playlist.id}>{playlist.name}</a>
                    </div>
                    <span className="brick-album-info">
                        <span>Playlist | {playlist.owner.display_name} </span>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default PlaylistBrick;
