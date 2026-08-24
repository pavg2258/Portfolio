import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import DOMPurify from "dompurify";

import HCaptcha from '@hcaptcha/react-hcaptcha';

import "../page-css/Contact.css";

import { FaGithub } from "react-icons/fa";
import { ImLinkedin2 } from "react-icons/im";
import { MdLocationOn, MdEmail, MdPhone, MdAccessTime, MdMessage, MdSend, MdPublic } from "react-icons/md";
import { Mail } from "lucide-react";

import Footer from "./Footer";

const contactList = [
  {
    id: 1,
    platform: "LinkedIn",
    icon: <ImLinkedin2 />,
    link: "https://in.linkedin.com/in/kottu-pavan-ganesh",
  },
  {
    id: 2,
    platform: "GitHub",
    icon: <FaGithub />,
    link: "https://github.com/pavg2258",
  },
  {
    id: 3,
    platform: "Email",
    icon: <MdEmail />,
    link: "mailto:kottupavang@gmail.com",
  },
  {
    id: 4,
    platform: "X",
    icon: "𝕏",
    link: "",
  },
];

const Contact = () => {
  useEffect(() => {
    document.title = "Get In Touch - Contact Me | Innovex Portfolio";
  }, []);

  const contactDetails = {
    personName: "",
    email: "",
    subject: "",
    message: "",
    bot_field: "", // Honeypot field for catching automated spam bots
    "h-captcha-response": "", // State to store the captcha token
  };

  const [loading, setLoading] = useState(false);

  // 1. Create a reference to reset the hCaptcha widget programmatically
  const captchaRef = useRef(null);

  const { register, handleSubmit, control, formState, reset, setValue } = useForm({
    defaultValues: contactDetails,
    mode: "onTouched",
  });
  const { errors } = formState;

  const onHCaptchaChange = (token) => {
    // 2. Save the token into the form state when the user completes the challenge
    setValue("h-captcha-response", token);
  };

  const onSubmitContactData = async (data) => {
    // Honeypot Validation: Abort if a bot filled the hidden input
    if (data.bot_field) {
      console.warn("Automated submission detected and dropped.");
      toast.success("Message sent successfully!");
      reset();
      return;
    }

    // 3. Captcha Validation: Stop submission if the captcha wasn't completed
    if (!data["h-captcha-response"]) {
      toast.error("Please complete the captcha challenge before submitting.");
      return;
    }

    setLoading(true);

    // Payload Sanitization: Strip any executable scripts/HTML
    const payload = {
      access_key: import.meta.env.VITE_WEB3FORMS_KEY,
      name: DOMPurify.sanitize(data.personName.trim()),
      email: DOMPurify.sanitize(data.email.trim().toLowerCase()),
      subject: DOMPurify.sanitize(data.subject.trim()),
      message: DOMPurify.sanitize(data.message.trim()),
      from_name: "Innovex Portfolio",
      "h-captcha-response": data["h-captcha-response"], // 4. Pass token to Web3Forms API
    };

    const targetUrl = import.meta.env.VITE_WEB3FORMS_URL || "https://api.web3forms.com/submit";

    try {
      const response = await axios.post(targetUrl, payload, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        timeout: 8000,
      });

      if (response.status === 200) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        reset();

        // 5. Reset the visual captcha widget on success
        captchaRef.current?.resetCaptcha();
        setValue("h-captcha-response", "");
      } else {
        throw new Error("Unexpected server response");
      }
    } catch (error) {
      console.error("Error sending contact data:", error);
      toast.error("Failed to send message. Please try again later.");

      // Reset the captcha on error so the user can try again securely
      captchaRef.current?.resetCaptcha();
      setValue("h-captcha-response", "");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="contact-main-container">
        <div className="contact-content-wrapper">

          {/* Left Column: Info Section */}
          <div className="contact-info-section">
            <h1 className="contact-heading">
              Let's <br />
              <span className="highlight">Connect</span>
            </h1>

            <p className="contact-subtitle">
              I'd love to hear from you.<br />
              Send me a message and I'll<br />
              get back to you as soon as possible.
            </p>

            <div className="contact-info-list">
              <div className="contact-info-item">
                <div className="info-icon">
                  <MdPublic />
                </div>
                <div className="info-details">
                  <h4>Time Zone</h4>
                  <p>IST (GMT +5:30)</p>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="info-icon">
                  <MdAccessTime />
                </div>
                <div className="info-details">
                  <h4>Availability</h4>
                  <p>Open for opportunities &amp; collaborations</p>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="info-icon">
                  <MdMessage />
                </div>
                <div className="info-details">
                  <h4>Response Time</h4>
                  <p>Usually within 12-24 hours</p>
                </div>
              </div>
            </div>

            <div className="contact-help-box">
              <div className="help-icon">
                <MdMessage />
              </div>
              <div className="help-details">
                <h4>Have an idea?</h4>
                <p>
                  Let's turn your vision into reality. Reach out and let's get the conversation started.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Form Section */}
          <div className="contact-form-section">
            <div className="contact-form-card">
              <div className="form-card-header">
                <Mail size="28" className="form-card-icon" />
                <h2>Send me a Message</h2>
              </div>

              <form onSubmit={handleSubmit(onSubmitContactData)}>

                {/* Honeypot Input - Invisible to humans */}
                <input
                  type="text"
                  style={{ display: "none" }}
                  {...register("bot_field")}
                  tabIndex="-1"
                  autoComplete="off"
                />

                <div className="contact-input-form-container">
                  <label htmlFor="contact-name">
                    Name <span className="contact-form-imp-star">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    placeholder="Enter your name"
                    autoFocus={true}
                    {...register("personName", {
                      required: "*Required",
                      maxLength: { value: 60, message: "*Name too long" },
                      pattern: {
                        value: /^[a-zA-Z\s.-]{3,}$/,
                        message: "*Enter minimum 3 characters (letters only)",
                      },
                    })}
                    disabled={loading}
                  />
                  {control.getFieldState("personName").isTouched && errors.personName && (
                    <p className="contact-form-error-message">{errors.personName.message}</p>
                  )}
                </div>

                <div className="contact-input-form-container">
                  <label htmlFor="contact-email">
                    Email <span className="contact-form-imp-star">*</span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    placeholder="Enter your email"
                    {...register("email", {
                      required: "*Required",
                      maxLength: { value: 100, message: "*Email too long" },
                      pattern: {
                        value: /^[\w\-.]+@([\w-]+\.)+[\w-]{2,}$/,
                        message: "*Enter a valid email address",
                      },
                    })}
                    disabled={loading}
                  />
                  {control.getFieldState("email").isTouched && errors.email && (
                    <p className="contact-form-error-message">{errors.email.message}</p>
                  )}
                </div>

                <div className="contact-input-form-container">
                  <label htmlFor="contact-subject">
                    Subject <span className="contact-form-imp-star">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    placeholder="Subject of your message"
                    {...register("subject", {
                      required: "*Required",
                      maxLength: { value: 150, message: "*Subject too long" },
                      pattern: {
                        value: /^[^<>{}]{3,}$/,
                        message: "*Invalid characters detected. Minimum 3 characters.",
                      },
                    })}
                    disabled={loading}
                  />
                  {control.getFieldState("subject").isTouched && errors.subject && (
                    <p className="contact-form-error-message">{errors.subject.message}</p>
                  )}
                </div>

                <div className="contact-input-form-container">
                  <label htmlFor="contact-message">
                    Message <span className="contact-form-imp-star">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    placeholder="Write your message here..."
                    {...register("message", {
                      required: "*Required",
                      maxLength: { value: 2000, message: "*Message exceeds 2000 character limit" },
                      pattern: {
                        value: /^[^<>]{3,}$/,
                        message: "*Message contains invalid characters (e.g., < or >).",
                      },
                    })}
                    disabled={loading}
                  ></textarea>
                  {control.getFieldState("message").isTouched && errors.message && (
                    <p className="contact-form-error-message">{errors.message.message}</p>
                  )}
                </div>

                <div className="captcha-container">
                  {/* 6. Attach the reference to the HCaptcha component */}
                  <HCaptcha
                    sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
                    reCaptchaCompat={false}
                    onVerify={onHCaptchaChange}
                    ref={captchaRef}
                  />
                </div>

                <button
                  type="submit"
                  className="contact-form-submit-btn"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"} <MdSend className="send-icon" />
                </button>

              </form>
            </div>
          </div>
        </div>

        {/* Social Links List */}
        <ul className="contact-social-links-list-container">
          {contactList.map((contact) => (
            <li key={contact.id} className="contact-social-links-item tooltip-container">
              <NavLink
                to={contact.link}
                title={contact.platform}
                target="_blank"
                rel="noreferrer"
                className="contact-social-links tooltip-trigger"
              >
                {contact.icon}
                <span className="tooltip-text">{contact.platform}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default Contact;