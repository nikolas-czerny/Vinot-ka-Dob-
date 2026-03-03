const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");
const yearEl = document.getElementById("year");
const openStatusEl = document.getElementById("openStatus");
const hoursStateEl = document.getElementById("hoursState");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Mobilní menu
if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Reveal animace
const revealEls = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealEls.forEach((el) => revealObserver.observe(el));

// Otevírací doba
function setOpenState() {
  // Pozor: sobotní čas je potřeba ověřit s majitelem.
  // Tady je placeholder: Po–Pá 9:00–18:00, So 9:00–12:00, Ne zavřeno.
  const now = new Date();

  // JS: 0 = neděle, 1 = pondělí ... 6 = sobota
  const day = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();

  let isOpen = false;
  let label = "Aktuální stav ověřte";

  if (day >= 1 && day <= 5) {
    // 9:00 - 18:00
    isOpen = minutes >= 540 && minutes < 1080;
  } else if (day === 6) {
    // 9:00 - 12:00
    isOpen = minutes >= 540 && minutes < 720;
  } else {
    isOpen = false;
  }

  if (day === 0) {
    label = "Dnes zavřeno";
  } else {
    label = isOpen ? "Právě otevřeno" : "Právě zavřeno";
  }

  if (openStatusEl) openStatusEl.textContent = label;
  if (hoursStateEl) {
    hoursStateEl.textContent = label;
    hoursStateEl.style.color = isOpen ? "#d6b26e" : "#c8bbb1";
  }
}

setOpenState();