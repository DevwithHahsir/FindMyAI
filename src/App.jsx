import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./fonts.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import Navbar from "./components/navbar/Navbar";
import Herosection from "./components/herosection/Herosection";

function App() {
  return (
    <>
      <Navbar />
      <Herosection />
    </>
  );
}

export default App;
