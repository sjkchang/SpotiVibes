import React, { Component } from "react";
import { LoggedInItems, LoggedOutItems } from "./MenuItems";
import { Button } from "../Button";
import "./Navbar.css";
import { Routes, Route, Link } from "react-router-dom";

export const Navbar = ({ loggedIn, page }) => {
  const state = {
    clicked: false,
  };

  const handleClick = () => {
    this.setState({ clicked: !state.clicked });
  };

  const MenuItems = loggedIn ? LoggedInItems : LoggedOutItems;

  return (
    <nav className="Navbar">
      <h1 className="navbar-logo">SpotiVibes</h1>

      {loggedIn ? (
        <ul className="nav-menu">
          <li>
            <Link className="nav-links" to="top-tracks">
              Your Top Tracks
            </Link>
          </li>
          <li>
            <Link className="nav-links" to="top-artists">
              Your Top Artists
            </Link>
          </li>
          <li>
            <Link className="nav-links" to="generate">
              Generate Playlist
            </Link>
          </li>
          <li>
            <a className="nav-links-right" href="/api/logout">
              Logout
            </a>
          </li>
        </ul>
      ) : (
        <ul className="nav-menu">
          <li>
            <a className="nav-links-right" href="/api/login">
              Login
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
