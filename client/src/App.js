import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import TopTracks from "./pages/TopTracks";
import TopArtists from "./pages/TopArtists";
import GeneratePlaylist from "./pages/GeneratePlaylist";
import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await axios.get("/api/loggedIn");
      setLoggedIn(response.data.loggedIn);
    }
    fetchMyAPI();
  });

  return (
    <div className="App portfolio-theme">
      <Navbar loggedIn={loggedIn} />
      <div className="content">
        <Routes>
          <Route path="" element={<TopTracks />} />
          <Route path="top-tracks" element={<TopTracks />} />
          <Route path="top-artists" element={<TopArtists />} />
          <Route path="generate" element={<GeneratePlaylist />} />
        </Routes>
      </div>
    </div>
  );
}
