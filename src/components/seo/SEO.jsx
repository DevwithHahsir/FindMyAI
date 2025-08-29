import React from "react";
import { Helmet } from "react-helmet-async";

// Default metadata (used if no props are provided).
// Title length is kept around 60 chars for best SEO:contentReference[oaicite:7]{index=7}.
// Meta description is concise (~150 chars) summarizing the site:contentReference[oaicite:8]{index=8}.
const DEFAULT_TITLE =
  "FindMyAI: AI Tools Directory - Free & Paid Productivity Tools";
const DEFAULT_DESCRIPTION =
  "FindMyAI is a comprehensive AI tools directory (free & paid) for productivity and creativity. Explore categories and discover top AI tools.";
const DEFAULT_IMAGE = "/findmyai.webp";
const DEFAULT_URL = "https://ai-directory.web.app";

export default function SEO({ title, description, image, url }) {
  const seo = {
    title: title || DEFAULT_TITLE,
    description: description || DEFAULT_DESCRIPTION,
    image: image || DEFAULT_IMAGE,
    url: url || DEFAULT_URL,
  };

  return (
    <Helmet>
      {/* -- Primary Meta Tags -- */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />

      {/* -- Open Graph / Facebook Tags -- */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />

      {/* -- Twitter Card Tags -- */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@FindMyAI" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      {/* -- Canonical URL -- */}
      <link rel="canonical" href={seo.url} />
    </Helmet>
  );
}
