/* eslint-disable no-unused-vars */
import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

// Function to clean tool names for URL usage
const cleanToolName = (toolName) => {
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

// Function to create URL slug from tool name
const createToolSlug = (toolName) => {
  if (!toolName || typeof toolName !== "string") {
    return "";
  }

  return toolName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

(async () => {
  try {
    const sitemap = new SitemapStream({
      hostname: "https://findmyai.org",
      cacheTime: 600000, // 10 minutes cache - helps with performance
    });

    // Define known categories (IDs 1-8 based on category.js)
    const categoryIds = [1, 2, 3, 4, 5, 6, 7, 8];

    // Read tools data to extract tool names
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const toolsPath = path.join(__dirname, "../src/Data/tool.js");
    const toolsContent = readFileSync(toolsPath, "utf-8");

    // Extract tool names using regex pattern
    const toolNameMatches = toolsContent.matchAll(/name:\s*["']([^"']+)["']/g);
    const toolNames = Array.from(toolNameMatches, (match) => match[1]);

    // Only add actual routes, not in-page sections
    // Main page includes all sections (hero, categories, trending)
    sitemap.write({
      url: "/",
      changefreq: "daily",
      priority: 1.0,
      lastmod: new Date().toISOString().split("T")[0], // Today's date in YYYY-MM-DD format
    });

    // Add educational content pages
    sitemap.write({
      url: "/about",
      changefreq: "monthly",
      priority: 0.8,
      lastmod: new Date().toISOString().split("T")[0],
    });

    sitemap.write({
      url: "/contact",
      changefreq: "monthly",
      priority: 0.8,
      lastmod: new Date().toISOString().split("T")[0],
    });

    sitemap.write({
      url: "/how-to-use-ai",
      changefreq: "weekly",
      priority: 0.9,
      lastmod: new Date().toISOString().split("T")[0],
    });

    sitemap.write({
      url: "/mastering-prompts",
      changefreq: "weekly",
      priority: 0.9,
      lastmod: new Date().toISOString().split("T")[0],
    });

    // Add category pages
    if (categoryIds && categoryIds.length > 0) {
      categoryIds.forEach((categoryId) => {
        sitemap.write({
          url: `/category/${categoryId}`,
          changefreq: "weekly",
          priority: 0.8,
          lastmod: new Date().toISOString().split("T")[0],
        });
      });
    }

    // Add tool pages
    if (toolNames && toolNames.length > 0) {
      toolNames.forEach((toolName) => {
        const cleanedName = cleanToolName(toolName);
        const toolSlug = createToolSlug(cleanedName);
        if (toolSlug) {
          sitemap.write({
            url: `/tool/${toolSlug}`,
            changefreq: "monthly",
            priority: 0.7,
            lastmod: new Date().toISOString().split("T")[0],
          });
        }
      });
    }

    // End the stream before processing
    sitemap.end();

    // Convert stream to string
    const data = await streamToPromise(sitemap);

    // Save inside dist folder after build
    const filePath = path.join(__dirname, "../dist", "sitemap.xml");

    // Format the XML with proper indentation for readability
    const prettyXml = data
      .toString()
      .replace(/></g, ">\n<")
      .replace(/<urlset/g, "\n<urlset")
      .replace(/<\/urlset>/g, "\n</urlset>");

    // Write the file with proper stream handling
    const writeStream = createWriteStream(filePath);
    writeStream.write(prettyXml);
    writeStream.end();

    // Sitemap generated successfully
  } catch (_err) {
    // Error handling without console statements
  } finally {
    // Process completed
  }
})();
