document.addEventListener("DOMContentLoaded", () => {
  // === Services dropdown ===
  const servicesLink = document.querySelector(".services-toggle");
  const servicesMenu = document.querySelector(".dropdown-menu");
  let servicesOpen = false;

  if (servicesLink && servicesMenu) {
    servicesLink.addEventListener("click", (e) => {
      e.preventDefault();

      if (!servicesOpen) {
        servicesMenu.classList.add("show");
        servicesOpen = true;

        document.addEventListener("click", function closeServices(ev) {
          if (!servicesLink.contains(ev.target) && !servicesMenu.contains(ev.target)) {
            servicesMenu.classList.remove("show");
            servicesOpen = false;
            document.removeEventListener("click", closeServices);
          }
        });
      } else {
        // 2nd click → go to /services
        window.location.href = servicesLink.getAttribute("href");
      }
    });
  }

  // === Login dropdown ===
  const loginWrapper   = document.getElementById("login-wrapper");
  const loginToggle    = document.getElementById("login-toggle");
  const loginMenu      = document.getElementById("login-dropdown");

  if (loginToggle && loginMenu) {
    loginToggle.addEventListener("click", (e) => {
      e.preventDefault();
      loginMenu.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
      if (!loginMenu.contains(e.target) && !loginToggle.contains(e.target)) {
        loginMenu.classList.remove("show");
      }
    });
  }

  // === Dashboard dropdown ===
  const dashboardWrapper = document.getElementById("dashboard-wrapper");
  const dashboardToggle  = document.getElementById("user-dashboard-toggle");
  const dashboardMenu    = document.getElementById("user-dashboard-menu");
  let dashboardOpen = false;

  if (dashboardToggle && dashboardMenu) {
    dashboardToggle.addEventListener("click", (e) => {
      e.preventDefault();

      if (!dashboardOpen) {
        dashboardMenu.classList.add("show");
        dashboardOpen = true;

        document.addEventListener("click", function closeDash(ev) {
          if (!dashboardMenu.contains(ev.target) && !dashboardToggle.contains(ev.target)) {
            dashboardMenu.classList.remove("show");
            dashboardOpen = false;
            document.removeEventListener("click", closeDash);
          }
        });
      } else {
        // 2nd click → go to dashboard
        window.location.href = "/dashboard";
      }
    });
  }

  // === Auth state listener: swap Login <-> User Dashboard ===
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      // Hide login wrapper, show dashboard wrapper
      if (loginWrapper)      loginWrapper.classList.add("hidden");
      if (dashboardWrapper)  dashboardWrapper.classList.remove("hidden");

      // --- Role check from Firestore ---
      try {
        const userDoc = await firebase.firestore().collection("users").doc(user.uid).get();
        const role = userDoc.exists ? userDoc.data().role : "user";

        if (role === "admin") {
          console.log("Admin logged in!");
          const adminUsers   = document.getElementById("admin-users-link");
          const adminServices= document.getElementById("admin-services-link");
          const adminBilling = document.getElementById("admin-billing-link");

          if (adminUsers)    adminUsers.classList.remove("hidden");
          if (adminServices) adminServices.classList.remove("hidden");
          if (adminBilling)  adminBilling.classList.remove("hidden");
        }
      } catch (err) {
        console.error("Error checking role:", err);
      }

    } else {
      // Show login wrapper, hide dashboard wrapper and close any open menus
      if (loginWrapper)      loginWrapper.classList.remove("hidden");
      if (dashboardWrapper)  dashboardWrapper.classList.add("hidden");
      if (dashboardMenu)     dashboardMenu.classList.remove("show");

      // Hide admin-only links again
      const adminUsers   = document.getElementById("admin-users-link");
      const adminServices= document.getElementById("admin-services-link");
      const adminBilling = document.getElementById("admin-billing-link");

      if (adminUsers)    adminUsers.classList.add("hidden");
      if (adminServices) adminServices.classList.add("hidden");
      if (adminBilling)  adminBilling.classList.add("hidden");
    }
  });
});
