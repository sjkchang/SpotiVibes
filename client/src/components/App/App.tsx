import "./App.css";
import React, { useState } from "react";
import { authService } from "../../spotify/AuthService";

import Welcome from "../../pages/Welcome/Welcome";
import Nav from "../Nav/Nav";
import { Routes, Route } from "react-router-dom";
import Playlists from "../../pages/Playlists/Playlists";
import Playlist from "../../pages/Playlist/Playlist";
import Artist from "../../pages/Artist/Artist";
import Track from "../../pages/Track/Track";
import Recent from "../../pages/Recent/Recent";
import Home from "../../pages/Home/Home";

import TopArtists from "../TopArtists/TopArtists";
import TopTracks from "../TopTracks/TopTracks";

function App() {
    const [loggedIn, setLoggedIn] = useState(authService.isAuthenticated());

    const login = async () => {
        authService.authorize();
    };
    const logout = async () => {
        authService.logout();
        setLoggedIn(false);
    };

    return (
        <div className="App">
            {loggedIn ? (
                <div>
                    <Nav logout={logout}></Nav>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/playlists" element={<Playlists />} />
                        <Route path="/top-artists" element={<TopArtists />} />
                        <Route path="/top-tracks" element={<TopTracks />} />

                        <Route path="/playlist/:id" element={<Playlist />} />
                        <Route path="/artist/:id" element={<Artist />} />
                        <Route path="/track/:id" element={<Track />} />
                        <Route path="/recent" element={<Recent />} />
                    </Routes>
                </div>
            ) : (
                <Welcome login={login} />
            )}
        </div>
    );
}

export default App;
