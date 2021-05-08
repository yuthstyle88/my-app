// Event delegation
const on = (selector, eventType, childSelector, eventHandler) => {
  const elements = document.querySelectorAll(selector);
  for (element of elements) {
    element.addEventListener(eventType, (eventOnElement) => {
      if (eventOnElement.target.closest(childSelector)) {
        eventHandler(eventOnElement);
      }
    });
  }
};

// Animate CSS
const animateCSS = (node, animationName, callback) => {
  node.classList.add("animated", "faster", animationName);

  const handleAnimationEnd = () => {
    node.classList.remove("animated", "faster", animationName);
    node.removeEventListener("animationend", handleAnimationEnd);
    if (typeof callback === "function") callback();
  };

  node.addEventListener("animationend", handleAnimationEnd);
};

// Animate Node
const animateNode = (node, callback) => {
  const handleTransitionEnd = () => {
    node.removeEventListener("transitionend", handleTransitionEnd);
    if (typeof callback === "function") callback();
  };

  node.addEventListener("transitionend", handleTransitionEnd);
};

// Toggle Card Selection
const toggleCardSelection = (event) => {
  const card = event.target.closest(".card");
  card.classList.toggle("card_selected");
};

on("body", "click", '[data-toggle="cardSelection"]', (event) => {
  toggleCardSelection(event);
});

// Toggle Row Selection
const toggleRowSelection = (event) => {
  const row = event.target.closest("tr");
  row.classList.toggle("row_selected");
};

on("body", "click", '[data-toggle="rowSelection"]', (event) => {
  toggleRowSelection(event);
});

// Viewport Width
// Define our viewportWidth variable
let viewportWidth;

// Set/update the viewportWidth value
const setViewportWidth = () => {
  viewportWidth = window.innerWidth || document.documentElement.clientWidth;
};

// Watch the viewport width
const watchWidth = () => {
  const sm = 640;
  const md = 768;
  const lg = 1024;
  const xl = 1280;

  const menuBar = document.querySelector(".menu-bar");

  // Hide Menu Detail
  const hideMenuDetail = () => {
    menuBar.querySelectorAll(".menu-detail.open").forEach((menuDetail) => {
      hideOverlay();

      if (!menuBar.classList.contains("menu-wide")) {
        menuDetail.classList.remove("open");
      }
    });
  };

  if (viewportWidth < sm) {
    if (!menuBar.classList.contains("open")) {
      menuBar.classList.add("menu-hidden");
      document.documentElement.classList.add("menu-hidden");
      hideMenuDetail();
    }
  } else if (viewportWidth < md) {
    menuBar.classList.remove("menu-hidden");
    document.documentElement.classList.remove("menu-hidden");
  } else if (viewportWidth < lg) {
  } else if (viewportWidth < xl) {
  } else {
  }
};

// Set our initial width
setViewportWidth();
watchWidth();

// On resize events, recalculate
window.addEventListener(
  "resize",
  () => {
    setViewportWidth();
    watchWidth();
  },
  false
);

// Show active page
const showActivePage = () => {
  const pageUrl = window.location.href.split(/[?#]/)[0];

  const pageLinkSelector = ".menu-bar a";

  const pageLinks = document.querySelectorAll(pageLinkSelector);

  if (!pageLinks) return;

  pageLinks.forEach((pageLink) => {
    if (pageLink.href === pageUrl) {
      pageLink.classList.add("active");

      const mainMenuTrigger = pageLink.closest(".menu-detail");

      if (!mainMenuTrigger) return;

      const mainMenu = document.querySelector(
        '.menu-items .link[data-target="' + mainMenuTrigger.dataset.menu + '"]'
      );

      mainMenu.classList.add("active");
    }
  });
};

showActivePage();
