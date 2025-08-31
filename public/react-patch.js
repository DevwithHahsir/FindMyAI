// React patch script to ensure React is available globally
(function () {
  console.log("React patch script running");

  // Function to patch React if it exists but is missing createContext
  function patchReact() {
    if (window.React) {
      if (!window.React.createContext) {
        console.log("React.createContext is missing, adding it");
        window.React.createContext = function (defaultValue) {
          const context = {
            Provider: function (props) {
              return props.children;
            },
            Consumer: function (props) {
              return props.children(defaultValue);
            },
            _currentValue: defaultValue,
            _currentValue2: defaultValue,
            displayName: "Context",
          };
          return context;
        };
      }
    } else {
      console.log("React not found in window, creating stub");
      window.React = {
        createContext: function (defaultValue) {
          const context = {
            Provider: function (props) {
              return props.children;
            },
            Consumer: function (props) {
              return props.children(defaultValue);
            },
            _currentValue: defaultValue,
            _currentValue2: defaultValue,
            displayName: "Context",
          };
          return context;
        },
        createElement: function () {
          console.log("React.createElement stub called");
          return document.createElement("div");
        },
        memo: function (component) {
          return component;
        },
        version: "18.3.1", // Match the version from package.json
      };
    }

    console.log("React patch complete:", window.React);
  }

  // Run patch immediately
  patchReact();

  // Also patch after document load in case React loads later
  document.addEventListener("DOMContentLoaded", patchReact);
})();
