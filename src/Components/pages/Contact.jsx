import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";

import "../page-css/contact.css";

import { FaGithub } from "react-icons/fa";
import { ImLinkedin2 } from "react-icons/im";
import { MdLocationOn, MdEmail, MdPhone, MdAccessTime, MdMessage, MdSend, MdPublic } from "react-icons/md";
import { Mail } from 'lucide-react'

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
    link: "",
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
  };

  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, control, formState, reset } =
    useForm(contactDetails);
  const { errors } = formState;

  const onSubmitContactData = async (data) => {
    setLoading(true);
    const url = import.meta.env.VITE_API_BACKEND_URL + "/contact-me";

    try {
      const response = await axios.post(url, data);
      if (response.status === 200 || response.status === 201) {
        setLoading(false);
        toast.success("Message sent successfully!");
        reset();
      } else {
        setLoading(false);
        alert("Failed to send message. Please try again later.");
        reset();
      }
    } catch (error) {
      setLoading(false);
      console.error("Error sending contact data:", error);
      toast.error("Failed to send message. Please try again later.");
      reset();
    }
  };

  return (
    <>
      <div className="contact-main-container">

        <div className="contact-content-wrapper">
          {/* Left Column: Info Section */}
          <div className="contact-info-section">
            <h1 className="contact-heading">Let's <br /><span className="highlight">Connect</span></h1>

            <p className="contact-subtitle">
              I'd love to hear from you.<br />
              Send me a message and I'll<br />
              get back to you as soon as possible.
            </p>

            <div className="contact-info-list">
              <div className="contact-info-item">
                <div className="info-icon"><MdPublic /></div>
                <div className="info-details">
                  <h4>Time Zone</h4>
                  <p>IST (GMT +5:30)</p>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="info-icon"><MdAccessTime /></div>
                <div className="info-details">
                  <h4>Availability</h4>
                  <p>Open for opportunities & collaborations</p>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="info-icon"><MdMessage /></div>
                <div className="info-details">
                  <h4>Response Time</h4>
                  <p>Usually within 12-24 hours</p>
                </div>
              </div>
            </div>

            <div className="contact-help-box">
              <div className="help-icon"><MdMessage /></div>
              <div className="help-details">
                <h4>Have an idea?</h4>
                <p>Let's turn your vision into reality. Reach out and let's get the conversation started.</p>
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
                <div className="contact-input-form-container">
                  <label htmlFor="contact-name">
                    Name <span className="contact-form-imp-star">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="personName"
                    placeholder="Enter your name"
                    autoFocus={true}
                    {...register("personName", {
                      required: "*Required",
                      pattern: {
                        value: /^[a-zA-Z\s]{3,}$/,
                        message: "*Enter minimum 3 characters",
                      },
                    })}
                    disabled={loading}
                  />
                  {control.getFieldState("personName").isTouched && (
                    <p className="contact-form-error-message">
                      {errors.personName?.message}
                    </p>
                  )}
                </div>

                <div className="contact-input-form-container">
                  <label htmlFor="contact-email">
                    Email <span className="contact-form-imp-star">*</span></label>
                  <input
                    type="text"
                    id="contact-email"
                    name="email"
                    placeholder="Enter your email"
                    {...register("email", {
                      required: "*Required",
                      pattern: {
                        value: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/,
                        message: "*Enter valid email address",
                      },
                    })}
                    disabled={loading}
                  />
                  {control.getFieldState("email").isTouched && (
                    <p className="contact-form-error-message">
                      {errors.email?.message}
                    </p>
                  )}
                </div>

                <div className="contact-input-form-container">
                  <label htmlFor="contact-subject">
                    Subject <span className="contact-form-imp-star">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    placeholder="Subject of your message"
                    {...register("subject", {
                      required: "*Required",
                      pattern: {
                        value: /^[A-Za-z0-9@ ]{3,}$/,
                        message: "*Enter valid subject with minimum 3 characters",
                      },
                    })}
                    disabled={loading}
                  />
                  {control.getFieldState("subject").isTouched && (
                    <p className="contact-form-error-message">
                      {errors.subject?.message}
                    </p>
                  )}
                </div>
                <div className="contact-input-form-container">
                  <label htmlFor="contact-message">
                    Message <span className="contact-form-imp-star">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Write your message here..."
                    {...register("message", {
                      required: "*Required",
                      pattern: {
                        value:
                          /^(?!.*--)[\p{Extended_Pictographic}A-Za-z0-9 '.-]{3,}$/u,
                        message: "*Enter valid message.",
                      },
                    })}
                    disabled={loading}
                  ></textarea>
                  {control.getFieldState("message").isTouched && (
                    <p className="contact-form-error-message">
                      {errors.message?.message}
                    </p>
                  )}
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
            <li
              key={contact.id}
              className="contact-social-links-item tooltip-container"
            >
              <NavLink
                to={contact.link}
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
