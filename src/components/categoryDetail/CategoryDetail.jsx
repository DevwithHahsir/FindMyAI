/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import categoryData from "../../Data/category";
import Tools from "../../Data/tool";
import "./categoryDetail.css";
import SEO from "../seo/SEO";
import { cleanToolName, createToolSlug } from "../../utils/urlUtils";
import { CiLink } from "react-icons/ci";
import { IoEyeOutline, IoArrowBack } from "react-icons/io5";
import { BiDollar } from "react-icons/bi";
import {
  LuBrainCircuit,
  LuCode,
  LuPenLine,
  LuImage,
  LuMusic,
  LuVideo,
} from "react-icons/lu";
import {
  BiCodeAlt,
  BiImage,
  BiText,
  BiVideo,
  BiMusic,
  BiData,
} from "react-icons/bi";
import {
  CiTextAlignLeft,
  CiImageOn,
  CiVideoOn,
  CiSettings,
} from "react-icons/ci";
import {
  AiOutlineCode,
  AiOutlineRobot,
  AiOutlineFileImage,
  AiOutlineSound,
} from "react-icons/ai";
import {
  FiCode,
  FiCpu,
  FiImage,
  FiVideo,
  FiMusic,
  FiDatabase,
  FiBook,
} from "react-icons/fi";
import {
  RiCodeLine,
  RiRobotLine,
  RiHealthBookLine,
  RiMoneyDollarCircleLine,
} from "react-icons/ri";
import {
  TbCode,
  TbBrain,
  TbWriting,
  TbPhoto,
  TbVideo,
  TbMusic,
  TbSchool,
} from "react-icons/tb";

