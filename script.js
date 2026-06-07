/* ============================================================
   script.js — Anil Cavale Portfolio
   - Dark/light theme toggle (persists in localStorage)
   - Mobile nav toggle
   - GitHub repos API fetch with graceful fallback
   - Scroll-triggered fade-up animations
   - Active nav link highlighting
   - Footer year
============================================================ */

'use strict';

/* ── Theme Toggle ───────────────────────────────────────── */
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = themeToggle?.querySelector('.theme-icon');
const DARK  = 'dark';
const LIGHT = 'light';

function applyTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  if (themeIcon) themeIcon.textContent = theme === DARK ? '☀' : '☾';
  try { localStorage.setItem('portfolio-theme', theme); } catch (_) {}
}

function getInitialTheme() {
  try {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved === DARK || saved === LIGHT) return saved;
  } catch (_) {}
  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? LIGHT : DARK;
}

applyTheme(getInitialTheme());

themeToggle?.addEventListener('click', () => {
  const next = document.body.getAttribute('data-theme') === DARK ? LIGHT : DARK;
  applyTheme(next);
});

/* ── Mobile Nav ─────────────────────────────────────────── */
const hamburger = document.getElementById('navHamburger');
const mobileNav = document.getElementById('navMobile');

hamburger?.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('is-open');
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

// Close mobile nav on link click
mobileNav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('is-open');
    hamburger?.setAttribute('aria-expanded', 'false');
  });
});

/* ── Footer Year ────────────────────────────────────────── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ── Scroll-triggered fade-up ───────────────────────────── */
const fadeEls = document.querySelectorAll('.section-title, .section-subtitle, .expertise-card, .publication-card, .contact-card, .stat-card, .about-text p');

fadeEls.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach(el => observer.observe(el));

/* ── GitHub Repos API ───────────────────────────────────── */
const GITHUB_USER  = 'anilcavale';
const API_URL      = `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`;
const container    = document.getElementById('projects-container');

/**
 * Language → approximate GitHub color
 */
const LANG_COLORS = {
  'Python':           '#3572A5',
  'Jupyter Notebook': '#DA5B0B',
  'JavaScript':       '#f1e05a',
  'TypeScript':       '#2b7489',
  'R':                '#198CE7',
  'SQL':              '#e38c00',
  'Shell':            '#89e051',
  'HTML':             '#e34c26',
  'CSS':              '#563d7c',
};
const getLangColor = (lang) => LANG_COLORS[lang] || '#8b949e';

/**
 * Relative time formatter
 */
function relativeTime(dateStr) {
  const now  = Date.now();
  const then = new Date(dateStr).getTime();
  const sec  = Math.floor((now - then) / 1000);
  const min  = Math.floor(sec  / 60);
  const hr   = Math.floor(min  / 60);
  const day  = Math.floor(hr   / 24);
  const mo   = Math.floor(day  / 30);
  const yr   = Math.floor(mo   / 12);
  if (yr  >= 1) return `${yr}y ago`;
  if (mo  >= 1) return `${mo}mo ago`;
  if (day >= 1) return `${day}d ago`;
  if (hr  >= 1) return `${hr}h ago`;
  if (min >= 1) return `${min}m ago`;
  return 'just now';
}

/**
 * Escape HTML to prevent XSS
 */
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Build a single project card HTML string
 */
function buildCard(repo, index) {
  const name        = esc(repo.name);
  const description = repo.description ? esc(repo.description) : '<em>No description provided.</em>';
  const lang        = repo.language     ? esc(repo.language)     : null;
  const stars       = repo.stargazers_count || 0;
  const forks       = repo.forks_count      || 0;
  const updated     = relativeTime(repo.updated_at);
  const url         = esc(repo.html_url);
  const langColor   = lang ? getLangColor(repo.language) : '#8b949e';
  const langSlug    = lang ? lang.replace(/\s+/g, '\\ ') : 'default';

  return `
    <article class="project-card" role="listitem" style="animation-delay: ${index * 0.06}s;">
      <div class="project-header">
        <span class="project-name">${name}</span>
        <a href="${url}" target="_blank" rel="noopener noreferrer" class="project-link-icon" aria-label="View ${name} on GitHub">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
      </div>
      <p class="project-description">${description}</p>
      <div class="project-meta">
        ${lang ? `
        <span class="project-lang">
          <span class="lang-dot" style="background:${langColor}" aria-hidden="true"></span>
          ${lang}
        </span>` : ''}
        ${stars > 0 ? `
        <span class="project-stat" aria-label="${stars} stars">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          ${stars}
        </span>` : ''}
        ${forks > 0 ? `
        <span class="project-stat" aria-label="${forks} forks">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>
          ${forks}
        </span>` : ''}
        <span class="project-updated" aria-label="Updated ${updated}">${updated}</span>
      </div>
    </article>
  `;
}

/**
 * Fallback content when API is unavailable
 */
function renderFallback(message) {
  container.innerHTML = `
    <div class="projects-error">
      <p>⚠️ ${esc(message)}</p>
      <p style="margin-top:0.5rem;">
        View all repositories directly at
        <a href="https://github.com/${GITHUB_USER}" target="_blank" rel="noopener noreferrer">
          github.com/${GITHUB_USER}
        </a>
      </p>
    </div>
  `;
}

/**
 * Fetch and render repos
 */
async function loadRepos() {
  // Keep loading state visible for at least a moment
  try {
    const response = await fetch(API_URL, {
      headers: { 'Accept': 'application/vnd.github+json' }
    });

    if (!response.ok) {
      const rateLimited = response.status === 403;
      renderFallback(
        rateLimited
          ? 'GitHub API rate limit reached. Please try again in a minute.'
          : `GitHub API returned status ${response.status}. Please try refreshing.`
      );
      return;
    }

    const repos = await response.json();

    if (!Array.isArray(repos) || repos.length === 0) {
      renderFallback('No public repositories found.');
      return;
    }

    // Sort: pinned-ish heuristic (stars desc, then updated desc)
    const sorted = repos
      .filter(r => !r.fork) // hide forks; remove this line to show forks
      .sort((a, b) => {
        if (b.stargazers_count !== a.stargazers_count)
          return b.stargazers_count - a.stargazers_count;
        return new Date(b.updated_at) - new Date(a.updated_at);
      });

    const html = sorted.map((repo, i) => buildCard(repo, i)).join('');
    container.innerHTML = html;

    // Re-observe newly created cards for fade-up
    container.querySelectorAll('.project-card').forEach(card => {
      card.classList.add('fade-up');
      observer.observe(card);
    });

  } catch (err) {
    console.warn('Portfolio: GitHub API fetch failed:', err);
    renderFallback('Unable to reach GitHub API. Please check your connection or visit the link below.');
  }
}

loadRepos();

/* ── Active nav link on scroll ──────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a, .nav-mobile a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}`
          ? 'var(--text-primary)'
          : '';
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => navObserver.observe(s));
