/* ============================================
   SHIVA REGMI - REAL ESTATE WEBSITE
   JavaScript - Interactivity & Forms
   ============================================ */

// ============================================
// DOM ELEMENTS
// ============================================

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const scrollToContact = document.getElementById('scrollToContact');
const scrollToProperties = document.getElementById('scrollToProperties');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// ============================================
// MOBILE MENU TOGGLE
// ============================================

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ============================================
// SMOOTH SCROLL FUNCTIONALITY
// ============================================

scrollToContact.addEventListener('click', (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

scrollToProperties.addEventListener('click', (e) => {
    e.preventDefault();
    const propertiesSection = document.getElementById('properties');
    propertiesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Enhanced smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// CONTACT FORM HANDLING
// ============================================

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value.trim();
    
    // Validate form
    if (!validateForm(name, email, subject, message)) {
        showFormMessage('Please fill in all required fields correctly.', 'error');
        return;
    }
    
    // Create mailto link (for client-side form submission)
    const mailtoLink = `mailto:realtor.regmi@gmail.com?subject=New Inquiry - ${encodeURIComponent(subject)}&body=${encodeURIComponent(createEmailBody(name, email, phone, subject, message))}`;
    
    try {
        // Show success message
        showFormMessage('Thank you! Your message has been prepared. Click the button below to send via email.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Open email client after a short delay
        setTimeout(() => {
            window.location.href = mailtoLink;
        }, 1500);
        
    } catch (error) {
        showFormMessage('An error occurred. Please try again.', 'error');
        console.error('Form submission error:', error);
    }
});

// Form validation function
function validateForm(name, email, subject, message) {
    // Check if all required fields are filled
    if (!name || !email || !subject || !message) {
        return false;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return false;
    }
    
    return true;
}

// Create email body
function createEmailBody(name, email, phone, subject, message) {
    let body = `Name: ${name}\n`;
    body += `Email: ${email}\n`;
    
    if (phone) {
        body += `Phone: ${phone}\n`;
    }
    
    body += `\nSubject: ${subject}\n\n`;
    body += `Message:\n${message}\n\n`;
    body += `---\nSent from Shiva Regmi Real Estate Website`;
    
    return body;
}

// Show form message
function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    
    // Auto-hide success message after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            formMessage.className = 'form-message';
        }, 5000);
    }
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .property-card, .service-card, .testimonial-card, .contact-card').forEach(el => {
    observer.observe(el);
});

// ============================================
// STICKY HEADER ON SCROLL
// ============================================

let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
    } else {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// ============================================
// ACTIVE NAV LINK HIGHLIGHTING
// ============================================

const navLink = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    // Find which section is in view
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    // Update active nav link
    navLink.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// PARALLAX EFFECT (Optional Enhancement)
// ============================================

const heroSection = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    if (window.innerWidth > 768) {
        const scrollPosition = window.pageYOffset;
        if (heroSection && scrollPosition < heroSection.offsetHeight) {
            heroSection.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
        }
    }
});

// ============================================
// LAZY LOADING IMAGES
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// PHONE NUMBER FORMATTING (Optional)
// ============================================

function formatPhoneNumber(input) {
    const phoneInput = input.replace(/\D/g, '');
    
    if (phoneInput.length >= 6) {
        return `(${phoneInput.slice(0, 3)}) ${phoneInput.slice(3, 6)}-${phoneInput.slice(6, 10)}`;
    } else if (phoneInput.length >= 3) {
        return `(${phoneInput.slice(0, 3)}) ${phoneInput.slice(3)}`;
    }
    
    return phoneInput;
}

const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        e.target.value = formatPhoneNumber(e.target.value);
    });
}

// ============================================
// KEYBOARD NAVIGATION SUPPORT
// ============================================

document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape key
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// ============================================
// PERFORMANCE MONITORING (Optional)
// ============================================

// Log page performance metrics
window.addEventListener('load', () => {
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page Load Time: ${pageLoadTime}ms`);
    }
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Smooth scroll to element
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Get current section in viewport
function getCurrentSection() {
    const sections = document.querySelectorAll('section');
    let currentSection = '';
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentSection = section.id;
        }
    });
    
    return currentSection;
}

// ============================================
// CONTACT FORM ENHANCEMENT
// ============================================

// Clear form message on input
const formInputs = contactForm.querySelectorAll('input, select, textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        formMessage.className = 'form-message';
    });
});

// ============================================
// ANALYTICS TRACKING (Optional - Add your tracking code here)
// ============================================

/*
Example:
- Track button clicks
- Track form submissions
- Track scroll depth
- Track time on page
*/

function trackEvent(eventName, eventData = {}) {
    // Add your analytics code here
    console.log(`Event: ${eventName}`, eventData);
}

// Track CTA button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('cta_click', { 
            buttonText: btn.textContent,
            buttonClass: btn.className
        });
    });
});

// Track form focus
contactForm.addEventListener('focus', () => {
    trackEvent('form_focus');
}, true);

// ============================================
// INITIALIZE
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Shiva Regmi Real Estate Website - Loaded Successfully');
    
    // Add any initialization code here
    initializeWebsite();
});

function initializeWebsite() {
    // Check if browser supports necessary features
    if (!('IntersectionObserver' in window)) {
        console.warn('IntersectionObserver not supported');
    }
    
    // Initialize animations
    const elements = document.querySelectorAll('[class*="fadeIn"]');
    elements.forEach(el => {
        el.style.opacity = '1';
    });
}

// ============================================
// ERROR HANDLING
// ============================================

window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    // You can send error logs to your server here
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
});
