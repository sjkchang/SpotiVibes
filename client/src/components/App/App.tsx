import "./App.css";
import React, { useState } from "react";
import { authService, refresh } from "../../spotify/AuthService";
import Welcome from "../../pages/Welcome";
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
            <button onClick={authService.getToken}>Get Token</button>
            <button onClick={refresh}>Refresh Token</button>
        </div>
    );
}

export default App;
