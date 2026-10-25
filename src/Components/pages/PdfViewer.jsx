import React, { useEffect, useState } from "react";
import "../page-css/CV.css";

import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";

const PdfViewer = ({ pdf, onLoadingState }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    onLoadingState(isLoading, error);
  }, [isLoading, error, onLoadingState]);

  const onDocumentLoadSuccess = (data) => {
    setNumPages(data.numPages);
    setPageNumber(1);
    setError(null);
  };

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

  const nextPage = () => setPageNumber((prev) => (prev < numPages ? prev + 1 : prev));
  const prevPage = () => setPageNumber((prev) => (prev >= 1 ? prev - 1 : prev));

  return (
    <>
      {/* Error message */}
      {error && (
        <div className="no-cv-container">
          <div className="no-cv-icon-ring">
            <FaFilePdf size={42} color="var(--cyan-glow)" />
          </div>
          <h2 className="no-cv-heading">No CV Added Yet</h2>
          <p className="no-cv-description">
            A CV hasn&apos;t been uploaded to display here yet. Check back soon!
          </p>
        </div>
      )}

      <div>
        <Document
          file={pdf}
          className={error || isLoading ? "hide-pdf" : "show-pdf"}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadProgress={({ loaded, total }) => {
            if ((loaded / total) * 100 === 100) {
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
            <button onClick={prevPage} disabled={pageNumber <= 1} className="pdf-pagination-prev-btn">
              <FaCaretLeft size={18} height={`100%`} /> Previous
            </button>
            <p className="pdf-page-name">
              Page {pageNumber} of {numPages}
            </p>
            <button onClick={nextPage} disabled={pageNumber >= numPages} className="pdf-pagination-next-btn">
              Next <FaCaretRight size={18} height={`100%`} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default PdfViewer;