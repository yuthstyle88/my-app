// Alerts
const alerts = () => {
  // Close
  const closeAlert = (alert) => {
    animateCSS(alert, "fadeOut", () => {
      alert.style.transition = "all .2s linear";
      alert.style.opacity = 0;
      alert.style.height = alert.scrollHeight + "px";
      setTimeout(() => {
        alert.style.height = 0;
        alert.style.margin = 0;
        alert.style.padding = 0;
      });
      animateNode(alert, () => {
        alert.parentNode.removeChild(alert);
      });
    });
  };

  on(".alert", "click", '[data-dismiss="alert"]', (event) => {
    const alert = event.target.closest(".alert");
    closeAlert(alert);
  });
};

alerts();
