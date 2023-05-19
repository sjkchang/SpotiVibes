import React from "react";
import { Playlist } from "spotify-types";
import TooltipImage from "../../TooltipImage/TooltipImage";
import "./PlaylistBrick.css";

interface PlaylistBrickProps extends React.HTMLAttributes<any> {
    playlist: Playlist;
}

function PlaylistBrick({ playlist }: PlaylistBrickProps) {
    return (
        <div className="Track">
            <img className="track-image" src={playlist.images[0].url} />

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
