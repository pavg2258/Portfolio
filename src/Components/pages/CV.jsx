import React, { useEffect, useState } from "react";
import "../page-css/CV.css";

import PdfViewer from "./PdfViewer";

import { pdfjs } from "react-pdf";
import { IoMdCloudDownload } from "react-icons/io";
import { toast } from "react-toastify";
import Footer from "./Footer";
import { FaFilePdf, FaShieldAlt, FaUserTie } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

/* ─────────────────────────────────────────────────────────────
   CV FILE — update CV_FILENAME if you rename the PDF in public/
   ───────────────────────────────────────────────────────────── */
const CV_FILENAME = "Pavan_Ganesh_Resume_latest.pdf"; // ← matches public/ folder
const CV_PDF_PATH = `/${CV_FILENAME}`; // Vite serves public/ at root

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const CV = ({ isVisibleFooter }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(true);
  const [pdfLoadingError, setPdfLoadingError] = useState(null);

  useEffect(() => {
    document.title = "My CV — Professional Experience | Innovex Portfolio";
  }, []);

  const handleDownload = (e) => {
    e.preventDefault();
    setIsDownloading(true);
    try {
      // Creates a direct download link for the public PDF
      const link = document.createElement("a");
      link.href = CV_PDF_PATH;
      link.download = CV_FILENAME;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("CV downloaded successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error(error);
      toast.error("Download failed! Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const onLoadingState = (isLoading, error) => {
    setPdfLoading(isLoading);
    setPdfLoadingError(error);
  };

  return (
    <>
      {/* Ambient background orbs */}
      <div className="cv-bg-orbs" aria-hidden="true">
        <div className="cv-orb cv-orb-1" />
        <div className="cv-orb cv-orb-2" />
        <div className="cv-orb cv-orb-3" />
      </div>

      <div className="cv-main-container">
        {/* Page Header */}
        <div className="cv-page-header">
          <p className="cv-page-eyebrow">CAREER PROFILE</p>
          <h1 className="cv-main-heading">Curriculum Vitae</h1>
          <div className="cv-heading-rule" />
          <p className="cv-page-subtitle">
            My professional journey, skills &amp; qualifications — all in one place.
          </p>
        </div>

        <div className="cv-content-container">
          <div className="cv-pdf-viewer-and-download-container">

            {/* LEFT — PDF Viewer */}
            <div className="cv-viewer-wrapper">
              {/* </div> */}
              <PdfViewer pdf={CV_PDF_PATH} onLoadingState={onLoadingState} />
            </div>

            {/* RIGHT — Download Card (always visible) */}
            <div className="download-cv-container">
              {/* Icon badge */}
              <div className="download-cv-icon-badge">
                <FaFilePdf size={28} color="var(--cyan-glow)" />
              </div>

              <div className="download-cv-heading-container">
                <h2 className="download-cv-heading">Download CV</h2>
              </div>

              <p className="download-cv-subtitle">
                Download my up-to-date CV in PDF format to view my professional
                experience, skills, and qualifications.
              </p>

              {/* Feature pills */}
              <div className="download-cv-features">
                <span className="cv-feature-pill">
                  <HiSparkles size={13} /> Up-to-date
                </span>
                <span className="cv-feature-pill">
                  <FaUserTie size={12} /> Professional
                </span>
                <span className="cv-feature-pill">
                  <FaShieldAlt size={12} /> PDF Format
                </span>
              </div>

              <button
                className={`download-cv-btn${isDownloading ? " disabled" : ""}`}
                onClick={handleDownload}
                disabled={isDownloading}
                id="download-cv-button"
              >
                <span className="download-cv-btn-span">
                  {isDownloading ? (
                    <>
                      <span className="cv-btn-spinner" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <IoMdCloudDownload size={22} />
                      Download CV
                    </>
                  )}
                </span>
              </button>

            </div>
          </div>
        </div>
      </div>

      {(isVisibleFooter === "" || isVisibleFooter === undefined) && <Footer />}
    </>
  );
};

export default CV;
