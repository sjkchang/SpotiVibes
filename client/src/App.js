import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import GenreBox from "./components/GenreBox/GenreBox";
import TopTracks from "./components/TopTracks";
import { Routes, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [page, setPage] = useState("home");

    useEffect(() => {
        async function fetchMyAPI() {
            let response = await axios.get("/api/loggedIn");
            setLoggedIn(response.data.loggedIn);
        }
        fetchMyAPI();
    });

    return (
        <div className='App portfolio-theme'>
            {loggedIn ? "Logged In" : "Logged Out"}
            <Navbar loggedIn={loggedIn} />
            <br />
            <GenreBox />
            <Routes>
                <Route path='top-songs' element={<TopTracks />} />
            </Routes>
        </div>
    );
}
