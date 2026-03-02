// ============================================================
// Bilişim Diyarı — Main JS
// ============================================================

// --- NAVBAR SCROLL ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
}, { passive: true });

// --- HAMBURGER MENU ---
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

hamburger?.addEventListener('click', () => mobileMenu.classList.add('open'));
mobileClose?.addEventListener('click', () => mobileMenu.classList.remove('open'));
mobileMenu?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// --- SCROLL REVEAL ---
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('revealed'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// --- SMOOTH SCROLL FOR ANCHORS ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// --- PRIVACY POLICY LOADER (Markdown from GitHub raw) ---
const PRIVACY_URL = 'https://raw.githubusercontent.com/SahinMuhammetAbdullah/bilisimdiyari_privacy_policy/main/privacy-policy.md';

async function loadPrivacyPolicy() {
  const loadingEl = document.getElementById('privacy-loading');
  const mdEl = document.getElementById('privacy-md');
  if (!loadingEl || !mdEl) return;

  try {
    // Try fetching the raw markdown
    const res = await fetch(PRIVACY_URL, {
      headers: { 'Accept': 'text/plain' }
    });

    if (!res.ok) throw new Error('fetch failed');
    const text = await res.text();

    // Simple Markdown → HTML converter
    const html = markdownToHtml(text);
    mdEl.innerHTML = html;
    loadingEl.style.display = 'none';
    mdEl.style.display = 'block';
  } catch (err) {
    // Fallback: link to GitHub
    loadingEl.innerHTML = `
      <div style="text-align:center; padding:40px 20px">
        <div style="font-size:2rem; margin-bottom:16px">📄</div>
        <div style="color:#E8EDF5; font-weight:600; margin-bottom:8px">Gizlilik Politikası</div>
        <div style="color:#7A8BA0; font-size:0.9rem; margin-bottom:24px">
          Gizlilik politikamızı GitHub'da görüntüleyebilirsiniz.
        </div>
        <a href="https://github.com/SahinMuhammetAbdullah/bilisimdiyari_privacy_policy/blob/main/privacy-policy.md"
           target="_blank" rel="noopener"
           style="display:inline-flex;align-items:center;gap:8px;background:#00D2B4;color:#080C12;padding:12px 24px;border-radius:12px;font-weight:700;text-decoration:none;font-family:'Space Grotesk',sans-serif;">
          📖 Politikayı Oku
        </a>
      </div>
    `;
  }
}

// Simple Markdown to HTML
function markdownToHtml(md) {
  return md
    // Headers
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Code inline
    .replace(/`(.+?)`/g, '<code>$1</code>')
    // Links
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    // HR
    .replace(/^---$/gm, '<hr>')
    // Unordered list
    .replace(/^\- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]+?<\/li>)/g, (match) => `<ul>${match}</ul>`)
    // Ordered list (simple)
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    // Paragraphs (split by double newline)
    .split(/\n\n+/)
    .map(block => {
      block = block.trim();
      if (!block) return '';
      if (/^<(h[1-6]|ul|ol|li|hr|blockquote)/.test(block)) return block;
      return `<p>${block.replace(/\n/g, '<br>')}</p>`;
    })
    .join('\n');
}

// Tab switcher
function switchPrivacyTab(tab, btn) {
  document.querySelectorAll('.privacy-tabs button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  // Future: load different policies per app
}

// Load on DOM ready
document.addEventListener('DOMContentLoaded', loadPrivacyPolicy);

// --- ACTIVE NAV LINK on scroll ---
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}` ||
            link.getAttribute('href')?.endsWith(`#${id}`)) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.3 });

sections.forEach(s => sectionObserver.observe(s));
