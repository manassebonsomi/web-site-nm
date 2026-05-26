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
   GALLERY FILTER SYSTEM
========================= */

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

      }else{

        if(item.classList.contains(filter)){
          item.classList.remove("hide");
        }else{
          item.classList.add("hide");
        }

      }

    });

  });

});

/* =========================
   LIGHTBOX + SLIDER
========================= */

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

const galleryImages = document.querySelectorAll(".gal-item img");

const prev = document.querySelector(".lightbox-prev");
const next = document.querySelector(".lightbox-next");

let currentImage = 0;

/* OPEN LIGHTBOX */

galleryImages.forEach((img, index) => {

  img.addEventListener("click", () => {

    currentImage = index;

    showImage();

    lightbox.style.display = "flex";

  });

});

/* SHOW IMAGE */

function showImage(){

  lightboxImg.src = galleryImages[currentImage].src;

}

/* NEXT */

next.addEventListener("click", () => {

  currentImage++;

  if(currentImage >= galleryImages.length){
    currentImage = 0;
  }

  showImage();

});

/* PREV */

prev.addEventListener("click", () => {

  currentImage--;

  if(currentImage < 0){
    currentImage = galleryImages.length - 1;
  }

  showImage();

});

/* CLOSE */

document.querySelector(".close").addEventListener("click", () => {

  lightbox.style.display = "none";

});

/* CLOSE ON BACKGROUND */

lightbox.addEventListener("click", (e) => {

  if(e.target === lightbox){
    lightbox.style.display = "none";
  }

});