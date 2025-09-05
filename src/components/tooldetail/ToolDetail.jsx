/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig/firebase";
import "./toolDetail.css";
import SEO from "../seo/SEO";
import StructuredData from "../seo/StructuredData";
import { cleanToolName, createToolSlug } from "../../utils/urlUtils";
import { LuBrain } from "react-icons/lu";
import { CiLink } from "react-icons/ci";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function ToolDetail() {
  const { name } = useParams();
  const [tool, setTool] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Decode the name parameter from URL
  const decodedName = decodeURIComponent(name);
  useEffect(() => {
    const fetchTool = async () => {
      try {
        // Query Firestore to find the tool by name
        const toolsCollection = collection(db, "tools");
        const querySnapshot = await getDocs(toolsCollection);

        let foundTool = null;
        let allToolNames = [];

        // First try exact match
        querySnapshot.forEach((doc) => {
          const toolData = doc.data();
          allToolNames.push(toolData.name);

          // Try exact match first
          if (toolData.name === decodedName) {
            foundTool = { id: doc.id, ...toolData };
          }
        });

        // If no exact match, try case-insensitive
        if (!foundTool) {
          querySnapshot.forEach((doc) => {
            const toolData = doc.data();
            if (
              toolData.name &&
              decodedName &&
              toolData.name.toLowerCase() === decodedName.toLowerCase()
            ) {
              foundTool = { id: doc.id, ...toolData };
            }
          });
        }

        if (foundTool) {
          setTool(foundTool);
        } else {
          try {
            // Try to fetch the tool as if the name parameter is actually an ID
            const toolDocRef = doc(db, "tools", decodedName);
            const toolDoc = await getDoc(toolDocRef);

            if (toolDoc.exists()) {
              const toolData = { id: toolDoc.id, ...toolDoc.data() };
              setTool(toolData);
            }
          } catch (_) {
            // Error handling without console.error
          }
        }
      } catch (_error) {
        // Error handling without console.error
      } finally {
        setLoading(false);
      }
    };

    fetchTool();
  }, [decodedName]);
  const handleGoBack = () => {
    window.history.back();
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading tool information...</p>
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="error-container">
        <h1>Tool Not Found</h1>
        <p>
          The requested tool "{decodedName}" could not be found. Please check
          the URL and try again.
        </p>
        <div
          style={{
            margin: "20px 0",
            padding: "10px",
            background: "#1e1e24",
            borderRadius: "5px",
          }}
        >
          <p>
            <strong>Debugging Info:</strong>
          </p>
          <p>URL Parameter: {name}</p>
          <p>Decoded Name: {decodedName}</p>
          <p>Try returning to the home page and selecting a tool from there.</p>
        </div>
        <button className="explore-btn" onClick={() => navigate("/")}>
          Return Home
        </button>
        <button
          className="explore-btn"
          onClick={handleGoBack}
          style={{ marginLeft: "10px" }}
        >
          Go Back
        </button>
      </div>
    );
  }

  // Use the actual tool data
  const currentTool = tool;

  // Helper function to safely get string values
  const safeString = (value, defaultValue = "Not specified") => {
    return typeof value === "string" ? value : defaultValue;
  };

  return (
    <main className="ToolDetal-main-container">
      <SEO
        title={`${safeString(currentTool.name)} | FindMyAI`}
        description={`Discover ${safeString(
          currentTool.name
        )}, one of the top ${safeString(
          currentTool.category
        )} AI tools of ${new Date().getFullYear()}. Learn features, pricing (free & paid), and how ${safeString(
          currentTool.name
        )} can boost productivity, startups, content creation, and business growth. Find trusted AI software on FindMyAI.`}
        url={`https://findmyai.org/tool/${createToolSlug(
          cleanToolName(safeString(currentTool.name))
        )}`}
      />

      <StructuredData
        type="tool-product-faq"
        data={{
          name: safeString(currentTool.name),
          description: safeString(currentTool.description),
          websiteUrl: currentTool.websiteUrl,
          category: safeString(currentTool.category),
          pricingModel: safeString(currentTool.pricingModel),
        }}
      />

      <StructuredData
        type="breadcrumb"
        data={[
          {
            name: "Home",
            url: "https://findmyai.org/",
          },
          {
            name: "AI Tools",
            url: "https://findmyai.org/",
          },
          {
            name: safeString(currentTool.category),
            url: `https://findmyai.org/category/${currentTool.categoryId}`,
          },
          {
            name: safeString(currentTool.name),
            url: `https://findmyai.org/tool/${createToolSlug(
              cleanToolName(safeString(currentTool.name))
            )}`,
          },
        ]}
      />

      <section className="back-btn">
        <button className="browse-btn back" onClick={handleGoBack}>
          <BiArrowBack /> Back
        </button>
      </section>

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
          <Link to="/" style={{ color: "#64ffda", textDecoration: "none" }}>
            Home
          </Link>
          <span>{">"}</span>
          <Link
            to="/#categories-section"
            style={{ color: "#64ffda", textDecoration: "none" }}
          >
            Categories
          </Link>
          {currentTool.category && (
            <>
              <span>{">"}</span>
              <Link
                to={`/category/${currentTool.categoryId || "1"}`}
                style={{ color: "#64ffda", textDecoration: "none" }}
              >
                {safeString(currentTool.category)}
              </Link>
            </>
          )}
          <span>{">"}</span>
          <span style={{ color: "#ccd6f6" }}>
            {safeString(currentTool.name)}
          </span>
        </div>
      </section>

      <section className="detail-info-container">
        {/* Left container: Main details */}
        <section className="detail-main-container">
          {/* headings-icon-badges */}
          <section className="detail-heading-container">
            <div className="icon-heading-container">
              <div className="icon">
                <LuBrain />
              </div>
              <div className="headin-container">
                <h1>{safeString(currentTool.name, "Tool")}</h1>
                <div className="sub-category">
                  {currentTool.category && (
                    <p>{safeString(currentTool.category)}</p>
                  )}
                  {currentTool.subCategory && (
                    <p>{safeString(currentTool.subCategory)}</p>
                  )}
                  {currentTool.pricingModel && (
                    <p>{safeString(currentTool.pricingModel)}</p>
                  )}
                </div>

                {/* subscription-container */}
                <section className="trending-plans">
                  {currentTool.plans &&
                    currentTool.plans.some(
                      (plan) =>
                        plan.price === "$0" ||
                        (typeof plan.name === "string" &&
                          plan.name.toLowerCase().includes("free"))
                    ) && <div className="free">free</div>}
                  {currentTool.plans &&
                    currentTool.plans.some(
                      (plan) =>
                        plan.price &&
                        plan.price !== "$0" &&
                        !(
                          typeof plan.name === "string" &&
                          plan.name.toLowerCase().includes("free")
                        )
                    ) && <div className="paid">paid</div>}
                </section>
              </div>

              {/* Button */}
              <div className="tool-btn">
                <a
                  href={
                    typeof currentTool.websiteUrl === "string"
                      ? currentTool.websiteUrl
                      : "#"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="explore-btn"
                  onClick={(e) => {
                    if (typeof currentTool.websiteUrl !== "string") {
                      e.preventDefault();
                      alert("Website URL is not available for this tool.");
                    }
                  }}
                >
                  <CiLink className="btn-icon" />
                  Visit Website
                </a>
              </div>
            </div>

            {/* Enhanced Description Container */}
            <div
              className="detail-description-container"
              style={{
                marginTop: "30px",
                padding: "25px",
                backgroundColor: "#1e2039",
                borderRadius: "8px",
                border: "1px solid #2d3748",
              }}
            >
              <h3>About {safeString(currentTool.name)}</h3>
              <p style={{ lineHeight: "1.6", marginBottom: "20px" }}>
                {currentTool.description ||
                  `${safeString(
                    currentTool.name
                  )} is a cutting-edge AI tool designed to revolutionize how professionals approach ${safeString(
                    currentTool.category
                  ).toLowerCase()} tasks. This innovative solution leverages advanced artificial intelligence algorithms to deliver exceptional results while streamlining workflows and enhancing productivity.`}
              </p>

              <div style={{ marginBottom: "25px" }}>
                <h4 style={{ color: "#64ffda", marginBottom: "15px" }}>
                  Key Capabilities
                </h4>
                <p style={{ lineHeight: "1.6", marginBottom: "15px" }}>
                  As a leading {safeString(currentTool.category).toLowerCase()}{" "}
                  AI tool, {safeString(currentTool.name)} offers powerful
                  features that enable users to achieve professional-grade
                  results efficiently. The platform combines intuitive design
                  with sophisticated AI technology, making it accessible to both
                  beginners and experienced professionals.
                </p>
                <p style={{ lineHeight: "1.6" }}>
                  Whether you're working on personal projects or
                  enterprise-level initiatives, {safeString(currentTool.name)}{" "}
                  provides the flexibility and scalability needed to meet
                  diverse requirements. Its{" "}
                  {safeString(currentTool.pricingModel).toLowerCase()} pricing
                  model ensures that users can find a plan that fits their
                  budget and usage needs.
                </p>
              </div>

              <div>
                <h4 style={{ color: "#64ffda", marginBottom: "15px" }}>
                  Why Choose {safeString(currentTool.name)}?
                </h4>
                <div style={{ display: "grid", gap: "12px" }}>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        color: "#64ffda",
                        fontSize: "16px",
                        marginTop: "2px",
                      }}
                    >
                      ✓
                    </div>
                    <span>
                      Advanced AI technology for superior results and efficiency
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        color: "#64ffda",
                        fontSize: "16px",
                        marginTop: "2px",
                      }}
                    >
                      ✓
                    </div>
                    <span>
                      User-friendly interface designed for professionals and
                      beginners alike
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        color: "#64ffda",
                        fontSize: "16px",
                        marginTop: "2px",
                      }}
                    >
                      ✓
                    </div>
                    <span>
                      Flexible pricing options including{" "}
                      {currentTool.plans &&
                      currentTool.plans.some(
                        (plan) =>
                          plan.price === "$0" ||
                          (typeof plan.name === "string" &&
                            plan.name.toLowerCase().includes("free"))
                      )
                        ? "free tiers and "
                        : ""}
                      premium features
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        color: "#64ffda",
                        fontSize: "16px",
                        marginTop: "2px",
                      }}
                    >
                      ✓
                    </div>
                    <span>
                      Regular updates and improvements based on user feedback
                      and AI advancements
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* PLAN Container */}
          {currentTool.plans && currentTool.plans.length > 0 && (
            <section className="plan-main-container">
              <div className="plan-heading">Available Plans</div>

              <div className="plan-container">
                {currentTool.plans.map((plan, index) => (
                  <div className="plan-container1" key={index}>
                    <div className="plan-name">
                      {safeString(plan.name, "Plan")}
                    </div>
                    <div className="plan-price">
                      {safeString(plan.price, "Contact for pricing")}
                    </div>
                    <div className="plan-functinalities">
                      <ul type="none">
                        {plan.functionalities &&
                          plan.functionalities.map((feature, idx) => (
                            <li key={idx}>
                              <IoIosCheckmarkCircleOutline className="icon" />{" "}
                              {typeof feature === "string"
                                ? feature
                                : feature &&
                                  typeof feature.toString === "function"
                                ? feature.toString()
                                : "Feature"}
                            </li>
                          ))}
                        {(!plan.functionalities ||
                          plan.functionalities.length === 0) && (
                          <li>
                            <IoIosCheckmarkCircleOutline className="icon" /> No
                            features listed
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </section>

        {/* Right container: Info and similar tools */}
        <section className="info-main-container">
          <section className="quick-info-container">
            <h3 className="info-heading">Quick Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <h4>Category</h4>
                <p>{safeString(currentTool.category)}</p>
              </div>
              <div className="info-item">
                <h4>Sub-Category</h4>
                <p>{safeString(currentTool.subCategory)}</p>
              </div>
              <div className="info-item">
                <h4>Pricing Model</h4>
                <p>{safeString(currentTool.pricingModel)}</p>
              </div>
              {/* <div className="info-item">
                <h4>Release Date</h4>
                <p>{safeString(currentTool.releaseDate)}</p>
              </div> */}
            </div>
          </section>

          {/* Explore More Section */}
          <section
            className="explore-more-container"
            style={{ marginBottom: "20px" }}
          >
            <h3 className="info-heading">Explore More</h3>
            <div style={{ display: "grid", gap: "10px" }}>
              <Link
                to={`/category/${currentTool.categoryId || "1"}`}
                style={{
                  color: "#64ffda",
                  textDecoration: "none",
                  padding: "8px 12px",
                  backgroundColor: "#1e2039",
                  borderRadius: "5px",
                  display: "block",
                  fontSize: "14px",
                }}
              >
                More {safeString(currentTool.category)} Tools →
              </Link>
              <Link
                to="/how-to-use-ai"
                style={{
                  color: "#64ffda",
                  textDecoration: "none",
                  padding: "8px 12px",
                  backgroundColor: "#1e2039",
                  borderRadius: "5px",
                  display: "block",
                  fontSize: "14px",
                }}
              >
                How to Use AI Tools →
              </Link>
              <Link
                to="/mastering-prompts"
                style={{
                  color: "#64ffda",
                  textDecoration: "none",
                  padding: "8px 12px",
                  backgroundColor: "#1e2039",
                  borderRadius: "5px",
                  display: "block",
                  fontSize: "14px",
                }}
              >
                Master AI Prompts →
              </Link>
            </div>
          </section>

          <section className="similar-tools-container">
            <h3 className="info-heading">Similar Tools</h3>
            <div className="similar-tools-grid">
              {currentTool.similarTools &&
              currentTool.similarTools.length > 0 ? (
                currentTool.similarTools.map((tool, index) => {
                  // Handle both string and object formats
                  const toolName = typeof tool === "string" ? tool : tool.name;
                  const cleanedName = cleanToolName(toolName);
                  const toolSlug = createToolSlug(cleanedName);
                  const toolUrl = `/tool/${toolSlug}`;

                  return (
                    <Link
                      to={toolUrl}
                      key={index}
                      className="similar-tool-item"
                    >
                      <div className="similar-tool-icon">
                        <CiLink />
                      </div>
                      <div className="similar-tool-name">{toolName}</div>
                    </Link>
                  );
                })
              ) : (
                <div className="no-similar-tools">No similar tools found</div>
              )}
            </div>
          </section>
        </section>
      </section>
    </main>
  );
}

export default ToolDetail;
