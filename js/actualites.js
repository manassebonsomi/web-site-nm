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