// Tailwind dark mode config (class strategy)
if (window.tailwind && window.tailwind.config) {
    window.tailwind.config.darkMode = 'class';
}

const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const mobileThemeToggle = document.getElementById('mobileThemeToggle');
const progressBar = document.getElementById('progressBar');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');
const backToTopButton = document.getElementById('backToTop');

// Theme handling
function setTheme(theme) {
    if (theme === 'dark') {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
}

function initTheme() {
    const stored = localStorage.getItem('theme');
    if (stored) {
        setTheme(stored);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
}

function toggleTheme() {
    const isDark = html.classList.contains('dark');
    setTheme(isDark ? 'light' : 'dark');
}

initTheme();

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        toggleTheme();
        showToast('Theme updated');
    });
}

if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', () => {
        toggleTheme();
        showToast('Theme updated');
    });
}

// Mobile menu
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Back to top & scroll progress
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (progressBar) {
        progressBar.style.width = progress + '%';
    }

    if (backToTopButton) {
        if (scrollTop > 300) {
            backToTopButton.classList.remove('hidden');
        } else {
            backToTopButton.classList.add('hidden');
        }
    }
});

if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Section highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-indigo-600', 'dark:text-indigo-400');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-indigo-600', 'dark:text-indigo-400');
        }
    });
});

// Toast helper
function showToast(message) {
    if (!toast) return;
    toastMessage.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

// Contact form (demo)
const contactForm = document.getElementById('contactForm');
const formLoader = document.getElementById('formLoader');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (formLoader) formLoader.classList.remove('hidden');

        setTimeout(() => {
            if (formLoader) formLoader.classList.add('hidden');
            showToast('Thank you for your message! This is a demo form.');
            contactForm.reset();
        }, 1200);
    });
}

// Counters
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target') || '0', 10);
        let current = 0;
        const increment = Math.max(1, Math.floor(target / 100));

        const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(interval);
            }
            el.textContent = current + (el.getAttribute('data-suffix') || '');
        }, 20);

        observer.unobserve(el);
    });
}, { threshold: 0.6 });

counters.forEach(counter => counterObserver.observe(counter));

// Particles in hero
const particlesContainer = document.getElementById('particles');
if (particlesContainer) {
    for (let i = 0; i < 40; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDuration = 6 + Math.random() * 6 + 's';
        particlesContainer.appendChild(particle);
    }
}

// Feature & service card click -> toast
document.querySelectorAll('.feature-card, .service-card').forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('h3');
        showToast((title ? title.textContent : 'Feature') + ' selected');
    });
});

// Intersection animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
        }
    });
}, observerOptions);

document.querySelectorAll('#features .feature-card, #services .service-card, #testimonials > div > div > div').forEach(el => {
    animationObserver.observe(el);
});

// Demo video action
function playVideo() {
    showToast('Playing demo video (mock)');
}

window.playVideo = playVideo;
