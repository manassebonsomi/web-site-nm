const menuBtn = document.getElementById("menu-btn");
const navbar = document.getElementById("navbar");
const header = document.querySelector(".header");
const scrollTop = document.getElementById("scroll-top");
const loader = document.querySelector(".loader");

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");

const progressBar = document.querySelector(".progress-bar");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrolled = (scrollTop / docHeight) * 100;

  progressBar.style.width = scrolled + "%";
});

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop;

    if (pageYOffset >= sectionTop - 100) {
      current = section.getAttribute("class");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });

});


/* =========================
   LOADER
========================= */

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  setTimeout(() => {
    loader.classList.add("hide");
  }, 2500);
});

/* =========================
   MOBILE MENU
========================= */

if(menuBtn){

  menuBtn.addEventListener("click", () => {
    navbar.classList.toggle("active");
  });

}

/* =========================
   HEADER SCROLL
========================= */

window.addEventListener("scroll", () => {

  if(header){
    header.classList.toggle("scrolled", window.scrollY > 50);
  }

  if(scrollTop){

    if(window.scrollY > 300){
      scrollTop.classList.add("active");
    }else{
      scrollTop.classList.remove("active");
    }

  }

});


/* =========================
   SCROLL TOP BUTTON
========================= */

const scrollBtn = document.getElementById("scroll-top");

/* SHOW BUTTON */

window.addEventListener("scroll", () => {

  if(window.pageYOffset > 200){

    scrollBtn.style.display = "flex";

  }else{

    scrollBtn.style.display = "none";

  }

});

/* SCROLL TO TOP */

scrollBtn.addEventListener("click", () => {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});



/* =========================
   COUNTER ANIMATION
========================= */

function animateCounter(counter) {

  const target = parseInt(counter.dataset.target);
  let current = 0;

  const increment = target / 100;

  const updateCounter = () => {

    current += increment;

    if(current < target){

      counter.innerText = Math.ceil(current).toLocaleString();

      requestAnimationFrame(updateCounter);

    }else{

      counter.innerText = target.toLocaleString();

    }

  };

  updateCounter();

}

/* =========================
   INTERSECTION OBSERVER
========================= */

const counterSection = document.querySelector(".about");

if(counterSection){

  const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if(entry.isIntersecting){

        document.querySelectorAll(".counter").forEach(counter => {

          // Remise à zéro avant animation
          counter.innerText = "0";

          animateCounter(counter);

        });

      }

    });

  }, {
    threshold: 0.5
  });

  observer.observe(counterSection);

}


/* =========================
   SCROLL REVEAL
========================= */

if(typeof ScrollReveal !== "undefined"){

  ScrollReveal().reveal('.hero-content', {
    delay:200,
    distance:'60px',
    origin:'left',
    duration:1500
  });

  ScrollReveal().reveal('.hero-image', {
    delay:400,
    distance:'60px',
    origin:'right',
    duration:1500
  });

  ScrollReveal().reveal('.about-container', {
    delay:200,
    distance:'60px',
    origin:'bottom',
    duration:1500
  });

  ScrollReveal().reveal('.action-card', {
    delay:200,
    interval:200,
    distance:'60px',
    origin:'bottom',
    duration:1500
  });

  ScrollReveal().reveal('.vision-card', {
    delay:200,
    interval:200,
    distance:'60px',
    origin:'bottom',
    duration:1500
  });

  ScrollReveal().reveal('.gallery-item', {
    delay:200,
    interval:200,
    distance:'60px',
    origin:'bottom',
    duration:1500
  });

  ScrollReveal().reveal('.news-card', {
    delay:200,
    interval:200,
    distance:'60px',
    origin:'bottom',
    duration:1500
  });

}



/* =========================
   TIMELINE ANIMATION
========================= */

ScrollReveal().reveal('.timeline-item', {

  delay:200,
  interval:200,
  distance:'80px',
  origin:'bottom',
  duration:1500

});

ScrollReveal().reveal('.bio-container, .timeline .item, .vision-card', {
  delay:200,
  distance:'60px',
  origin:'bottom',
  duration:1200
});

