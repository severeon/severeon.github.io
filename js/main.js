// ===================================
// WASTELAND CODE REDEMPTION ASSISTANT
// Interactive JavaScript Features
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all wasteland features
    initParticleBackground();
    initNavigation();
    initScrollEffects();
    initFormHandling();
    initAnimations();
    initWastelandEffects();
});

// ===================================
// PARTICLE BACKGROUND EFFECT
// ===================================
function initParticleBackground() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ["#FF6B35", "#F7931E", "#D4A574", "#C19A6B"]
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#FF6B35",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "repulse"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
}

// ===================================
// NAVIGATION FUNCTIONALITY
// ===================================
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling and active link highlighting
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Close mobile menu
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');

                // Smooth scroll
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Header background on scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(44, 44, 44, 0.98)';
        } else {
            header.style.background = 'rgba(44, 44, 44, 0.95)';
        }
    });
}

// ===================================
// SCROLL EFFECTS & ANIMATIONS
// ===================================
function initScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .screenshot-card, .download-card, .about-text, .hero-visual');
    animateElements.forEach(el => observer.observe(el));

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');

        if (hero && heroContent) {
            const rate = scrolled * -0.5;
            heroContent.style.transform = `translateY(${rate}px)`;
        }
    });

    // Counter animation for stats
    animateCounters();
}

// ===================================
// COUNTER ANIMATION
// ===================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 2000; // Animation duration in ms

    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const increment = target / (speed / 16); // 60 FPS
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = formatCounterValue(target, counter.textContent);
                clearInterval(timer);
            } else {
                counter.textContent = formatCounterValue(Math.ceil(current), counter.textContent);
            }
        }, 16);
    });
}

function formatCounterValue(value, originalText) {
    if (originalText.includes('K+')) {
        return `${value}K+`;
    } else if (originalText.includes('%')) {
        return `${value}%`;
    } else {
        return `${value}+`;
    }
}

// ===================================
// FORM HANDLING
// ===================================
function initFormHandling() {
    const contactForm = document.querySelector('.contact-form form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const message = contactForm.querySelector('textarea').value;

            // Validate form
            if (name && email && message) {
                // Simulate form submission
                showWastelandMessage('Message transmitted to the wasteland successfully!', 'success');
                contactForm.reset();
            } else {
                showWastelandMessage('Transmission failed. Please fill all fields.', 'error');
            }
        });
    }
}

function showWastelandMessage(message, type) {
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `wasteland-message ${type}`;
    messageEl.textContent = message;

    // Style the message
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? 'rgba(34, 139, 34, 0.9)' : 'rgba(183, 65, 14, 0.9)'};
        color: white;
        border-radius: 10px;
        border: 2px solid ${type === 'success' ? '#228B22' : '#B7410E'};
        font-family: 'Orbitron', monospace;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    `;

    // Add to page
    document.body.appendChild(messageEl);

    // Animate in
    setTimeout(() => {
        messageEl.style.transform = 'translateX(0)';
    }, 100);

    // Remove after delay
    setTimeout(() => {
        messageEl.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(messageEl);
        }, 300);
    }, 4000);
}

// ===================================
// ANIMATION INITIALIZATION
// ===================================
function initAnimations() {
    // Glow effect for title
    const titleMain = document.querySelector('.title-main');
    if (titleMain) {
        titleMain.classList.add('glow-effect');
    }

    // Floating animation for phone mockup
    const phoneMockup = document.querySelector('.phone-mockup');
    if (phoneMockup) {
        let floatDirection = 1;
        setInterval(() => {
            const currentTransform = phoneMockup.style.transform || 'translateY(0px)';
            const currentY = parseFloat(currentTransform.match(/translateY\(([^)]+)px\)/) || [0, 0])[1];
            const newY = currentY + (floatDirection * 0.5);

            if (newY > 10) floatDirection = -1;
            if (newY < -10) floatDirection = 1;

            phoneMockup.style.transform = `translateY(${newY}px)`;
        }, 50);
    }

    // Typing effect for hero text
    initTypingEffect();
}

function initTypingEffect() {
    const titleLines = document.querySelectorAll('.title-line, .title-main, .title-accent');
    let currentIndex = 0;

    titleLines.forEach((line, index) => {
        const text = line.textContent;
        line.textContent = '';
        line.style.borderRight = '2px solid #FF6B35';

        setTimeout(() => {
            typeText(line, text, 50);
        }, index * 200);
    });
}

function typeText(element, text, speed) {
    let i = 0;
    const timer = setInterval(() => {
        element.textContent += text.charAt(i);
        i++;
        if (i >= text.length) {
            clearInterval(timer);
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 1000);
        }
    }, speed);
}

// ===================================
// WASTELAND SPECIAL EFFECTS
// ===================================
function initWastelandEffects() {
    // Glitch effect on hover for certain elements
    const glitchElements = document.querySelectorAll('.brand-logo, .section-title');

    glitchElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.animation = 'none';
            el.offsetHeight; // Trigger reflow
            el.style.animation = 'wastelandGlow 0.3s ease-in-out';
        });
    });

    // Random wasteland quotes (could be used for dynamic content)
    const wastelandQuotes = [
        "In the wasteland of codes, hope never dies.",
        "Every lost code is a treasure waiting to be found.",
        "Survival of the fittest in the digital wasteland.",
        "Redemption awaits those who seek.",
        "Navigate the chaos, claim what's yours."
    ];

    // Change page title occasionally
    setInterval(() => {
        const randomQuote = wastelandQuotes[Math.floor(Math.random() * wastelandQuotes.length)];
        // Could implement a subtle title change effect here
    }, 30000); // Every 30 seconds

    // Easter egg: Konami code
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }

        if (konamiCode.join(',') === konamiSequence.join(',')) {
            activateWastelandMode();
            konamiCode = [];
        }
    });
}

function activateWastelandMode() {
    // Create special effect
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 107, 53, 0.1);
        pointer-events: none;
        z-index: 10000;
        animation: wastelandPulse 0.5s ease-in-out;
    `;

    // Add CSS animation if not exists
    if (!document.querySelector('#wasteland-style')) {
        const style = document.createElement('style');
        style.id = 'wasteland-style';
        style.textContent = `
            @keyframes wastelandPulse {
                0%, 100% { opacity: 0; }
                50% { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(overlay);

    setTimeout(() => {
        document.body.removeChild(overlay);
    }, 500);

    // Show special message
    showWastelandMessage('🛡️ WASTELAND MODE ACTIVATED! 🛡️', 'success');
}

// ===================================
// UTILITY FUNCTIONS
// ===================================
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

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
// Debounced scroll handler
const debouncedScrollHandler = debounce(() => {
    // Handle scroll events here if needed
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);

// ===================================
// ERROR HANDLING
// ===================================
window.addEventListener('error', (e) => {
    console.error('Wasteland error:', e.error);
    // Could implement error reporting here
});

// ===================================
// INITIALIZATION COMPLETE
// ===================================
console.log('🔥 WASTELAND INTERFACE INITIALIZED 🔥');
console.log('Welcome to the digital wasteland, survivor.');
