import React, { useEffect, useState } from "react";
import SpotifyTypes from "spotify-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouse,
    faSquarePlus,
    faRightFromBracket,
    faSeedling,
    faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";

import links from "./links";
import { theme, mixins, media } from "../../styles";
import SelectedSeeds from "../SelectedSeeds/SelectedSeeds";
const { colors } = theme;

const Navbar = styled.nav`
    top: 0;
    right: 0;
    width: 100%;
    min-height: ${theme.navHeight};
    height: ${theme.navHeight};
    flex-direction: row;
`;

const Menu = styled.ul`
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
`;
const MenuItem = styled.div<{ top?: boolean; bottom?: boolean }>``;

interface NavProps {
    logout: () => void;
}

function Nav({ logout }: NavProps) {
    return (
        <Navbar>
            <Menu>
                {links.map((link, idx) => {
                    return (
                        <MenuItem top={true}>
                            <NavLink to={link.path}>
                                <div>
                                    <FontAwesomeIcon
                                        icon={link.icon}
                                        size="xl"
                                    />
                                    <div>{link.label}</div>
                                </div>
                            </NavLink>
                        </MenuItem>
                    );
                })}
            </Menu>
            <SelectedSeeds />
            <MenuItem>
                <div onClick={() => logout()}>
                    <FontAwesomeIcon icon={faRightFromBracket} size="xl" />
                </div>
            </MenuItem>
        </Navbar>
    );
}

export default Nav;
