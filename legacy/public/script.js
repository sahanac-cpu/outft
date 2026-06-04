// outft· frontend logic

document.addEventListener('DOMContentLoaded', () => {
  initForms();
  initScrollAnimations();
  initNavScroll();
  initVoteAnimation();
});

// ============================================
// Email Signup
// ============================================

function initForms() {
  const forms = [
    { form: 'hero-form', input: 'hero-email', msg: 'hero-msg' },
    { form: 'cta-form', input: 'cta-email', msg: 'cta-msg' }
  ];

  forms.forEach(({ form, input, msg }) => {
    const formEl = document.getElementById(form);
    const inputEl = document.getElementById(input);
    const msgEl = document.getElementById(msg);

    if (!formEl) return;

    formEl.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = inputEl.value.trim();

      if (!email) return;

      const button = formEl.querySelector('button');
      const originalText = button.querySelector('.btn-text').textContent;
      button.querySelector('.btn-text').textContent = '...';
      button.disabled = true;

      try {
        const res = await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });

        const data = await res.json();

        if (res.ok) {
          msgEl.textContent = 'you\'re on the list. we\'ll be in touch.';
          msgEl.className = 'form-msg success';
          inputEl.value = '';

          // Subtle celebration
          button.querySelector('.btn-text').textContent = '✓';
          setTimeout(() => {
            button.querySelector('.btn-text').textContent = originalText;
            button.disabled = false;
          }, 2000);

          // Update counter
          incrementCounter();
        } else {
          msgEl.textContent = data.error || 'something went wrong';
          msgEl.className = 'form-msg error';
          button.querySelector('.btn-text').textContent = originalText;
          button.disabled = false;
        }
      } catch (err) {
        msgEl.textContent = 'couldn\'t connect. try again.';
        msgEl.className = 'form-msg error';
        button.querySelector('.btn-text').textContent = originalText;
        button.disabled = false;
      }

      // Clear message after 5s
      setTimeout(() => {
        msgEl.textContent = '';
        msgEl.className = 'form-msg';
      }, 5000);
    });
  });
}

function incrementCounter() {
  const counter = document.getElementById('sub-count');
  if (!counter) return;

  const current = parseInt(counter.textContent.replace(/,/g, ''));
  const next = current + 1;
  counter.textContent = next.toLocaleString();
}

// ============================================
// Scroll Animations
// ============================================

function initScrollAnimations() {
  // Add fade-up class to elements
  const targets = document.querySelectorAll(
    '.section-label, .section-heading, .section-subtext, ' +
    '.feature-block, .rhythm-card, .ritual-card-highlight, ' +
    '.people-card, .screen-item, .lifetime-card, .position-row, ' +
    '.cta-title, .cta-sub, .signup-form-large, .rhythm-note'
  );

  targets.forEach((el, i) => {
    el.classList.add('fade-up');
    el.style.transitionDelay = `${(i % 4) * 0.08}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  targets.forEach(el => observer.observe(el));
}

// ============================================
// Nav Background on Scroll
// ============================================

function initNavScroll() {
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 60) {
      nav.style.borderBottomColor = 'rgba(255, 255, 255, 0.06)';
      nav.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
      nav.style.borderBottomColor = 'rgba(255, 255, 255, 0.04)';
      nav.style.background = 'rgba(10, 10, 10, 0.85)';
    }

    lastScroll = scrollY;
  }, { passive: true });
}

// ============================================
// Vote Bar Animation
// ============================================

function initVoteAnimation() {
  const voteBars = document.querySelectorAll('.vote-bar');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate from 0 to target width
        const target = entry.target;
        const finalWidth = target.style.getPropertyValue('--width');
        target.style.setProperty('--width', '0%');

        requestAnimationFrame(() => {
          setTimeout(() => {
            target.style.setProperty('--width', finalWidth);
          }, 200);
        });
      }
    });
  }, { threshold: 0.5 });

  voteBars.forEach(bar => observer.observe(bar));
}

// ============================================
// Smooth anchor scrolling
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
