/* ===================================
   Terro AI - Animations JavaScript
   =================================== */

function initAnimations() {
  // Scroll-triggered animations using Intersection Observer
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  if (animatedElements.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  animatedElements.forEach((el, index) => {
    // Add stagger delay for siblings
    if (!el.hasAttribute('data-delay')) {
      const parent = el.parentElement;
      const siblings = parent?.querySelectorAll('.animate-on-scroll');
      if (siblings && siblings.length > 1) {
        const siblingIndex = Array.from(siblings).indexOf(el);
        if (siblingIndex > 0 && siblingIndex <= 5) {
          el.setAttribute('data-delay', siblingIndex.toString());
        }
      }
    }
    observer.observe(el);
  });

  // Number counting animation for stats
  initCountingAnimation();
}

// Counting animation for statistics
function initCountingAnimation() {
  const stats = document.querySelectorAll('[data-count]');

  if (stats.length === 0) return;

  const countObserverOptions = {
    root: null,
    threshold: 0.5
  };

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  }, countObserverOptions);

  stats.forEach(stat => countObserver.observe(stat));
}

function animateCount(element) {
  const target = parseFloat(element.getAttribute('data-count')) || 0;
  const suffix = element.getAttribute('data-suffix') || '';
  const prefix = element.getAttribute('data-prefix') || '';
  const duration = parseInt(element.getAttribute('data-duration')) || 2000;
  const decimals = parseInt(element.getAttribute('data-decimals')) || 0;

  const startTime = performance.now();
  const startValue = 0;

  function updateCount(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function (ease-out)
    const easedProgress = 1 - Math.pow(1 - progress, 3);

    const currentValue = startValue + (target - startValue) * easedProgress;
    const displayValue = decimals > 0
      ? currentValue.toFixed(decimals)
      : Math.floor(currentValue);

    element.textContent = prefix + displayValue + suffix;

    if (progress < 1) {
      requestAnimationFrame(updateCount);
    }
  }

  requestAnimationFrame(updateCount);
}

// Parallax effect for hero backgrounds
function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');

  if (parallaxElements.length === 0) return;

  function updateParallax() {
    const scrollY = window.scrollY;

    parallaxElements.forEach(el => {
      const speed = parseFloat(el.getAttribute('data-parallax')) || 0.5;
      const offset = scrollY * speed;
      el.style.transform = `translateY(${offset}px)`;
    });
  }

  window.addEventListener('scroll', window.TerroUtils?.throttle(updateParallax, 10) || updateParallax, { passive: true });
}

// Hero gradient animation
function initHeroGradient() {
  const heroBackground = document.querySelector('.hero__background');

  if (!heroBackground) return;

  let angle = 135;
  let direction = 1;

  function animateGradient() {
    angle += direction * 0.1;

    if (angle >= 180 || angle <= 90) {
      direction *= -1;
    }

    heroBackground.style.background = `linear-gradient(${angle}deg,
      rgba(0, 212, 255, 0.1) 0%,
      rgba(139, 92, 246, 0.1) 50%,
      rgba(255, 61, 113, 0.1) 100%)`;

    requestAnimationFrame(animateGradient);
  }

  // Start animation
  animateGradient();
}

// Floating elements animation
function initFloatingElements() {
  const floatingElements = document.querySelectorAll('.floating-element');

  floatingElements.forEach((el, index) => {
    const delay = index * 0.5;
    el.style.animationDelay = `${delay}s`;
  });
}

// Make available globally
window.initAnimations = initAnimations;
window.animateCount = animateCount;
