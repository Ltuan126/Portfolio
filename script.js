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

// Section title highlight on enter
const sectionTitles = Array.from(document.querySelectorAll('.section-title'));
if (sectionTitles.length) {
  const titleObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.45 });

  sectionTitles.forEach(title => titleObserver.observe(title));
}

// Generic reveal animations for cards and key blocks
const revealTargets = Array.from(document.querySelectorAll('.reveal, .skill-bento-card, .project-card, .certificate-item, .info-card'));
if (revealTargets.length) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });

  revealTargets.forEach(target => revealObserver.observe(target));
}

// === Language toggle (EN <-> VI) ===
const toggleBtn = document.getElementById('toggle-theme');
const translations = {
  en: {
    langLabel: 'VI',
    toggleAria: 'Switch language to Vietnamese',
    pageTitle: 'Tuan Nguyen - Portfolio',
    pageDescription: 'Tuan Nguyen - Full-Stack Developer portfolio with selected projects, technical skills, and contact details.',
    scrollTopLabel: 'Back to top',
    nav: ['Home', 'About', 'Skills', 'Projects'],
    contactBtn: 'Contact',
    downloadCv: 'Download CV',
    homeEyebrow: 'Open for internships',
    heroSubtitle: 'Full-Stack Developer',
    heroDescription: 'I design and build polished web experiences with strong front-end details, practical back-end thinking, and a focus on shipping useful products.',
    heroActions: ['See Selected Work', 'Start a Conversation'],
    heroMarquee: ['UI systems', 'React builds', 'Fast prototypes', 'API integration', 'Clean handoff'],
    heroStatsStrong: ['2+', 'Full-stack', 'UI-first'],
    heroStatsDesc: ['Featured projects', 'React, Node, Python', 'Clean, responsive interfaces'],
    heroCardBadge: 'Portfolio 2026',
    heroCardTitle: 'Building interfaces that feel premium',
    heroCardDesc: 'React-driven projects, practical API work, and thoughtful UI polish.',
    sectionEyebrows: ['About', 'Capabilities', 'Selected Work', 'Proof', 'Contact'],
    sectionTitles: [
      'A focused builder with a product mindset',
      'Skills and expertise',
      'Projects that show range and finish',
      'Certificates',
      'Get in touch'
    ],
    aboutTexts: [
      'I am an IT student who likes turning ideas into usable interfaces. My work sits at the intersection of clean design, solid implementation, and enough technical discipline to ship confidently.',
      'I am currently looking for an internship where I can contribute to real products, learn from stronger teams, and keep improving my full-stack skill set.'
    ],
    aboutCards: {
      titles: ['Education', 'Goal', 'Passion'],
      desc: [
        'University of Transport - Information Technology',
        'Become a reliable full-stack developer',
        'Building products people actually want to use'
      ]
    },
    skillsIntro: 'A practical mix of front-end, back-end, and problem-solving skills presented as a compact Bento Grid for quick CV scanning.',
    skillBadges: ['Frontend Core', 'Backend', 'Scripting', 'UI System', 'Type Safety', 'Database'],
    skillNotes: ['Primary stack', 'API logic', 'Problem solving', 'Visual polish', 'Reliable code', 'Persistence'],
    skillTitles: ['React', 'Node.js', 'Python', 'Tailwind CSS', 'TypeScript', 'MongoDB'],
    skillDescriptions: [
      'Reusable UI components and responsive interfaces.',
      'REST APIs and server-side features.',
      'Fast scripting for automation and analysis.',
      'Design speed with consistent utility-first styling.',
      'Safer JavaScript for scalable front-end work.',
      'Flexible document storage for product data.'
    ],
    skillTags: ['Hooks', 'SPA', 'Express', 'REST', 'Automation', 'Data', 'Design tokens', 'Responsive', 'Types', 'DX', 'Collections', 'CRUD'],
    softSkillsTitle: 'Soft skills',
    softSkillTitles: ['Problem Solving', 'Team Leadership', 'Communication', 'Project Management', 'Mentoring', 'Creative Thinking', 'Adaptability', 'Time Management'],
    softSkillDesc: [
      'Break down issues and ship practical fixes.',
      'Keep work clear, aligned, and moving forward.',
      'Explain ideas simply across technical and non-technical teams.',
      'Organize tasks, timelines, and priorities cleanly.',
      'Share knowledge in a way that helps others grow.',
      'Look for cleaner and more usable solutions.',
      'Adjust quickly when requirements or tools change.',
      'Stay on schedule without losing quality.'
    ],
    projectBadges: ['Featured', 'E-commerce'],
    projectTitles: ['Weather App', 'Perfume Shop'],
    projectDescriptions: [
      'A React-based weather forecast app using OpenWeatherMap API with a clean, fast interface.',
      'An e-commerce website for fragrance lovers to browse premium products through a sleek React interface.'
    ],
    projectButtons: ['Live Demo', 'GitHub'],
    certificateTitle: 'Coming soon',
    certificateDesc: 'Certificate highlights will be added as new milestones are completed.',
    contactPlaceholders: ['Your Name', 'Your Email', 'Your Message'],
    sendMessage: 'Send Message',
    antiBotLabel: 'Do not fill this out if you\'re human:',
    footer: 'Tuan Nguyen. All rights reserved.',
    quote: '"Being a developer isn\'t about knowing everything - it\'s about learning quickly, adapting constantly, and delivering with purpose."'
  },
  vi: {
    langLabel: 'EN',
    toggleAria: 'Switch language to English',
    pageTitle: 'Nguyễn Lê Tuấn - Hồ sơ cá nhân',
    pageDescription: 'Nguyễn Lê Tuấn - Hồ sơ Full-Stack Developer với các dự án tiêu biểu, kỹ năng kỹ thuật và thông tin liên hệ.',
    scrollTopLabel: 'Trang đầu',
    nav: ['Trang chủ', 'Giới thiệu', 'Kỹ năng', 'Dự án'],
    contactBtn: 'Liên hệ',
    downloadCv: 'Tải CV',
    homeEyebrow: 'Sẵn sàng cho công việc thực tập toàn thời gian',
    heroSubtitle: 'Lập trình viên Full-Stack',
      heroDescription: 'Tôi thiết kế và xây dựng trải nghiệm web chú trọng vào UI chuyên nghiệp, tư duy backend thực tế và tập trung vào giá trị sản phẩm.',
    heroActions: ['Xem dự án tiêu biểu', 'Bắt đầu trò chuyện'],
    heroMarquee: ['Hệ thống UI', 'Dự án React', 'Prototype nhanh', 'Tích hợp API', 'Giao diện gọn gàng'],
    heroStatsStrong: ['2+', 'Full-stack', 'UI-first'],
    heroStatsDesc: ['Dự án tiêu biểu', 'React, Node, Python', 'Giao diện tối ưu, responsive'],
    heroCardBadge: 'Portfolio 2026',
    heroCardTitle: 'Xây dựng giao diện mang cảm giác cao cấp',
    heroCardDesc: 'Dự án hướng React, tích hợp API thực tế và trải nghiệm UX/UI.',
    sectionEyebrows: ['Giới thiệu', 'ăng lực', 'Dự án nổi bật', 'Minh chứng', 'Liên hệ'],
    sectionTitles: [
      'Một người xây dựng tập trung và có tư duy sản phẩm',
      'Kỹ năng và chuyên môn',
      'Dự án thể hiện độ rộng và độ chuẩn',
      'Chứng chỉ',
      'Liên hệ với tôi'
    ],
    aboutTexts: [
      'Tôi là sinh viên CNTT có sự yêu thích trong việc tạo ra các giao diện dễ sử dụng. Công việc của tôi là giao điểm giữa thiết kế giao diện đẹp và triển khai hệ thống một cách chắc chắn, an toàn để đảm bảo sự an toàn cho hệ thống.',
      'Tôi đang tìm cơ hội thực tập để đóng góp vào sản phẩm thực tế, học hỏi từ đội ngũ mạnh hơn và tiếp tục nâng cấp bộ kỹ năng full-stack.'
    ],
    aboutCards: {
      titles: ['Học vấn', 'Mục tiêu', 'Đam mê'],
      desc: [
        'Đại học Giao thông Vận tải - Công nghệ Thông tin chuyên ngành Công Nghệ Phần Mềm',
        'Trở thành lập trình viên full-stack đáng tin cậy',
       'Xây dựng sản phẩm mà người dùng thực sự muốn sử dụng'
      ]
    },
    skillsIntro: 'Sự kết hợp thực tế giữa frontend, backend và tư duy giải quyết vấn đề, được trình bày bằng Bento Grid gọn gàng để dễ quét CV.',
    skillBadges: ['Nền tảng Frontend', 'Backend', 'Script', 'Hệ thống UI', 'Đảm bảo an toàn dữ liệu', 'Cơ sở dữ liệu'],
    skillNotes: ['Stack chính', 'Logic API', 'Giải quyết vấn đề', 'Trau chuốt hình ảnh', 'Mã nguồn ổn định', 'Lưu trữ dữ liệu'],
    skillTitles: ['React', 'Node.js', 'Python', 'Tailwind CSS', 'TypeScript', 'MongoDB'],
    skillDescriptions: [
      'Thành phần UI tái sử dụng tập trung vào giao diện responsive.',
      'Xây dựng REST API và tính năng phía server.',
      'Viết script nhanh cho tự động hóa và phân tích.',
      'Tăng tốc thiết kế với utility-first approach.',
      'JavaScript an toàn hơn cho dự án front-end mở rộng.',
      'Lưu trữ dữ liệu dạng document linh hoạt.'
    ],
    skillTags: ['Hooks', 'SPA', 'Express', 'REST', 'Tự động hóa', 'Dữ liệu', 'Design tokens', 'Responsive', 'Types', 'DX', 'Collections', 'CRUD'],
    softSkillsTitle: 'Kỹ năng mềm',
    softSkillTitles: ['Giải quyết vấn đề', 'Lãnh đạo nhóm', 'Giao tiếp', 'Quản lý dự án', 'Hướng dẫn', 'Tư duy sáng tạo', 'Thích nghi', 'Quản lý thời gian'],
    softSkillDesc: [
      'Phân tích vấn đề và đưa ra hướng xử lý phù hợp trong thực tế.',
      'Giữ công việc rõ ràng, đồng bộ và đi đúng mục tiêu chung.',
      'Trình bày ý tưởng rõ ràng cho cả đội kỹ thuật và phi kỹ thuật.',
      'Sắp xếp công việc, ưu tiên và theo dõi tiến độ hiệu quả.',
      'Chủ động chia sẻ kiến thức và hỗ trợ các thành viên trong nhóm.',
      'Luôn tìm cách tối ưu để sản phẩm gọn gàng và dễ sử dụng hơn.',
      'Thích nghi nhanh với thay đổi về yêu cầu hoặc công nghệ.',
      'Đảm bảo tiến độ nhưng vẫn giữ chất lượng công việc.'
    ],
    projectBadges: ['Nổi bật', 'Thương mại điện tử'],
    projectTitles: ['Ứng dụng thời tiết', 'Cửa hàng nước hoa'],
    projectDescriptions: [
      'Ứng dụng dự báo thời tiết bằng React, sử dụng OpenWeatherMap API với giao diện gọn, nhanh.',
      'Website thương mại điện tử dành cho người yêu nước hoa, duyệt sản phẩm cao cấp qua giao diện React hiện đại.'
    ],
    projectButtons: ['Xem demo', 'GitHub'],
    certificateTitle: 'Sắp cập nhật',
    certificateDesc: 'Nội dung chứng chỉ sẽ được bổ sung theo các mốc phát triển mới.',
    contactPlaceholders: ['Tên của bạn', 'Email của bạn', 'Nội dung tin nhắn'],
    sendMessage: 'Gửi tin nhắn',
    antiBotLabel: 'Nếu bạn là người, vui lòng để trống ô này:',
    footer: 'Tuan Nguyen. Bảo lưu mọi quyền.',
    quote: '"Làm lập trình viên không phải là biết hết mọi thứ - mà là học nhanh, thích nghi liên tục và tạo ra giá trị thực sự."'
  }
};