export default function CategoryDetail() {
  const { categoryId } = useParams();
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(null);
  const navigate = useNavigate();

  // Function to get appropriate icon based on category ID
  const getCategoryIcon = (categoryId) => {
    switch (parseInt(categoryId)) {
      case 1:
        return FiCode; // Coding/Development
      case 2:
        return LuImage; // Image/Graphics
      case 3:
        return LuPenLine; // Text/Writing
      case 4:
        return FiVideo; // Video/Multimedia
      case 5:
        return LuMusic; // Audio/Music
      case 6:
        return CiSettings; // Productivity
      case 7:
        return RiMoneyDollarCircleLine; // Business/Marketing
      case 8:
        return FiDatabase; // Data/Research
      case 9:
        return TbSchool; // Education
      case 10:
        return RiHealthBookLine; // Health/Medical
      case 11:
        return BiDollar; // Legal/Finance
      case 12:
        return AiOutlineRobot; // Gaming/Entertainment
      case 13:
        return CiSettings; // Personal/Lifestyle
      case 14:
        return CiSettings; // Security/Cybersecurity
      case 15:
        return LuBrainCircuit; // Miscellaneous
      default:
        return LuBrainCircuit;
    }
  };

  // Function to get color based on category ID
  const getCategoryColor = (categoryId) => {
    switch (parseInt(categoryId)) {
      case 1:
        return "#4F46E5"; // Coding/Development - Purple
      case 2:
        return "#F59E42"; // Image/Graphics - Orange
      case 3:
        return "#10B981"; // Text/Writing - Green
      case 4:
        return "#6366F1"; // Video/Multimedia - Indigo
      case 5:
        return "#F43F5E"; // Audio/Music - Red
      case 6:
        return "#FBBF24"; // Productivity - Yellow
      case 7:
        return "#3B82F6"; // Business/Marketing - Blue
      case 8:
        return "#22D3EE"; // Data/Research - Cyan
      case 9:
        return "#A3E635"; // Education - Lime
      case 10:
        return "#EF4444"; // Health/Medical - Red
      case 11:
        return "#F472B6"; // Legal/Finance - Pink
      case 12:
        return "#F59E42"; // Gaming/Entertainment - Orange
      case 13:
        return "#34D399"; // Personal/Lifestyle - Green
      case 14:
        return "#6366F1"; // Security/Cybersecurity - Indigo
      case 15:
        return "#FBBF24"; // Miscellaneous - Yellow
      default:
        return "#4F46E5"; // Default - Purple
    }
  };

  // Function to get color based on icon name
  const getIconColor = (iconName) => {
    if (!iconName) return "#4F46E5"; // Default purple color

    // Color mapping based on icon library prefixes
    if (typeof iconName === "string") {
      if (iconName.startsWith("Lu")) return "#4F46E5"; // Purple for Lu icons
      if (iconName.startsWith("Bi")) return "#10B981"; // Green for Bi icons
      if (iconName.startsWith("Ci")) return "#F59E42"; // Orange for Ci icons
      if (iconName.startsWith("Ai")) return "#EF4444"; // Red for Ai icons
      if (iconName.startsWith("Fi")) return "#3B82F6"; // Blue for Fi icons
      if (iconName.startsWith("Ri")) return "#8B5CF6"; // Indigo for Ri icons
      if (iconName.startsWith("Tb")) return "#EC4899"; // Pink for Tb icons
    }

    return "#4F46E5"; // Default purple color
  };

  useEffect(() => {
    const loadCategoryAndTools = () => {
      try {
        // Find the category from local data
        const foundCategory = categoryData.find(
          (cat) => String(cat.id) === categoryId
        );

        if (foundCategory) {
          setCategory(foundCategory);
        }

        // Filter tools from local data
        const categoryTools = Tools.filter((tool) => {
          // Match by category ID (as string comparison since URL params are strings)
          const toolCategoryId = String(tool.categoryId || "");
          return toolCategoryId === categoryId;
        });

        setTools(categoryTools);
      } catch (_error) {
        // Error handling without console statements
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      loadCategoryAndTools();
    }
  }, [categoryId]);

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading category tools...</p>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="error-container">
        <h2>Category Not Found</h2>
        <p>The requested category could not be found.</p>
        <p>Requested Category ID: {categoryId}</p>
        <p>Available Categories: {categoryData.map((c) => c.id).join(", ")}</p>
        <button className="back-button" onClick={handleGoBack}>
          <IoArrowBack /> Back
        </button>
      </div>
    );
  }

  return (
    <main className="category-detail-container">
      <SEO
        title={`${category.name} AI Tools - FindMyAI | Best ${category.name} Tools 2025`}
        description={`Discover the best ${
          category.name
        } AI tools in 2025. Compare free & paid options for ${category.name.toLowerCase()} tasks and boost your productivity with FindMyAI's curated selection.`}
        url={`https://findmyai.org/category/${categoryId}`}
      />

      <div className="back-button-container">
        <button className="back-button back" onClick={handleGoBack}>
          <IoArrowBack /> Back
        </button>
      </div>

      {/* Breadcrumb Navigation */}
      <section
        className="breadcrumb-nav"
        style={{ padding: "10px 20px", marginBottom: "20px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#8892b0",
            fontSize: "14px",
          }}
        >
          <Link
            to="/"
            style={{
              background:
                "linear-gradient(90deg, #4E43FF, #614DFE, #7C5DFE, #9269FD, #AE79FC)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textDecoration: "none",
            }}
          >
            Home
          </Link>
          <span>{">"}</span>
          <Link
            to="/"
            onClick={() => {
              // Navigate to home and then scroll to categories section
              setTimeout(() => {
                const categoriesSection =
                  document.getElementById("categories-section");
                if (categoriesSection) {
                  categoriesSection.scrollIntoView({ behavior: "smooth" });
                }
              }, 100);
            }}
            style={{
              background:
                "linear-gradient(90deg, #4E43FF, #614DFE, #7C5DFE, #9269FD, #AE79FC)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textDecoration: "none",
            }}
          >
            Categories
          </Link>
          <span>{">"}</span>
          <span style={{ color: "#ccd6f6" }}>{category.name}</span>
        </div>
      </section>

      <section className="category-detail-header">
        <h1>{category.name}</h1>
        <p>{category.description}</p>
        {/* <p className="category-info">
          Found {tools.length} tools in category #{category.id}
        </p> */}
      </section>

      <section className="category-tools-container">
        <h2>
          Browse <span>{category.name}</span> Tools
        </h2>

        {tools.length > 0 ? (
          <div className="tools-grid">
            {tools.map((tool) => (
              <div className="tool-card" key={tool.id}>
                <div className="tool-header">
                  <div className="tool-icon-container">
                    <div
                      className="tool-icon"
                      style={{
                        color: tool.icon
                          ? getIconColor(tool.icon.name)
                          : getCategoryColor(tool.categoryId),
                      }}
                    >
                      {tool.icon
                        ? React.createElement(tool.icon, {
                            size: 24,
                          })
                        : React.createElement(
                            getCategoryIcon(tool.categoryId),
                            {
                              size: 24,
                            }
                          )}
                    </div>
                    <div className="tool-name-container">
                      <h3>{tool.name}</h3>
                      <p className="tool-subcategory">
                        {tool.subCategory || "General"}
                      </p>
                    </div>
                  </div>
                  <div className="tool-pricing">
                    {tool.plans &&
                      tool.plans.some(
                        (plan) =>
                          plan.price === "$0" ||
                          plan.name?.toLowerCase().includes("free")
                      ) && <span className="free-tag">Free</span>}
                    {tool.plans &&
                      tool.plans.some(
                        (plan) => plan.price && plan.price !== "$0"
                      ) && (
                        <span className="paid-tag">
                          <BiDollar /> Paid
                        </span>
                      )}
                  </div>
                </div>

                <div className="tool-description">
                  <p>{tool.description || "No description available."}</p>
                </div>

                <div className="tool-buttons">
                  <a
                    href={tool.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="website-button"
                    title="Visit the official website"
                    onClick={(e) => {
                      if (!tool.websiteUrl) {
                        e.preventDefault();
                        alert("Website URL is not available for this tool.");
                      }
                    }}
                  >
                    <CiLink /> Visit
                  </a>
                  <Link
                    to={`/tool/${createToolSlug(cleanToolName(tool.name))}`}
                    className="details-button"
                    title="View detailed information about this tool"
                  >
                    <IoEyeOutline /> Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-tools-message">
            <p>
              No tools found in this category. Check back later for updates.
            </p>
          </div>
        )}
      </section>

      {/* Related Categories & Explore More Section */}
      <section
        className="related-section"
        style={{ marginTop: "40px", padding: "20px" }}
      >
        <h2>Explore More Categories</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "15px",
            marginTop: "20px",
          }}
        >
          {categoryData
            .filter((cat) => cat.id !== parseInt(categoryId))
            .slice(0, 6)
            .map((relatedCategory) => (
              <Link
                key={relatedCategory.id}
                to={`/category/${relatedCategory.id}`}
                style={{
                  background:
                    "linear-gradient(90deg, #4E43FF, #614DFE, #7C5DFE, #9269FD, #AE79FC)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textDecoration: "none",
                  padding: "15px",
                  backgroundColor: "#1e2039",
                  borderRadius: "8px",
                  display: "block",
                  textAlign: "center",
                  border: "1px solid #2d3748",
                }}
              >
                <strong>{relatedCategory.name}</strong>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#8892b0",
                    marginTop: "5px",
                  }}
                >
                  Explore tools →
                </div>
              </Link>
            ))}
        </div>

        <div
          style={{
            marginTop: "30px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "15px",
          }}
        >
          <Link
            to="/how-to-use-ai"
            style={{
              background:
                "linear-gradient(90deg, #4E43FF, #614DFE, #7C5DFE, #9269FD, #AE79FC)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textDecoration: "none",
              padding: "15px",
              backgroundColor: "#1e2039",
              borderRadius: "8px",
              display: "block",
              textAlign: "center",
              border: "1px solid #2d3748",
            }}
          >
            <strong>How to Use AI Tools</strong>
            <div
              style={{ fontSize: "12px", color: "#8892b0", marginTop: "5px" }}
            >
              Learn best practices →
            </div>
          </Link>
          <Link
            to="/mastering-prompts"
            style={{
              background:
                "linear-gradient(90deg, #4E43FF, #614DFE, #7C5DFE, #9269FD, #AE79FC)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textDecoration: "none",
              padding: "15px",
              backgroundColor: "#1e2039",
              borderRadius: "8px",
              display: "block",
              textAlign: "center",
              border: "1px solid #2d3748",
            }}
          >
            <strong>Master AI Prompts</strong>
            <div
              style={{ fontSize: "12px", color: "#8892b0", marginTop: "5px" }}
            >
              Improve your prompts →
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
