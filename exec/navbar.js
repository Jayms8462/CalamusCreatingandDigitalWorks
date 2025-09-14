document.addEventListener("DOMContentLoaded", function () {
  const servicesLink = document.querySelector(".services-toggle");
  const dropdownMenu = document.querySelector(".dropdown-menu");

  let tappedOnce = false;

  servicesLink.addEventListener("click", function (e) {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      if (!tappedOnce) {
        e.preventDefault(); // Block navigation on first tap
        dropdownMenu.classList.add("show");
        tappedOnce = true;

        // Reset tap if user clicks elsewhere
        document.addEventListener("click", function resetTap(event) {
          if (!servicesLink.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove("show");
            tappedOnce = false;
            document.removeEventListener("click", resetTap);
          }
        });
      } else {
        // Second tap: allow navigation
        window.location.href = servicesLink.getAttribute("href");
      }
    }
  });
});