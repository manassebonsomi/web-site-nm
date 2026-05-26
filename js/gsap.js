gsap.registerPlugin(ScrollTrigger);

// HERO animation
gsap.from(".slide-content h1", {
  y: 80,
  opacity: 0,
  duration: 1,
  delay: 0.3
});

gsap.from(".slide-content p", {
  y: 50,
  opacity: 0,
  duration: 1,
  delay: 0.5
});

gsap.from(".slide-content span", {
  scale: 0.8,
  opacity: 0,
  duration: 0.8
});

gsap.utils.toArray("section").forEach((section) => {
  gsap.from(section, {
    opacity: 0,
    y: 60,
    duration: 1,
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
    }
  });
});

gsap.utils.toArray(".action-card, .news-card, .vision-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    gsap.to(card, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out"
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      scale: 1,
      duration: 0.3
    });
  });
});

gsap.to(".slide img", {
  scale: 1.1,
  scrollTrigger: {
    trigger: ".hero",
    scrub: true
  }
});

gsap.from(".real-hero-content h1", {
  y: 50,
  opacity: 0,
  duration: 1
});

gsap.from(".stat", {
  scrollTrigger: ".real-stats",
  y: 60,
  opacity: 0,
  stagger: 0.2
});

gsap.from(".real-card", {
  scrollTrigger: ".real-grid",
  scale: 0.8,
  opacity: 0,
  stagger: 0.2
});