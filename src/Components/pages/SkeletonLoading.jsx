import React from "react";
import "../page-css/SkeletonLoading.css";

const SkeletonLoading = ({
    width = "100%",
    height = "20px",
    shape = "rect",
    borderRadius,
    className = "",
    style = {}
}) => {
    const baseStyle = {
        width,
        height,
        borderRadius: borderRadius ? borderRadius : (shape === "circle" ? "50%" : "8px"),
        ...style
    };

    return (
        <div
            className={`skeleton-base skeleton-pulse ${className}`}
            style={baseStyle}
            aria-hidden="true"
        ></div>
    );
};

export default SkeletonLoading;