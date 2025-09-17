document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signup-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form["name"].value.trim();
    const email = form["email"].value.trim();
    const password = form["password"].value;
    const phone = form["phone"].value.trim();
    const company = form["company"].value.trim();
    const industry = form["industry"].value.trim();
    const project = form["project"].value.trim();
    const referral = form["referral"].value.trim();

    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
      alert("Password must be at least 8 characters, include 1 number and 1 special character.");
      return;
    }

    try {
      const auth = firebase.auth();
      const db = firebase.firestore();

      const userCred = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCred.user;

      await db.collection("users").doc(user.uid).set({
        name,
        email,
        phone,
        company,
        industry,
        project,
        referral,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });

      alert("Account created successfully!");
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Signup error:", error);
      alert(error.message);
    }
  });
});
