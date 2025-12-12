/* ===================================
   Terro AI - Contact Form JavaScript
   =================================== */

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const fields = {
    name: form.querySelector('#name'),
    email: form.querySelector('#email'),
    company: form.querySelector('#company'),
    phone: form.querySelector('#phone'),
    inquiryType: form.querySelector('#inquiry-type'),
    message: form.querySelector('#message')
  };

  const submitBtn = form.querySelector('button[type="submit"]');
  const successMessage = document.querySelector('.form-success-message');

  // Validation patterns
  const patterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\./0-9]*$/
  };

  // Clear error on input
  Object.values(fields).forEach(field => {
    if (!field) return;

    field.addEventListener('input', () => {
      clearFieldError(field);
    });

    field.addEventListener('blur', () => {
      validateField(field);
    });
  });

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all fields
    let isValid = true;
    Object.values(fields).forEach(field => {
      if (field && !validateField(field)) {
        isValid = false;
      }
    });

    if (!isValid) {
      // Scroll to first error
      const firstError = form.querySelector('.form-input.error, .form-textarea.error, .form-select.error');
      if (firstError) {
        firstError.focus();
      }
      return;
    }

    // Show loading state
    setLoadingState(true);

    try {
      // Simulate form submission (replace with actual API call)
      await simulateSubmission();

      // Show success message
      form.classList.add('hidden');
      successMessage?.classList.remove('hidden');

      // Reset form
      form.reset();

    } catch (error) {
      // Show error message
      showFormError('Something went wrong. Please try again.');
    } finally {
      setLoadingState(false);
    }
  });

  function validateField(field) {
    if (!field) return true;

    const value = field.value.trim();
    const fieldName = field.getAttribute('name') || field.getAttribute('id');
    const isRequired = field.hasAttribute('required');

    // Clear existing error
    clearFieldError(field);

    // Required field check
    if (isRequired && !value) {
      showFieldError(field, `${formatFieldName(fieldName)} is required`);
      return false;
    }

    // Email validation
    if (fieldName === 'email' && value && !patterns.email.test(value)) {
      showFieldError(field, 'Please enter a valid email address');
      return false;
    }

    // Phone validation (if provided)
    if (fieldName === 'phone' && value && !patterns.phone.test(value)) {
      showFieldError(field, 'Please enter a valid phone number');
      return false;
    }

    // Message minimum length
    if (fieldName === 'message' && value && value.length < 10) {
      showFieldError(field, 'Message must be at least 10 characters');
      return false;
    }

    // Mark as valid
    field.classList.add('success');
    return true;
  }

  function showFieldError(field, message) {
    field.classList.remove('success');
    field.classList.add('error');

    // Remove existing error message
    const existingError = field.parentElement?.querySelector('.form-error');
    if (existingError) {
      existingError.remove();
    }

    // Add error message
    const errorEl = document.createElement('p');
    errorEl.className = 'form-error';
    errorEl.textContent = message;
    field.parentElement?.appendChild(errorEl);
  }

  function clearFieldError(field) {
    field.classList.remove('error', 'success');
    const errorEl = field.parentElement?.querySelector('.form-error');
    if (errorEl) {
      errorEl.remove();
    }
  }

  function showFormError(message) {
    // Create or update form-level error
    let formError = form.querySelector('.form-error-global');
    if (!formError) {
      formError = document.createElement('div');
      formError.className = 'form-error-global';
      formError.style.cssText = `
        background: rgba(239, 68, 68, 0.1);
        border: 1px solid var(--color-error);
        border-radius: var(--radius-lg);
        padding: var(--space-4);
        margin-bottom: var(--space-4);
        color: var(--color-error);
        text-align: center;
      `;
      form.insertBefore(formError, form.firstChild);
    }
    formError.textContent = message;
  }

  function setLoadingState(loading) {
    if (!submitBtn) return;

    if (loading) {
      submitBtn.disabled = true;
      submitBtn.setAttribute('data-original-text', submitBtn.textContent);
      submitBtn.textContent = 'Sending...';
    } else {
      submitBtn.disabled = false;
      const originalText = submitBtn.getAttribute('data-original-text');
      if (originalText) {
        submitBtn.textContent = originalText;
      }
    }
  }

  function formatFieldName(name) {
    return name
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  }

  function simulateSubmission() {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
  }
}

// Make available globally
window.initContactForm = initContactForm;
