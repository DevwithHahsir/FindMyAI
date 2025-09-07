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
                href="https://www.upwork.com/freelancers/~0107cd908b865a023a?viewMode=1&s=1110580755057594368"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsFacebook className="social-icon" />
              </a>
              <a
                href="https://www.fiverr.com/hahsirch?public_mode=true"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsTwitter className="social-icon" />
              </a>
              <a
                href="https://www.linkedin.com/in/hashirmehboob/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsLinkedin className="social-icon" />
              </a>
              <a
                href="https://github.com/DevwithHahsir"
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
            <h3>Legal</h3>
            <ul className="footer-links">
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms-conditions">Terms & Conditions</Link>
              </li>
              {/* <li>
                <a href="/ads.txt" target="_blank" rel="noopener noreferrer">
                  Ads.txt
                </a>
              </li> */}
              {/* <li>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Sitemap
                </a>
              </li> */}
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
          <div className="footer-bottom-links">
            <Link to="/privacy-policy">Privacy</Link>
            <span>•</span>
            <Link to="/terms-conditions">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
