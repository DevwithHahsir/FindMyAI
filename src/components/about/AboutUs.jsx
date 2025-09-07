import React from "react";
import { Link } from "react-router-dom";
import SEO from "../seo/SEO";
import "./AboutUs.css";
import devProfilePic from "./pfp.webp";

const AboutUs = () => {
  return (
    <div className="about-container">
      <SEO
        title="About Us | FindMyAI - Your AI Tools Directory"
        description="Learn about the FindMyAI team, our mission, and how we're helping people discover and use the best AI tools for their needs."
        url="https://findmyai.org/about"
      />

      <div className="about-content">
        <div className="about-header">
          <h1>About FindMyAI</h1>
          <p>
            Simplifying the AI landscape to help everyone find the right tools
            for their needs.
          </p>
        </div>

        <div className="about-section">
          <h2>Our Story</h2>
          <p>
            FindMyAI was born from a simple observation: as artificial
            intelligence tools exploded in number and variety, it became
            increasingly difficult for everyday users and professionals to
            navigate this complex landscape.
          </p>
          <p>
            Founded in 2025, our platform emerged as a solution to this problem.
            We saw how people were struggling to find the right AI tools for
            their specific needs, often wasting time and resources on solutions
            that weren't optimal for their use cases.
          </p>
          <p>
            What began as a simple directory has evolved into a comprehensive
            resource hub where users can discover, compare, and learn about AI
            tools across various categories and applications.
          </p>
        </div>

        <div className="about-section">
          <div className="vision-mission">
            <div className="vision-mission-card vision">
              <h3>Our Vision</h3>
              <p>
                To create a world where AI technology is accessible and
                understandable to everyone, regardless of their technical
                background. We envision a future where people can confidently
                leverage AI tools to enhance their productivity, creativity, and
                problem-solving capabilities.
              </p>
            </div>
            <div className="vision-mission-card mission">
              <h3>Our Mission</h3>
              <p>
                To simplify the discovery and adoption of AI tools by providing
                clear, unbiased information and educational resources that
                empower users to make informed decisions about which AI
                solutions best meet their needs.
              </p>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>Our Values</h2>
          <div className="values-list">
            <div className="value-item">
              <h3>Accessibility</h3>
              <p>
                We believe that AI should be accessible to everyone. We strive
                to make complex technologies understandable and approachable.
              </p>
            </div>
            <div className="value-item">
              <h3>Education</h3>
              <p>
                We're committed to educating users about AI tools and best
                practices, helping them gain confidence in using these
                technologies.
              </p>
            </div>
            <div className="value-item">
              <h3>Transparency</h3>
              <p>
                We provide honest, unbiased information about AI tools,
                including their capabilities, limitations, and appropriate use
                cases.
              </p>
            </div>
            <div className="value-item">
              <h3>User-Centered</h3>
              <p>
                We put our users' needs first, constantly seeking feedback and
                improving our platform to better serve their requirements.
              </p>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>What Sets Us Apart</h2>
          <p>
            Unlike other directories that simply list AI tools, FindMyAI focuses
            on educating users about how to effectively use these tools. We
            provide comprehensive guides, prompt engineering tips, and
            real-world applications to help you get the most out of AI
            technology.
          </p>
          <p>
            Our platform is designed with both beginners and professionals in
            mind. Whether you're taking your first steps into the world of AI or
            looking for specialized tools for advanced applications, FindMyAI
            offers valuable insights and recommendations tailored to your level
            of expertise.
          </p>
        </div>

        <div className="about-section">
          <h2>Join Our Journey</h2>
          <p>
            We're just getting started on our mission to make AI more accessible
            and useful for everyone. As the AI landscape continues to evolve,
            we're committed to growing and adapting our platform to meet the
            changing needs of our users.
          </p>
          <p>
            Have suggestions for how we can improve? Found a great AI tool
            that's not in our directory? We'd love to hear from you! Visit our{" "}
            <Link to="/contact">Contact page</Link> to get in touch with our
            team.
          </p>
        </div>

        <div className="about-section">
          <h2>Meet the Developer</h2>
          <div className="developer-profile">
            <div className="developer-image">
              <img
                src={devProfilePic}
                alt="Developer"
                loading="lazy"
                width="300"
                height="400"
              />
            </div>
            <div className="developer-info">
              <h3>Hashir Mehboob</h3>
              <p className="developer-title">
                Full Stack Developer & AI Enthusiast
              </p>
              <p>
                My journey into the world of AI began with a simple curiosity
                about how these powerful tools could transform the way we work
                and create. As I explored various AI tools, I noticed how
                challenging it was to find the right solutions among the rapidly
                growing ecosystem. This inspired me to create FindMyAI - a
                platform that would not only catalog these tools but also help
                users understand how to use them effectively.
              </p>
              <p>
                With a background in full-stack development and a passion for
                emerging technologies, I've designed FindMyAI to be both
                informative and user-friendly. My goal is to continually expand
                this platform, adding more resources and features to help
                everyone harness the power of artificial intelligence,
                regardless of their technical background.
              </p>
              <div className="developer-social">
                <a
                  href="https://www.linkedin.com/in/hashirmehboob/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-linkedin"></i>
                </a>
                <a
                  href="https://github.com/DevwithHahsir"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-github"></i>
                </a>
                <a
                  href="https://www.upwork.com/freelancers/~0107cd908b865a023a?s=1110580755057594368"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-twitter-x"></i>
                </a>
                <a
                  href="https://portfolio24-pink.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-globe"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Start Exploring Section */}
        <div
          className="about-section"
          style={{ marginTop: "50px", textAlign: "center" }}
        >
          <h2>Ready to Get Started?</h2>
          <p>Explore our comprehensive collection of AI tools and resources:</p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "15px",
              marginTop: "30px",
            }}
          >
            <Link
              to="/"
              style={{
                color: "#64ffda",
                textDecoration: "none",
                padding: "20px",
                backgroundColor: "#1e2039",
                borderRadius: "8px",
                display: "block",
              }}
            >
              <strong>Browse All Tools</strong>
              <div
                style={{ fontSize: "14px", color: "#8892b0", marginTop: "8px" }}
              >
                2000+ AI tools to explore →
              </div>
            </Link>
            <Link
              to="/how-to-use-ai"
              style={{
                color: "#64ffda",
                textDecoration: "none",
                padding: "20px",
                backgroundColor: "#1e2039",
                borderRadius: "8px",
                display: "block",
              }}
            >
              <strong>Learn How to Use AI</strong>
              <div
                style={{ fontSize: "14px", color: "#8892b0", marginTop: "8px" }}
              >
                Beginner-friendly guides →
              </div>
            </Link>
            <Link
              to="/mastering-prompts"
              style={{
                color: "#64ffda",
                textDecoration: "none",
                padding: "20px",
                backgroundColor: "#1e2039",
                borderRadius: "8px",
                display: "block",
              }}
            >
              <strong>Master Prompting</strong>
              <div
                style={{ fontSize: "14px", color: "#8892b0", marginTop: "8px" }}
              >
                Improve your AI results →
              </div>
            </Link>
          </div>

          <div style={{ marginTop: "30px" }}>
            <Link
              to="/contact"
              style={{
                color: "#64ffda",
                textDecoration: "none",
                padding: "15px 30px",
                backgroundColor: "#1e2039",
                borderRadius: "8px",
                display: "inline-block",
                border: "1px solid #2d3748",
                fontSize: "16px",
              }}
            >
              <strong>Get in Touch →</strong>
            </Link>
          </div>
        </div>
      </div>
      {/* Closing tag for about-container */}
    </div>
  );
};

export default AboutUs;
