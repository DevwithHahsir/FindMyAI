import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig/firebase";
import "./toolDetail.css";
import SEO from "../seo/SEO";
import { LuBrain } from "react-icons/lu";
import { CiLink } from "react-icons/ci";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function ToolDetail() {
  const { id } = useParams();
  const [tool, setTool] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch tool data from Firestore
  useEffect(() => {
    const fetchTool = async () => {
      try {
        const toolRef = doc(db, "tools", id);
        const toolSnap = await getDoc(toolRef);

        if (toolSnap.exists()) {
          setTool({ id: toolSnap.id, ...toolSnap.data() });
        } else {
          console.error("No such tool!");
        }
      } catch (error) {
        console.error("Error fetching tool:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTool();
  }, [id]);

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
          The requested tool could not be found. Please check the URL and try
          again.
        </p>
        <button className="explore-btn" onClick={() => navigate("/")}>
          Return Home
        </button>
      </div>
    );
  }

  // Use the actual tool data
  const currentTool = tool;

  return (
    <main className="ToolDetal-main-container">
      <SEO
        title={`${currentTool.name} – Best ${
          currentTool.category
        } AI Tool ${new Date().getFullYear()} | FindMyAI`}
        description={`Discover ${currentTool.name}, one of the top ${
          currentTool.category
        } AI tools of ${new Date().getFullYear()}. Learn features, pricing (free & paid), and how ${
          currentTool.name
        } can boost productivity, startups, content creation, and business growth. Find trusted AI software on FindMyAI.`}
        url={`https://findmyai-ed99f.web.app/tools/${currentTool.id}`}
      />

      <section className="back-btn">
        <button className="explore-btn back-btn" onClick={handleGoBack}>
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
                <h2>{currentTool.name}</h2>
                <div className="sub-category">
                  {currentTool.category && <p>{currentTool.category}</p>}
                  {currentTool.subCategory && <p>{currentTool.subCategory}</p>}
                  {currentTool.pricingModel && (
                    <p>{currentTool.pricingModel}</p>
                  )}
                </div>

                {/* subscription-container */}
                <section className="trending-plans">
                  {currentTool.plans &&
                    currentTool.plans.some(
                      (plan) =>
                        plan.price === "$0" ||
                        plan.name.toLowerCase().includes("free")
                    ) && <div className="free">free</div>}
                  {currentTool.plans &&
                    currentTool.plans.some(
                      (plan) =>
                        plan.price &&
                        plan.price !== "$0" &&
                        !plan.name.toLowerCase().includes("free")
                    ) && <div className="paid">paid</div>}
                </section>
              </div>

              {/* Button */}
              <div className="tool-btn">
                <a
                  href={currentTool.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="explore-btn"
                >
                  <CiLink className="btn-icon" />
                  Visit Website
                </a>
              </div>
            </div>

            <div className="deatil-container">
              {currentTool.description ||
                "No description available for this tool."}
            </div>
          </section>

          {/* PLAN Container */}
          {currentTool.plans && currentTool.plans.length > 0 && (
            <section className="plan-main-container">
              <div className="plan-heading">Available Plans</div>

              <div className="plan-container">
                {currentTool.plans.map((plan, index) => (
                  <div className="plan-container1" key={index}>
                    <div className="plan-name">{plan.name}</div>
                    <div className="plan-price">
                      {plan.price || "Contact for pricing"}
                    </div>
                    <div className="plan-functinalities">
                      <ul type="none">
                        {plan.functionalities &&
                          plan.functionalities.map((feature, idx) => (
                            <li key={idx}>
                              <IoIosCheckmarkCircleOutline className="icon" />{" "}
                              {feature}
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
                <p>{currentTool.category || "Not specified"}</p>
              </div>
              <div className="info-item">
                <h4>Sub-Category</h4>
                <p>{currentTool.subcategory || "Not specified"}</p>
              </div>
              <div className="info-item">
                <h4>Pricing Model</h4>
                <p>{currentTool.pricingMode || "Not specified"}</p>
              </div>
              <div className="info-item">
                <h4>Release Date</h4>
                <p>{currentTool.releaseDate || "Not specified"}</p>
              </div>
            </div>
          </section>
          <section className="similar-tools-container">
            <h3 className="info-heading">Similar Tools</h3>
            <div className="similar-tools-grid">
              {currentTool.similarTools &&
              currentTool.similarTools.length > 0 ? (
                currentTool.similarTools.map((toolName, index) => (
                  <Link
                    to={`/tool/${encodeURIComponent(toolName)}`}
                    key={index}
                    className="similar-tool-item"
                  >
                    <div className="similar-tool-icon">
                      <CiLink />
                    </div>
                    <div className="similar-tool-name">{toolName}</div>
                  </Link>
                ))
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
