/**
 * Portfolio JavaScript - Enhanced Static HTML Version
 * Features: Dark/Light Mode, Animations, Interactive Elements, Form Handling
 */

// ========================================
// GLOBAL VARIABLES & INITIALIZATION
// ========================================

let currentTheme = localStorage.getItem('theme') || 'dark';
let isNavOpen = false;
let isLoading = true;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// ========================================
// MAIN INITIALIZATION
// ========================================

function initializeApp() {
    // Initialize all components
    initializeLoading();
    initializeTheme();
    initializeNavigation();
    initializeCursor();
    initializeAnimations();
    initializeTypingEffect();
    initializeCounterAnimation();
    initializeSkillBars();
    initializeProjectFilters();
    initializeScrollEffects();
    initializeFormHandling();
    initializeParticles();
    initializeTooltips();
    
    console.log('Portfolio initialized successfully! 🚀');
}

// ========================================
// LOADING SCREEN
// ========================================

function initializeLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingTexts = [
        'Initializing Neural Networks...',
        'Loading Machine Learning Models...',
        'Connecting to Data Sources...',
        'Optimizing Performance...',
        'Ready to Launch! 🚀'
    ];
    
    let textIndex = 0;
    const loadingTextElement = document.querySelector('.loading-text');
    
    // Cycle through loading texts
    const textInterval = setInterval(() => {
        if (textIndex < loadingTexts.length - 1) {
            loadingTextElement.textContent = loadingTexts[++textIndex];
        } else {
            clearInterval(textInterval);
        }
    }, 800);
    
    // Hide loading screen after delay
    setTimeout(() => {
        loadingScreen.classList.add('hide');
        isLoading = false;
        
        // Trigger initial animations
        setTimeout(() => {
            triggerInitialAnimations();
        }, 500);
    }, 4000);
}

function triggerInitialAnimations() {
    const heroElements = document.querySelectorAll('.hero-content .animate-fade-in');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.animationDelay = `${index * 200}ms`;
            element.classList.add('visible');
        }, index * 100);
    });
}

// ========================================
// THEME MANAGEMENT
// ========================================

function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;
    
    // Set initial theme
    htmlElement.className = currentTheme;
    updateThemeIcon();
    
    // Theme toggle event
    themeToggle.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlElement.className = currentTheme;
        localStorage.setItem('theme', currentTheme);
        updateThemeIcon();
        
        // Add theme transition effect
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });
    
    function updateThemeIcon() {
        themeIcon.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// ========================================
// NAVIGATION
// ========================================

function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        isNavOpen = !isNavOpen;
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isNavOpen ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isNavOpen) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                isNavOpen = false;
            }
        });
    });
    
    // Smooth scrolling for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar scroll effect and active section highlighting
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Navbar background on scroll
        if (currentScrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollY = currentScrollY;
        
        // Highlight active navigation section
        highlightActiveSection();
    });
    
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }
}

// ========================================
// CURSOR EFFECTS
// ========================================

function initializeCursor() {
    const cursorFollower = document.getElementById('cursor-follower');
    const cursorDot = document.getElementById('cursor-dot');
    
    if (window.innerWidth > 768) {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;
        
        // Mouse move event
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Update cursor dot position immediately
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
            cursorDot.style.opacity = '1';
            cursorFollower.style.opacity = '1';
        });
        
        // Smooth following effect for cursor follower
        function updateCursorFollower() {
            const dx = mouseX - followerX;
            const dy = mouseY - followerY;
            
            followerX += dx * 0.1;
            followerY += dy * 0.1;
            
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
            
            requestAnimationFrame(updateCursorFollower);
        }
        updateCursorFollower();
        
        // Cursor effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .social-link');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorFollower.style.transform = 'scale(1.5)';
                cursorDot.style.transform = 'scale(2)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursorFollower.style.transform = 'scale(1)';
                cursorDot.style.transform = 'scale(1)';
            });
        });
    }
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll(
        '.animate-fade-in, .animate-slide-left, .animate-slide-right, .animate-slide-up'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ========================================
// TYPING EFFECT
// ========================================

function initializeTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    const phrases = [
        'Machine Learning Engineer',
        'Data Scientist',
        'AI Researcher',
        'FinTech Specialist',
        'Innovation Driver'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeText() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before next phrase
        }
        
        setTimeout(typeText, typingSpeed);
    }
    
    // Start typing effect after loading
    setTimeout(typeText, 1000);
}

// ========================================
// COUNTER ANIMATION
// ========================================

function initializeCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
    
    function animateCounter(element) {
        const target = parseInt(element.dataset.target);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    }
}

// ========================================
// SKILL BARS ANIMATION
// ========================================

