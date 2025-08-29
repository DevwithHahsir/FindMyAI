import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import categories from "../src/Data/category.js";
import tools from "../src/Data/tool.js";

(async () => {
  try {
    const sitemap = new SitemapStream({
      hostname: "https://ai-directory.web.app",
      cacheTime: 600000, // 10 minutes cache - helps with performance
    });

    // Current date in ISO format for lastmod
    const today = new Date().toISOString();

    // Add homepage
    sitemap.write({
      url: "/",
      changefreq: "daily",
      priority: 1.0,
      lastmod: today,
    });

    // Add all category pages
    if (categories && categories.length > 0) {
      categories.forEach((category) => {
        sitemap.write({
          url: `/category/${category.id}`,
          changefreq: "weekly",
          priority: 0.8,
          lastmod: today,
        });
      });
    }

    // Add all tool pages
    if (tools && tools.length > 0) {
      tools.forEach((tool) => {
        if (tool.name) {
          sitemap.write({
            url: `/tool/${encodeURIComponent(tool.name)}`,
            changefreq: "weekly",
            priority: 0.7,
            lastmod: today,
          });
        }
      });
    }

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

    // Success message (commented out to avoid console output)
    // console.log(`✅ Enhanced sitemap generated successfully at: ${filePath}`);
  } catch {
    // Error handling without console statements
  } finally {
    // Process completed message (commented out to avoid console output)
    // console.log("📊 Sitemap generation process completed");
  }
})();
