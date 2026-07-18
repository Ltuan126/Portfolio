document.addEventListener('DOMContentLoaded', function () {

  // ===== i18n dictionary (EN default, VI translations) =====
  var translations = {
    vi: {
      'nav.work': 'Dự án', 'nav.index': 'Kỹ năng', 'nav.log': 'Nhật ký', 'nav.certificates': 'Chứng chỉ', 'nav.profile': 'Hồ sơ', 'nav.contact': 'Liên hệ', 'nav.status': 'Sẵn sàng nhận việc',
      'hero.tag': '№ 001 / PORTFOLIO 2026', 'hero.loc': 'TP.HCM, VN',
      'hero.lede': 'Kỹ sư phần mềm xây dựng sản phẩm full-stack — từ pipeline dữ liệu đến từng pixel bạn nhấp vào. Đang hoàn thành chương trình học, tìm kiếm đội ngũ để cùng phát triển.',
      'hero.fact1k': 'Vai trò', 'hero.fact1v': 'Kỹ sư full-stack & quan tâm AI',
      'hero.fact2k': 'Trạng thái', 'hero.fact2v': 'Sinh viên năm 3 · sẵn sàng thực tập',
      'hero.fact3k': 'Công nghệ',
      'hero.cta1': 'Xem dự án →', 'hero.cta2': 'Liên hệ ngay', 'hero.cta3': 'Tải CV',
      'work.title': 'Dự án tiêu biểu', 'work.count': '5 dự án', 'work.featured': 'Nổi bật', 'work.demo': 'Xem demo', 'work.githubOnly': 'Chỉ có GitHub',
      'work.p4.desc': 'Website thương mại điện tử dành cho người yêu nước hoa, mang đến trải nghiệm khám phá sản phẩm cao cấp qua giao diện React hiện đại, kèm giỏ hàng và thanh toán trên REST API riêng.',
      'work.p1.desc': 'Nền tảng quản lý công việc full-stack hướng đến hiệu suất và khả năng mở rộng — kiểu dữ liệu xuyên suốt cùng CI/CD tự động qua GitHub Actions.',
      'work.p2.desc': 'Hệ thống Machine Learning không giám sát phát hiện bất thường trong log HDFS qua các đặc trưng dữ liệu tự xây dựng, giám sát toàn trình bằng MLflow, Prometheus và Grafana.',
      'work.p3.desc': '"Lập kế hoạch thông minh hơn. Học tập hiệu quả hơn. Không bỏ lỡ deadline." Ứng dụng di động giúp sinh viên quản lý môn học, bài tập và deadline, đồng bộ thời gian thực trên nhiều thiết bị.',
      'work.p5.desc': 'Ứng dụng dự báo thời tiết bằng React, dùng OpenWeatherMap API, giao diện gọn nhẹ và tìm kiếm theo vị trí.',
      'skills.title': 'Bảng năng lực',
      'skills.react': 'Frontend cốt lõi', 'skills.ts': 'Code đáng tin cậy', 'skills.node': 'Logic API', 'skills.python': 'Scripting & ML', 'skills.mongo': 'Lưu trữ dữ liệu', 'skills.tw': 'Tinh chỉnh giao diện',
      'skills.softLabel': 'Ngoài ra còn có —',
      'skills.soft1': 'Học nhanh', 'skills.soft2': 'Giao tiếp rõ ràng', 'skills.soft3': 'Giải quyết vấn đề', 'skills.soft4': 'Làm việc nhóm', 'skills.soft5': 'Tư duy sản phẩm', 'skills.soft6': 'Tinh thần trách nhiệm',
      'log.title': 'Nhật ký phát triển', 'log.now': 'Hiện tại',
      'log.l1.title': 'Bắt đầu đại học', 'log.l1.desc': 'Nhập học ngành Kỹ thuật phần mềm tại Đại học Giao thông Vận tải TP.HCM. Bắt đầu tiếp cận kiến thức lập trình cơ bản và thuật toán.',
      'log.l2.title': 'Học nền tảng', 'log.l2.desc': 'Tập trung tích lũy kiến thức khoa học máy tính, cấu trúc dữ liệu, giải thuật và nền tảng phát triển web — HTML, CSS, JavaScript.',
      'log.l3.title': 'Dự án thực tế đầu tiên', 'log.l3.desc': 'Làm quen với React và Node.js. Xây dựng và triển khai Weather App cùng Sillage Shop, lần đầu tích hợp API thực tế lên môi trường production.',
      'log.l4.title': 'Full-stack, mobile & AI', 'log.l4.desc': 'Phát triển Task Management Workspace (React, MongoDB, TypeScript, CI/CD), hoàn thiện StudyMate (Flutter + Firebase), và xây dựng hệ thống AI phát hiện bất thường log HDFS (Python, FastAPI, MLflow, Docker).',
      'log.l5.title': 'Sẵn sàng cho cơ hội mới', 'log.l5.desc': 'Sinh viên năm 3 đang tìm kiếm cơ hội thực tập hoặc fresher — sẵn sàng tham gia dự án thực tế, đóng góp cho đội ngũ phát triển và tiếp tục hoàn thiện kỹ năng.',
      'banner.text': 'Sinh viên năm 3, người xây dựng full-stack — ', 'banner.emph': 'sẵn sàng bắt tay vào việc ngay.',
      'certs.title': 'Chứng chỉ', 'certs.soon': 'Sắp cập nhật — nội dung chứng chỉ sẽ được bổ sung theo các mốc phát triển mới.',
      'profile.title': 'Hồ sơ',
      'profile.quote': 'Làm lập trình viên không phải là biết mọi thứ — mà là khả năng học hỏi nhanh, thích nghi liên tục và tạo ra giá trị thực sự.',
      'profile.p1': 'Tôi là kỹ sư phần mềm tập trung vào việc biến ý tưởng thành sản phẩm hoàn thiện, dễ sử dụng — kết hợp giữa thiết kế giao diện trực quan, kiến trúc back-end vững chắc, và kỷ luật để hoàn thành những gì thực sự hoạt động.',
      'profile.p2': 'Tôi phát triển ứng dụng web và mobile theo hướng full-stack, chú trọng giao diện gọn gàng, mã nguồn dễ bảo trì và giá trị thực tiễn — từ nền tảng thương mại điện tử đến hệ thống giám sát ứng dụng AI.',
      'profile.eduK': 'Học vấn', 'profile.eduV': 'Đại học Giao thông Vận tải TP.HCM — Kỹ thuật phần mềm, dự kiến tốt nghiệp 2027',
      'profile.goalK': 'Mục tiêu', 'profile.goalV': 'Trở thành lập trình viên full-stack đáng tin cậy',
      'profile.passionK': 'Đam mê', 'profile.passionV': 'Xây dựng sản phẩm mà người dùng thực sự muốn sử dụng',
      'contact.title': 'Cùng xây dựng<br>điều gì đó.',
      'contact.sub': 'Sẵn sàng nhận thực tập và vị trí fresher. Thường phản hồi trong vòng 1 ngày.',
      'contact.emailK': 'Email', 'contact.phoneK': 'Điện thoại', 'contact.addressK': 'Địa chỉ',
      'contact.address': 'TP. Hồ Chí Minh, Việt Nam',
      'contact.sentTitle': 'Đã gửi tin nhắn', 'contact.sentText': 'Cảm ơn bạn đã liên hệ — tôi sẽ phản hồi sớm.', 'contact.sendAnother': 'Gửi tin khác',
      'contact.error': 'Gửi không thành công — bạn hãy gửi email trực tiếp giúp mình nhé.',
      'contact.name': 'Họ tên', 'contact.email': 'Email', 'contact.message': 'Lời nhắn', 'contact.send': 'Gửi tin nhắn',
      'footer.built': 'Xây dựng bằng sự chỉn chu & rất nhiều cà phê',
    }
  };

  var langToggle = document.getElementById('lang-toggle');
  var currentLang = localStorage.getItem('portfolio-lang') || 'en';

  function applyLang(lang) {
    var dict = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (lang === 'en') {
        if (el.dataset.i18nOriginal) el.innerHTML = el.dataset.i18nOriginal;
        return;
      }
      if (!el.dataset.i18nOriginal) el.dataset.i18nOriginal = el.innerHTML;
      if (dict && dict[key] !== undefined) el.innerHTML = dict[key];
    });
    document.documentElement.lang = lang;
    if (langToggle) {
      langToggle.querySelectorAll('.lang-opt').forEach(function (opt) {
        opt.classList.toggle('is-active', opt.dataset.lang === lang);
      });
    }
    localStorage.setItem('portfolio-lang', lang);
    currentLang = lang;
  }

  if (langToggle) {
    langToggle.addEventListener('click', function () {
      applyLang(currentLang === 'en' ? 'vi' : 'en');
    });
  }
  applyLang(currentLang);

  // ===== Scroll reveal =====
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  // ===== Scroll progress bar =====
  var progressBar = document.getElementById('progress-bar');
  function updateProgress() {
    if (!progressBar) return;
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }

  // ===== Active section highlight in rail =====
  var railLinks = document.querySelectorAll('.rail-list a[data-section]');
  var sections = Array.prototype.map.call(railLinks, function (link) {
    return document.getElementById(link.getAttribute('data-section'));
  }).filter(Boolean);

  function updateActiveSection() {
    var scrollPos = window.scrollY + 140;
    var activeId = null;
    sections.forEach(function (sec) {
      if (sec.offsetTop <= scrollPos) activeId = sec.id;
    });
    railLinks.forEach(function (link) {
      link.classList.toggle('is-active', link.getAttribute('data-section') === activeId);
    });
  }

  // ===== Back to top button =====
  var toTopBtn = document.getElementById('to-top');
  function updateToTop() {
    if (!toTopBtn) return;
    if (window.scrollY > 600) {
      toTopBtn.classList.add('visible');
    } else {
      toTopBtn.classList.remove('visible');
    }
  }

  function onScroll() {
    updateProgress();
    updateActiveSection();
    updateToTop();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toTopBtn) {
    toTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== Footer year =====
  var footerYear = document.getElementById('footer-year');
  if (footerYear) footerYear.textContent = new Date().getFullYear();

  // ===== Contact form (Web3Forms AJAX submit) =====
  var form = document.getElementById('contact-form');
  var successPanel = document.getElementById('form-success');
  var sendAnotherBtn = document.getElementById('send-another');
  var errorEl = document.getElementById('form-error');
  var submitBtn = form ? form.querySelector('button[type="submit"]') : null;

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (errorEl) errorEl.hidden = true;
      if (submitBtn) submitBtn.disabled = true;

      var data = Object.fromEntries(new FormData(form).entries());
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      }).then(function (res) { return res.json(); }).then(function (res) {
        if (!res.success) throw new Error(res.message || 'Submit failed');
        form.hidden = true;
        if (successPanel) successPanel.hidden = false;
      }).catch(function () {
        if (errorEl) errorEl.hidden = false;
      }).finally(function () {
        if (submitBtn) submitBtn.disabled = false;
      });
    });
  }

  if (sendAnotherBtn) {
    sendAnotherBtn.addEventListener('click', function () {
      if (form) {
        form.reset();
        form.hidden = false;
      }
      if (successPanel) successPanel.hidden = true;
    });
  }

});
