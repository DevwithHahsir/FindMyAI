/* eslint-disable no-unused-vars */
import React from "react";
import "./trending.css";
import SEO from "../seo/SEO";
import { cleanToolName, createToolSlug } from "../../utils/urlUtils";
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
  TbBrandOpenai,
  TbBrandGithub,
  TbBrandAdobe,
  TbBrandFigma,
  TbBrandGoogle,
} from "react-icons/tb";
import {
  SiOpenai,
  SiGithub,
  SiAdobe,
  SiFigma,
  SiCanva,
  SiNotion,
  SiSlack,
  SiDiscord,
  SiSpotify,
  SiNetflix,
} from "react-icons/si";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig/firebase";

function Trending() {
  const [trendingTools, setTrendingTools] = useState([]);

  // Function to get color based on tool name or icon
  const getIconColor = (toolName, iconName) => {
    // Brand-specific colors
    const brandColors = {
      ChatGPT: "#00A67E",
      OpenAI: "#00A67E",
      Claude: "#D2691E",
      Anthropic: "#D2691E",
      GitHub: "#181717",
      Midjourney: "#4B0082",
      "DALL-E": "#00A67E",
      "DALL·E": "#00A67E",
      "Stable Diffusion": "#FF6B6B",
      Adobe: "#FF0000",
      Figma: "#F24E1E",
      Canva: "#00C4CC",
      Microsoft: "#00BCF2",
      Google: "#4285F4",
      Notion: "#000000",
      Slack: "#4A154B",
      Discord: "#5865F2",
      Spotify: "#1DB954",
      Netflix: "#E50914",
    };

    // Check for brand-specific colors first
    if (toolName) {
      const foundBrand = Object.keys(brandColors).find((brand) =>
        toolName.toLowerCase().includes(brand.toLowerCase())
      );
      if (foundBrand) return brandColors[foundBrand];
    }

    // Fallback to icon prefix colors
    if (!iconName) return "#4F46E5";
    if (iconName.startsWith("Si")) return "#6366F1"; // Brand icons - Indigo
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
  const getIconComponent = (toolName, iconName) => {
    // Brand-specific icon mapping
    const brandIcons = {
      ChatGPT: SiOpenai,
      OpenAI: SiOpenai,
      Claude: TbBrain, // Using alternative icon
      Anthropic: TbBrain, // Using alternative icon
      GitHub: SiGithub,
      Midjourney: LuImage, // Using alternative icon
      "DALL-E": SiOpenai,
      "DALL·E": SiOpenai,
      "Stable Diffusion": LuImage, // Using alternative icon
      Adobe: SiAdobe,
      Figma: SiFigma,
      Canva: SiCanva,
      Microsoft: FiCpu, // Using alternative icon
      Google: TbBrandGoogle,
      Notion: SiNotion,
      Slack: SiSlack,
      Discord: SiDiscord,
      Spotify: SiSpotify,
      Netflix: SiNetflix,
    };

    // Check for brand-specific icons first
    if (toolName) {
      const foundBrand = Object.keys(brandIcons).find((brand) =>
        toolName.toLowerCase().includes(brand.toLowerCase())
      );
      if (foundBrand) return brandIcons[foundBrand];
    }

    // Category-based fallback icons if no brand match
    if (toolName) {
      const toolLower = toolName.toLowerCase();
      // AI/Chat tools
      if (
        toolLower.includes("gpt") ||
        toolLower.includes("ai") ||
        toolLower.includes("chat") ||
        toolLower.includes("bot")
      ) {
        return TbBrain;
      }
      // Code tools
      if (
        toolLower.includes("code") ||
        toolLower.includes("git") ||
        toolLower.includes("ide") ||
        toolLower.includes("editor")
      ) {
        return LuCode;
      }
      // Design tools
      if (
        toolLower.includes("design") ||
        toolLower.includes("canvas") ||
        toolLower.includes("draw") ||
        toolLower.includes("sketch")
      ) {
        return TbPhoto;
      }
      // Image generation
      if (
        toolLower.includes("image") ||
        toolLower.includes("photo") ||
        toolLower.includes("picture") ||
        toolLower.includes("art")
      ) {
        return LuImage;
      }
      // Video tools
      if (
        toolLower.includes("video") ||
        toolLower.includes("movie") ||
        toolLower.includes("film")
      ) {
        return LuVideo;
      }
      // Music/Audio tools
      if (
        toolLower.includes("music") ||
        toolLower.includes("audio") ||
        toolLower.includes("sound")
      ) {
        return LuMusic;
      }
      // Writing tools
      if (
        toolLower.includes("write") ||
        toolLower.includes("text") ||
        toolLower.includes("document")
      ) {
        return TbWriting;
      }
    }

    // Fallback to general icon mapping
    const iconMap = {
      // Brand icons
      SiOpenai,
      SiGithub,
      SiAdobe,
      SiFigma,
      SiCanva,
      SiNotion,
      SiSlack,
      SiDiscord,
      SiSpotify,
      SiNetflix,
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
      TbBrandOpenai,
      TbBrandGithub,
      TbBrandAdobe,
      TbBrandFigma,
      TbBrandGoogle,
    };

    return iconMap[iconName] || TbBrain; // Default to TbBrain for AI tools
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
        title="Trending AI Tools 2025 | FindMyAI"
        description="Explore the top trending AI tools of 2025 with FindMyAI – your ultimate AI tools directory. Compare free & paid AI apps, software, and platforms for productivity, startups, content creation, and business growth. Discover the best AI software people trust in 2025.
"
        url="https://findmyai.org"
      />

      <main className="trending-section-main-container">
        <section className="trending-headings">
          <section className="category-heading-container">
            <h2>
              FEATURED <span>TOOLS</span>
            </h2>
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
                    style={{ color: getIconColor(tool.name, tool.iconName) }}
                  >
                    {/* Use the enhanced icon mapping function with brand recognition */}
                    {React.createElement(
                      getIconComponent(tool.name, tool.iconName),
                      {
                        color: getIconColor(tool.name, tool.iconName),
                        size: 24,
                      }
                    )}
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
                  to={`/tool/${createToolSlug(cleanToolName(tool.name))}`}
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
