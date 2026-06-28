if (typeof Swiper !== 'undefined' && document.querySelector('.heroSwiper')) {
    const heroSwiper = new Swiper(".heroSwiper", {
        loop: true,
        speed: 1200,
        effect: "fade",
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        }
    });
}

// Initialize AOS (animations)
if (window.AOS) { AOS.init({ duration: 1200, once: true }); }

window.addEventListener('scroll', () => {

    const navbar = document.querySelector('.navbar');

    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

});

// Theme handling: set, persist and toggle dark mode
function updateThemeButton(theme) {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    if (theme === 'dark') {
        btn.innerHTML = '☀️';
        btn.setAttribute('aria-label', 'Switch to light mode');
    } else {
        btn.innerHTML = '🌙';
        btn.setAttribute('aria-label', 'Switch to dark mode');
    }
}

function setTheme(theme) {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        if (meta) meta.setAttribute('content', '#111111');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        if (meta) meta.setAttribute('content', '#ffffff');
        localStorage.setItem('theme', 'light');
    }
    updateThemeButton(theme);
}

// Initialize theme from storage or OS preference
(function () {
    const saved = localStorage.getItem('theme');
    if (saved) setTheme(saved);
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
    const btn = document.getElementById('themeToggle');
    if (btn) {
        btn.addEventListener('click', () => {
            const isDark = document.body.classList.contains('dark-mode');
            setTheme(isDark ? 'light' : 'dark');
        });
    }
})();
