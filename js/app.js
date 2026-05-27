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
  const target = +counter.getAttribute("data-target");
  let count = 0;
  const speed = target / 120;

  const update = () => {
    count += speed;

    if (count < target) {
      counter.textContent = Math.floor(count);
      requestAnimationFrame(update);
    } else {
      counter.textContent = target.toLocaleString();
    }
  };

  update();
}

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {
  animateCounter(counter);
}); 

/* const counterSection = document.querySelector(".about");

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {

      const counters = document.querySelectorAll(".counter");

      counters.forEach(counter => {
        animateCounter(counter);
      });

      observer.disconnect(); // exécute une seule fois
    }
  });
}, {
  threshold: 0.5
});

if (counterSection) {
  observer.observe(counterSection);
} */


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


/* =========================
   NEWSLETTER SYSTEM
========================= */

const newsletterForm = document.getElementById("newsletter-form");

if(newsletterForm){

  newsletterForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const emailInput = document.getElementById("newsletter-email");

    const message = document.getElementById("newsletter-message");

    const email = emailInput.value.trim();

    if(email === "") return;

    // SAVE LOCAL STORAGE
    let subscribers = JSON.parse(localStorage.getItem("subscribers")) || [];

    subscribers.push(email);

    localStorage.setItem("subscribers", JSON.stringify(subscribers));

    message.innerHTML = `
      Merci pour votre abonnement !
    `;

    emailInput.value = "";

    setTimeout(() => {
      message.innerHTML = "";
    }, 4000);

  });

}


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
  const part2 = "977";
  const part3 = "695801";

  const number = part1 + part2 + part3;

  const url = "https://wa.me/" + number;
  window.open(url, "_blank");
}); */

document.getElementById("whatsappBtn").addEventListener("click", function (e) {
  e.preventDefault();

  setTimeout(() => {
    const number = ["243","977","695801"].join("");
    window.open("https://wa.me/" + number, "_blank");
  }, 300);
});

document.getElementById("emailBtn").addEventListener("click", function (e) {
  e.preventDefault();

  const user = "contact";
  const domain = "norbertinematanda.cd";

  window.location.href = "mailto:" + user + "@" + domain;
});

document.addEventListener("contextmenu", e => {
  e.preventDefault();
});

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


setInterval(() => {

  const devtoolsOpen =
    window.outerWidth - window.innerWidth > 160 ||
    window.outerHeight - window.innerHeight > 160;

  if (devtoolsOpen) {

    document.body.innerHTML = `
      <div style="
        height:100vh;
        display:flex;
        justify-content:center;
        align-items:center;
        background:#000;
        color:#fff;
        font-size:30px;
        font-family:sans-serif;
      ">
        Inspection non autorisée
      </div>
    `;

  }

}, 1000);


/* setInterval(() => {

  const devtools =
    window.outerWidth - window.innerWidth > 160;

  if (devtools) {
    window.location.href = "about:blank";
  }

}, 1000); */