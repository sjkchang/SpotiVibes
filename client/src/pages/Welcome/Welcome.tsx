import React from "react";
import "./Welcome.css";

function Welcome({ login }: any) {
    return (
        <div className="Welcome">
            <h1>Welcome</h1>
            <button className="welcome-btn" onClick={login}>
                Login
            </button>
        </div>
    );
}

export default Welcome;
