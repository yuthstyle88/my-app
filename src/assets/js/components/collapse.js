// Collapse
const collapse = () => {
  const selector = '[data-toggle="collapse"]';

  // Toggle Collapse
  const toggleCollapse = (event) => {
    const collapseTrigger = event.target;

    collapseTrigger.classList.toggle("active");

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

    // Collapse
    const collapses = document.querySelectorAll(collapseTrigger.dataset.target);
    collapses.forEach((collapse) => {
      if (collapse.classList.contains("open")) {
        close(collapse);
      } else {
        open(collapse);
      }
    });

    // Accordion
    const accordion = collapseTrigger.closest(".accordion");
    if (accordion) {
      const accordionTriggers = accordion.querySelectorAll(selector);
      accordionTriggers.forEach((accordionTrigger) => {
        if (accordionTrigger !== collapseTrigger) {
          accordionTrigger.classList.remove("active");
        }
      });

      const accordions = accordion.querySelectorAll(".collapse");
      accordions.forEach((accordion) => {
        if (accordion.classList.contains("open")) {
          close(accordion);
        }
      });
    }
  };

  on("body", "click", selector, (event) => {
    toggleCollapse(event);
  });
};

collapse();
