// ===== Scroll To Top Button =====
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.style.display = 'block';
  } else {
    scrollToTopBtn.style.display = 'none';
  }
});
scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
// Smooth scrolling for nav links
const navLinks = document.querySelectorAll('.nav a[href^="#"]');
navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const section = document.querySelector(this.getAttribute('href'));
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Highlight active nav link on scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const scrollY = window.scrollY;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const navLink = document.querySelector(`.nav a[href="#${section.id}"]`);

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav a').forEach(link => link.classList.remove('active'));
      if (navLink) navLink.classList.add('active');
    }
  });
});

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

toggleBtn.addEventListener('click', () => {
  const isLight = document.body.classList.toggle('light-mode');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');

  logoImg.src = isLight ? './images/light.png' : './images/Tlogo.png';
  updateSectionTheme(isLight);
});

// Load theme from localStorage
window.addEventListener('DOMContentLoaded', () => {
  const isLight = localStorage.getItem('theme') === 'light';
  if (isLight) document.body.classList.add('light-mode');

  logoImg.src = isLight ? './images/light.png' : './images/Tlogo.png';
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
window.addEventListener('scroll', () => {
  const scrollProgress = document.getElementById('scroll-progress');
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = scrolled + '%';
});
