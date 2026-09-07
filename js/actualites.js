/* =========================
   FILTRAGE ACTUALITÉS
========================= */

document.addEventListener("DOMContentLoaded", () => {

  // BOUTONS FILTRES
  const filterButtons = document.querySelectorAll(".news-btn");

  // CARTES ACTUALITÉS
  const newsCards = document.querySelectorAll(".news-card");

  // VÉRIFICATION
  if(filterButtons.length === 0 || newsCards.length === 0){
    return;
  }

  // ÉVÉNEMENTS
  filterButtons.forEach(button => {

    button.addEventListener("click", () => {

      // ACTIVE BUTTON
      filterButtons.forEach(btn => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      // RÉCUPÉRATION DU FILTRE
      const filter = button.getAttribute("data-filter");

      // FILTRAGE
      newsCards.forEach(card => {

        if(filter === "all"){

          card.style.display = "block";

          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 100);

        }else{

          if(card.classList.contains(filter)){

            card.style.display = "block";

            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "scale(1)";
            }, 100);

          }else{

            card.style.opacity = "0";
            card.style.transform = "scale(0.8)";

            setTimeout(() => {
              card.style.display = "none";
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





/* const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzeqM1HMlNLPBEpWZM5WnJ57fR0XZmD48w8OeryKCcpOgqiV_EDJwqr1XeMJOAJGguPpQ/exec";

const newsContainer = document.getElementById("newsContainer");

async function loadPublicNews() {

    try {

        const response = await fetch(SCRIPT_URL + "?action=getNews");

        const data = await response.json();

        if (!Array.isArray(data)) {
            console.error("Format invalide API:", data);
            return;
        }

        newsContainer.innerHTML = "";

        data.forEach(news => {

            const article = document.createElement("article");

            article.className = "news-card social";

            article.innerHTML = `
                <img src="${news.image}" loading="lazy" alt="${news.title}">
                
                <div class="news-content">

                    <span>${news.date}</span>

                    <h3>${news.title}</h3>

                    <p>${news.content.substring(0, 120)}...</p>

                    <a href="actualite-detail.html?id=${news.id}">
                        Lire plus
                    </a>

                </div>
            `;

            newsContainer.appendChild(article);
        });

    } catch (error) {
        console.error("Erreur chargement news:", error);
    }
}

loadPublicNews(); */