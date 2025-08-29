import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { BsFacebook, BsTwitter, BsLinkedin, BsGithub } from "react-icons/bs";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real implementation, you would send this to your backend
    console.log("Subscribed with email:", email);
    setSubscribed(true);
    setEmail("");

    // Reset after 3 seconds
    setTimeout(() => {
      setSubscribed(false);
    }, 3000);
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-column">
            <div className="footer-logo">
              <span className="footer-logo-text">FindMyAI</span>
            </div>
            <p className="footer-description">
              Your comprehensive directory for discovering the best AI tools for
              productivity and creativity. Find, compare, and learn about AI
              solutions tailored to your needs.
            </p>
            <div className="footer-social">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsFacebook className="social-icon" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsTwitter className="social-icon" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsLinkedin className="social-icon" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsGithub className="social-icon" />
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <a href="/#categories-section">Categories</a>
              </li>
              <li>
                <a href="/#trending-section">Trending</a>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Learn</h3>
            <ul className="footer-links">
              <li>
                <Link to="/how-to-use-ai">How to Use AI</Link>
              </li>
              <li>
                <Link to="/mastering-prompts">Mastering Prompts</Link>
              </li>
              <li>
                <a href="#">AI Glossary</a>
              </li>
              <li>
                <a href="#">AI News</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Newsletter</h3>
            <p className="footer-description">
              Subscribe to our newsletter to receive updates on new AI tools,
              guides, and industry trends.
            </p>
            {subscribed ? (
              <div className="subscribed-message">Thanks for subscribing!</div>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubmit}>
                <input
                  type="email"
                  className="newsletter-input"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="newsletter-btn">
                  <i className="bi bi-arrow-right"></i>
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} FindMyAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
