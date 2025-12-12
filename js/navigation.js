/* ===================================
   Terro AI - Navigation JavaScript
   =================================== */

function initNavigation() {
  const header = document.querySelector('.header');
  const menuBtn = document.querySelector('.header__menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav__link');
  const navLinks = document.querySelectorAll('.nav__link');

  // Mobile menu toggle
  function toggleMobileMenu() {
    const isOpen = mobileNav?.classList.contains('open');

    menuBtn?.classList.toggle('active', !isOpen);
    mobileNav?.classList.toggle('open', !isOpen);
    mobileNavOverlay?.classList.toggle('open', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen);
  }

  function closeMobileMenu() {
    menuBtn?.classList.remove('active');
    mobileNav?.classList.remove('open');
    mobileNavOverlay?.classList.remove('open');
    document.body.classList.remove('menu-open');
  }

  // Event listeners for mobile menu
  menuBtn?.addEventListener('click', toggleMobileMenu);
  mobileNavOverlay?.addEventListener('click', closeMobileMenu);

  // Close menu when clicking a link
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav?.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  // Sticky header on scroll
  function handleScroll() {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }

  // Throttled scroll handler
  const throttledScroll = window.TerroUtils?.throttle(handleScroll, 10) || handleScroll;
  window.addEventListener('scroll', throttledScroll, { passive: true });

  // Initial check
  handleScroll();

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      // Skip if it's just "#"
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();

        const headerHeight = header?.offsetHeight || 80;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        closeMobileMenu();
      }
    });
  });

  // Active link highlighting based on current page
  function highlightActiveLink() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';

    [...navLinks, ...mobileNavLinks].forEach(link => {
      const linkPath = link.getAttribute('href');
      const linkPage = linkPath?.split('/').pop();

      link.classList.remove('active');

      if (linkPage === currentPage ||
          (currentPage === '' && linkPage === 'index.html') ||
          (currentPage === 'index.html' && linkPage === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  highlightActiveLink();

  // Active section highlighting on scroll (for single-page sections)
  function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        document.querySelectorAll(`.nav__link[href="#${sectionId}"], .mobile-nav__link[href="#${sectionId}"]`)
          .forEach(link => link.classList.add('active'));
      } else {
        document.querySelectorAll(`.nav__link[href="#${sectionId}"], .mobile-nav__link[href="#${sectionId}"]`)
          .forEach(link => link.classList.remove('active'));
      }
    });
  }

  // Only run section highlighting if there are sections with IDs
  if (document.querySelectorAll('section[id]').length > 0) {
    window.addEventListener('scroll', window.TerroUtils?.throttle(highlightActiveSection, 100) || highlightActiveSection, { passive: true });
  }
}

// Make available globally
window.initNavigation = initNavigation;
