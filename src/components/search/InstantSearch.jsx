import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Tools from "../../Data/tool";
import Categories from "../../Data/category";
import { cleanToolName, createToolSlug } from "../../utils/urlUtils";
import "./InstantSearch.css";

const InstantSearch = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({
    tools: [],
    categories: [],
  });
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchInputRef = useRef(null);
  const resultsRef = useRef(null);
  const navigate = useNavigate();

  // Focus search input when component mounts
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Netflix-style instant search
  useEffect(() => {
    if (searchTerm.trim().length === 0) {
      setSearchResults({ tools: [], categories: [] });
      setIsOpen(false);
      setSelectedIndex(-1);
      return;
    }

    const searchQuery = searchTerm.toLowerCase().trim();

    // Search tools
    const matchingTools = Tools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(searchQuery) ||
        tool.description.toLowerCase().includes(searchQuery) ||
        tool.category.toLowerCase().includes(searchQuery) ||
        tool.subCategory?.toLowerCase().includes(searchQuery)
    ).slice(0, 8); // Limit to 8 tools

    // Search categories
    const matchingCategories = Categories.filter(
      (category) =>
        category.name.toLowerCase().includes(searchQuery) ||
        category.description.toLowerCase().includes(searchQuery)
    ).slice(0, 4); // Limit to 4 categories

    setSearchResults({ tools: matchingTools, categories: matchingCategories });
    setIsOpen(true);
    setSelectedIndex(-1);
  }, [searchTerm]);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    const totalResults =
      searchResults.categories.length + searchResults.tools.length;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % totalResults);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev <= 0 ? totalResults - 1 : prev - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0) {
        handleResultClick(selectedIndex);
      }
    } else if (e.key === "Escape") {
      handleClose();
    }
  };

  // Handle result click or Enter key
  const handleResultClick = (index) => {
    const totalCategories = searchResults.categories.length;

    if (index < totalCategories) {
      // Category selected
      const category = searchResults.categories[index];
      navigate(`/category/${category.id}`);
    } else {
      // Tool selected
      const toolIndex = index - totalCategories;
      const tool = searchResults.tools[toolIndex];
      // Use cleaned tool name for consistent URL format
      const toolSlug = createToolSlug(cleanToolName(tool.name));
      navigate(`/tool/${toolSlug}`);
    }

    handleClose();
  };

  // Close search
  const handleClose = () => {
    setSearchTerm("");
    setIsOpen(false);
    setSelectedIndex(-1);
    if (onClose) onClose();
  };

  // Get icon component for tools
  const getIconComponent = (IconComponent) => {
    try {
      if (IconComponent && typeof IconComponent === "function") {
        return <IconComponent />;
      }
      return <i className="bi bi-stars"></i>;
    } catch {
      return <i className="bi bi-stars"></i>;
    }
  };

  const totalResults =
    searchResults.categories.length + searchResults.tools.length;

  return (
    <div className="instant-search-container">
      <div className="search-input-container">
        <input
          ref={searchInputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search AI tools and categories..."
          className="instant-search-input"
        />
        <button className="search-close-btn" onClick={handleClose}>
          <i className="bi bi-x-lg"></i>
        </button>
      </div>

      {isOpen && totalResults > 0 && (
        <div className="search-results-container" ref={resultsRef}>
          <div className="search-results">
            {/* Categories Section */}
            {searchResults.categories.length > 0 && (
              <div className="search-section">
                <div className="search-section-header">
                  <i className="bi bi-folder"></i>
                  Categories ({searchResults.categories.length})
                </div>
                {searchResults.categories.map((category, index) => (
                  <Link
                    key={`category-${category.id}`}
                    to={`/category/${category.id}`}
                    className={`search-result-item ${
                      selectedIndex === index ? "selected" : ""
                    }`}
                    onClick={handleClose}
                  >
                    <div className="result-icon category-icon">
                      <i className="bi bi-folder"></i>
                    </div>
                    <div className="result-content">
                      <div className="result-title">{category.name}</div>
                      <div className="result-description">
                        {category.description.substring(0, 80)}...
                      </div>
                    </div>
                    <div className="result-badge">Category</div>
                  </Link>
                ))}
              </div>
            )}

            {/* Tools Section */}
            {searchResults.tools.length > 0 && (
              <div className="search-section">
                <div className="search-section-header">
                  <i className="bi bi-tools"></i>
                  AI Tools ({searchResults.tools.length})
                </div>
                {searchResults.tools.map((tool, index) => {
                  const resultIndex = searchResults.categories.length + index;
                  const toolSlug = createToolSlug(cleanToolName(tool.name));
                  return (
                    <Link
                      key={`tool-${index}`}
                      to={`/tool/${toolSlug}`}
                      className={`search-result-item ${
                        selectedIndex === resultIndex ? "selected" : ""
                      }`}
                      onClick={handleClose}
                    >
                      <div className="result-icon tool-icon">
                        {getIconComponent(tool.icon)}
                      </div>
                      <div className="result-content">
                        <div className="result-title">{tool.name}</div>
                        <div className="result-description">
                          {tool.description.substring(0, 80)}...
                        </div>
                        <div className="result-category">{tool.category}</div>
                      </div>
                      <div
                        className={`result-badge ${
                          tool.pricingModel === "Free" ||
                          tool.pricingModel === "Freemium"
                            ? "free"
                            : "paid"
                        }`}
                      >
                        {tool.pricingModel}
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Search Footer */}
          <div className="search-footer">
            <div className="search-tips">
              <span>
                <kbd>↑</kbd>
                <kbd>↓</kbd> navigate
              </span>
              <span>
                <kbd>Enter</kbd> select
              </span>
              <span>
                <kbd>Esc</kbd> close
              </span>
            </div>
          </div>
        </div>
      )}

      {isOpen && searchTerm && totalResults === 0 && (
        <div className="search-results-container">
          <div className="no-results">
            <i className="bi bi-search"></i>
            <div>No results found for "{searchTerm}"</div>
            <div className="no-results-tip">
              Try different keywords or browse categories
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstantSearch;
