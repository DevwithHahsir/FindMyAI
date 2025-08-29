/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import SEO from "../seo/SEO";
import "./category.css";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig/firebase";

// ✅ Utility function (moved outside component to avoid re-creation)
const truncateAtSentence = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;

  const truncated = text.substring(0, maxLength);
  const sentenceEndMatch = truncated.match(/[.!?][^.!?]*$/);

  if (sentenceEndMatch) {
    return text.substring(0, sentenceEndMatch.index + 1);
  }

  const lastSpaceIndex = truncated.lastIndexOf(" ");
  return lastSpaceIndex > 0
    ? text.substring(0, lastSpaceIndex) + "..."
    : truncated + "...";
};

// ✅ Utility function to sort categories
const sortCategories = (categories) => {
  return categories.sort((a, b) => {
    const aIdNum = parseInt(a.id, 10);
    const bIdNum = parseInt(b.id, 10);

    if (!isNaN(aIdNum) && !isNaN(bIdNum)) {
      return aIdNum - bIdNum; // numeric sort
    }

    if (a.categoryId !== undefined && b.categoryId !== undefined) {
      return a.categoryId - b.categoryId;
    }

    return a.id.localeCompare(b.id); // fallback string sort
  });
};

function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Fetch categories from local data
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        // Import local category data
        const categoriesData = await import("../../Data/category");
        const fetchedCategories = categoriesData.default.map((category) => ({
          ...category,
          description: category.description
            ? truncateAtSentence(category.description)
            : "",
        }));

        setCategories(sortCategories(fetchedCategories));
      } catch (_error) {
        // Error handling without console statements
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, []);

  return (
    <div>
      <div className="seo">
        <SEO
          title="FindMyAI – Discover Top AI Tools (Free & Paid) | Best AI Tools Directory 2025"
          description="Discover top AI tools in 2025 with FindMyAI. Browse free & paid tools by category to boost productivity, creativity, and growth.
"
          url="https://ai-directory.web.app"
        />
      </div>

      <main className="category-main-container">
        <section className="category-heading-container">
          <h3>
            BROWSE BY <span>CATEGORIES</span>
          </h3>
          <p>
            Explore our carefully curated collection of tools organized by
            category. Find exactly what you need for your workflow.
          </p>
        </section>

        <section className="category-cards-container">
          {loading ? (
            <p>Loading categories...</p>
          ) : categories.length > 0 ? (
            categories.map(({ id, icon, name, description }) => (
              <div className="card-container" key={id}>
                {icon && (
                  <div
                    className="card-icon"
                    dangerouslySetInnerHTML={{ __html: icon }}
                  />
                )}
                <div className="card-title">{name}</div>
                <div className="card-description">{description}</div>
                <div className="card-btn">
                  <button onClick={() => navigate(`/category/${id}`)}>
                    <IoIosArrowRoundForward />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No categories found.</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default Category;
