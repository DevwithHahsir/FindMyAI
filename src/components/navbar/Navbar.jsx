import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsFillMenuButtonFill } from "react-icons/bs";
import InstantSearch from "../search/InstantSearch";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("home");

  // Set active item based on current path
  useEffect(() => {
    // Initialize based on current path
    if (location.pathname === "/") {
      setActiveItem("home");
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

  // Helper function to handle navigation to sections
  const handleSectionClick = (sectionId, activeItemName) => {
    if (location.pathname === "/") {
      // If already on home page, just scroll to section
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        setActiveItem(activeItemName);
      }
    } else {
      // If on another page, navigate to home first, then scroll
      setActiveItem(activeItemName);
      navigate("/", { replace: true });

      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

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
            <Link
              className={`nav-link ${activeItem === "home" ? "active" : ""}`}
              to="/"
              onClick={() => setActiveItem("home")}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className={`nav-link btn btn-link ${
                activeItem === "categories" ? "active" : ""
              }`}
              onClick={() =>
                handleSectionClick("categories-section", "categories")
              }
              style={{
                border: "none",
                background: "none",
                textDecoration: "none",
              }}
            >
              Categories
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className={`nav-link btn btn-link ${
                activeItem === "trending" ? "active" : ""
              }`}
              onClick={() => handleSectionClick("trending-section", "trending")}
              style={{
                border: "none",
                background: "none",
                textDecoration: "none",
              }}
            >
              Trending
            </button>
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
