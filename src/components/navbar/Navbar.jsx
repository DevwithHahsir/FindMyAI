import React from "react";
import { Link } from "react-router-dom";
import { BsFillMenuButtonFill } from "react-icons/bs";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {/* Logo/Brand */}
      <Link className="navbar-brand" to="/">
        <h2>FindMyAI</h2>
      </Link>

      {/* Toggle Button for Mobile */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="">
          <BsFillMenuButtonFill />
        </span>
      </button>

      {/* Navbar Content */}
      <div className="collapse navbar-collapse" id="navbarContent">
        {/* Nav Links */}
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/categories">
              Categories
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/trending">
              Trending
            </Link>
          </li>
        </ul>

        {/* Search Bar */}
        <form className="d-flex mx-auto searchbar-container">
          <div className="input-group">
            <input
              className="form-control"
              type="search"
              placeholder="Search AI tools..."
              aria-label="Search"
            />
            <button className="btn btn-outline-primary" type="submit">
              <i className="bi bi-search"></i>
            </button>
          </div>
        </form>

        {/* User Authentication */}
      </div>
    </nav>
  );
}

export default Navbar;
