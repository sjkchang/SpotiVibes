import "./Nav.css";
import React, { useState } from "react";

function Nav() {
    return (
        <div className="Nav">
            <div className="Menu">
                <div className="MenuItem">
                    <a href="/">Home</a>
                </div>
                <div className="MenuItem">
                    <a href="/">Generate</a>
                </div>
                <div className="MenuItem">
                    <a href="/">Playlists</a>
                </div>
            </div>
        </div>
    );
}

export default Nav;
