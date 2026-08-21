import React, { useEffect, useState } from "react";
import "../page-css/cv.css";

import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import DotLoader from "react-spinners/DotLoader";
import { FaCaretLeft } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";
import { BsExclamationCircleFill } from "react-icons/bs";
import { FaFilePdf } from "react-icons/fa6";
import { VscRefresh } from "react-icons/vsc";

const PdfViewer = ({ pdf, onLoadingState }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    onLoadingState(isLoading, error);
  }, [isLoading, error]);

  const onDocumentLoadSuccess = (data) => {
    setNumPages(data.numPages);
    setPageNumber(1);
    setError(null);
  };

  // Errors

  const onDocumentLoadError = (err) => {
    console.error("Error loading PDF:", err);
    setError("Oops! Failed to load the PDF.");
    setIsLoading(false);
  };

  const onDocumentSourceError = (err) => {
    console.error("Error retrieving PDF source:", err);
    setError("Unable to load the PDF source. Please check the file URL.");
    setIsLoading(false);
  };

  //   Retry handler
  const onRetry = () => {
    setIsLoading(true);
    setError(null);
    setPageNumber(1);

    // Get Request to reload the PDF
  };

  const nextPage = () => {
    setPageNumber((prev) => (prev < numPages ? prev + 1 : prev));
  };

  const prevPage = () => {
    setPageNumber((prev) => (prev >= 1 ? prev - 1 : prev));
  };

  return (
    <>
      {/* Loading indicator */}
      {isLoading && !error && (
        <div className="pdf-loader-container">
          <DotLoader color={`var(--cyan-glow)`} /> Loading...
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="pdf-error">
          <FaFilePdf
            size={50}
            color="rgba(216, 0, 11, 0.7)"
            style={{ marginBottom: "15px" }}
          />
          <p className="pdf-error-subtitle">
            <BsExclamationCircleFill color="rgba(216, 0, 11, 0.9)" /> {error}
          </p>
          <button className="pdf-retry-btn" onClick={onRetry}>
            Retry <VscRefresh size={18} />
          </button>
        </div>
      )}

      <div>
        <Document
          file={pdf}
          className={error || isLoading ? "hide-pdf" : "show-pdf"}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadProgress={({ loaded, total }) => {
            if ((loaded / total) * 100 === 100) {
              console.log(`Loading: ${((loaded / total) * 100).toFixed(1)}%`);
              setIsLoading(false);
            }
          }}
          onLoadError={onDocumentLoadError}
          onSourceError={onDocumentSourceError}
        >
          {/* Page content */}
          {!isLoading && !error && (
            <Page
              pageNumber={pageNumber}
              renderAnnotationLayer={true}
              renderTextLayer={false}
              scale={1.2}
            />
          )}
        </Document>
        {/* Pagination Controls */}
        {!isLoading && !error && (
          <div className="pdf-pagination-controls-container">
            <button
              onClick={prevPage}
              disabled={pageNumber <= 1}
              className="pdf-pagination-prev-btn"
            >
              <FaCaretLeft size={18} height={`100%`} /> Previous
            </button>
            <p className="pdf-page-name">
              Page {pageNumber} of {numPages}
            </p>
            <button
              onClick={nextPage}
              disabled={pageNumber >= numPages}
              className="pdf-pagination-next-btn"
            >
              Next <FaCaretRight size={18} height={`100%`} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default PdfViewer;
