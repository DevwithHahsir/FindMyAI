import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsFillMenuButtonFill } from "react-icons/bs";
import { FindMyAILogo } from "../common/OptimizedImage";
import InstantSearch from "../search/InstantSearch";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("home");

  // Set active item based on current path
  useEffect(() => {
    // Initialize based on current path
    if (location.pathname === "/") {
      setActiveItem("home");

      // Handle hash navigation on homepage
      if (location.hash === "#categories-section") {
        setActiveItem("categories");
        // Scroll to section after a brief delay to ensure DOM is ready
        setTimeout(() => {
          const element = document.getElementById("categories-section");
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else if (location.hash === "#trending-section") {
        setActiveItem("trending");
        // Scroll to section after a brief delay to ensure DOM is ready
        setTimeout(() => {
          const element = document.getElementById("trending-section");
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    } else if (location.pathname === "/about") {
      setActiveItem("about");
    } else if (location.pathname === "/contact") {
      setActiveItem("contact");
    } else if (location.pathname === "/how-to-use-ai") {
      setActiveItem("howto");
    } else if (location.pathname === "/mastering-prompts") {
      setActiveItem("prompts");
    } else if (location.pathname.startsWith("/tool/")) {
      // Keep previous state when viewing a tool
    } else if (location.pathname.startsWith("/category/")) {
      setActiveItem("categories");
    }
  }, [location.pathname, location.hash]);

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
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* <FindMyAILogo size="medium" loading="eager" fetchPriority="high" /> */}
          <h2>FindMyAI</h2>
        </div>
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
            <Link
              className={`nav-link ${activeItem === "home" ? "active" : ""}`}
              to="/"
              onClick={() => setActiveItem("home")}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            {location.pathname === "/" ? (
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
                  setActiveItem("categories");
                }}
              >
                Categories
              </a>
            ) : (
              <Link
                className={`nav-link ${
                  activeItem === "categories" ? "active" : ""
                }`}
                to="/#categories-section"
                onClick={() => setActiveItem("categories")}
              >
                Categories
              </Link>
            )}
          </li>
          <li className="nav-item">
            {location.pathname === "/" ? (
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
                  setActiveItem("trending");
                }}
              >
                Trending
              </a>
            ) : (
              <Link
                className={`nav-link ${
                  activeItem === "trending" ? "active" : ""
                }`}
                to="/#trending-section"
                onClick={() => setActiveItem("trending")}
              >
                Trending
              </Link>
            )}
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${activeItem === "howto" ? "active" : ""}`}
              to="/how-to-use-ai"
              onClick={() => setActiveItem("howto")}
            >
              How to Use AI
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${activeItem === "prompts" ? "active" : ""}`}
              to="/mastering-prompts"
              onClick={() => setActiveItem("prompts")}
            >
              Mastering Prompts
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${activeItem === "about" ? "active" : ""}`}
              to="/about"
              onClick={() => setActiveItem("about")}
            >
              About Us
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${activeItem === "contact" ? "active" : ""}`}
              to="/contact"
              onClick={() => setActiveItem("contact")}
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Instant Search Bar */}
        <div className="d-flex mx-auto searchbar-container">
          <InstantSearch />
        </div>

        {/* User Authentication */}
      </div>
    </nav>
  );
}

export default Navbar;
