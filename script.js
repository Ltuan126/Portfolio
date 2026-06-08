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
    homeEyebrow: 'Software Engineer · Full-Stack Developer',
    heroSubtitle: 'Software Engineer & Full-Stack Developer',
    heroDescription: 'I design and build polished web experiences with strong front-end details, practical back-end thinking, and a focus on shipping useful products.',
    heroActions: ['See Selected Work', 'Start a Conversation'],
    heroMarquee: ['UI systems', 'React builds', 'Fast prototypes', 'API integration', 'Clean handoff'],
    heroStatsStrong: ['5', 'Full-stack', 'UI-first'],
    heroStatsDesc: ['Projects', 'React, Node, Python', 'Clean, responsive interfaces'],
    heroCardBadge: 'Portfolio 2026',
    heroCardTitle: 'Building interfaces that feel premium',
    heroCardDesc: 'React-driven projects, practical API work, and thoughtful UI polish.',
    sectionEyebrows: ['About', 'Journey', 'Capabilities', 'Selected Work', 'Proof', 'Contact'],
    sectionTitles: [
      'A focused builder with a product mindset',
      'How I got here',
      'Skills and expertise',
      'Projects that show range and finish',
      'Certificates',
      'Get in touch'
    ],
    aboutTexts: [
      'I\'m a software engineer who turns ideas into polished, usable products. My work sits at the intersection of thoughtful UI design, solid back-end architecture, and the discipline to ship things that actually work.',
      'I build full-stack web and mobile applications with a focus on clean interfaces, maintainable code, and real-world utility — from e-commerce platforms to AI-powered monitoring systems.'
    ],
    aboutCards: {
      titles: ['Education', 'Goal', 'Passion'],
      desc: [
        'University of Transport Ho Chi Minh City',
        'Become a reliable full-stack developer',
        'Building products people actually want to use'
      ]
    },
    skillsIntro: 'These are the tools I actually use — picked up through building real projects, not just tutorials. Each one has left a mark on something I\'ve shipped.',
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
    projectBadges: ['Featured', 'E-commerce', 'SaaS', 'Mobile App', 'AI/LLM'],
    projectTitles: ['Weather App', 'Perfume Shop', 'Task Management Workspace', 'StudyMate', 'AI Log Anomaly Detection'],
    projectDescriptions: [
      'A React-based weather forecast app using OpenWeatherMap API with a clean, fast interface.',
      'An e-commerce website for fragrance lovers to browse premium products through a sleek React interface.',
      'A full-stack task management platform designed for productivity and scalability. It features a secure REST API and an interactive React dashboard for managing tasks in real time.',
      '"Plan smarter. Study better. Never miss a deadline."\n\nA mobile productivity app that helps students manage subjects, assignments, and deadlines efficiently.',
      'An unsupervised machine learning system that detects anomalies in HDFS logs using feature-engineered signals and real-time monitoring.'
    ],
    projectButtons: ['Live Demo', 'GitHub'],
    certificateTitle: 'Coming soon',
    certificateDesc: 'Certificate highlights will be added as new milestones are completed.',
    contactPlaceholders: ['Your Name', 'Your Email', 'Your Message'],
    sendMessage: 'Send Message',
    antiBotLabel: 'Do not fill this out if you\'re human:',
    footer: 'Tuan Nguyen. All rights reserved.',
    timelineTitles: [
      'Started University',
      'First Real Projects',
      'Going Full-Stack',
      'Mobile & AI',
      'Open to Opportunities'
    ],
    timelineDescs: [
      'Enrolled in Software Engineering at University of Transport Ho Chi Minh City. Began exploring web fundamentals, algorithms, and programming foundations.',
      'Picked up React and Node.js. Built the Weather App and Perfume Shop — first time shipping something to production with a real API.',
      'Built the Task Management Workspace — a full REST API with React dashboard, MongoDB, TypeScript, and GitHub Actions CI/CD pipeline.',
      'Shipped StudyMate on Flutter + Firebase. Built an unsupervised ML system for HDFS log anomaly detection using Python, FastAPI, MLFlow, and Docker.',
      'Final year student seeking internship or junior roles. Ready to contribute to real teams, ship real products, and keep pushing the craft forward.'
    ],
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
    homeEyebrow: 'Kỹ sư phần mềm · Lập trình viên Full-Stack',
    heroSubtitle: 'Kỹ sư phần mềm & Lập trình viên Full-Stack',
    heroDescription: 'Tôi thiết kế và phát triển các sản phẩm web với sự cân bằng giữa trải nghiệm người dùng, tư duy backend thực tiễn và chất lượng triển khai.',
    heroActions: ['Xem dự án nổi bật', 'Liên hệ với tôi'],
    heroMarquee: [
      'Hệ thống UI',
      'Dự án React',
      'Prototype nhanh',
      'Tích hợp API',
      'Giao diện chỉn chu'
    ],
    heroStatsStrong: ['5', 'Full-stack', 'UI-first'],
    heroStatsDesc: [
      'Dự án',
      'React, Node.js, Python',
      'Giao diện tối ưu và responsive'
    ],
    heroCardBadge: 'Portfolio 2026',
    heroCardTitle: 'Xây dựng những giao diện chỉn chu và chuyên nghiệp',
    heroCardDesc: 'Các dự án sử dụng React, tích hợp API thực tế và chú trọng đến trải nghiệm người dùng.',
    sectionEyebrows: ['Giới thiệu', 'Hành trình', 'Năng lực', 'Dự án nổi bật', 'Chứng chỉ', 'Liên hệ'],
    sectionTitles: [
      'Một lập trình viên với tư duy sản phẩm',
      'Hành trình phát triển',
      'Kỹ năng và chuyên môn',
      'Dự án nổi bật',
      'Chứng chỉ & Chứng nhận',
      'Liên hệ với tôi'
    ],
    aboutTexts: [
      'Tôi là một kỹ sư phần mềm tập trung vào việc biến ý tưởng thành những sản phẩm hoàn thiện và dễ sử dụng. Công việc của tôi là sự kết hợp giữa thiết kế giao diện trực quan, kiến trúc backend vững chắc và tinh thần luôn hướng đến những giải pháp có giá trị thực tế.',
      'Tôi phát triển các ứng dụng web và mobile theo định hướng Full-Stack, chú trọng vào trải nghiệm người dùng, mã nguồn dễ bảo trì và khả năng ứng dụng trong thực tế — từ các nền tảng thương mại điện tử đến các hệ thống giám sát ứng dụng AI.'
    ],
    aboutCards: {
      titles: ['Học vấn', 'Mục tiêu', 'Đam mê'],
      desc: [
        'Đại học Giao thông Vận tải TP.HCM',
        'Trở thành lập trình viên Full-Stack đáng tin cậy',
        'Xây dựng những sản phẩm mà người dùng thực sự muốn sử dụng'
      ]
    },
    skillsIntro: 'Những công nghệ dưới đây được tôi sử dụng trong quá trình xây dựng các dự án thực tế. Mỗi công cụ đều gắn liền với những sản phẩm tôi đã phát triển và triển khai.',
    skillBadges: [
      'Frontend',
      'Backend',
      'Scripting',
      'UI System',
      'Type Safety',
      'Cơ sở dữ liệu'
    ],
    skillNotes: ['Stack chính', 'Logic API', 'Giải quyết vấn đề', 'Trau chuốt giao diện', 'Mã nguồn tin cậy', 'Lưu trữ dữ liệu'],
    skillTitles: ['React', 'Node.js', 'Python', 'Tailwind CSS', 'TypeScript', 'MongoDB'],
    skillDescriptions: [
      'Xây dựng các thành phần UI có thể tái sử dụng và tối ưu cho nhiều kích thước màn hình.',
      'Phát triển REST API và các tính năng phía máy chủ.',
      'Viết script phục vụ tự động hóa và xử lý dữ liệu.',
      'Tăng tốc phát triển giao diện với phương pháp utility-first.',
      'Nâng cao độ an toàn và khả năng mở rộng cho dự án JavaScript.',
      'Lưu trữ dữ liệu linh hoạt theo mô hình document.'
    ],
    skillTags: ['Hooks', 'SPA', 'Express', 'REST', 'Tự động hóa', 'Dữ liệu', 'Design tokens', 'Responsive', 'Types', 'DX', 'Collections', 'CRUD'],
    softSkillsTitle: 'Kỹ năng mềm',
    softSkillTitles: ['Giải quyết vấn đề', 'Lãnh đạo nhóm', 'Giao tiếp', 'Quản lý dự án', 'Hướng dẫn', 'Tư duy sáng tạo', 'Thích nghi', 'Quản lý thời gian'],
    softSkillDesc: [
      'Phân tích vấn đề và đưa ra giải pháp hiệu quả.',
      'Duy trì sự phối hợp và định hướng rõ ràng trong nhóm.',
      'Trình bày ý tưởng dễ hiểu cho cả đối tượng kỹ thuật và phi kỹ thuật.',
      'Quản lý công việc, tiến độ và mức độ ưu tiên một cách khoa học.',
      'Chủ động chia sẻ kiến thức và hỗ trợ đồng đội phát triển.',
      'Luôn tìm kiếm những giải pháp tối ưu và thân thiện với người dùng.',
      'Thích nghi nhanh với những thay đổi về yêu cầu hoặc công nghệ.',
      'Đảm bảo tiến độ mà vẫn duy trì chất lượng sản phẩm.'
    ],
    projectBadges: ['Nổi bật', 'Thương mại điện tử', 'SaaS', 'Ứng dụng di động', 'AI/LLM'],
    projectTitles: ['Weather App', 'Perfume Shop', 'Task Management Workspace', 'StudyMate', 'AI Log Anomaly Detection'],
    projectDescriptions: [
      'Ứng dụng dự báo thời tiết được xây dựng bằng React, sử dụng OpenWeatherMap API với giao diện trực quan và tốc độ phản hồi nhanh.',
      'Website thương mại điện tử dành cho những người yêu thích nước hoa, mang đến trải nghiệm khám phá sản phẩm cao cấp thông qua giao diện React hiện đại.',
      'Nền tảng quản lý công việc Full-Stack được xây dựng hướng đến hiệu suất và khả năng mở rộng. Hệ thống cung cấp REST API bảo mật cùng React Dashboard tương tác, cho phép quản lý công việc theo thời gian thực.',
      '"Lập kế hoạch thông minh hơn. Học tập hiệu quả hơn. Không bỏ lỡ bất kỳ thời hạn quan trọng nào."\n\nỨng dụng di động hỗ trợ sinh viên quản lý môn học, bài tập và thời hạn hoàn thành một cách hiệu quả.',
      'Hệ thống Machine Learning không giám sát giúp phát hiện bất thường trong log HDFS thông qua các đặc trưng dữ liệu được xây dựng thủ công và cơ chế giám sát theo thời gian thực.'
    ],
    projectButtons: ['Xem demo', 'GitHub'],
    certificateTitle: 'Sắp cập nhật',
    certificateDesc: 'Nội dung chứng chỉ sẽ được bổ sung theo các mốc phát triển mới.',
    contactPlaceholders: ['Tên của bạn', 'Email của bạn', 'Nội dung tin nhắn'],
    sendMessage: 'Gửi tin nhắn',
    antiBotLabel: 'Nếu bạn là người, vui lòng để trống ô này:',
    footer: 'Tuan Nguyen. Bảo lưu mọi quyền.',
    timelineTitles: [
      'Bắt đầu học Đại học',
      'Dự án thực tế đầu tiên',
      'Phát triển Full-Stack',
      'Lập trình Di động & AI',
      'Sẵn sàng đón nhận cơ hội'
    ],
    timelineDescs: [
      'Nhập học ngành Kỹ thuật Phần mềm tại Đại học Giao thông Vận tải TP.HCM. Bắt đầu tìm hiểu kiến thức web nền tảng, thuật toán và tư duy lập trình.',
      'Học hỏi React và Node.js. Xây dựng ứng dụng Thời tiết và Cửa hàng Nước hoa — bước đầu đưa sản phẩm tích hợp API thực tế lên môi trường production.',
      'Xây dựng Task Management Workspace — nền tảng quản lý công việc full-stack với REST API, React dashboard, MongoDB, TypeScript và quy trình CI/CD qua GitHub Actions.',
      'Hoàn thiện ứng dụng di động StudyMate (Flutter + Firebase). Xây dựng hệ thống AI phát hiện bất thường log HDFS sử dụng học máy không giám sát với Python, FastAPI, MLflow và Docker.',
      'Sinh viên năm cuối tìm kiếm vị trí thực tập hoặc Junior. Sẵn sàng đóng góp cùng đội ngũ phát triển, xây dựng sản phẩm thực tế và không ngừng nâng cao tay nghề.'
    ],
    quote: '"Làm lập trình viên không phải là biết mọi thứ — mà là khả năng học hỏi nhanh, thích nghi liên tục và tạo ra giá trị thực sự."'
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

  setAllText('.timeline-content h3', t.timelineTitles);
  setAllText('.timeline-content p', t.timelineDescs);

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
  const liveButtons = Array.from(document.querySelectorAll('.project-card .btn.live'));
  liveButtons.forEach(btn => btn.textContent = t.projectButtons[0]);

  const githubButtons = Array.from(document.querySelectorAll('.project-card .btn.github'));
  githubButtons.forEach(btn => btn.textContent = t.projectButtons[1]);

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

// ===== Pause video when tab is hidden =====
const bgVideo = document.querySelector('.site-video-bg');
if (bgVideo) {
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      bgVideo.pause();
    } else {
      bgVideo.play();
    }
  });
}

