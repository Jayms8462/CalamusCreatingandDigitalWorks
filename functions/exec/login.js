// functions/exec/login.js
document.addEventListener("DOMContentLoaded", () => {

  // Delegated listener for login form
  document.addEventListener("submit", async (e) => {
    if (e.target && e.target.id === "login-form-inline") {
      e.preventDefault();

      const email = document.getElementById("email-inline")?.value.trim();
      const password = document.getElementById("password-inline")?.value;

      if (!email || !password) {
        console.warn("[login.js] Missing email or password");
        alert("Please enter both email and password.");
        return;
      }

      try {
        const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);

        // Close dropdown
        const dropdown = document.getElementById("login-dropdown");
        if (dropdown) {
          dropdown.classList.remove("show");
        }

        // Redirect
        window.location.assign("/dashboard");
      } catch (err) {
        console.error("[login.js] Firebase login error:", err);
        alert(err.message);
      }
    }
  });

  // Handle case where user is already signed in but clicks "Login"
  document.addEventListener("click", (e) => {
    const loginToggle = e.target.closest("#login-toggle");
    if (!loginToggle) return;

    const user = firebase.auth().currentUser;

    if (user) {
      e.preventDefault();
      window.location.assign("/dashboard");
    }
  });
});
