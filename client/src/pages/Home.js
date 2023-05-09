import React, { useEffect } from "react";
import LoginButton from "../components/LoginButton";
import UserProfile from "../components/UserProfile";
import TopItems from "../components/TopItems";

function Home({ children }) {
    return (
        <div>
            <a href="welcome">Welcome Page</a>
            <UserProfile />
            <div>
                <TopItems type="tracks" />
                <TopItems type="artists" term="long_term" />
            </div>
        </div>
    );
}

export default Home;
