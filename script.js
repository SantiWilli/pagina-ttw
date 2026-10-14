const speakers = [
  { name: "Próximamente", role: "Founder" },
  { name: "Próximamente", role: "Venture Capital" },
  { name: "Próximamente", role: "Producto" },
  { name: "Próximamente", role: "Ciencia & Bio" },
  { name: "Próximamente", role: "Software & AI" },
  { name: "Próximamente", role: "Comunidad" },
];

function renderSpeakers() {
  const grid = document.getElementById("speakers-grid");
  if (!grid) return;
  const frag = document.createDocumentFragment();
  speakers.forEach((s) => {
    const card = document.createElement("article");
    card.className = "speaker";
    card.innerHTML = `
      <span class="speaker__avatar" aria-hidden="true">?</span>
      <span class="speaker__name">${s.name}</span>
      <span class="speaker__role">${s.role}</span>
    `;
    frag.appendChild(card);
  });
  grid.appendChild(frag);
}

function initNav() {
  const toggle = document.querySelector(".nav__toggle");
  const links = document.querySelector(".nav__links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initReveal() {
  const targets = document.querySelectorAll(".section, .cta");
  if (!("IntersectionObserver" in window)) return;

  targets.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach((el) => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  renderSpeakers();
  initNav();
  initReveal();
});
