// main.js
// Handles small interactive pieces: nav toggle, footer year, contact form validation

document.addEventListener('DOMContentLoaded', () => {
  // Footer years (for all pages)
  const years = document.querySelectorAll('[id^="year"]');
  years.forEach(el => el.textContent = new Date().getFullYear());

  // Nav toggle (reusable for each page)
  document.querySelectorAll('.nav-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      // Use the next nav in the header
      const header = btn.closest('.header-inner');
      const nav = header.querySelector('.primary-nav');
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      // Toggle visible state on nav via aria-hidden (matches CSS)
      const visible = nav.getAttribute('aria-hidden') === 'false';
      nav.setAttribute('aria-hidden', String(!visible));
    });
  });

  // Contact form validation (if present)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      // Name
      const name = document.getElementById('name');
      const nameErr = document.getElementById('nameErr');
      if (!name.value.trim() || name.value.trim().length < 2) {
        nameErr.textContent = 'Please enter your name (min 2 chars).';
        valid = false;
      } else {
        nameErr.textContent = '';
      }

      // Email
      const email = document.getElementById('email');
      const emailErr = document.getElementById('emailErr');
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(email.value.trim())) {
        emailErr.textContent = 'Please enter a valid email.';
        valid = false;
      } else {
        emailErr.textContent = '';
      }

      // Message (optional)
      const message = document.getElementById('message');
      const msgErr = document.getElementById('msgErr');
      if (message.value.length > 500) {
        msgErr.textContent = 'Message too long (max 500 chars).';
        valid = false;
      } else {
        msgErr.textContent = '';
      }

      const status = document.getElementById('formStatus');
      if (valid) {
        // Simulate send — replace with real API or form handler when ready
        status.textContent = 'Message ready to send (demo).';
        status.style.color = 'green';
        contactForm.reset();
      } else {
        status.textContent = 'Please fix the errors above.';
        status.style.color = 'crimson';
      }
    });
  }

  // Accessibility: Hide navs initially for mobile
  document.querySelectorAll('.primary-nav').forEach(nav => {
    if (!nav.hasAttribute('aria-hidden')) nav.setAttribute('aria-hidden','true');
  });
});
