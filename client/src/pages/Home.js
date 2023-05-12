import React, { useEffect, useState } from "react";

function Home({ logout }) {
    return (
        <div>
            Home
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default Home;
