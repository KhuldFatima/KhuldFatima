// Theme Toggle (Pastel vs Cyber SOC Mode)
const themeToggle = document.getElementById('themeToggle');
const htmlEl = document.documentElement;

// Restore saved theme or default to pastel
const currentTheme = localStorage.getItem('kf_theme') || 'pastel';
htmlEl.setAttribute('data-theme', currentTheme);
updateToggleUI(currentTheme);

themeToggle.addEventListener('click', () => {
  const nextTheme = htmlEl.getAttribute('data-theme') === 'pastel' ? 'cyber' : 'pastel';
  htmlEl.setAttribute('data-theme', nextTheme);
  localStorage.setItem('kf_theme', nextTheme);
  updateToggleUI(nextTheme);
});

function updateToggleUI(theme) {
  const icon = themeToggle.querySelector('.theme-icon');
  const label = themeToggle.querySelector('.theme-label');
  if (theme === 'cyber') {
    icon.textContent = '🌸';
    label.textContent = 'Pastel Mode';
  } else {
    icon.textContent = '⚡';
    label.textContent = 'SOC Mode';
  }
}

// Mobile Nav Toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close menu upon item selection
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
  });
});

// Active section highlight
const sections = document.querySelectorAll('main section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        const isMatch = a.getAttribute('href') === `#${id}`;
        a.style.color = isMatch ? 'var(--accent-primary)' : '';
      });
    }
  });
}, { rootMargin: '-30% 0px -60% 0px' });

sections.forEach(section => observer.observe(section));