function setText(selector, value) {
  const node = document.querySelector(selector);
  if (node && typeof value === 'string') node.textContent = value;
}

function setAllText(selector, values) {
  const nodes = Array.from(document.querySelectorAll(selector));
  nodes.forEach((node, index) => {
    if (values[index] !== undefined) node.textContent = values[index];
  });
}

function updateToggleLabel(lang) {
  if (!toggleBtn) return;
  const t = translations[lang];
  toggleBtn.textContent = t.langLabel;
  toggleBtn.setAttribute('aria-label', t.toggleAria);
}

let quoteTypingRunId = 0;

function typeQuote(fullText) {
  const quote = document.getElementById('intro-quote');
  if (!quote) return;

  const container = quote.parentElement;
  quoteTypingRunId += 1;
  const currentRun = quoteTypingRunId;

  quote.textContent = fullText;
  container.style.minHeight = `${container.offsetHeight}px`;
  quote.textContent = '';
  quote.classList.add('typing');

  let i = 0;
  const speed = 28;

  (function typeWriter() {
    if (currentRun !== quoteTypingRunId) return;
    if (i < fullText.length) {
      quote.textContent += fullText[i++];
      setTimeout(typeWriter, speed);
    } else {
      quote.classList.remove('typing');
      quote.classList.add('done');
    }
  })();
}

