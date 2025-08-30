/* eslint-disable no-unused-vars */
import React, { useEffect, useState, lazy, Suspense } from "react";
import SEO from "../seo/SEO";
import "./category.css";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

// Import Firebase services only when needed
const db = lazy(() =>
  import("../../firebaseConfig/firebase").then((module) => ({
    default: module.db,
  }))
);

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

  // ✅ Fetch categories from local data with performance optimizations
  useEffect(() => {
    let isMounted = true;

    const fetchCategoryData = async () => {
      try {
        // Use dynamic import with priority hints
        const categoriesDataPromise = import(
          /* webpackPreload: true */ "../../Data/category"
        );

        // Start processing after a short delay to not block main thread during initial render
        setTimeout(async () => {
          const categoriesData = await categoriesDataPromise;

          if (!isMounted) return;

          // Process in chunks to avoid long tasks
          const processInChunks = (items, chunkSize = 10) => {
            let index = 0;

            const processNextChunk = () => {
              const chunk = items.slice(index, index + chunkSize);
              index += chunkSize;

              if (chunk.length > 0 && isMounted) {
                const processedChunk = chunk.map((category) => ({
                  ...category,
                  description: category.description
                    ? truncateAtSentence(category.description)
                    : "",
                }));

                setCategories((prevCategories) =>
                  sortCategories([...prevCategories, ...processedChunk])
                );

                if (index < items.length) {
                  // Continue with next chunk in the next frame
                  requestAnimationFrame(processNextChunk);
                } else {
                  setLoading(false);
                }
              }
            };

            processNextChunk();
          };

          processInChunks(categoriesData.default);
        }, 100);
      } catch (_error) {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCategoryData();

    // Cleanup
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="category-wrapper">
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
                    loading="lazy"
                  />
                )}
                <div className="card-title">{name}</div>
                <div className="card-description">{description}</div>
                <div className="card-btn">
                  <button
                    onClick={() => navigate(`/category/${id}`)}
                    aria-label={`View ${name} category`}
                  >
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
