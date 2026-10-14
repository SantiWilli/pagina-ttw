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
    card.className = "speaker reveal";
    card.innerHTML = `
      <span class="speaker__avatar" aria-hidden="true">10</span>
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
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;

  // Stagger: demoras escalonadas dentro de cada grilla y del CTA
  document.querySelectorAll(".cards, .sponsors, .speakers").forEach((grid) => {
    Array.from(grid.children).forEach((el, i) => {
      el.style.setProperty("--reveal-delay", `${Math.min(i * 90, 360)}ms`);
    });
  });
  document.querySelectorAll(".cta .reveal").forEach((el, i) => {
    el.style.setProperty("--reveal-delay", `${i * 110}ms`);
  });

  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  els.forEach((el) => observer.observe(el));
}

// Messi incentiva con su repertorio clásico 💬
const frases = [
  "¿Qué mirás, bobo? ¡Inscribite!",
  "¡Andá pa' allá... pa' Tandil!",
  "¡Vamos carajo! Nos vemos el 15",
  "¡Cómetela, es gratis!",
  "¡Vení pa' ca' que hay networking!",
  "¿Qué hacés en tu casa? ¡Vení!",
  "¡Dale, que el cupo vuela!",
  "¡Vamo' vamo'! Te espero el 15",
];

function initMessi() {
  const sprite = document.querySelector(".messi");
  const bubble = document.querySelector(".bubble");
  const ball = document.querySelector(".ball");
  if (!sprite || !bubble) return;

  let i = 0;
  let juggleTimer = null;

  const show = (idx) => {
    bubble.textContent = frases[((idx % frases.length) + frases.length) % frases.length];
    bubble.classList.remove("is-pop");
    void bubble.offsetWidth; // reinicia la animación
    bubble.classList.add("is-pop");
  };

  // Jueguitos: la pelota aparece al clickear y vive mientras el clic sea reciente
  const juggle = () => {
    sprite.classList.add("is-juggling");
    if (ball) ball.classList.add("is-live");
    clearTimeout(juggleTimer);
    juggleTimer = setTimeout(() => {
      sprite.classList.remove("is-juggling");
      if (ball) ball.classList.remove("is-live");
    }, 2600);
  };

  const activate = () => {
    i += 1;
    show(i);
    sprite.classList.remove("is-jump");
    void sprite.offsetWidth;
    sprite.classList.add("is-jump");
    juggle();
  };

  show(0);
  setInterval(() => show(++i), 4000);

  sprite.addEventListener("click", activate);
  sprite.addEventListener("animationend", () => sprite.classList.remove("is-jump"));
}

// Confetti albiceleste cayendo en el hero
function initConfetti() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const box = document.querySelector(".confetti");
  if (!box) return;

  const colors = ["#75aadb", "#ffffff", "#f6b40e"];
  for (let i = 0; i < 16; i++) {
    const p = document.createElement("span");
    const size = 5 + Math.random() * 6;
    p.style.cssText = [
      `left:${(Math.random() * 100).toFixed(1)}%`,
      `width:${size.toFixed(0)}px`,
      `height:${(size * (Math.random() > 0.5 ? 1 : 1.6)).toFixed(0)}px`,
      `background:${colors[i % colors.length]}`,
      `border-radius:${Math.random() > 0.5 ? "50%" : "2px"}`,
      `animation-duration:${(7 + Math.random() * 8).toFixed(1)}s`,
      `animation-delay:${(-Math.random() * 10).toFixed(1)}s`,
      `opacity:${(0.4 + Math.random() * 0.4).toFixed(2)}`,
    ].join(";");
    box.appendChild(p);
  }
}

function initNavScroll() {
  const nav = document.querySelector(".nav");
  if (!nav) return;
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initProgress() {
  const bar = document.querySelector(".progress");
  if (!bar) return;
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

document.addEventListener("DOMContentLoaded", () => {
  renderSpeakers();
  initNav();
  initReveal();
  initMessi();
  initConfetti();
  initNavScroll();
  initProgress();
});