function applyLanguage(lang) {
  const t = translations[lang] || translations.en;
  document.documentElement.lang = lang === 'vi' ? 'vi' : 'en';
  document.title = t.pageTitle;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', t.pageDescription);

  const scrollTopBtn = document.getElementById('scrollToTopBtn');
  if (scrollTopBtn) {
    scrollTopBtn.setAttribute('title', t.scrollTopLabel);
    scrollTopBtn.setAttribute('aria-label', t.scrollTopLabel);
  }

  setAllText('.nav a[href="#home"], .nav a[href="#about"], .nav a[href="#skill"], .nav a[href="#project"]', t.nav);
  setText('.nav a.contact-btn', t.contactBtn);
  setText('.nav a.download-btn', t.downloadCv);

  setText('#home .eyebrow', t.homeEyebrow);
  setText('.hero-subtitle', t.heroSubtitle);
  setText('.hero-description', t.heroDescription);
  setAllText('.hero-actions a', t.heroActions);

  const marqueeNodes = Array.from(document.querySelectorAll('.marquee-track span'));
  marqueeNodes.forEach((node, index) => {
    node.textContent = t.heroMarquee[index % t.heroMarquee.length];
  });

  setAllText('.hero-stats .stat-card strong', t.heroStatsStrong);
  setAllText('.hero-stats .stat-card span', t.heroStatsDesc);
  setText('.hero-badge', t.heroCardBadge);
  setText('.hero-card-footer h2', t.heroCardTitle);
  setText('.hero-card-footer p', t.heroCardDesc);

  setAllText('main > section:not(#home) .eyebrow', t.sectionEyebrows);
  setAllText('section .section-title', t.sectionTitles);

  setAllText('.about-me-text', t.aboutTexts);
  setAllText('.about-me-cards .info-card-content h4', t.aboutCards.titles);
  setAllText('.about-me-cards .info-card-content p', t.aboutCards.desc);

  setText('.skills-intro p', t.skillsIntro);
  setAllText('.skills-bento-grid .skill-badge', t.skillBadges);
  setAllText('.skills-bento-grid .skill-note', t.skillNotes);
  setAllText('.skills-bento-grid .skill-copy h3', t.skillTitles);
  setAllText('.skills-bento-grid .skill-copy p', t.skillDescriptions);
  setAllText('.skills-bento-grid .skill-mini-tags span', t.skillTags);

  setText('.skills-subtitle', t.softSkillsTitle);
  setAllText('.soft-bento-card h4', t.softSkillTitles);
  setAllText('.soft-bento-card p', t.softSkillDesc);

  setAllText('.project-card .project-badge', t.projectBadges);
  setAllText('.project-card .project-title', t.projectTitles);
  setAllText('.project-card .project-description', t.projectDescriptions);
  setAllText('.project-card .btn.live', [t.projectButtons[0], t.projectButtons[0]]);
  setAllText('.project-card .btn.github', [t.projectButtons[1], t.projectButtons[1]]);

  setText('.certificate-item h3', t.certificateTitle);
  setText('.certificate-item p', t.certificateDesc);

  setText('#anti-bot-text', t.antiBotLabel);

  const nameInput = document.querySelector('input[name="name"]');
  const emailInput = document.querySelector('input[name="email"]');
  const messageInput = document.querySelector('textarea[name="message"]');
  if (nameInput) nameInput.setAttribute('placeholder', t.contactPlaceholders[0]);
  if (emailInput) emailInput.setAttribute('placeholder', t.contactPlaceholders[1]);
  if (messageInput) messageInput.setAttribute('placeholder', t.contactPlaceholders[2]);
  setText('.contact-modern-form button[type="submit"]', t.sendMessage);

  setText('#footer-rights', t.footer);

  typeQuote(t.quote);
  updateToggleLabel(lang);
}

window.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('lang') === 'vi' ? 'vi' : 'en';
  applyLanguage(savedLang);
});

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    const currentLang = localStorage.getItem('lang') === 'vi' ? 'vi' : 'en';
    const nextLang = currentLang === 'en' ? 'vi' : 'en';
    localStorage.setItem('lang', nextLang);
    applyLanguage(nextLang);
  });
}

// Slide in (legacy selectors)
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

window.addEventListener('DOMContentLoaded', () => {
  const yearNode = document.getElementById('footer-year');
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }
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
