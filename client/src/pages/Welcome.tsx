import React from "react";

function Welcome({ login }: any) {
    return (
        <div>
            Welcome
            <button onClick={login}>Login</button>
        </div>
    );
}

export default Welcome;
