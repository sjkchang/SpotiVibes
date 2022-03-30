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

      <ul className={state.clicked ? "nav-menu active" : "nav-menu"}>
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              {item.reactUrl ? (
                <Link className={item.cName} to={item.url}>
                  {item.title}
                </Link>
              ) : (
                <a className={item.cName} href={item.url}>
                  {item.title}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
