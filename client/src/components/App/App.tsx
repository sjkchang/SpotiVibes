import "./App.css";
import React, { useState } from "react";
import { authService, refresh } from "../../spotify/AuthService";
import Welcome from "../../pages/Welcome/Welcome";
import Home from "../../pages/Home";

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
            {loggedIn ? <Home logout={logout} /> : <Welcome login={login} />}
        </div>
    );
}

export default App;
