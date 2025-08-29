import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import "./ContactUs.css";
import { BsEnvelope, BsQuestionCircle, BsLightbulb } from "react-icons/bs";

const ContactUs = () => {
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
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic form validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitted: true,
        success: false,
        message: "Please fill out all required fields",
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
      });
      return;
    }

    // In a real implementation, you would send this data to your backend
    // For now, we'll simulate a successful submission
    setFormStatus({
      submitted: true,
      success: true,
      message: "Thank you for your message! We will get back to you soon.",
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
      });
    }, 5000);
  };

  return (
    <div className="contact-container">
      <Helmet>
        <title>Contact Us | FindMyAI - Your AI Tools Directory</title>
        <meta
          name="description"
          content="Have questions or feedback about AI tools? Contact the FindMyAI team for assistance or to suggest new tools for our directory."
        />
        <meta
          name="keywords"
          content="contact FindMyAI, AI tools support, AI directory feedback, suggest AI tool"
        />
      </Helmet>

      <div className="contact-content-wrapper">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>
            Have questions, feedback, or suggestions? We'd love to hear from you!
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

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
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
                  name="email"
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
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="suggestion">Tool Suggestion</option>
                  <option value="feedback">Feedback</option>
                  <option value="bug">Report an Issue</option>
                  <option value="business">Business Opportunity</option>
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

              <button type="submit" className="submit-btn">
                Send Message
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
                  <a href="mailto:info@findmyai.com">info@findmyai.com</a>
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
                  <a href="mailto:support@findmyai.com">support@findmyai.com</a>
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
                  <a href="mailto:suggestions@findmyai.com">
                    suggestions@findmyai.com
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
                "Tool Suggestion" from the subject dropdown, or email us directly
                at suggestions@findmyai.com with details about the tool.
              </p>
            </div>

            <div className="faq-item">
              <h3>Do you offer partnerships or advertising opportunities?</h3>
              <p>
                Yes, we do! If you're interested in partnering with FindMyAI or
                advertising on our platform, please reach out to us at
                partnerships@findmyai.com for more information.
              </p>
            </div>

            <div className="faq-item">
              <h3>How are tools selected for your directory?</h3>
              <p>
                We carefully evaluate each AI tool based on its functionality,
                user experience, reliability, and value proposition. We strive to
                include a diverse range of tools that serve different needs and
                use cases.
              </p>
            </div>

            <div className="faq-item">
              <h3>How quickly do you respond to inquiries?</h3>
              <p>
                We aim to respond to all inquiries within 48 hours. For urgent
                matters, please indicate this in the subject line of your message.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
