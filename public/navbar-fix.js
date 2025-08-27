// Fix for sticky navbar
document.addEventListener('DOMContentLoaded', function() {
  // Add event listener to ensure navbar stays fixed on category link click
  document.addEventListener('click', function(e) {
    if (e.target.closest('a[href="#categories-section"]')) {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        navbar.classList.add('always-sticky');
      }
    }
  });

  // Also check on scroll
  window.addEventListener('scroll', function() {
    const categoriesSection = document.getElementById('categories-section');
    if (categoriesSection) {
      const rect = categoriesSection.getBoundingClientRect();
      const navbar = document.querySelector('.navbar');
      
      if (rect.top <= 200) {
        // Near categories section, force sticky
        if (navbar) navbar.classList.add('always-sticky');
      } else {
        // Far from categories section, use regular sticky
        if (navbar) navbar.classList.remove('always-sticky');
      }
    }
  });
});
