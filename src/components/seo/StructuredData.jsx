import { Helmet } from "react-helmet-async";

const StructuredData = ({ type = "website", data = {} }) => {
  // Base structured data for website
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "FindMyAI",
    url: "https://findmyai.org/",
    alternateName: "AI Tools Directory",
    description:
      "FindMyAI is a comprehensive directory of AI tools (free & paid) across categories like productivity, creativity, and automation. Discover trending AI apps and software in 2025.",
    publisher: {
      "@type": "Organization",
      name: "FindMyAI",
      url: "https://findmyai.org/",
      logo: {
        "@type": "ImageObject",
        url: "https://findmyai.org/findmyai.webp",
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://findmyai.org/?s={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    inLanguage: "en",
  };

  // Organization structured data
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FindMyAI",
    url: "https://findmyai.org/",
    logo: "https://findmyai.org/findmyai.webp",
    sameAs: ["https://github.com/findmyai", "https://findmyai.org/about"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "contact@findmyai.org",
      url: "https://findmyai.org/contact",
    },
  };

  // Product schema for AI tools (better for rich results than SoftwareApplication)
  const productData = (toolData) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: toolData.name,
    description: toolData.description,
    url: toolData.websiteUrl,
    category: `${toolData.category} AI Tools`,
    brand: {
      "@type": "Brand",
      name: toolData.name,
    },
    offers: {
      "@type": "Offer",
      price: toolData.pricingModel === "Free" ? "0" : "varies",
      priceCurrency: "USD",
      priceValidUntil: "2025-12-31",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "FindMyAI",
        url: "https://findmyai.org/",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      ratingCount: "100",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "4.5",
          bestRating: "5",
        },
        author: {
          "@type": "Organization",
          name: "FindMyAI",
        },
        reviewBody: `${toolData.name} is a powerful ${toolData.category} AI tool that delivers excellent results for users.`,
      },
    ],
  });

  // BreadcrumbList schema for navigation
  const breadcrumbData = (breadcrumbItems) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  });

  // Article/BlogPosting schema for content pages
  const articleData = (articleInfo) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: articleInfo.title,
    description: articleInfo.description,
    author: {
      "@type": "Organization",
      name: "FindMyAI",
      url: "https://findmyai.org/",
    },
    publisher: {
      "@type": "Organization",
      name: "FindMyAI",
      url: "https://findmyai.org/",
      logo: {
        "@type": "ImageObject",
        url: "https://findmyai.org/findmyai.webp",
      },
    },
    datePublished: "2025-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleInfo.url,
    },
    image: {
      "@type": "ImageObject",
      url: "https://findmyai.org/findmyai.webp",
      width: 1200,
      height: 630,
    },
  });

  // Software Application structured data for individual tools
  const softwareApplicationData = (toolData) => ({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: toolData.name,
    description: toolData.description,
    url: toolData.websiteUrl,
    applicationCategory: toolData.category,
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: toolData.pricingModel === "Free" ? "0" : "varies",
      priceCurrency: "USD",
      priceValidUntil: "2025-12-31",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      ratingCount: "100",
    },
    author: {
      "@type": "Organization",
      name: "FindMyAI",
      url: "https://findmyai.org/",
    },
  });

  // Collection page structured data for categories
  const collectionPageData = (categoryData) => ({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${categoryData.name} AI Tools`,
    description: `Discover the best ${
      categoryData.name
    } AI tools in 2025. Compare free & paid options for ${categoryData.name.toLowerCase()} tasks and boost your productivity.`,
    url: `https://findmyai.org/category/${categoryData.id}`,
    mainEntity: {
      "@type": "ItemList",
      name: `${categoryData.name} AI Tools`,
      description: categoryData.description,
      numberOfItems: categoryData.toolCount || "20+",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://findmyai.org/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Categories",
          item: "https://findmyai.org/",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: categoryData.name,
          item: `https://findmyai.org/category/${categoryData.id}`,
        },
      ],
    },
  });

  // FAQ structured data
  const faqData = (faqItems) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  });

  // Generate tool-specific FAQs
  const generateToolFAQs = (toolData) => {
    const toolFAQs = [
      {
        question: `Is ${toolData.name} free to use?`,
        answer: `${toolData.name} offers ${
          toolData.pricingModel === "Free"
            ? "a free plan"
            : "both free and paid plans"
        }. Check the pricing details on their official website for the most current information.`,
      },
      {
        question: `What type of AI tool is ${toolData.name}?`,
        answer: `${toolData.name} is a ${
          toolData.category
        } AI tool that helps users with ${toolData.category.toLowerCase()} tasks. It's designed for both beginners and professionals.`,
      },
      {
        question: `How do I get started with ${toolData.name}?`,
        answer: `You can start using ${toolData.name} by visiting their official website. Most AI tools offer tutorials or getting started guides to help new users.`,
      },
    ];
    return toolFAQs;
  };

  // Category-specific FAQ data generator
  const generateCategoryFAQs = (categoryName) => {
    const baseFAQs = [
      {
        question: `Are ${categoryName} AI tools free?`,
        answer: `Many ${categoryName} AI tools offer free plans or trials. FindMyAI lists both free and paid ${categoryName} tools, clearly marking their pricing models to help you find the best option for your budget.`,
      },
      {
        question: `Which ${categoryName} AI tool is best for beginners?`,
        answer: `The best ${categoryName} AI tool for beginners depends on your specific needs. Our directory includes user-friendly options with detailed descriptions to help you choose the right ${categoryName} tool.`,
      },
      {
        question: `How do I choose the right ${categoryName} AI tool?`,
        answer: `Consider your budget, technical expertise, and specific requirements. Our ${categoryName} AI tools directory provides detailed comparisons, pricing information, and user reviews to guide your decision.`,
      },
    ];
    return baseFAQs;
  };

  // Generate structured data based on type
  const generateStructuredData = () => {
    switch (type) {
      case "tool":
        return productData(data); // Using Product schema instead of SoftwareApplication
      case "software":
        return softwareApplicationData(data); // Keep original for backward compatibility
      case "category":
        return collectionPageData(data);
      case "faq":
        return faqData(data);
      case "category-faq":
        return faqData(generateCategoryFAQs(data.categoryName));
      case "tool-product-faq":
        // Return array with both Product and FAQ schemas
        return [productData(data), faqData(generateToolFAQs(data))];
      case "breadcrumb":
        return breadcrumbData(data);
      case "article":
        return articleData(data);
      case "organization":
        return organizationData;
      case "website":
      default:
        return websiteData;
    }
  };

  const structuredData = generateStructuredData();

  // Handle array of schemas for tool-product-faq case
  const schemaData = Array.isArray(structuredData)
    ? structuredData
    : [structuredData];

  return (
    <>
      {schemaData.map((schema, index) => (
        <Helmet key={index}>
          <script type="application/ld+json">
            {JSON.stringify(schema, null, 2)}
          </script>
        </Helmet>
      ))}
    </>
  );
};

export default StructuredData;
