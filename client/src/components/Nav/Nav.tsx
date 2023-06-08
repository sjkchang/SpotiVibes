import "./Nav.css";
import React from "react";
import PlaylistForm from "../PlaylistForm/PlaylistForm";

interface NavProps {
    logout: () => void;
}

function Nav({ logout }: NavProps) {
    return (
        <div className="Nav">
            <div className="Menu">
                <div className="MenuItem">
                    <a href="/">Home</a>
                </div>
                <div className="MenuItem">
                    <a href="/playlists">Playlists</a>
                </div>
                <div className="MenuItem">
                    <a href="/recent">Recent</a>
                </div>
                <div onClick={() => logout()}>Logout</div>
            </div>
        </div>
    );
}

export default Nav;
