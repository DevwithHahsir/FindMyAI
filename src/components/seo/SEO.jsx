import React from "react";
import { Helmet } from "react-helmet-async";
import { normalizeCanonicalURL } from "../../utils/urlUtils";

// Default metadata (used if no props are provided).
// Title length is kept around 60 chars for best SEO:contentReference[oaicite:7]{index=7}.
// Meta description is concise (~150 chars) summarizing the site:contentReference[oaicite:8]{index=8}.
const DEFAULT_TITLE =
  "FindMyAI: AI Tools Directory - Free & Paid Productivity Tools";
const DEFAULT_DESCRIPTION =
  "FindMyAI is a comprehensive AI tools directory (free & paid) for productivity and creativity. Explore categories and discover top AI tools.";
const DEFAULT_IMAGE = "https://findmyai.org/findmyai.webp";
const DEFAULT_URL = "https://findmyai.org";

export default function SEO({ title, description, image, url }) {
  const seo = {
    title: title || DEFAULT_TITLE,
    description: description || DEFAULT_DESCRIPTION,
    image: image
      ? image.startsWith("http")
        ? image
        : `https://findmyai.org${image}`
      : DEFAULT_IMAGE,
    url: normalizeCanonicalURL(url) || DEFAULT_URL,
  };

  return (
    <Helmet>
      {/* -- Primary Meta Tags -- */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="robots" content="index, follow" />

      {/* -- Open Graph / Facebook Tags -- */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta
        property="og:image:alt"
        content="FindMyAI - AI Tools Directory Logo"
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="FindMyAI" />

      {/* -- Twitter Card Tags -- */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@FindMyAI" />
      <meta name="twitter:site" content="@FindMyAI" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta
        name="twitter:image:alt"
        content="FindMyAI - AI Tools Directory Logo"
      />

      {/* -- Additional SEO Meta Tags -- */}
      <meta name="image" content={seo.image} />
      <meta name="author" content="FindMyAI" />
      <meta name="theme-color" content="#1a1a2e" />
      <meta name="msapplication-TileColor" content="#1a1a2e" />

      {/* -- JSON-LD Structured Data -- */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "FindMyAI",
          url: seo.url,
          description: seo.description,
          image: seo.image,
          author: {
            "@type": "Organization",
            name: "FindMyAI",
          },
          potentialAction: {
            "@type": "SearchAction",
            target: `${DEFAULT_URL}/?search={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        })}
      </script>

      {/* -- Canonical URL -- */}
      <link rel="canonical" href={seo.url} />
    </Helmet>
  );
}
