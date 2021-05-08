// Menu
const menu = () => {
  const root = document.documentElement;

  const menuType = localStorage.getItem("menuType");

  const menuBar = document.querySelector(".menu-bar");
  const menuItems = document.querySelector(".menu-items");

  if (!menuBar) return;

  menuType && root.classList.add(menuType) || menuBar.classList.add(menuType);

  // Hide Menu Detail
  const hideMenuDetail = () => {
    menuBar.querySelectorAll(".menu-detail.open").forEach((menuDetail) => {
      hideOverlay();

      if (!menuBar.classList.contains("menu-wide")) {
        menuDetail.classList.remove("open");
      }
    });
  };

  // Hide Menu - When Clicked Elsewhere
  document.addEventListener("click", (event) => {
    if (
      !event.target.closest(".menu-items a") &&
      !event.target.closest(".menu-detail") &&
      !menuBar.classList.contains("menu-wide")
    ) {
      hideMenuDetail();
    }
  });

  // Open
  const open = (collapse) => {
    const collapseHeight = collapse.scrollHeight + "px";
    setTimeout(() => {
      collapse.style.height = collapseHeight;
      collapse.style.opacity = 1;
    }, 200);
    animateNode(collapse, () => {
      collapse.style.removeProperty("overflow");
      collapse.style.removeProperty("height");
      collapse.style.removeProperty("opacity");
      collapse.classList.add("open");
    });
  };

  // Close
  const close = (collapse) => {
    collapse.style.overflow = "hidden";
    const collapseHeight = collapse.scrollHeight + "px";
    collapse.style.height = collapseHeight;
    setTimeout(() => {
      collapse.style.height = 0;
      collapse.style.opacity = 0;
    }, 200);
    animateNode(collapse, () => {
      collapse.style.removeProperty("overflow");
      collapse.style.removeProperty("height");
      collapse.style.removeProperty("opacity");
      collapse.classList.remove("open");
    });
  };

  // Menu Links
  on(".menu-items", "click", ".link", (event) => {
    const menuLink = event.target.closest(".link");
    const menuName = menuLink.dataset.target;
    const selectedMenu = menuBar.querySelector(
      '.menu-detail[data-menu="' + menuName + '"]'
    );

    if (menuBar.classList.contains("menu-wide") && selectedMenu) {
      if (selectedMenu.classList.contains("open")) {
        close(selectedMenu);
      } else if (selectedMenu.classList.contains("collapse")) {
        open(selectedMenu);
      }
      return;
    }

    hideMenuDetail();

    if (selectedMenu) {
      showOverlay(true);
      selectedMenu.classList.add("open");
    } else {
      hideOverlay();
    }
  });

  // Toggle Menu
  const toggleMenu = () => {
    if (menuBar.classList.contains("menu-hidden")) {
      root.classList.remove("menu-hidden");
      menuBar.classList.remove("menu-hidden");
    } else {
      root.classList.add("menu-hidden");
      menuBar.classList.add("menu-hidden");
    }
  };

  on(".top-bar", "click", "[data-toggle='menu']", (event) => {
    toggleMenu(event);
  });

  // Switch Menu Type
  const switchMenuType = (type) => {
    const openMenu = menuBar.querySelector(".menu-detail.open");

    switch (type) {
      case "icon-only":
        root.classList.add("menu-icon-only");
        menuBar.classList.add("menu-icon-only");
        localStorage.setItem("menuType", "menu-icon-only");

        if (menuBar.classList.contains("menu-wide")) {
          deactivateWide();

          if (openMenu) {
            showOverlay(true);
          }
        }

        break;
      case "wide":
        root.classList.add("menu-wide");
        menuBar.classList.add("menu-wide");
        localStorage.setItem("menuType", "menu-wide");

        root.classList.remove("menu-icon-only");
        menuBar.classList.remove("menu-icon-only");

        activateWide();

        if (openMenu) {
          hideOverlay();
        }

        break;
      case "hidden":
        root.classList.add("menu-hidden");
        menuBar.classList.add("menu-hidden");
        localStorage.setItem("menuType", "menu-hidden");

        hideMenuDetail();

        break;
      default:
        root.classList.remove("menu-icon-only");
        menuBar.classList.remove("menu-icon-only");
        localStorage.removeItem("menuType");

        if (menuBar.classList.contains("menu-wide")) {
          deactivateWide();

          if (openMenu) {
            showOverlay(true);
          }
        }
    }
  };

  // Activate Wide
  const activateWide = () => {
    menuBar.querySelector(".menu-header").classList.remove("hidden");

    menuBar.querySelectorAll(".menu-items .link").forEach((menuLink) => {
      const menuName = menuLink.dataset.target;
      const selectedMenu = menuBar.querySelector(
        '.menu-detail[data-menu="' + menuName + '"]'
      );
      if (selectedMenu) {
        selectedMenu.classList.add("collapse");
        menuLink.after(selectedMenu);
      }
    });
  };

  // Deactivate Wide
  const deactivateWide = () => {
    root.classList.remove("menu-wide");
    menuBar.classList.remove("menu-wide");

    menuBar.querySelector(".menu-header").classList.add("hidden");

    menuBar.querySelectorAll(".menu-items .link").forEach((menuLink) => {
      const menuName = menuLink.dataset.target;
      const selectedMenu = menuBar.querySelector(
        '.menu-detail[data-menu="' + menuName + '"]'
      );
      if (selectedMenu) {
        selectedMenu.classList.remove("collapse");
        menuItems.after(selectedMenu);
      }
    });
  };

  // Auto-activate Wide
  if (menuBar.classList.contains("menu-wide")) {
    activateWide();
  }

  on(".menu-bar", "click", "[data-toggle='menu-type']", (event) => {
    const type = event.target.closest("[data-toggle='menu-type']").dataset
      .value;
    switchMenuType(type);
  });
};

menu();
