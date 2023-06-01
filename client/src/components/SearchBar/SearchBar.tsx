import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./SearchBar.css";

interface SearchBarProps {
    setSearch: (searchQuery: string) => void;
}

function SearchBar({ setSearch }: SearchBarProps) {
    return (
        <div className="SearchBar">
            <FontAwesomeIcon
                className="input-icon SearchIcon"
                icon={faMagnifyingGlass}
            />
            <FontAwesomeIcon
                className="input-icon XIcon"
                icon={faMagnifyingGlass}
            />
            <input
                className="SearchInput"
                type="search"
                placeholder="What are you looking for"
                onChange={(event) => {
                    setSearch(event.target.value);
                }}
            ></input>
        </div>
    );
}

export default SearchBar;
