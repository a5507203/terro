/* ===================================
   Terro AI - Main JavaScript
   =================================== */

// Utility Functions
const debounce = (func, wait = 100) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const throttle = (func, limit = 100) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Initialize all modules when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize navigation
  if (typeof initNavigation === 'function') {
    initNavigation();
  }

  // Initialize animations
  if (typeof initAnimations === 'function') {
    initAnimations();
  }

  // Initialize contact form if on contact page
  if (typeof initContactForm === 'function') {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      initContactForm();
    }
  }

  // Initialize accordions
  initAccordions();

  // Initialize use case cards
  initUseCaseCards();

  console.log('Terro AI website initialized');
});

// Accordion functionality
function initAccordions() {
  const accordions = document.querySelectorAll('.accordion');

  accordions.forEach(accordion => {
    const items = accordion.querySelectorAll('.accordion__item');

    items.forEach(item => {
      const header = item.querySelector('.accordion__header');

      header?.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close all items in this accordion
        items.forEach(i => i.classList.remove('open'));

        // Open clicked item if it wasn't open
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    });
  });
}

// Use case card expand/collapse
function initUseCaseCards() {
  const cards = document.querySelectorAll('.use-case-card');

  cards.forEach(card => {
    const header = card.querySelector('.use-case-card__header');

    header?.addEventListener('click', () => {
      card.classList.toggle('open');
    });
  });
}

// Export utilities for other modules
window.TerroUtils = {
  debounce,
  throttle
};
