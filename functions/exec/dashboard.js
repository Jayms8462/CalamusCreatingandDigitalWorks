document.addEventListener("DOMContentLoaded", () => {
  const auth = firebase.auth();

  auth.onAuthStateChanged((user) => {
    if (!user) {
      // Only protect dashboard
      if (window.location.pathname.startsWith("/dashboard")) {
        window.location.href = "/";
      }
    }
  });

  // Logout button inside dashboard page
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      try {
        await auth.signOut();
        window.location.href = "/";
      } catch (error) {
        console.error("Logout error:", error);
      }
    });
  }
});
