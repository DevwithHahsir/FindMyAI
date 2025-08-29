/* eslint-disable no-unused-vars */
import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";
import path from "path";
import { fileURLToPath } from "url";

(async () => {
  try {
    const sitemap = new SitemapStream({
      hostname: "https://findmyai-ed99f.web.app",
      cacheTime: 600000, // 10 minutes cache - helps with performance
    });

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

    // End the stream before processing
    sitemap.end();

    // Convert stream to string
    const data = await streamToPromise(sitemap);

    // Save inside public folder with proper path resolution
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const filePath = path.join(__dirname, "../public", "sitemap.xml");

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
