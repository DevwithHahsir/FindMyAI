import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig/firebase";
import "./toolDetail.css";
import SEO from "../seo/SEO";
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
        <h2>Tool Not Found</h2>
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
        title={`${safeString(currentTool.name)} – Best ${safeString(
          currentTool.category
        )} AI Tool ${new Date().getFullYear()} | FindMyAI`}
        description={`Discover ${safeString(
          currentTool.name
        )}, one of the top ${safeString(
          currentTool.category
        )} AI tools of ${new Date().getFullYear()}. Learn features, pricing (free & paid), and how ${safeString(
          currentTool.name
        )} can boost productivity, startups, content creation, and business growth. Find trusted AI software on FindMyAI.`}
        url={`https://ai-directory.web.app/tool/${encodeURIComponent(
          safeString(currentTool.name)
        )}`}
      />

      <section className="back-btn">
        <button className="browse-btn back" onClick={handleGoBack}>
          <BiArrowBack /> Back
        </button>
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
                <h2>{safeString(currentTool.name, "Tool")}</h2>
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

            {/* <div className="deatil-container">
              {currentTool.description ||
                "No description available for this tool."}
            </div> */}
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
          <section className="similar-tools-container">
            <h3 className="info-heading">Similar Tools</h3>
            <div className="similar-tools-grid">
              {currentTool.similarTools &&
              currentTool.similarTools.length > 0 ? (
                currentTool.similarTools.map((tool, index) => {
                  // Handle both string and object formats
                  const toolName = typeof tool === "string" ? tool : tool.name;
                  const toolUrl =
                    typeof tool === "string"
                      ? `/tool/${encodeURIComponent(tool)}`
                      : tool.url || `/tool/${encodeURIComponent(tool.name)}`;

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
