import "./herosection.css";
import { WiStars } from "react-icons/wi";
import RotatingText from "../animations/RotatingText";
import { IoIosArrowRoundForward } from "react-icons/io";
import React from "react";
import CountUp from "../animations/CountUp";
import SEO from "../seo/SEO";

function Herosection() {
  return (
    <main className="herosection-main-container">
      <SEO
        title="FindMyAI - Discover the Best AI Tools"
        description=" FindMyAI is a comprehensive AI tools directory (free & paid) for productivity and creativity. Explore categories and discover top AI tools."
        url="https://findmyai-ed99f.web.app"
      />
      {/* Discover Tools Button */}
      <div className="discover-tools">
        <button className="discover-tools__btn">
          <span className="discover-tools__icon">
            <WiStars />
          </span>
          <span className="discover-tools__text">
            Discover the best tools for your workflow
          </span>
        </button>
      </div>

      {/* Hero Heading */}
      <header className="herosection-heading-container">
        {/* <div className="herosection-title">Find the perfect tools for every task</div> */}
        <div className="herosection-title">
          <span>Find the perfect</span>
          <RotatingText
            texts={["Tools", "Solution", "Working", "AI"]}
            mainClassName="rotating-text"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            elementLevelClassName="white-text-element"
            splitLevelClassName="rotating-text-split"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </div>
        <div className="herosection-title">for every task</div>

        <div className="herosection-paragraph">
          Explore thousands of tools across coding, AI, design, and
          productivity. Compare plans, find free alternatives, and build your
          perfect toolkit.
        </div>

        <div className="herosection-btns">
          <button className="explore-btn">
            Explore Tools <IoIosArrowRoundForward />
          </button>
          <button className="browse-btn">Browse Categories</button>
        </div>
      </header>

      {/* CounterSectionnnnnnnnnnnnnnn */}

      <section className="herosection-counter-container">
        <div className="counter1">
          <div className="counter">
            +
            <CountUp
              from={0}
              to={200}
              separator=","
              direction="up"
              duration={1}
              className="count-up-text"
            />
          </div>
          <div className="counter-text">Tool Listed</div>
        </div>
        <div className="counter2">
          <div className="counter">
            +
            <CountUp
              from={0}
              to={50}
              separator=","
              direction="up"
              duration={1}
              className="count-up-text"
            />
          </div>
          <div className="counter-text">categories</div>
        </div>
        <div className="counter3">
          <div className="counter">Free</div>
          <div className="counter-text">To Use</div>
        </div>
        <div className="counter4">
          <div className="counter">Daily</div>
          <div className="counter-text">Updates</div>
        </div>
      </section>
    </main>
  );
}

export default Herosection;
