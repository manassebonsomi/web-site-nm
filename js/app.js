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

  if(loader){
    loader.classList.add("hide");
  }

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
   HERO SLIDER
========================= */

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

let currentSlide = 0;

/* SHOW SLIDE */

function showSlide(index){

  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  dots.forEach((dot) => {
    dot.classList.remove("active");
  });

  slides[index].classList.add("active");
  dots[index].classList.add("active");

}

/* NEXT SLIDE */

function nextSlide(){

  currentSlide++;

  if(currentSlide >= slides.length){
    currentSlide = 0;
  }

  showSlide(currentSlide);

}

/* PREV SLIDE */

function prevSlide(){

  currentSlide--;

  if(currentSlide < 0){
    currentSlide = slides.length - 1;
  }

  showSlide(currentSlide);

}

/* AUTO SLIDE */

setInterval(() => {

  nextSlide();

}, 5000);

/* BUTTON EVENTS */

nextBtn.addEventListener("click", nextSlide);

prevBtn.addEventListener("click", prevSlide);

/* DOT EVENTS */

dots.forEach((dot, index) => {

  dot.addEventListener("click", () => {

    currentSlide = index;

    showSlide(currentSlide);

  });

});

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

// FILTER SYSTEM
const filters = document.querySelectorAll(".filter");
const items = document.querySelectorAll(".gal-item");

filters.forEach(btn => {
  btn.addEventListener("click", () => {

    filters.forEach(f => f.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    items.forEach(item => {

      if(filter === "all"){
        item.classList.remove("hide");
      } else {
        if(item.classList.contains(filter)){
          item.classList.remove("hide");
        } else {
          item.classList.add("hide");
        }
      }

    });

  });
});


// LIGHTBOX
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

  document.querySelectorAll(".gal-item img").forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
    });
  });

  document.querySelector(".lightbox .close").addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  lightbox.addEventListener("click", (e) => {
    if(e.target === lightbox){
      lightbox.style.display = "none";
    }
  });

  const newsBtns = document.querySelectorAll(".news-btn");
  const newsCards = document.querySelectorAll(".news-card");

  newsBtns.forEach(btn => {
    btn.addEventListener("click", () => {

      newsBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      newsCards.forEach(card => {

        if(filter === "all"){
          card.classList.remove("hide");
        } else {
          if(card.classList.contains(filter)){
            card.classList.remove("hide");
          } else {
            card.classList.add("hide");
          }
        }

      });

    });
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