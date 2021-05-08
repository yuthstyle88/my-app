const sidebar = () => {
  // Toggle Sidebar
  const toggleSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    if (sidebar.classList.contains("open")) {
      sidebar.classList.remove("open");
      hideOverlay();
    } else {
      sidebar.classList.add("open");
      showOverlay(true);
    }
  };

  on("body", "click", '[data-toggle="sidebar"]', () => {
    toggleSidebar();
  });
};

sidebar();
