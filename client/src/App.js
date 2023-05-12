import "./App.css";
import React, { useEffect, useState } from "react";
import { authService } from "./spotify/AuthService";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";

function App() {
    const [loggedIn, setLoggedIn] = useState(authService.isAuthenticated());

    const login = async () => {
        authService.authorize();
        setLoggedIn(true);
    };
    const logout = async () => {
        authService.logout();
        setLoggedIn(false);
    };

    return (
        <div>
            {loggedIn ? <Home logout={logout} /> : <Welcome login={login} />}
            <button onClick={authService.getToken}>Get Token</button>
            <button onClick={authService.refresh}>Refresh Token</button>
        </div>
    );
}

export default App;
