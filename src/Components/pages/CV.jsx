import React, { useEffect, useState } from "react";
import "../page-css/CV.css";

import PdfViewer from "./PdfViewer";
import SkeletonLoading from "./SkeletonLoading"; // <-- Import the new dynamic loader

import { pdfjs } from "react-pdf";
import { IoMdCloudDownload } from "react-icons/io";
import { toast } from "react-toastify";
import Footer from "./Footer";
import { FaFilePdf, FaShieldAlt, FaUserTie } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

const CV_FILENAME = "Pavan_Ganesh_Resume_latest.pdf";
const CV_PDF_PATH = `/${CV_FILENAME}`;

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
      <div className="cv-bg-orbs" aria-hidden="true">
        <div className="cv-orb cv-orb-1" />
        <div className="cv-orb cv-orb-2" />
        <div className="cv-orb cv-orb-3" />
      </div>

      <div className="cv-main-container">
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

            {/* LEFT — PDF Viewer / Skeleton */}
            <div className="cv-viewer-wrapper">
              {pdfLoading && !pdfLoadingError && (
                <SkeletonLoading
                  width="100%"
                  height="800px"
                  borderRadius="12px"
                  className="pdf-skeleton-placeholder"
                />
              )}
              <PdfViewer pdf={CV_PDF_PATH} onLoadingState={onLoadingState} />
            </div>

            {/* RIGHT — Download Card / Skeleton */}
            {pdfLoadingError ? null : pdfLoading ? (
              // Composite Skeleton for the Download Card
              <div className="download-cv-container skeleton-card-override">
                <SkeletonLoading shape="circle" width="72px" height="72px" style={{ marginBottom: '24px' }} />
                <SkeletonLoading width="60%" height="28px" style={{ marginBottom: '16px' }} />
                <SkeletonLoading width="85%" height="14px" style={{ marginBottom: '8px' }} />
                <SkeletonLoading width="75%" height="14px" style={{ marginBottom: '28px' }} />

                <div style={{ display: 'flex', gap: '8px', marginBottom: '28px', justifyContent: 'center' }}>
                  <SkeletonLoading width="80px" height="24px" borderRadius="99px" />
                  <SkeletonLoading width="80px" height="24px" borderRadius="99px" />
                  <SkeletonLoading width="80px" height="24px" borderRadius="99px" />
                </div>

                <SkeletonLoading width="100%" height="52px" borderRadius="12px" />
              </div>
            ) : (
              // Actual Download Card
              <div className="download-cv-container">
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

                <div className="download-cv-features">
                  <span className="cv-feature-pill"><HiSparkles size={13} /> Up-to-date</span>
                  <span className="cv-feature-pill"><FaUserTie size={12} /> Professional</span>
                  <span className="cv-feature-pill"><FaShieldAlt size={12} /> PDF Format</span>
                </div>

                <button
                  className={`download-cv-btn${isDownloading ? " disabled" : ""}`}
                  onClick={handleDownload}
                  disabled={isDownloading}
                >
                  <span className="download-cv-btn-span">
                    {isDownloading ? (
                      <><span className="cv-btn-spinner" /> Downloading...</>
                    ) : (
                      <><IoMdCloudDownload size={22} /> Download CV</>
                    )}
                  </span>
                </button>
              </div>
            )}

          </div>
        </div>
      </div>

      {(isVisibleFooter === "" || isVisibleFooter === undefined) && <Footer />}
    </>
  );
};

export default CV;