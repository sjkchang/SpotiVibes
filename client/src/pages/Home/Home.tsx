import React, { useState } from "react";

import SearchBar from "../../components/SearchBar/SearchBar";
import "./Home.css";

import Search from "../Search/Search";
import UsersTopItems from "../UsersTopItems/UsersTopItems";

function Home() {
    const [search, setSearch] = useState<string>();

    return (
        <div>
            <SearchBar setSearch={setSearch}></SearchBar>
            {search ? <Search search={search} /> : <UsersTopItems />}
        </div>
    );
}

export default Home;
