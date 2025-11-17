document.addEventListener("DOMContentLoaded", function () {
  const videoContainer = document.querySelector(".video-container iframe");
  if (videoContainer) {
    videoContainer.addEventListener("load", function () {
      this.setAttribute("aria-busy", "false");
    });

    videoContainer.setAttribute("aria-busy", "true");
  }
});
