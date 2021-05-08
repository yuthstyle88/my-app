const tabs = () => {
  let toggling = false;

  on("body", "click", '[data-toggle="tab"]', (event) => {
    const trigger = event.target.closest('[data-toggle="tab"]');

    const tabs = trigger.closest(".tabs");
    const targetedTab = tabs.querySelector(trigger.dataset.target);
    const activeTabTrigger = tabs.querySelector(".tab-nav .active");
    const activeTab = tabs.querySelector(".collapse.open");

    if (toggling) return;
    if (activeTabTrigger === trigger) return;

    // Trigger
    activeTabTrigger.classList.remove("active");
    trigger.classList.add("active");

    // Tab
    // Close
    toggling = true;
    activeTab.style.overflow = "hidden";
    let tabHeight = activeTab.scrollHeight + "px";
    activeTab.style.height = tabHeight;
    setTimeout(() => {
      activeTab.style.height = 0;
      activeTab.style.opacity = 0;
    }, 200);
    animateNode(activeTab, () => {
      activeTab.classList.remove("open");

      // Open
      tabHeight = targetedTab.scrollHeight + "px";
      setTimeout(() => {
        targetedTab.style.height = tabHeight;
        targetedTab.style.opacity = 1;
      }, 200);
      animateNode(targetedTab, () => {
        targetedTab.style.overflow = "visible";
        targetedTab.style.height = null;
        targetedTab.classList.add("open");
        toggling = false;
      });
    });
  });

  // Wizard (Previous/Next)
  on("body", "click", '[data-toggle="wizard"]', (event) => {
    const wizard = event.target.closest(".wizard");
    const direction = event.target.dataset.direction;
    const tabLinks = wizard.querySelectorAll(".nav-link");
    const activeLink = wizard.querySelector(".nav-link.active");

    let activeIndex = 0;

    tabLinks.forEach((link, index) => {
      if (link === activeLink) {
        activeIndex = index;
      }
    });

    switch (direction) {
      case "next":
        if (tabLinks[activeIndex + 1]) {
          tabLinks[activeIndex + 1].click();
        }
        break;
      case "previous":
        if (tabLinks[activeIndex - 1]) {
          tabLinks[activeIndex - 1].click();
        }
        break;
    }
  });
};

tabs();
