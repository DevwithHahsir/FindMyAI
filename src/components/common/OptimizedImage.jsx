import React from "react";

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = "",
  loading = "lazy",
  fetchPriority = "auto",
  ...props
}) => {
  // Ensure full domain URL for images
  const fullSrc = src.startsWith("http") ? src : `https://findmyai.org${src}`;

  return (
    <img
      src={fullSrc}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      fetchPriority={fetchPriority}
      className={className}
      style={{
        maxWidth: "100%",
        height: "auto",
        ...props.style,
      }}
      {...props}
    />
  );
};

// Specific component for FindMyAI logo
export const FindMyAILogo = ({
  size = "medium",
  className = "",
  loading = "lazy",
  ...props
}) => {
  const sizes = {
    small: { width: 40, height: 40 },
    medium: { width: 60, height: 60 },
    large: { width: 120, height: 120 },
    hero: { width: 200, height: 200 },
  };

  const { width, height } = sizes[size] || sizes.medium;

  return (
    <OptimizedImage
      src="https://findmyai.org/findmyai.webp"
      alt="FindMyAI - AI Tools Directory Logo"
      width={width}
      height={height}
      loading={loading}
      className={`findmyai-logo ${className}`}
      {...props}
    />
  );
};

export default OptimizedImage;
