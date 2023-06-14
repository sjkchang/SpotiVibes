import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components/macro";
import { theme } from "../styles";
const { colors } = theme;
interface SearchBarProps {
    setSearch: (searchQuery: string) => void;
}

const SearchBarWrapper = styled.div`
    width: 100%;
    max-width: 500px;
    &:focus-within div {
        color: ${colors.primary};
    }
`;

const SearchIcon = styled.div`
    position: absolute;
    color: ${colors.secondary};
    padding: 14px 0 0 20px;
    z-index: 2;
`;

const SearchInput = styled.input`
    all: unset;
    width: 80%;
    background-color: ${colors.background};
    filter: brightness(90%);
    border: 2px solid transparent;
    border-radius: 30px;
    padding: 12px 20px 12px 50px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:hover {
        border: 2px solid ${colors.secondary};
    }
    &:focus {
        color: ${colors.primary};
        border: 2px solid ${colors.primary};
    }
`;

function SearchBar({ setSearch }: SearchBarProps) {
    return (
        <SearchBarWrapper>
            <SearchIcon>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </SearchIcon>
            <SearchInput
                className="SearchInput"
                type="search"
                placeholder="What are you looking for"
                onChange={(event) => {
                    setSearch(event.target.value);
                }}
            ></SearchInput>
        </SearchBarWrapper>
    );
}

export default SearchBar;
