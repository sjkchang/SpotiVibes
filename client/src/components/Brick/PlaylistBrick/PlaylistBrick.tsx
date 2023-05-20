import React from "react";
import { Playlist } from "spotify-types";
import TooltipImage from "../../TooltipImage/TooltipImage";
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
        <div className="Track">
            <img className="track-image" src={image} />

            <div className="track-info">
                <div className="track-data">
                    <div className="track-title">
                        <a href={"/playlist/" + playlist.id}>{playlist.name}</a>
                    </div>
                    <span className="track-album-info">
                        <span>Playlist | {playlist.owner.display_name} </span>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default PlaylistBrick;
