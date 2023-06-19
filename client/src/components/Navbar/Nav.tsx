import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";

import { theme, mixins, media } from "../../styles";
import SelectedSeeds from "../SelectedSeeds/SelectedSeeds";
import links from "./links";
const { colors } = theme;

const Navbar = styled.nav`
    ${mixins.coverShadow};
    ${mixins.flexBetween};
    flex-direction: column;
    justify-content: space-between;
    min-height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    width: ${theme.navWidth};
    background-color: ${colors.tertiary};
    text-align: center;
    z-index: 99;
    ${media.phablet`
        top: auto;
        bottom: 0;
        right: 0;
        width: 100%;
        min-height: ${theme.navHeight};
        height: ${theme.navHeight};
        flex-direction: row;
        align-items: center;

  `};
    & > * {
        width: 100%;
        ${media.phablet`
            height: 100%;
        `};
    }
`;

const Menu = styled.ul`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    ${media.phablet`
        margin-left: 5px;
        margin-top: 3px;
        flex-direction: row;
        align-items: flex-end;
        justify-content: center;
  `};
    background-color: ${colors.background};
    border-radius: 10px;
    padding: 5px;
`;

const MenuItem = styled.div<{ top?: boolean; bottom?: boolean }>`
    color: ${colors.secondary};
    font-size: 11px;
    ${media.phablet`
        flex-grow: 1;
        flex-basis: 100%;
        height: 100%;
    `};
    a {
        display: block;
        padding: 10px 0;
        border-left: 5px solid transparent;
        width: 100%;
        height: 100%;
        ${media.phablet`
            ${mixins.flexCenter};
            flex-direction: column;
            padding: 0;
            border-left: 0;
            border-top: 3px solid transparent;
        `};
        &:hover,
        &:focus,
        &.active {
            color: ${colors.primary};

            ${media.phablet`
                border-left: 0;
            `};
        }
    }
    svg {
        width: 30px;
        height: 30px;
        margin-bottom: 7px;
    }
`;

const Logout = styled.div`
    margin-bottom: 40px;
    font-size: 11px;
    ${media.phablet`
        margin-bottom: 0px;
        width: 200px;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: space-around;

    `};
    color: ${colors.secondary};
    &:hover {
        color: ${colors.primary};
    }
`;

const Top = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

interface NavProps {
    logout: () => void;
}

function Nav({ logout }: NavProps) {
    return (
        <Navbar>
            <Top>
                <Menu>
                    {links.map((link, idx) => {
                        return (
                            <MenuItem top={true}>
                                <NavLink to={link.path}>
                                    <div>
                                        <FontAwesomeIcon
                                            icon={link.icon}
                                            size="3x"
                                        />
                                        <div>{link.label}</div>
                                    </div>
                                </NavLink>
                            </MenuItem>
                        );
                    })}
                </Menu>
                <SelectedSeeds />
            </Top>

            <Logout onClick={() => logout()}>
                <div>
                    <FontAwesomeIcon icon={faRightFromBracket} size="3x" />
                </div>
            </Logout>
        </Navbar>
    );
}

export default Nav;
