import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsFillMenuButtonFill } from "react-icons/bs";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("home");

  // Check if categories section is in view and update active state
  useEffect(() => {
    // Initialize based on current path
    if (location.pathname === "/trending") {
      setActiveItem("trending");
    } else {
      setActiveItem("home");
    }
  }, [location.pathname]);

  // Handle scrolling detection for categories and trending sections
  useEffect(() => {
    const handleScroll = () => {
      const categoriesSection = document.getElementById("categories-section");
      const trendingSection = document.getElementById("trending-section");

      if (location.pathname === "/") {
        // Check if trending section is in view
        if (trendingSection) {
          const trendingRect = trendingSection.getBoundingClientRect();
          const isTrendingInView =
            trendingRect.top <= 200 && trendingRect.bottom >= 100;

          if (isTrendingInView && activeItem !== "trending") {
            setActiveItem("trending");
            return; // Exit early if trending is in view
          }
        }

        // Check if categories section is in view
        if (categoriesSection) {
          const categoriesRect = categoriesSection.getBoundingClientRect();
          const isCategoriesInView =
            categoriesRect.top <= 200 && categoriesRect.bottom >= 100;

          if (isCategoriesInView && activeItem !== "categories") {
            setActiveItem("categories");
            return; // Exit early if categories is in view
          }
        }

        // If no section is in view and we're not on home already, set to home
        if (
          activeItem !== "home" &&
          ((categoriesSection &&
            categoriesSection.getBoundingClientRect().top > 200) ||
            !categoriesSection) &&
          ((trendingSection &&
            trendingSection.getBoundingClientRect().top > 200) ||
            !trendingSection)
        ) {
          setActiveItem("home");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname, activeItem]);

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
            <a
              className={`nav-link ${activeItem === "home" ? "active" : ""}`}
              href="#hero-section"
              onClick={(e) => {
                e.preventDefault();
                setActiveItem("home");
                document
                  .getElementById("hero-section")
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >
              Home
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${
                activeItem === "categories" ? "active" : ""
              }`}
              href="#categories-section"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("categories-section")
                  .scrollIntoView({ behavior: "smooth" });

                // Explicitly set active state when clicking
                setActiveItem("categories");
              }}
            >
              Categories
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${
                activeItem === "trending" ? "active" : ""
              }`}
              href="#trending-section"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("trending-section")
                  .scrollIntoView({ behavior: "smooth" });

                // Explicitly set active state when clicking
                setActiveItem("trending");
              }}
            >
              Trending
            </a>
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
