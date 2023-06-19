import React, { useState } from "react";

import SearchBar from "../components/SearchBar";

import SearchTracks from "./Search/SearchTracks";
import SearchPlaylists from "./Search/SearchPlaylists";
import SearchArtists from "./Search/SearchArtists";

import UsersTopItems from "./UsersTopItems";
import * as Tabs from "@radix-ui/react-tabs";
import styled from "styled-components";
import { theme } from "../styles";
import SearchAll from "./Search/SearchAll";
const { colors } = theme;

const TabsList = styled(Tabs.List)`
    padding-top: 15px;
    display: flex;
    flex-direction: row;
    gap: 5px;
    margin-bottom: 20px;
`;

const Tab = styled(Tabs.Trigger)`
    background-color: ${colors.background};
    filter: brightness(80%);
    color: ${colors.secondary};
    border-radius: 25px;
    padding: 4px 10px;

    &[data-state="active"] {
        background-color: ${colors.primary};
        color: ${colors.background};
    }
`;

function Home() {
    const [search, setSearch] = useState<string>();

    return (
        <div>
            <SearchBar setSearch={setSearch}></SearchBar>
            {search ? (
                <Tabs.Root defaultValue="all">
                    <TabsList>
                        <Tab value="all">All</Tab>
                        <Tab value="songs">Songs</Tab>
                        <Tab value="artists">Artists</Tab>
                        <Tab value="playlists">Playlists</Tab>
                    </TabsList>
                    <Tabs.Content value="all">
                        <SearchAll search={search} />
                    </Tabs.Content>
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
