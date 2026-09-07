// =========================
// MENU MOBILE PREMIUM
// =========================

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

// Ouvrir / Fermer
menuBtn.addEventListener("click", (e) => {

    e.stopPropagation();

    sidebar.classList.toggle("show");

});

// Fermer si clic en dehors
document.addEventListener("click", (e) => {

    if (
        !sidebar.contains(e.target) &&
        !menuBtn.contains(e.target)
    ) {
        sidebar.classList.remove("show");
    }

});

// Fermer après clic sur un lien
document.querySelectorAll(".sidebar-menu a")
.forEach(link => {

    link.addEventListener("click", () => {

        if(window.innerWidth <= 768){
            sidebar.classList.remove("show");
        }

    });

});

// Fermer si écran repasse desktop
window.addEventListener("resize", () => {

    if(window.innerWidth > 768){
        sidebar.classList.remove("show");
    }

});


// =========================
// COMPTEURS
// =========================

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

    const updateCounter = () => {

        const target = +counter.dataset.target;
        const current = +counter.innerText;

        const increment = target / 80;

        if(current < target){

            counter.innerText =
                Math.ceil(current + increment);

            setTimeout(updateCounter,20);

        }else{

            counter.innerText = target;

        }

    };

    updateCounter();

});