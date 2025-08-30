// Add lazy loading to images that don't already have it
document.addEventListener("DOMContentLoaded", () => {
  // Set up Intersection Observer
  const lazyImageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
          }
          img.classList.remove("lazy");
          observer.unobserve(img);
        }
      });
    },
    {
      rootMargin: "200px 0px", // Start loading images when they're 200px from viewport
    }
  );

  // Add lazy loading to all images without it
  document.querySelectorAll("img:not([loading])").forEach((img) => {
    img.setAttribute("loading", "lazy");
  });

  // Set up progressive image loading for images with data-src
  document.querySelectorAll("img.lazy[data-src]").forEach((img) => {
    lazyImageObserver.observe(img);
  });

  // Add width and height attributes to prevent CLS (Cumulative Layout Shift)
  document.querySelectorAll("img:not([width]):not([height])").forEach((img) => {
    // Only add dimensions if the image is loaded
    if (img.complete && img.naturalWidth !== 0) {
      img.setAttribute("width", img.naturalWidth);
      img.setAttribute("height", img.naturalHeight);
    }
  });
});
