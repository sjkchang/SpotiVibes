import React from "react";
import TopItems from "../TopItems/TopItems";
import Nav from "../../components/Nav/Nav";
import GeneratePlaylist from "../GeneratePlaylists/GeneratePlaylist";
import { Routes, Route } from "react-router-dom";
import "./Home.css";
import Playlists from "../Playlists/Playlists";

function Home({ logout }: any) {
    return (
        <div>
            <Nav></Nav>
            <Routes>
                <Route path="/" element={<TopItems />} />
                <Route path="/generate" element={<GeneratePlaylist />} />
                <Route path="/playlists" element={<Playlists />} />
            </Routes>
        </div>
    );
}

export default Home;
