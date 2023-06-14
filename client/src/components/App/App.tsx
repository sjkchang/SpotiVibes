import React, { useState } from "react";
import { authService } from "../../spotify/AuthService";

import Welcome from "../../pages/Welcome/Welcome";
import styled from "styled-components/macro";
import HomePage from "../../pages/HomePage";
import { GlobalStyle } from "../../styles";

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
            <GlobalStyle />
            {loggedIn ? (
                <HomePage logout={logout} />
            ) : (
                <Welcome login={login} />
            )}
        </div>
    );
}

export default App;
