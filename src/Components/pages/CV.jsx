import React, { useEffect, useState } from "react";
import "../page-css/CV.css";

import PdfViewer from "./PdfViewer";

import { Document, Page, pdfjs } from "react-pdf";
import {
  BsExclamationCircleFill,
  BsFillFileEarmarkPdfFill,
} from "react-icons/bs";
import { IoMdCloudDownload } from "react-icons/io";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { MdError } from "react-icons/md";
import Footer from "./Footer";
import axios from "axios";
import { FaFilePdf } from "react-icons/fa";

const no_skills_img = `https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png`;

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const CV = ({ isVisibleNav, isVisibleFooter }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(true);
  const [pdfLoadingError, setPdfLoadingError] = useState(null);
  const [cvFile, setCVFile] = useState(null);

  useEffect(() => {
    document.title = "My CV  - Professional Experience | Innovex Portfolio";
  }, []);

  const handleDownload = async (e) => {
    e.preventDefault();

    if (!cvFile) {
      toast.error("No CV file to download", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setIsDownloading(true);

    try {
      const backendUrl = import.meta.env.VITE_API_BACKEND_URL;
      const downloadUrl = `${backendUrl}${cvFile.downloadUrl}`;

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = cvFile.filename || "CV.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Success toast
      toast.success("CV downloaded successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.log(error);
      toast.error("Download failed!", {
        position: "top-right",
        autoClose: 3000,
        style: {
          background: "linear-gradient(135deg, rgba(239, 68, 68, 0.2))",
          backdropFilter: "blur(20px)",
        },
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
      <div className="cv-main-container">
        <div className="cv-content-container">
          <h1 className="cv-main-heading">Curriculum Vitae (CV)</h1>
          <div className="cv-pdf-viewer-and-download-container">
            {cvFile ? (
              <>
                <PdfViewer
                  pdf={`${import.meta.env.VITE_API_BACKEND_URL}${cvFile.viewUrl}`}
                  onLoadingState={onLoadingState}
                />
                {!pdfLoading && !pdfLoadingError && (
                  <div className="download-cv-container">
                    <div className="download-cv-heading-container">
                      <h1 className="download-cv-heading">Download CV</h1>
                    </div>
                    <p className="download-cv-subtitle">
                      Download my up‑to‑date CV in PDF format to view my
                      professional experience, skills, and qualifications.
                    </p>
                    <button
                      className={`download-cv-btn ${isDownloading && "disabled"}`}
                      onClick={handleDownload}
                      disabled={isDownloading}
                    >
                      <span className="download-cv-btn-span">
                        {isDownloading ? (
                          "⏳ Downloading..."
                        ) : (
                          <>
                            <IoMdCloudDownload
                              size={24}
                              color={`var(--cyan-glow)`}
                            />
                            Download
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="no-cv-container">
                <img src={no_skills_img} alt="No CV" className="no-cv-img" />
                <h1 className="no-cv-heading">No CV Added</h1>
                <p className="no-cv-description">
                  No CV were added to display !!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {isVisibleFooter === "" || (isVisibleFooter === undefined && <Footer />)}
    </>
  );
};

export default CV;
