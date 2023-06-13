import "./App.css";
import React, { useState } from "react";
import { authService } from "../../spotify/AuthService";

import Welcome from "../../pages/Welcome/Welcome";
import Nav from "../Nav/Nav";
import { Routes, Route } from "react-router-dom";
import Playlists from "../../pages/Playlists/Playlists";
import Playlist from "../../pages/Item/Playlist/Playlist";
import Artist from "../../pages/Item/Artist/Artist";
import Track from "../../pages/Item/Track/Track";
import Recent from "../../pages/Recent/Recent";
import Home from "../../pages/Home/Home";
import Album from "../../pages/Item/Album/Album";
import GeneratePlaylist from "../../pages/GeneratePlaylists/GeneratePlaylist";

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
                <div className="Page">
                    <Nav logout={logout}></Nav>
                    <div className="Content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route
                                path="/generate"
                                element={<GeneratePlaylist />}
                            />
                            <Route path="/playlists" element={<Playlists />} />

                            <Route
                                path="/playlist/:id"
                                element={<Playlist />}
                            />
                            <Route path="/artist/:id" element={<Artist />} />
                            <Route path="/album/:id" element={<Album />} />
                            <Route path="/track/:id" element={<Track />} />
                            <Route path="/recent" element={<Recent />} />
                        </Routes>
                    </div>
                </div>
            ) : (
                <Welcome login={login} />
            )}
        </div>
    );
}

export default App;
