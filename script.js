gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ===== Initial states (tránh flash trước khi GSAP chạy) ===== */
gsap.set("[data-animate='hero']", { autoAlpha: 0, y: 40 });
gsap.set("[data-animate='nav']", { autoAlpha: 0, y: -16 });
gsap.set("[data-animate='hero-visual']", { autoAlpha: 0, scale: 0.85 });
gsap.set(".floating-badge", { autoAlpha: 0, scale: 0 });
gsap.set("[data-scroll]", { autoAlpha: 0, y: 50 });

/* ===== Cursor glow ===== */
const cursorGlow = document.querySelector(".cursor-glow");

if (cursorGlow && !prefersReducedMotion) {
  gsap.set(cursorGlow, { xPercent: -50, yPercent: -50 });

  window.addEventListener("mousemove", (e) => {
    gsap.to(cursorGlow, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.8,
      ease: "power2.out",
      overwrite: "auto",
    });
  });
}

/* ===== Header scroll ===== */
const header = document.querySelector(".header");

ScrollTrigger.create({
  start: 80,
  onUpdate: (self) => {
    header.classList.toggle("scrolled", self.scroll() > 80);
  },
});

/* ===== Hero entrance timeline ===== */
function initHeroAnimation() {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.to("[data-animate='nav']", {
    autoAlpha: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.08,
  })
    .to(
      "[data-animate='hero']",
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
      },
      "-=0.3"
    )
    .to(
      "[data-animate='hero-visual']",
      {
        autoAlpha: 1,
        scale: 1,
        duration: 1,
        ease: "back.out(1.4)",
      },
      "-=0.5"
    )
    .to(
      ".floating-badge",
      {
        autoAlpha: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(2)",
      },
      "-=0.4"
    );

  if (!prefersReducedMotion) {
    gsap.to(".avatar-ring", {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none",
    });

    gsap.to(".badge-1", {
      y: -12,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(".badge-2", {
      y: 12,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.5,
    });
  }

  return tl;
}

/* ===== Counter animation ===== */
function animateCounters() {
  document.querySelectorAll(".stat-number").forEach((el) => {
    const target = parseInt(el.dataset.count, 10);

    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(el, {
          innerText: target,
          duration: 2,
          snap: { innerText: 1 },
          ease: "power2.out",
        });
      },
    });
  });
}

/* ===== Scroll reveal ===== */
function initScrollAnimations() {
  gsap.utils.toArray("[data-scroll]").forEach((el) => {
    gsap.to(el, {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none reverse",
      },
    });
  });
}

/* ===== Skill bars ===== */
function initSkillBars() {
  document.querySelectorAll(".skill-fill").forEach((bar) => {
    const width = bar.dataset.width;

    gsap.to(bar, {
      width: `${width}%`,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: bar,
        start: "top 90%",
        once: true,
      },
    });
  });
}

/* ===== Timeline marker animation ===== */
function initTimelineAnimation() {
  document.querySelectorAll(".timeline-marker").forEach((marker) => {
    gsap.from(marker, {
      scale: 0,
      duration: 0.5,
      ease: "back.out(2)",
      scrollTrigger: {
        trigger: marker,
        start: "top 88%",
        once: true,
      },
    });
  });
}

/* ===== Project cards hover ===== */
function initProjectHover() {
  if (prefersReducedMotion) return;

  document.querySelectorAll(".project-card, .timeline-content, .education-card, .about-me-grid").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        y: -8,
        duration: 0.35,
        ease: "power2.out",
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        y: 0,
        duration: 0.35,
        ease: "power2.out",
      });
    });
  });
}

/* ===== Skill tags stagger on scroll ===== */
function initTagAnimation() {
  const tags = document.querySelectorAll(".skill-tags .tag");

  gsap.from(tags, {
    autoAlpha: 0,
    scale: 0.8,
    duration: 0.5,
    stagger: 0.06,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: ".skill-tags",
      start: "top 85%",
      once: true,
    },
  });
}

/* ===== Section title line reveal ===== */
function initSectionTitles() {
  document.querySelectorAll(".section-title").forEach((title) => {
    gsap.from(title, {
      x: -30,
      autoAlpha: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: title,
        start: "top 88%",
        once: true,
      },
    });
  });
}

/* ===== Mobile menu ===== */
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.classList.toggle("active", isOpen);
  menuToggle.setAttribute("aria-expanded", isOpen);
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