ScrollReveal().reveal('.gal-item', {
  delay:200,
  interval:100,
  distance:'50px',
  origin:'bottom',
  duration:1200
});

ScrollReveal().reveal('.real-card, .t-item, .stat', {
  delay:200,
  interval:150,
  distance:'60px',
  origin:'bottom',
  duration:1200
});

ScrollReveal().reveal('.news-card', {
  delay:200,
  interval:150,
  distance:'60px',
  origin:'bottom',
  duration:1200
});


/* document.getElementById("whatsappBtn").addEventListener("click", function (e) {
  e.preventDefault();

  const part1 = "243";
  const part2 = "826";
  const part3 = "844992";

  const number = part1 + part2 + part3;

  const url = "https://wa.me/" + number;
  window.open(url, "_blank");
}); */

document.getElementById("whatsappBtn").addEventListener("click", function (e) {
  e.preventDefault();

  setTimeout(() => {
    const number = ["243","826","844992"].join("");
    window.open("https://wa.me/" + number, "_blank");
  }, 300);
});

document.getElementById("BtnWhatsapp").addEventListener("click", function (e) {
  e.preventDefault();

  setTimeout(() => {
    const number = ["243","826","844992"].join("");
    window.open("https://wa.me/" + number, "_blank");
  }, 300);
});

/* document.getElementById("emailBtn").addEventListener("click", function (e) {
  e.preventDefault();

  const user = "contact";
  const domain = "norbertinematanda.cd";

  window.location.href = "mailto:" + user + "@" + domain;
}); */


/* 
// Blocage clic droit + sélection

document.addEventListener("contextmenu", e => e.preventDefault());
document.addEventListener("selectstart", e => e.preventDefault());

// BLOQUER CERTAINES TOUCHES DEVELOPPEUR
document.addEventListener("keydown", function (e) {

  // CTRL + U
  if (e.ctrlKey && e.key.toLowerCase() === "u") {
    e.preventDefault();
  }

  // CTRL + SHIFT + I
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i") {
    e.preventDefault();
  }

  // CTRL + SHIFT + J
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "j") {
    e.preventDefault();
  }

  // CTRL + SHIFT + C
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "c") {
    e.preventDefault();
  }

  // F12
  if (e.key === "F12") {
    e.preventDefault();
  }

});

// Détection DevTools (version avancée)

setInterval(() => {

  const threshold = 160;

  const devtoolsOpen =
    window.outerWidth - window.innerWidth > threshold ||
    window.outerHeight - window.innerHeight > threshold;

  if (devtoolsOpen) {
    document.body.innerHTML = `
      <div style="
        height:100vh;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        background:linear-gradient(135deg,#000,#111);
        color:#fff;
        font-family:sans-serif;
        text-align:center;
      ">
        <h1>⚠ Accès non autorisé</h1>
        <p>Veuillez fermer les outils de développement</p>
      </div>
    `;
  }

}, 1000);

// Protection anti-debug (console trap)

(function () {
  const devtools = /./;
  devtools.toString = function () {
    throw "Inspection bloquée";
  };

  console.log("%c", devtools);
})();


// Détection comportementale (anti-bot simple)

let mouseMoves = 0;

document.addEventListener("mousemove", () => {
  mouseMoves++;
});

setTimeout(() => {
  if (mouseMoves < 5) {
    document.body.style.display = "none";
  }
}, 3000);

// Protection anti-copie du site

document.addEventListener("copy", e => e.preventDefault());
document.addEventListener("cut", e => e.preventDefault());
document.addEventListener("paste", e => e.preventDefault());

// Protection mobile DevTools simple
if (/Android|iPhone|iPad/i.test(navigator.userAgent)) {
  document.addEventListener("contextmenu", e => e.preventDefault());
}

// Mode sécurité active (overlay invisible)

const overlay = document.createElement("div");

overlay.style.position = "fixed";
overlay.style.top = "0";
overlay.style.left = "0";
overlay.style.width = "100%";
overlay.style.height = "100%";
overlay.style.zIndex = "999999";
overlay.style.pointerEvents = "none";

document.body.appendChild(overlay);

*/