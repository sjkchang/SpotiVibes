import React, { useEffect, useState } from "react";

function Welcome({ login }) {
    return (
        <div>
            Welcome
            <button onClick={login}>Login</button>
        </div>
    );
}

export default Welcome;
