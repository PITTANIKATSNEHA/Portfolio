// ===== Typewriter + blinking roles =====
const roles = [
  "Snowflake developer",
  "Data Engineer",
  "Gen AI Enthusiast"
];
const el = document.querySelector(".roles__text");
const cursor = document.querySelector(".cursor");

let roleIdx = 0, charIdx = 0, deleting = false;

function tick() {
  const full = roles[roleIdx];

  if (!deleting) {
    charIdx++;
    if (charIdx === full.length + 1) {
      deleting = true;
      setTimeout(tick, 900); // pause at full word
      return;
    }
  } else {
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }
  }

  el.textContent = full.substring(0, charIdx);
  setTimeout(tick, deleting ? 60 : 90);
}
tick();

// ===== Smooth scroll (prevent jump) =====
document.querySelectorAll('.nav__link').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== Active link on scroll (green) =====
const sections = [...document.querySelectorAll('section')];
const links = [...document.querySelectorAll('.nav__link')];

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
    }
  });
}, { root: null, rootMargin: '-45% 0px -45% 0px', threshold: 0 });

sections.forEach(sec => observer.observe(sec));

// ==== project =====
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");

    const category = btn.getAttribute("data-filter");

    projectCards.forEach(card => {
      if (category === "all" || card.dataset.category === category) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});
