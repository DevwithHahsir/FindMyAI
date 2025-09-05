/**
 * Utility functions for URL handling and validation
 */

/**
 * Clean and validate tool names for URL usage
 * @param {string} toolName - The tool name to clean
 * @returns {string} - Cleaned tool name safe for URLs
 */
export const cleanToolName = (toolName) => {
  if (!toolName || typeof toolName !== "string") {
    return "";
  }

  return (
    toolName
      // Replace forward slashes with 'and'
      .replace(/\s*\/\s*/g, " and ")
      // Replace other problematic characters
      .replace(/[<>&"']/g, "")
      // Clean up multiple spaces
      .replace(/\s+/g, " ")
      // Trim whitespace
      .trim()
  );
};

/**
 * Create a safe URL slug from a tool name
 * @param {string} toolName - The tool name
 * @returns {string} - URL-safe slug
 */
export const createToolSlug = (toolName) => {
  const cleanName = cleanToolName(toolName);
  return encodeURIComponent(cleanName);
};

/**
 * Validate if a URL is properly indexable
 * @param {string} url - The URL to validate
 * @returns {boolean} - Whether the URL is indexable
 */
export const isIndexableURL = (url) => {
  try {
    const urlObj = new URL(url);

    // Check if it's our domain
    if (urlObj.hostname !== "findmyai.org") {
      return false;
    }

    // Check for problematic characters in path
    const problematicChars = /[<>&"']/;
    if (problematicChars.test(urlObj.pathname)) {
      return false;
    }

    // Should not have multiple consecutive slashes
    if (urlObj.pathname.includes("//")) {
      return false;
    }

    return true;
  } catch (_error) {
    return false;
  }
};

/**
 * Normalize a canonical URL to ensure it's indexable
 * @param {string} url - The URL to normalize
 * @returns {string} - Normalized indexable URL
 */
export const normalizeCanonicalURL = (url) => {
  const defaultURL = "https://findmyai.org";

  if (!url) return defaultURL;

  try {
    // Ensure URL starts with https://
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://findmyai.org" + (url.startsWith("/") ? url : "/" + url);
    }

    const urlObj = new URL(url);

    // Ensure it's our domain
    if (urlObj.hostname !== "findmyai.org") {
      return defaultURL;
    }

    // Clean the pathname
    let pathname = urlObj.pathname;

    // Remove trailing slash except for root
    if (pathname !== "/" && pathname.endsWith("/")) {
      pathname = pathname.slice(0, -1);
    }

    // Fix double slashes
    pathname = pathname.replace(/\/+/g, "/");

    // Update the URL object
    urlObj.pathname = pathname;
    urlObj.hash = "";
    urlObj.search = "";

    const normalizedURL = urlObj.toString();

    // Final validation
    if (!isIndexableURL(normalizedURL)) {
      return defaultURL;
    }

    return normalizedURL;
  } catch (_error) {
    return defaultURL;
  }
};
