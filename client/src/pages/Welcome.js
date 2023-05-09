import React, { useEffect } from "react";
import LoginButton from "../components/LoginButton";

function Welcome({ children }) {
    return (
        <div>
            <LoginButton>Login</LoginButton>
        </div>
    );
}

export default Welcome;
