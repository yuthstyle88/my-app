const darkMode = () => {
  const root = document.documentElement;

  const scheme = localStorage.getItem("scheme");

  const darkModeToggler = document.getElementById("darkModeToggler");

  scheme && root.classList.add(scheme);

  if (scheme === "dark") {
    if (!darkModeToggler) return;
    darkModeToggler.checked = "checked";
  }

  // Enable Dark Mode
  const enableDarkMode = () => {
    root.classList.remove("light");
    root.classList.add("dark");
    localStorage.setItem("scheme", "dark");
  };

  // Disable Dark Mode
  const disableDarkMode = () => {
    root.classList.remove("dark");
    root.classList.add("light");
    localStorage.removeItem("scheme");
  };

  // Check Dark Mode
  const checkDarkMode = (darkModeToggler) => {
    if (root.classList.contains("dark") || !darkModeToggler.checked) {
      return true;
    } else {
      return false;
    }
  };

  // Toggler
  darkModeToggler.addEventListener("change", () => {
    if (checkDarkMode(darkModeToggler)) {
      disableDarkMode();
    } else {
      enableDarkMode();
    }
  });
};

darkMode();
