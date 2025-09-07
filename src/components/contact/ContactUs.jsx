import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import SEO from "../seo/SEO";
import emailjs from "@emailjs/browser";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig/firebase";
import "./ContactUs.css";
import { BsEnvelope, BsQuestionCircle, BsLightbulb } from "react-icons/bs";

const ContactUs = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: "",
    loading: false,
  });

  // Initialize EmailJS once when component loads
  useEffect(() => {
    emailjs.init("zZGHEXF6pxPq1Pl0C");
  }, []);

  const handleChange = (e) => {
    // Extract the base name without from_ prefix
    const fieldName = e.target.name.replace("from_", "");

    setFormData({
      ...formData,
      [fieldName]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Set loading state
    setFormStatus({
      ...formStatus,
      loading: true,
    });

    // Basic form validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitted: true,
        success: false,
        message: "Please fill out all required fields",
        loading: false,
      });
      return;
    }

    // Email validation with regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        submitted: true,
        success: false,
        message: "Please enter a valid email address",
        loading: false,
      });
      return;
    }

    // Hidden field for recipient email is already set in the form

    // Store the form submission in Firebase Firestore
    const contactSubmission = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject || "General Inquiry",
      message: formData.message,
      timestamp: new Date().toISOString(),
      recipientEmail: "hashirch819@gmail.com",
      emailProvider: "EmailJS",
      serviceId: "service_2g06ic9",
      attemptedDelivery: true,
    };

    // Save to Firestore first
    try {
      // Add a new document to the "contact_submissions" collection
      addDoc(collection(db, "contact_submissions"), contactSubmission)
        .then(() => {
          console.log("Contact form submission saved to Firestore");

          // Then send email using EmailJS
          emailjs
            .sendForm(
              "service_2g06ic9", // EmailJS service ID
              "template_srvucwm", // EmailJS template ID
              form.current, // Using the form reference directly
              "zZGHEXF6pxPq1Pl0C" // EmailJS public key
            )
            .then(() => {
              // Handle success
              setFormStatus({
                submitted: true,
                success: true,
                message:
                  "Thank you for your message! We will get back to you soon.",
                loading: false,
              });

              // Clear the form
              setFormData({
                name: "",
                email: "",
                subject: "",
                message: "",
              });

              // Reset form status after 5 seconds
              setTimeout(() => {
                setFormStatus({
                  submitted: false,
                  success: false,
                  message: "",
                  loading: false,
                });
              }, 5000);
            })
            .catch((error) => {
              // If email sending fails, still consider it a success since we saved to Firestore
              console.error("Failed to send email:", error);
              setFormStatus({
                submitted: true,
                success: true,
                message:
                  "Thank you for your message! Your submission has been recorded.",
                loading: false,
              });

              // Clear the form
              setFormData({
                name: "",
                email: "",
                subject: "",
                message: "",
              });
            });
        })
        .catch((error) => {
          console.error("Error saving contact form submission:", error);
          setFormStatus({
            submitted: true,
            success: false,
            message:
              "Sorry, there was a problem sending your message. Please try again later.",
            loading: false,
          });
        });
    } catch (error) {
      console.error("Failed to process form submission:", error);
      setFormStatus({
        submitted: true,
        success: false,
        message:
          "Sorry, there was a problem sending your message. Please try again later.",
        loading: false,
      });
    }
  };

  return (
    <div className="contact-container">
      <SEO
        title="Contact Us | FindMyAI - Your AI Tools Directory"
        description="Have questions or feedback about AI tools? Contact the FindMyAI team for assistance or to suggest new tools for our directory."
        url="https://findmyai.org/contact"
      />

      <div className="contact-content-wrapper">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>
            Have questions, feedback, or suggestions? We'd love to hear from
            you!
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-form-container">
            {formStatus.submitted && (
              <div
                className={
                  formStatus.success ? "success-message" : "error-message"
                }
              >
                {formStatus.message}
              </div>
            )}

            <form className="contact-form" ref={form} onSubmit={handleSubmit}>
              <input
                type="hidden"
                id="contact_to_email"
                name="to_email"
                value="hashirch819@gmail.com"
              />
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="from_name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="from_email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                >
                  <option value="General Inquiry">Select a subject</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Tool Suggestion">Tool Suggestion</option>
                  <option value="Feedback">Feedback</option>
                  <option value="Report an Issue">Report an Issue</option>
                  <option value="Business Opportunity">
                    Business Opportunity
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={formStatus.loading}
              >
                {formStatus.loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          <div className="contact-info">
            <div className="contact-card">
              <div className="contact-card-icon">
                <BsEnvelope />
              </div>
              <div className="contact-card-content">
                <h3>Email Us</h3>
                <p>For general inquiries, please email us at:</p>
                <p>
                  <a href="mailto:hashirch819@gmail.com">
                    hashirch819@gmail.com
                  </a>
                </p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-card-icon">
                <BsQuestionCircle />
              </div>
              <div className="contact-card-content">
                <h3>Support</h3>
                <p>Need help with finding the right AI tool?</p>
                <p>
                  <a href="mailto:hashirch819@gmail.com">
                    hashirch819@gmail.com
                  </a>
                </p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-card-icon">
                <BsLightbulb />
              </div>
              <div className="contact-card-content">
                <h3>Suggest a Tool</h3>
                <p>Know an AI tool that should be in our directory?</p>
                <p>
                  Let us know through our contact form or email us directly at{" "}
                  <a href="mailto:hashirch819@gmail.com">
                    hashirch819@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>

          <div className="faq-grid">
            <div className="faq-item">
              <h3>How can I suggest an AI tool for your directory?</h3>
              <p>
                You can suggest a new tool through our contact form by selecting
                "Tool Suggestion" from the subject dropdown, or email us
                directly at hashirch819@gmail.com with details about the tool.
              </p>
            </div>

            <div className="faq-item">
              <h3>Do you offer partnerships or advertising opportunities?</h3>
              <p>
                Yes, we do! If you're interested in partnering with FindMyAI or
                advertising on our platform, please reach out to us at
                hashirch819@gmail.com for more information.
              </p>
            </div>

            <div className="faq-item">
              <h3>How are tools selected for your directory?</h3>
              <p>
                We carefully evaluate each AI tool based on its functionality,
                user experience, reliability, and value proposition. We strive
                to include a diverse range of tools that serve different needs
                and use cases.
              </p>
            </div>

            <div className="faq-item">
              <h3>How quickly do you respond to inquiries?</h3>
              <p>
                We aim to respond to all inquiries within 48 hours. For urgent
                matters, please indicate this in the subject line of your
                message.
              </p>
            </div>
          </div>
        </div>

        {/* While You're Here Section */}
        <div className="contact-section" style={{ marginTop: "50px" }}>
          <h2>While You're Here</h2>
          <p>Explore our resources to get the most out of AI tools:</p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
              marginTop: "30px",
            }}
          >
            <Link
              to="/"
              style={{
                color: "#64ffda",
                textDecoration: "none",
                padding: "25px",
                backgroundColor: "#1e2039",
                borderRadius: "8px",
                display: "block",
                textAlign: "center",
              }}
            >
              <BsLightbulb style={{ fontSize: "2em", marginBottom: "10px" }} />
              <strong>Discover AI Tools</strong>
              <div
                style={{ fontSize: "14px", color: "#8892b0", marginTop: "8px" }}
              >
                Browse 2000+ curated AI tools →
              </div>
            </Link>
            <Link
              to="/how-to-use-ai"
              style={{
                color: "#64ffda",
                textDecoration: "none",
                padding: "25px",
                backgroundColor: "#1e2039",
                borderRadius: "8px",
                display: "block",
                textAlign: "center",
              }}
            >
              <BsQuestionCircle
                style={{ fontSize: "2em", marginBottom: "10px" }}
              />
              <strong>Learn AI Basics</strong>
              <div
                style={{ fontSize: "14px", color: "#8892b0", marginTop: "8px" }}
              >
                Get started with AI tools →
              </div>
            </Link>
            <Link
              to="/mastering-prompts"
              style={{
                color: "#64ffda",
                textDecoration: "none",
                padding: "25px",
                backgroundColor: "#1e2039",
                borderRadius: "8px",
                display: "block",
                textAlign: "center",
              }}
            >
              <BsEnvelope style={{ fontSize: "2em", marginBottom: "10px" }} />
              <strong>Master Prompting</strong>
              <div
                style={{ fontSize: "14px", color: "#8892b0", marginTop: "8px" }}
              >
                Write better AI prompts →
              </div>
            </Link>
          </div>

          <div style={{ marginTop: "30px", textAlign: "center" }}>
            <Link
              to="/about"
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
              <strong>Learn About Our Mission →</strong>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
