import React, { useState } from "react";

import SearchBar from "../../components/SearchBar/SearchBar";
import "./Home.css";

import SearchTracks from "../Search/SearchTracks";
import SearchPlaylists from "../Search/SearchPlaylists";
import SearchArtists from "../Search/SearchArtists";

import UsersTopItems from "../UsersTopItems/UsersTopItems";
import * as Tabs from "@radix-ui/react-tabs";

function Home() {
    const [search, setSearch] = useState<string>();

    return (
        <div>
            <SearchBar setSearch={setSearch}></SearchBar>
            {search ? (
                <Tabs.Root defaultValue="songs">
                    <Tabs.List>
                        <Tabs.Trigger value="songs">Songs</Tabs.Trigger>
                        <Tabs.Trigger value="artists">Artists</Tabs.Trigger>
                        <Tabs.Trigger value="playlists">Playlists</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="songs">
                        <SearchTracks search={search} />
                    </Tabs.Content>
                    <Tabs.Content value="artists">
                        <SearchArtists search={search} />
                    </Tabs.Content>
                    <Tabs.Content value="playlists">
                        <SearchPlaylists search={search} />
                    </Tabs.Content>
                </Tabs.Root>
            ) : (
                <UsersTopItems />
            )}
        </div>
    );
}

export default Home;
