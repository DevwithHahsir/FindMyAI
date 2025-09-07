// Standard imports for better compatibility
import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./fonts.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Herosection from "./components/herosection/Herosection";

// Lazy load components that aren't needed for the initial render
const ToolDetail = lazy(() => import("./components/tooldetail/ToolDetail"));
const CategoryDetail = lazy(() =>
  import("./components/categoryDetail/CategoryDetail")
);
const AboutUs = lazy(() => import("./components/about/AboutUs"));
const ContactUs = lazy(() => import("./components/contact/ContactUs"));
const HowToUseAI = lazy(() => import("./components/howto/HowToUseAI"));
const MasteringPrompts = lazy(() =>
  import("./components/prompts/MasteringPrompts")
);
const PrivacyPolicy = lazy(() => import("./components/privacy/PrivacyPolicy"));
const TermsConditions = lazy(() =>
  import("./components/terms/TermsConditions")
);
// import PostData from "./postData/PostData";

function App() {
  return (
    <>
      <Navbar />
      {/* <PostData/> */}

      <Routes>
        <Route path="/" element={<Herosection />} />
        {/* We use a common parameter name to support both name and ID based routes */}
        <Route
          path="/tool/:name"
          element={
            <Suspense
              fallback={<div className="loading-container">Loading...</div>}
            >
              <ToolDetail />
            </Suspense>
          }
        />
        {/* Route for category details */}
        <Route
          path="/category/:categoryId"
          element={
            <Suspense
              fallback={<div className="loading-container">Loading...</div>}
            >
              <CategoryDetail />
            </Suspense>
          }
        />
        {/* Educational and informational pages */}
        <Route
          path="/about"
          element={
            <Suspense
              fallback={<div className="loading-container">Loading...</div>}
            >
              <AboutUs />
            </Suspense>
          }
        />
        <Route
          path="/contact"
          element={
            <Suspense
              fallback={<div className="loading-container">Loading...</div>}
            >
              <ContactUs />
            </Suspense>
          }
        />
        <Route
          path="/how-to-use-ai"
          element={
            <Suspense
              fallback={<div className="loading-container">Loading...</div>}
            >
              <HowToUseAI />
            </Suspense>
          }
        />
        <Route
          path="/mastering-prompts"
          element={
            <Suspense
              fallback={<div className="loading-container">Loading...</div>}
            >
              <MasteringPrompts />
            </Suspense>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <Suspense
              fallback={<div className="loading-container">Loading...</div>}
            >
              <PrivacyPolicy />
            </Suspense>
          }
        />
        <Route
          path="/terms-conditions"
          element={
            <Suspense
              fallback={<div className="loading-container">Loading...</div>}
            >
              <TermsConditions />
            </Suspense>
          }
        />
        {/* Catch-all route for any tool URL */}
        {/* <Route path="/tool/*" element={<ToolDetail />} /> */}
        {/* We no longer need separate routes for categories and trending as they are sections in the main page */}
      </Routes>

      <Footer />
    </>
  );
}

export default App;
