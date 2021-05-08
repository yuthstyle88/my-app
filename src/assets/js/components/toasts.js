// Toasts

const toasts = () => {
  const toastsContainer = document.getElementById("toasts-container");

  const toastCloseSelector = '[data-dismiss="toast"]';

  // Toast
  const createToast = (toast) => {
    const title = toast.dataset.title;
    const content = toast.dataset.content;
    const time = toast.dataset.time;
    let newToast =
      '<div class="toast">' +
      '<div class="toast-wrapper mb-5">' +
      '<div class="toast-header">' +
      "<h5>" +
      title +
      "</h5>" +
      "<small>" +
      time +
      "</small>" +
      '<button type="button" class="close" data-dismiss="toast">&times</button>' +
      "</div>" +
      '<div class="toast-body">' +
      content +
      "</div>" +
      "</div>" +
      "</div>";

    newToast = new DOMParser().parseFromString(newToast, "text/html").body
      .firstChild;

    newToast.querySelector(toastCloseSelector).addEventListener("click", () => {
      closeToast(newToast);
    });

    toastsContainer.appendChild(newToast);
    animateCSS(newToast, "fadeInUp");
  };

  on("body", "click", '[data-toggle="toast"]', (event) => {
    const toast = event.target;
    createToast(toast);
  });

  // Close Toast
  const closeToast = (toast) => {
    animateCSS(toast, "fadeOutUp", () => {
      toast.style.opacity = 0;
      toast.style.overflow = "hidden";
      toast.style.height = toast.scrollHeight + "px";
      setTimeout(() => {
        toast.style.height = 0;
      });
      animateNode(toast, () => {
        toast.parentNode ? toast.parentNode.removeChild(toast) : false;
      });
    });
  };

  on("body", "click", toastCloseSelector, (event) => {
    toast = event.target.closest(".toast");
    closeToast(toast);
  });
};

toasts();
