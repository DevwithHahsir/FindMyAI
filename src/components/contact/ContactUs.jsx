import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import SEO from "../seo/SEO";
import StructuredData from "../seo/StructuredData";
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
        title="Contact Us | FindMyAI"
        description="Have questions or feedback about AI tools? Contact the FindMyAI team for assistance or to suggest new tools for our directory."
        url="https://findmyai.org/contact"
      />

      <StructuredData
        type="faq"
        data={[
          {
            question: "What is FindMyAI and why should I use it?",
            answer:
              "FindMyAI is a trusted AI tools directory that helps users discover the best free and paid AI apps. It saves time by comparing tools in one place across categories like productivity, creativity, and business automation.",
          },
          {
            question: "Is FindMyAI completely free?",
            answer:
              "Yes. You can browse and explore all AI tools for free on FindMyAI. Some tools listed in the directory are free, while others may require a subscription or one-time payment.",
          },
          {
            question: "How often does FindMyAI add new AI tools?",
            answer:
              "Our team updates the directory every week with trending and upcoming AI tools, ensuring that you always get access to the latest technology in the AI space.",
          },
          {
            question: "Can I submit my own AI tool to FindMyAI?",
            answer:
              "Yes. If you are a developer or company with an AI product, you can submit it through our 'Suggest a Tool' option. After review, relevant tools are added to the directory.",
          },
          {
            question: "Does FindMyAI review or rank AI tools?",
            answer:
              "Yes. Tools are categorized, reviewed, and in some cases ranked by popularity, features, and usability, helping users make informed decisions quickly.",
          },
          {
            question: "How can I suggest an AI tool for your directory?",
            answer:
              "You can suggest a new tool through our contact form by selecting 'Tool Suggestion' from the subject dropdown, or email us directly with details about the tool.",
          },
          {
            question: "Are AI tools on FindMyAI safe to use?",
            answer:
              "We carefully evaluate each AI tool for safety, reliability, and legitimacy before adding them to our directory. However, users should always review privacy policies before using any tool.",
          },
          {
            question: "Do you offer partnerships or advertising opportunities?",
            answer:
              "Yes, we do! If you're interested in partnering with FindMyAI or advertising on our platform, please reach out to us for more information about collaboration opportunities.",
          },
        ]}
      />

      <StructuredData
        type="breadcrumb"
        data={[
          {
            name: "Home",
            url: "https://findmyai.org/",
          },
          {
            name: "Contact Us",
            url: "https://findmyai.org/contact",
          },
        ]}
      />

      <div className="contact-content-wrapper">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>
            Have questions, feedback, or suggestions? We'd love to hear from
            you!
          </p>

          {/* Enhanced Contact Introduction */}
          <div
            className="contact-intro"
            style={{
              marginTop: "30px",
              padding: "25px",
              backgroundColor: "#1e2039",
              borderRadius: "8px",
              border: "1px solid #2d3748",
            }}
          >
            <h3>Get in Touch with the FindMyAI Team</h3>
            <p style={{ lineHeight: "1.6", marginBottom: "15px" }}>
              At FindMyAI, we're committed to building the most comprehensive
              and user-friendly AI tools directory. Your feedback, questions,
              and suggestions are invaluable in helping us improve our platform
              and better serve the AI community.
            </p>
            <p style={{ lineHeight: "1.6", marginBottom: "15px" }}>
              Whether you're a developer who's created an innovative AI tool, a
              business professional looking for specific solutions, or simply
              someone curious about artificial intelligence, we're here to help.
              Our team actively monitors and responds to all inquiries to ensure
              you get the support and information you need.
            </p>
            <p style={{ lineHeight: "1.6" }}>
              We particularly welcome submissions of new AI tools, reports of
              outdated information, partnership inquiries, and feedback on how
              we can enhance your experience with FindMyAI. Together, we can
              make AI more accessible to everyone.
            </p>
          </div>
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

            <div className="faq-item">
              <h3>Is FindMyAI free to use?</h3>
              <p>
                Yes! FindMyAI is completely free to use. We provide our
                directory, guides, and resources at no cost to help make AI
                tools more accessible to everyone. Our mission is to democratize
                access to AI technology information.
              </p>
            </div>

            <div className="faq-item">
              <h3>How often is your directory updated?</h3>
              <p>
                We continuously monitor the AI landscape and update our
                directory regularly. New tools are added weekly, and existing
                tool information is reviewed and updated monthly to ensure
                accuracy. We also rely on community feedback to keep everything
                current.
              </p>
            </div>

            <div className="faq-item">
              <h3>Do you review AI tools before adding them?</h3>
              <p>
                Absolutely! Our team thoroughly evaluates each AI tool before
                inclusion, testing functionality, assessing user experience,
                verifying claims, and ensuring the tool provides genuine value.
                We maintain high standards to ensure our directory remains
                trustworthy and useful.
              </p>
            </div>

            <div className="faq-item">
              <h3>Can I request specific guides or tutorials?</h3>
              <p>
                We welcome requests for educational content! If you'd like us to
                create guides for specific AI tools, industry use cases, or
                general AI topics, please let us know through our contact form.
                Community-driven content requests help us prioritize what's most
                valuable to our users.
              </p>
            </div>

            <div className="faq-item">
              <h3>How do you ensure tool information is accurate?</h3>
              <p>
                We maintain accuracy through regular audits, direct contact with
                tool developers when possible, community feedback, and
                systematic testing. If you notice outdated or incorrect
                information, please report it so we can make corrections
                promptly.
              </p>
            </div>

            <div className="faq-item">
              <h3>Do you provide personalized AI tool recommendations?</h3>
              <p>
                While we don't offer one-on-one consulting, our comprehensive
                guides and detailed tool descriptions are designed to help you
                make informed decisions. For specific questions about choosing
                the right tool for your needs, you can contact us and we'll do
                our best to point you in the right direction.
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
