/* =========================
   GALLERY FILTER SYSTEM
========================= */

document.addEventListener("DOMContentLoaded", () => {

  // BUTTONS
  const filterButtons = document.querySelectorAll(".filter");

  // ITEMS
  const galleryItems = document.querySelectorAll(".gal-item");

  // CHECK
  if(filterButtons.length === 0 || galleryItems.length === 0){
    return;
  }

  // FILTER CLICK
  filterButtons.forEach(button => {

    button.addEventListener("click", () => {

      // REMOVE ACTIVE
      filterButtons.forEach(btn => {
        btn.classList.remove("active");
      });

      // ADD ACTIVE
      button.classList.add("active");

      // GET FILTER
      const filterValue = button.getAttribute("data-filter");

      // LOOP ITEMS
      galleryItems.forEach(item => {

        // SHOW ALL
        if(filterValue === "all"){

          item.style.display = "block";

          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 100);

        }else{

          // MATCH
          if(item.classList.contains(filterValue)){

            item.style.display = "block";

            setTimeout(() => {
              item.style.opacity = "1";
              item.style.transform = "scale(1)";
            }, 100);

          }else{

            item.style.opacity = "0";
            item.style.transform = "scale(0.8)";

            setTimeout(() => {
              item.style.display = "none";
            }, 300);

          }

        }

      });

    });

  });

});

// NEWSLETTER SUBSCRIPTION (GOOGLE SHEETS)
document.getElementById("newsletter-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const emailInput = document.getElementById("newsletter-email");
    const message = document.getElementById("newsletter-message");

    const email = emailInput.value.trim();

    if (!email || !email.includes("@")) {
        message.innerHTML = "❌ Veuillez saisir une adresse email valide.";
        return;
    }

    if (!email || email.length < 5 || !email.includes("@")) {
    message.innerHTML = "❌ Email invalide.";
    return;
    } 

    message.innerHTML = "⏳ Inscription en cours...";

    const url = "https://script.google.com/macros/s/AKfycbwu-jQ_LJdltLMd-UpupReB4lbwmQ-hPOLSNL3cjekjIIDufWho3JmR0noWz6Fda-D3YQ/exec";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify({
                email: email
            })
        });

        const result = await response.text();

        if (result.trim() === "OK") {
            message.innerHTML = "✅ Inscription réussie !";
            document.getElementById("newsletter-form").reset();
        } else {
            console.error("Réponse Apps Script :", result);
            message.innerHTML = "❌ Erreur lors de l'inscription.";
        }

    } catch (error) {
        console.error("Erreur Fetch :", error);
        message.innerHTML = "❌ Impossible de contacter le serveur.";
    }
});