import React from "react";
import { Link } from "react-router-dom";
import { BsFillMenuButtonFill } from "react-icons/bs";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {/* Logo/Brand */}
      <Link className="navbar-brand" to="/">
        <h2>FindMyAi</h2>
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
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Resources
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <Link className="dropdown-item" to="/blog">
                  Blog
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/tutorials">
                  Tutorials
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link className="dropdown-item" to="/submit-tool">
                  Submit a Tool
                </Link>
              </li>
            </ul>
          </li>
        </ul>

        {/* Search Bar */}
        <form className="d-flex mx-auto">
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
        <div className="ms-3 d-flex align-items-center">
          <div className="dropdown">
            <a
              href="#"
              className="d-flex align-items-center text-decoration-none dropdown-toggle"
              id="userDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-person-circle fs-4 me-2"></i>
              <span className="d-none d-sm-inline">Account</span>
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="userDropdown"
            >
              <li>
                <Link className="dropdown-item" to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/register">
                  Register
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link className="dropdown-item" to="/profile">
                  Profile
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/saved-tools">
                  Saved Tools
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
