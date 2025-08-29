import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./fonts.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import Navbar from "./components/navbar/Navbar";
import Herosection from "./components/herosection/Herosection";
import ToolDetail from "./components/tooldetail/ToolDetail";
import CategoryDetail from "./components/categoryDetail/CategoryDetail";
// import PostData from "./postData/PostData";

function App() {
  return (
    <>
      <Navbar />
      {/* <PostData/> */}

      <Routes>
        <Route path="/" element={<Herosection />} />
        {/* We use a common parameter name to support both name and ID based routes */}
        <Route path="/tool/:name" element={<ToolDetail />} />
        {/* Route for category details */}
        <Route path="/category/:categoryId" element={<CategoryDetail />} />
        {/* Catch-all route for any tool URL */}
        {/* <Route path="/tool/*" element={<ToolDetail />} /> */}
        {/* We no longer need separate routes for categories and trending as they are sections in the main page */}
      </Routes>
    </>
  );
}

export default App;