function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.dataset.width;
                
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 500);
                
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// ========================================
// PROJECT FILTERS
// ========================================

function initializeProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const categories = card.dataset.category;
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.classList.remove('hidden');
                    card.style.display = 'block';
                } else {
                    card.classList.add('hidden');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ========================================
// SCROLL EFFECTS
// ========================================

function initializeScrollEffects() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        // Back to top button
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Back to top functionality
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Parallax effect for hero background
    const heroSection = document.querySelector('.hero-section');
    const particles = document.getElementById('particles');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        if (particles) {
            particles.style.transform = `translateY(${parallax}px)`;
        }
    });
}

// ========================================
// FORM HANDLING
// ========================================

function initializeFormHandling() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    async function handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('.form-submit');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            // Simulate form submission (replace with actual endpoint)
            await simulateFormSubmission(formData);
            
            // Success state
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = '#22c55e';
            
            // Show success notification
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Reset button after delay
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
            
        } catch (error) {
            // Error state
            submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Try Again';
            submitBtn.style.background = '#ef4444';
            
            // Show error notification
            showNotification('Failed to send message. Please try again.', 'error');
            
            // Reset button after delay
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }
    }
    
    function simulateFormSubmission(formData) {
        return new Promise((resolve, reject) => {
            // Simulate network delay
            setTimeout(() => {
                // Simulate success (you can add actual form submission logic here)
                resolve();
            }, 2000);
        });
    }
    
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#22c55e' : '#ef4444'};
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 12px;
            z-index: 9999;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            box-shadow: 0 8px 16px rgba(0,0,0,0.2);
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }
}

// ========================================
// PARTICLES SYSTEM
// ========================================

function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    if (!particlesContainer) return;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position and properties
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 10 + 5;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            background: var(--teal);
            border-radius: 50%;
            opacity: ${Math.random() * 0.5 + 0.3};
            animation: float ${duration}s ease-in-out infinite ${delay}s;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // Regenerate particles on resize
    window.addEventListener('resize', debounce(() => {
        particlesContainer.innerHTML = '';
        for (let i = 0; i < particleCount; i++) {
            createParticle();
        }
    }, 250));
}

// ========================================
// TOOLTIPS
// ========================================

function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
    
    function showTooltip(e) {
        const element = e.target;
        const tooltipText = element.dataset.tooltip;
        
        if (!tooltipText) return;
        
        const tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        tooltip.textContent = tooltipText;
        
        tooltip.style.cssText = `
            position: absolute;
            background: var(--navy);
            color: var(--white);
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 12px;
            white-space: nowrap;
            z-index: 9999;
            border: 1px solid var(--navy-lighter);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.2s ease;
        `;
        
        document.body.appendChild(tooltip);
        
        // Position tooltip
        const rect = element.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        
        tooltip.style.left = `${rect.left + rect.width/2 - tooltipRect.width/2}px`;
        tooltip.style.top = `${rect.top - tooltipRect.height - 8}px`;
        
        // Show tooltip
        setTimeout(() => {
            tooltip.style.opacity = '1';
        }, 50);
        
        element._tooltip = tooltip;
    }
    
    function hideTooltip(e) {
        const element = e.target;
        if (element._tooltip) {
            element._tooltip.style.opacity = '0';
            setTimeout(() => {
                if (element._tooltip && element._tooltip.parentNode) {
                    document.body.removeChild(element._tooltip);
                }
                element._tooltip = null;
            }, 200);
        }
    }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================================
// PERFORMANCE MONITORING
// ========================================

function initializePerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Page loaded in ${Math.round(loadTime)}ms`);
        
        // Report to analytics (if you have analytics setup)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_load_time', {
                value: Math.round(loadTime),
                event_category: 'Performance'
            });
        }
    });
}

// ========================================
// ACCESSIBILITY IMPROVEMENTS
// ========================================

function initializeAccessibility() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--teal);
        color: var(--navy);
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 9999;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Keyboard navigation for projects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const link = card.querySelector('.project-link');
                if (link) link.click();
            }
        });
    });
}

// ========================================
// ERROR HANDLING
// ========================================

window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
    
    // Show user-friendly error message for critical errors
    if (e.error && e.error.message.includes('critical')) {
        showNotification('Something went wrong. Please refresh the page.', 'error');
    }
});

// ========================================
// SERVICE WORKER (for PWA capabilities)
// ========================================

function initializeServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then((registration) => {
                    console.log('SW registered: ', registration);
                })
                .catch((registrationError) => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
}

// Initialize additional features
initializePerformanceMonitoring();
initializeAccessibility();
initializeServiceWorker();

// ========================================
// EXPORT FOR TESTING (if needed)
// ========================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        initializeTheme,
        initializeNavigation,
        debounce,
        throttle
    };
}