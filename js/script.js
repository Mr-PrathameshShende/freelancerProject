/* ============================================
   INITIALIZATION
   ============================================ */
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupThemeToggle();
    setupMobileMenu();
    setupScrollProgress();
    setupBackToTop();
    setupFloatingButtons();
    setupContactForm();
    setupPortfolioFilters();
    setupCostEstimator();
    setupStatistics();
    setupExitIntent();
    setupNewsletterForm();
    setupProjectModal();
    setupLazyLoading();
    setupSmoothScroll();
    prefillForm();
    setupFormAutoSave();
}

/* ============================================
   THEME TOGGLE (Dark Mode)
   ============================================ */
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    if(themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
    
    function setTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            html.setAttribute('data-theme', 'dark');
            updateThemeIcon('☀️');
        } else {
            document.body.classList.remove('dark-mode');
            html.setAttribute('data-theme', 'light');
            updateThemeIcon('🌙');
        }
    }
    
    function updateThemeIcon(icon) {
        if (themeToggle) themeToggle.textContent = icon;
    }
}

/* ============================================
   MOBILE MENU TOGGLE
   ============================================ */
function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active') ? 'true' : 'false');
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
}

/* ============================================
   SCROLL PROGRESS INDICATOR
   ============================================ */
function setupScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (!scrollProgress) return;
    
    window.addEventListener('scroll', debounce(() => {
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollProgress.style.width = scrollPercentage + '%';
    }, 10));
}

/* ============================================
   BACK TO TOP BUTTON
   ============================================ */
function setupBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;
    
    window.addEventListener('scroll', debounce(() => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }, 50));
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ============================================
   FLOATING BUTTONS
   ============================================ */
function setupFloatingButtons() {
    const whatsappButton = document.querySelector('.whatsapp-button');
    
    if (whatsappButton) {
        whatsappButton.classList.add('show');
    }
}

/* ============================================
   PROJECT MODAL (Updated for Custom Vanilla JS)
   ============================================ */
function setupProjectModal() {
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const projectModal = document.getElementById('project-modal');
    
    if (!projectModal || modalTriggers.length === 0) return;
    
    const modalClose = projectModal.querySelector('.modal-close');
    const titleEl = document.getElementById('modal-display-title');
    const overviewEl = document.getElementById('modal-display-overview');
    const problemEl = document.getElementById('modal-display-problem');
    const featuresEl = document.getElementById('modal-display-features');
    const stackEl = document.getElementById('modal-display-stack');
    const processEl = document.getElementById('modal-display-process');
    const repoEl = document.getElementById('modal-display-repo');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = trigger.getAttribute('data-project');
            const dataEl = document.querySelector(`.modal-data[data-id="${projectId}"]`);
            
            if (dataEl) {
                if(titleEl) titleEl.textContent = dataEl.querySelector('.modal-title').textContent;
                if(overviewEl) overviewEl.textContent = dataEl.querySelector('.modal-overview').textContent;
                if(problemEl) problemEl.textContent = dataEl.querySelector('.modal-problem').textContent;
                if(stackEl) stackEl.textContent = dataEl.querySelector('.modal-stack').textContent;
                if(processEl) processEl.textContent = dataEl.querySelector('.modal-process').textContent;
                
                if(featuresEl) {
                    featuresEl.innerHTML = '';
                    const listItems = dataEl.querySelectorAll('.modal-features li');
                    listItems.forEach(li => {
                        const newLi = document.createElement('li');
                        newLi.textContent = li.textContent;
                        featuresEl.appendChild(newLi);
                    });
                }

                if(repoEl) {
                    const repoData = dataEl.querySelector('.modal-repo');
                    if(repoData && repoData.href) {
                        repoEl.href = repoData.href;
                        repoEl.style.display = 'inline-block';
                    } else {
                        repoEl.style.display = 'none';
                    }
                }

                projectModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if(modalClose) {
        modalClose.addEventListener('click', () => {
            projectModal.style.display = 'none';
            document.body.style.overflow = '';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            projectModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
}

/* ============================================
   CONTACT FORM VALIDATION & SUBMISSION
   ============================================ */
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    const phone = document.getElementById('phone');
if (phone) phone.addEventListener('blur', () => validatePhone(phone));
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const projectType = document.getElementById('project_type');
    const projectDesc = document.getElementById('projectDescription');
    
    if (fullName) fullName.addEventListener('blur', () => validateName(fullName));
    if (email) email.addEventListener('blur', () => validateEmail(email));
    if (projectType) projectType.addEventListener('blur', () => validateSelect(projectType, 'serviceError'));
    if (projectDesc) projectDesc.addEventListener('blur', () => validateProjectDescription(projectDesc));
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateAllFields()) {
            submitContactForm(contactForm);
        }
    });
}

function validateName(input) {
    const error = document.getElementById('fullNameError');
    const value = input.value.trim();
    if (!value) return showError(input, error, 'Name is required');
    if (value.length < 2) return showError(input, error, 'Name must be at least 2 characters');
    return clearError(input, error);
}

