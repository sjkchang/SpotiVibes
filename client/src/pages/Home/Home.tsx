import React, { useState } from "react";

import SearchBar from "../../components/SearchBar/SearchBar";
import "./Home.css";

import Search from "../Search/Search";
import SearchTracks from "../Search/SearchTracks";
import SearchPlaylists from "../Search/SearchPlaylists";
import SearchArtists from "../Search/SearchArtists";

import UsersTopItems from "../UsersTopItems/UsersTopItems";

function Home() {
    const [search, setSearch] = useState<string>();

    return (
        <div>
            <SearchBar setSearch={setSearch}></SearchBar>
            {search ? <SearchArtists search={search} /> : <UsersTopItems />}
        </div>
    );
}

export default Home;