/* ===== Smooth anchor scroll ===== */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const targetId = anchor.getAttribute("href");
    if (targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    gsap.to(window, {
      duration: 1,
      scrollTo: { y: target, offsetY: 80 },
      ease: "power3.inOut",
    });
  });
});

/* ===== Form submit (demo) ===== */
document.querySelector(".contact-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const btn = e.target.querySelector('button[type="submit"]');
  const originalText = btn.textContent;

  gsap.to(btn, {
    scale: 0.95,
    duration: 0.1,
    yoyo: true,
    repeat: 1,
    onComplete: () => {
      btn.textContent = "Đã gửi! ✓";
      btn.style.background = "#4ade80";

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = "";
        e.target.reset();
      }, 2500);
    },
  });
});

/* ===== Gallery ===== */
const galleryImages = [
  "images/2.jpg",
  "images/3.jpg",
  "images/4.jpg",
  "images/5.jpg",
];

let currentImageIndex = 0;

function initGallery() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCounter = document.getElementById("lightbox-counter");
  const closeBtn = lightbox.querySelector(".lightbox-close");
  const prevBtn = lightbox.querySelector(".lightbox-prev");
  const nextBtn = lightbox.querySelector(".lightbox-next");

  function openLightbox(index) {
    currentImageIndex = index;
    lightboxImg.src = galleryImages[index];
    lightboxImg.alt = `Ảnh ${index + 1}`;
    lightboxCounter.textContent = `${index + 1} / ${galleryImages.length}`;
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    gsap.fromTo(
      lightboxImg,
      { scale: 0.9, autoAlpha: 0 },
      { scale: 1, autoAlpha: 1, duration: 0.4, ease: "power2.out" }
    );
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function showImage(index) {
    const next = (index + galleryImages.length) % galleryImages.length;
    currentImageIndex = next;
    lightboxImg.src = galleryImages[next];
    lightboxImg.alt = `Ảnh ${next + 1}`;
    lightboxCounter.textContent = `${next + 1} / ${galleryImages.length}`;

    gsap.fromTo(
      lightboxImg,
      { x: 20, autoAlpha: 0 },
      { x: 0, autoAlpha: 1, duration: 0.3, ease: "power2.out" }
    );
  }

  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
      openLightbox(parseInt(item.dataset.index, 10));
    });
  });

  closeBtn.addEventListener("click", closeLightbox);
  prevBtn.addEventListener("click", () => showImage(currentImageIndex - 1));
  nextBtn.addEventListener("click", () => showImage(currentImageIndex + 1));

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showImage(currentImageIndex - 1);
    if (e.key === "ArrowRight") showImage(currentImageIndex + 1);
  });

  if (!prefersReducedMotion) {
    gsap.from(".gallery-item", {
      autoAlpha: 0,
      y: 30,
      scale: 0.95,
      duration: 0.6,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".gallery-grid",
        start: "top 88%",
        once: true,
      },
    });

    document.querySelectorAll(".gallery-item").forEach((item) => {
      item.addEventListener("mouseenter", () => {
        gsap.to(item, { y: -6, duration: 0.3, ease: "power2.out" });
      });
      item.addEventListener("mouseleave", () => {
        gsap.to(item, { y: 0, duration: 0.3, ease: "power2.out" });
      });
    });
  }
}

/* ===== About me photo reveal ===== */
function initAboutMePhoto() {
  if (prefersReducedMotion) return;

  gsap.from(".about-me-photo img", {
    scale: 1.08,
    autoAlpha: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".about-me-photo",
      start: "top 85%",
      once: true,
    },
  });

  gsap.to(".about-me-photo-ring", {
    rotation: 360,
    duration: 24,
    repeat: -1,
    ease: "none",
  });
}

/* ===== Init ===== */
initGallery();

if (prefersReducedMotion) {
  gsap.set("[data-animate], [data-scroll], .floating-badge", {
    autoAlpha: 1,
    y: 0,
    scale: 1,
  });

  document.querySelectorAll(".skill-fill").forEach((bar) => {
    bar.style.width = `${bar.dataset.width}%`;
  });
} else {
  initHeroAnimation();
  initScrollAnimations();
  animateCounters();
  initSkillBars();
  initProjectHover();
  initTagAnimation();
  initSectionTitles();
  initTimelineAnimation();
  initAboutMePhoto();
}