function validateEmail(input) {
    const error = document.getElementById('emailError');
    const value = input.value.trim();
    if (!value) return showError(input, error, 'Email is required');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return showError(input, error, 'Please enter a valid email');
    return clearError(input, error);
}

function validateSelect(input, errorId) {
    const error = document.getElementById(errorId);
    if (!input.value) return showError(input, error, 'Please select an option');
    return clearError(input, error);
}

function validateProjectDescription(input) {
    const error = document.getElementById('projectDescriptionError');
    const value = input.value.trim();
    if (!value) return showError(input, error, 'Project description is required');
    if (value.length < 10) return showError(input, error, 'Please provide more details (min 10 characters)');
    return clearError(input, error);
}

function validatePhone(input) {
    const error = document.getElementById('phoneError');
    const value = input.value.trim().replace(/\D/g, ''); 
    
    if (!value && !input.hasAttribute('required')) {
        return clearError(input, error);
    }

    if (!value) {
        return showError(input, error, 'Phone number is required');
    }

    // Checks for exactly 10 digits, starting with 7, 8, or 9
    const phoneRegex = /^[6789]\d{9}$/;
    if (!phoneRegex.test(value)) {
        return showError(input, error, 'Phone must be 10 digits and start with 6,7, 8, or 9');
    }
    
    return clearError(input, error);
}

function validateAllFields() {
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const projectType = document.getElementById('project_type');
    const projectDesc = document.getElementById('projectDescription');
    const phone = document.getElementById('phone');
    
    let isValid = true;
    if (fullName && !validateName(fullName)) isValid = false;
    if (email && !validateEmail(email)) isValid = false;
    if (projectType && !validateSelect(projectType, 'serviceError')) isValid = false;
    if (projectDesc && !validateProjectDescription(projectDesc)) isValid = false;
    if (phone && !validatePhone(phone)) isValid = false;
    
    return isValid;
}

function showError(input, errorElement, message) {
    if (input) input.style.borderColor = 'var(--danger-color)';
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
    return false;
}

function clearError(input, errorElement) {
    if (input) input.style.borderColor = '';
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
    return true;
}

function submitContactForm(form) {
    const loader = document.getElementById('loader');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    if (loader) loader.classList.add('show');
    if (submitBtn) submitBtn.disabled = true;
    
    const formData = new FormData(form);
    const data = {
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        phone: formData.get('phone') || 'Not provided',
        project_type: formData.get('project_type'),
        budget: formData.get('budget') || 'Not specified',
        timeline: formData.get('timeline') || 'Not specified',
        message: formData.get('projectDescription'),
        reference: formData.get('reference') || 'None',
        notes: formData.get('notes') || 'None'
    };
    
    saveFormData(data);
    
    if (typeof emailjs === 'undefined' || !emailjs.send) {
        console.error('EmailJS not available');
        handleFallback(form, data, submitBtn, loader);
        return;
    }
    
    // Send primary email to you
    emailjs.send('service_7d3rmkp', 'template_j89v3iu', data)
        .then(() => {
            if (loader) loader.classList.remove('show');
            if (submitBtn) submitBtn.disabled = false;
            
            showSuccessToast('Project inquiry sent successfully! I\'ll be in touch soon.');
            form.reset();
            localStorage.removeItem('formDraft');
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'generate_lead', {
                    'form_name': 'lead_gen_form',
                    'project_type': data.project_type
                });
            }
        })
        .catch((error) => {
            console.error('EmailJS error:', error);
            handleFallback(form, data, submitBtn, loader);
        });
}

function handleFallback(form, data, submitBtn, loader) {
    if (loader) loader.classList.remove('show');
    if (submitBtn) submitBtn.disabled = false;
    
    const leads = JSON.parse(localStorage.getItem('leads') || '[]');
    leads.push({ ...data, timestamp: new Date().toISOString(), status: 'email_failed' });
    localStorage.setItem('leads', JSON.stringify(leads));
    
    showSuccessToast('Your inquiry was saved. I\'ll review it and get back to you shortly!');
    form.reset();
    localStorage.removeItem('formDraft');
}

function saveFormData(data) {
    const leads = JSON.parse(localStorage.getItem('leads') || '[]');
    leads.push({ ...data, timestamp: new Date().toISOString() });
    localStorage.setItem('leads', JSON.stringify(leads));
}

/* ============================================
   PORTFOLIO FILTERS
   ============================================ */
function setupPortfolioFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
            
            filterPortfolioItems(btn.getAttribute('data-filter'));
        });
    });
}

function filterPortfolioItems(category) {
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            setTimeout(() => card.style.opacity = '1', 10);
        } else {
            card.style.opacity = '0';
            setTimeout(() => card.style.display = 'none', 300);
        }
    });
}

/* ============================================
   COST ESTIMATOR
   ============================================ */
function setupCostEstimator() {
    const websiteType = document.getElementById('website-type');
    const pageCount = document.getElementById('page-count');
    const featureCheckboxes = document.querySelectorAll('.features-checkboxes input');
    
    if (!websiteType) return;
    
    [websiteType, pageCount, ...featureCheckboxes].forEach(element => {
        element.addEventListener('change', calculateCost);
    });
}

