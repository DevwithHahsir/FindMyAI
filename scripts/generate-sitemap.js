import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";
import path from "path";
import { fileURLToPath } from "url";

(async () => {
  try {
    const sitemap = new SitemapStream({ hostname: "https://findmyai.com" });

    // Add your routes
    sitemap.write({ url: "/", changefreq: "daily", priority: 1.0 }); // Home page with Herosection and Categories
    sitemap.write({ url: "/trending", changefreq: "daily", priority: 0.8 }); // Trending page from navbar

    sitemap.end();

    // Convert stream to string
    const data = await streamToPromise(sitemap);
    // Save inside public folder
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const filePath = path.join(__dirname, "../public", "sitemap.xml");
    createWriteStream(filePath).write(data.toString());

    console.log(`✅ Sitemap generated successfully at: ${filePath}`);
  } catch (err) {
    console.error("❌ Error generating sitemap:", err);
  }
})();
