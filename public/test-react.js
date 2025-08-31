// Script to test if React is loaded correctly
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    if (window.React) {
      console.log("React is available globally:", window.React.version);
    } else {
      console.log("React is NOT available globally");
    }

    if (window.React && window.React.createContext) {
      console.log("React.createContext is available");
    } else {
      console.log("React.createContext is NOT available");
    }
  }, 1000); // Wait a second to ensure scripts have loaded
});
