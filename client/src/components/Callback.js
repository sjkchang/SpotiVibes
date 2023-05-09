import React, { useEffect } from "react";
import { requestUserAuth, handle_callback } from "../spotify/auth";

function Callback({ children }) {
    useEffect(() => {
        handle_callback();
    }, []);
    return <div></div>;
}

export default Callback;
