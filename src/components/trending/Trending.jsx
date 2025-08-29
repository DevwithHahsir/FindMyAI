import React from "react";
import "./trending.css";
import SEO from "../seo/SEO";
import { Link } from "react-router-dom";
import {
  LuBrainCircuit,
  LuCode,
  LuPenLine,
  LuImage,
  LuMusic,
  LuVideo,
} from "react-icons/lu";
import {
  BiDollar,
  BiCodeAlt,
  BiImage,
  BiText,
  BiVideo,
  BiMusic,
  BiData,
} from "react-icons/bi";
import {
  CiLink,
  CiTextAlignLeft,
  CiImageOn,
  CiVideoOn,
  CiSettings,
} from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
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

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig/firebase";

function Trending() {
  const [trendingTools, setTrendingTools] = useState([]);

  // Function to get color based on icon prefix
  const getIconColor = (iconName) => {
    if (!iconName) return "#4F46E5"; // Default purple color

    // Color mapping based on icon library prefixes
    if (iconName.startsWith("Lu")) return "#4F46E5"; // Purple for Lu icons
    if (iconName.startsWith("Bi")) return "#10B981"; // Green for Bi icons
    if (iconName.startsWith("Ci")) return "#F59E42"; // Orange for Ci icons
    if (iconName.startsWith("Ai")) return "#EF4444"; // Red for Ai icons
    if (iconName.startsWith("Fi")) return "#3B82F6"; // Blue for Fi icons
    if (iconName.startsWith("Ri")) return "#8B5CF6"; // Indigo for Ri icons
    if (iconName.startsWith("Tb")) return "#EC4899"; // Pink for Tb icons

    return "#4F46E5"; // Default purple color
  };

  // Function to map icon name string to the actual icon component
  const getIconComponent = (iconName) => {
    const iconMap = {
      // LU icons
      LuBrainCircuit,
      LuCode,
      LuPenLine,
      LuImage,
      LuMusic,
      LuVideo,
      // BI icons
      BiCodeAlt,
      BiImage,
      BiText,
      BiVideo,
      BiMusic,
      BiData,
      BiDollar,
      // CI icons
      CiTextAlignLeft,
      CiImageOn,
      CiVideoOn,
      CiSettings,
      CiLink,
      // AI icons
      AiOutlineCode,
      AiOutlineRobot,
      AiOutlineFileImage,
      AiOutlineSound,
      // FI icons
      FiCode,
      FiCpu,
      FiImage,
      FiVideo,
      FiMusic,
      FiDatabase,
      FiBook,
      // RI icons
      RiCodeLine,
      RiRobotLine,
      RiHealthBookLine,
      RiMoneyDollarCircleLine,
      // TB icons
      TbCode,
      TbBrain,
      TbWriting,
      TbPhoto,
      TbVideo,
      TbMusic,
      TbSchool,
    };

    return iconMap[iconName] || LuBrainCircuit; // Default to LuBrainCircuit if not found
  };

  useEffect(() => {
    const fetchToolsByEachCategory = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tools"));
        const allTools = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const grouped = {};
        allTools.forEach((tool) => {
          if (!grouped[tool.category]) {
            grouped[tool.category] = tool; // pick first tool per category
          }
        });

        setTrendingTools(Object.values(grouped));
      } catch (_error) {
        // Error handling without console statements
      }
    };

    fetchToolsByEachCategory();
  }, []);

  return (
    <>
      <SEO
        title="Trending AI Tools 2025 – Best Free & Paid AI Apps, Software & Directory | FindMyAI
"
        description="Explore the top trending AI tools of 2025 with FindMyAI – your ultimate AI tools directory. Compare free & paid AI apps, software, and platforms for productivity, startups, content creation, and business growth. Discover the best AI software people trust in 2025.
"
        url="https://findmyai-ed99f.web.app"
      />

      <main className="trending-section-main-container">
        <section className="trending-headings">
          <section className="category-heading-container">
            <h3>
              FEATURED <span>TOOLS</span>
            </h3>
            <p>
              Discover the most popular and trending tools in our collection
            </p>
          </section>
        </section>

        <section className="trending-cards-container">
          {trendingTools.map((tool) => (
            <section className="trending-cards" key={tool.categoryId}>
              <section className="heading-badges">
                <section className="heading-icon">
                  <div
                    className="icon"
                    style={{ color: getIconColor(tool.iconName) }}
                  >
                    {/* Use the icon mapping function to get the proper icon with color */}
                    {React.createElement(getIconComponent(tool.iconName), {
                      color: getIconColor(tool.iconName),
                      size: 24,
                    })}
                  </div>
                  <div className="trending-heading-container">
                    <div className="trending-heading">{tool.name}</div>
                    <div className="sub-heading">{tool.category}</div>
                  </div>
                </section>

                {/* plans section */}

                <section className="trending-plans">
                  <div className="free">free</div>
                  <div className="paid">
                    <BiDollar className="paid-icon" />
                    paid
                  </div>
                </section>
              </section>

              {/* trend Description */}

              <div className="trending-description">
                <p>
                  {tool.description ||
                    "Conversational AI model by OpenAI for various tasks including coding, writing, and analysis"}
                </p>
              </div>

              {/* trend BUttons */}

              <div className="trending-btns herosection-btns">
                <a
                  href={tool.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="explore-btn"
                  title="Visit the official website"
                  onClick={(e) => {
                    if (!tool.websiteUrl) {
                      e.preventDefault();
                      alert("Website URL is not available for this tool.");
                    }
                  }}
                >
                  <CiLink />
                  visit
                </a>
                <Link
                  to={`/tool/${encodeURIComponent(tool.name)}`}
                  className="browse-btn"
                  title="View detailed information about this tool"
                >
                  <IoEyeOutline />
                  Details
                </Link>
              </div>
            </section>
          ))}
        </section>
      </main>
    </>
  );
}

export default Trending;
