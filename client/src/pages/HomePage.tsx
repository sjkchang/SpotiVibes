import React from "react";

import Nav from "../components/Nav";
import { Routes, Route } from "react-router-dom";
import Playlists from "./Playlists";
import Playlist from "./Item/Playlist/Playlist";
import Artist from "./Item/Artist";
import Track from "./Item/Track/Track";
import Recent from "./Recent/Recent";
import Home from "./Home";
import Album from "./Item/Album/Album";
import GeneratePlaylist from "./GeneratePlaylists/GeneratePlaylist";
import styled from "styled-components/macro";
import { theme, media } from "../styles";

const SiteWrapper = styled.div`
    padding-left: ${theme.navWidth};
    ${media.phablet`
        padding-left: 0;
        padding-bottom: ${theme.navWidth};
    `};
`;

const PageWrapper = styled.div`
    padding: 50px 5vw 0px 5vw;
`;

interface HomePageProps {
    logout: () => void;
}

function HomePage({ logout }: HomePageProps) {
    return (
        <div>
            <Nav logout={logout}></Nav>
            <SiteWrapper>
                <PageWrapper>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/generate"
                            element={<GeneratePlaylist />}
                        />
                        <Route path="/playlists" element={<Playlists />} />

                        <Route path="/playlist/:id" element={<Playlist />} />
                        <Route path="/artist/:id" element={<Artist />} />
                        <Route path="/album/:id" element={<Album />} />
                        <Route path="/track/:id" element={<Track />} />
                        <Route path="/recent" element={<Recent />} />
                    </Routes>
                </PageWrapper>
            </SiteWrapper>
        </div>
    );
}

export default HomePage;
