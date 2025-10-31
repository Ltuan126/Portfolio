// ===== Scroll To Top Button =====
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
if (scrollToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.style.display = 'block';
    } else {
      scrollToTopBtn.style.display = 'none';
    }
  }, { passive: true });
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
// Smooth scrolling for nav links
const navLinks = Array.from(document.querySelectorAll('.nav a[href^="#"]'));
navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const section = document.querySelector(this.getAttribute('href'));
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Highlight active nav link on scroll (throttled)
const sections = Array.from(document.querySelectorAll('section[id]'));
const allNavLinks = Array.from(document.querySelectorAll('.nav a'));
const navLookup = new Map(allNavLinks.map(link => [link.getAttribute('href'), link]));
const sectionLinkMap = new Map();
const scheduleFrame = typeof window !== 'undefined' && window.requestAnimationFrame
  ? (cb) => window.requestAnimationFrame(cb)
  : (cb) => setTimeout(cb, 16);

sections.forEach(section => {
  const target = navLookup.get(`#${section.id}`);
  if (target) sectionLinkMap.set(section, target);
});

let activeNavLink = null;
let navTicking = false;

function setActiveNav(link) {
  if (activeNavLink === link) return;
  if (activeNavLink) activeNavLink.classList.remove('active');
  if (link) link.classList.add('active');
  activeNavLink = link || null;
}

function updateActiveNav() {
  const marker = window.innerHeight * 0.28;
  let nextActive = null;

  for (const section of sectionLinkMap.keys()) {
    const rect = section.getBoundingClientRect();
    if (rect.top <= marker && rect.bottom > marker) {
      nextActive = sectionLinkMap.get(section);
      break;
    }
  }

  setActiveNav(nextActive);
}

function handleNavScroll() {
  if (navTicking) return;
  navTicking = true;
  scheduleFrame(() => {
    updateActiveNav();
    navTicking = false;
  });
}

if (sectionLinkMap.size) {
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();
}

// === Theme toggle + Logo swap + Section class toggle ===
const toggleBtn = document.getElementById('toggle-theme');
const logoImg = document.getElementById('site-logo');

function updateSectionTheme(isLight) {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.classList.toggle('section-light', isLight);
    section.classList.toggle('section-dark', !isLight);
  });
}

if (toggleBtn && logoImg) {
  toggleBtn.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');

    logoImg.src = isLight ? './images/light.png' : './images/Tlogo.png';
    updateSectionTheme(isLight);
  });
}

// Load theme from localStorage
window.addEventListener('DOMContentLoaded', () => {
  const isLight = localStorage.getItem('theme') === 'light';
  if (isLight) document.body.classList.add('light-mode');

  if (logoImg) {
    logoImg.src = isLight ? './images/light.png' : './images/Tlogo.png';
  }
  updateSectionTheme(isLight);
});

// Reveal effect on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal-visible");
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll("section").forEach(section => {
  section.classList.add("reveal");
  observer.observe(section);
});

// Slide in (legacy selectors) — safe guard when elements are removed
const aboutText = document.querySelector('.about-text');
const aboutInterests = document.querySelector('.about-interests');
if (aboutText || aboutInterests) {
  const aboutObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('about-text')) {
          entry.target.classList.add('slide-left', 'delay-100');
        } else if (entry.target.classList.contains('about-interests')) {
          setTimeout(() => {
            entry.target.classList.add('slide-right', 'delay-200');
          }, 100);
        }
      }
    });
  }, { threshold: 0.3 });
  if (aboutText) aboutObserver.observe(aboutText);
  if (aboutInterests) aboutObserver.observe(aboutInterests);
}

// Staggered skill-item animation when scrolling to skill section
const skillItems = document.querySelectorAll('.skill-item');
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-skill');
    }
  });
}, { threshold: 0.2 });

skillItems.forEach(item => {
  skillObserver.observe(item);
});

window.addEventListener("DOMContentLoaded", () => {
  const quote = document.getElementById("intro-quote");
  if (!quote) return;
  const fullText = '"Being a developer isn’t about knowing everything—it’s about learning quickly, adapting constantly, and delivering with purpose."';
  quote.textContent = '';
  quote.classList.add('typing');
  let i = 0;
  const speed = 28;
  (function typeWriter(){
    if (i < fullText.length) {
      quote.textContent += fullText[i++];
      setTimeout(typeWriter, speed);
    } else {
      quote.classList.remove('typing');
      quote.classList.add('done');
    }
  })();
});

// ===== Scroll Progress Bar Effect =====
// Throttle scroll progress with rAF
(() => {
  const scrollProgress = document.getElementById('scroll-progress');
  if (!scrollProgress) return;
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      scheduleFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        scrollProgress.style.width = scrolled + '%';
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