function calculateCost() {
    const websiteType = document.getElementById('website-type');
    const pageCount = document.getElementById('page-count');
    const featureCheckboxes = document.querySelectorAll('.features-checkboxes input:checked');
    const estimatedCostEl = document.getElementById('estimated-cost');
    
    if (!websiteType || !pageCount || !estimatedCostEl) return;
    
    let baseCost = parseInt(websiteType.value) || 0;
    let pagesCost = parseInt(pageCount.value) || 0;
    let featureCost = 0;
    
    featureCheckboxes.forEach(checkbox => { featureCost += parseInt(checkbox.value) || 0; });
    
    estimatedCostEl.textContent = '$' + (baseCost + pagesCost + featureCost).toLocaleString();
}

/* ============================================
   STATISTICS ANIMATION
   ============================================ */
function setupStatistics() {
    const stats = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.stats-section');
    
    if (stats.length === 0 || !statsSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateCountUp(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

function animateCountUp(element) {
    const target = parseInt(element.getAttribute('data-target')) || 0;
    const duration = 2000;
    const startTime = Date.now();
    
    function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        element.textContent = Math.floor((target) * progress);
        
        if (progress < 1) requestAnimationFrame(update);
    }
    update();
}

/* ============================================
   EXIT INTENT POPUP
   ============================================ */
function setupExitIntent() {
    const exitPopup = document.getElementById('exitPopup');
    const exitPopupClose = document.getElementById('exitPopupClose');
    const exitPopupDismiss = document.getElementById('exitPopupDismiss');
    
    if (!exitPopup) return;
    
    let exitIntentTriggered = false;
    
    document.addEventListener('mouseout', (e) => {
        if (e.clientY <= 0 && !exitIntentTriggered && window.scrollY > 500) {
            exitIntentTriggered = true;
            exitPopup.classList.add('show');
        }
    });
    
    if (exitPopupClose) exitPopupClose.addEventListener('click', () => exitPopup.classList.remove('show'));
    if (exitPopupDismiss) exitPopupDismiss.addEventListener('click', () => exitPopup.classList.remove('show'));
    exitPopup.addEventListener('click', (e) => { if (e.target === exitPopup) exitPopup.classList.remove('show'); });
}

/* ============================================
   NEWSLETTER FORM
   ============================================ */
/* ============================================
   NEWSLETTER FORM
   ============================================ */
function setupNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        const submitBtn = newsletterForm.querySelector('button[type="submit"]');
        
        // Save locally
        const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
        if (!subscribers.includes(email)) {
            subscribers.push(email);
            localStorage.setItem('subscribers', JSON.stringify(subscribers));
        }
        
        if (submitBtn) submitBtn.disabled = true;

        // Send EmailJS Notification
        if (typeof emailjs !== 'undefined' && emailjs.send) {
            /* 
               IMPORTANT: Create a new template in EmailJS for the welcome email.
               Set the "To Email" field in EmailJS to {{user_email}}
               Replace 'YOUR_NEWSLETTER_TEMPLATE_ID' with your new template ID.
            */
            emailjs.send('service_7d3rmkp', 'template_0ividtf', {
                user_email: email
            }).then(() => {
                showSuccessToast('Subscribed successfully! Check your email.');
                newsletterForm.reset();
                if (submitBtn) submitBtn.disabled = false;
            }).catch((error) => {
                console.error('Newsletter email failed:', error);
                showSuccessToast('Thank you for subscribing!');
                newsletterForm.reset();
                if (submitBtn) submitBtn.disabled = false;
            });
        } else {
            showSuccessToast('Thank you for subscribing!');
            newsletterForm.reset();
            if (submitBtn) submitBtn.disabled = false;
        }
    });
}
/* ============================================
   TOAST NOTIFICATIONS
   ============================================ */
function showSuccessToast(message) {
    const toast = document.getElementById('successToast');
    if (!toast) return;
    const toastMessage = toast.querySelector('.toast-message');
    if (toastMessage) toastMessage.textContent = message;
    
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ============================================
   LAZY LOADING
   ============================================ */
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if(img.dataset.src) img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

/* ============================================
   SMOOTH SCROLL
   ============================================ */
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */
function getUrlParam(param) {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(param);
}

function prefillForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    const serviceParam = getUrlParam('service');
    if (serviceParam) {
        const typeSelect = document.getElementById('project_type');
        if (typeSelect) {
            const optionExists = Array.from(typeSelect.options).some(opt => opt.value === serviceParam);
            typeSelect.value = optionExists ? serviceParam : 'other';
        }
    }
}

function setupFormAutoSave() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    const savedData = localStorage.getItem('formDraft');
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            Object.keys(data).forEach(key => {
                const field = contactForm.querySelector(`[name="${key}"]`);
                if (field) field.value = data[key];
            });
        } catch(e) {}
    }
    
    contactForm.addEventListener('input', () => {
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        localStorage.setItem('formDraft', JSON.stringify(data));
    });
}

function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay, .exit-popup').forEach(el => {
            el.style.display = 'none';
            el.classList.remove('show');
        });
        document.body.style.overflow = '';
    }
});