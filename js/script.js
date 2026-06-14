document.documentElement.classList.add('has-js');

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navigationItems = [...document.querySelectorAll('.nav-links a')];
const sections = [...document.querySelectorAll('main section[id]')];

navToggle?.addEventListener('click', () => {
    const isOpen = navToggle.classList.toggle('active');
    navLinks?.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
});

navigationItems.forEach((link) => {
    link.addEventListener('click', () => {
        navToggle?.classList.remove('active');
        navLinks?.classList.remove('open');
        navToggle?.setAttribute('aria-expanded', 'false');
    });
});

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navigationItems.forEach((link) => {
            const isCurrent = link.getAttribute('href') === `#${entry.target.id}`;
            link.classList.toggle('active', isCurrent);
        });
    });
}, {
    rootMargin: '-35% 0px -55%',
    threshold: 0
});

sections.forEach((section) => sectionObserver.observe(section));

const yearElement = document.getElementById('current-year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear().toString();
}

const timelineScrollers = [...document.querySelectorAll('.timeline-scroll')];
const showLatestTimelineEntries = () => {
    timelineScrollers.forEach((timeline) => {
        timeline.scrollLeft = timeline.scrollWidth - timeline.clientWidth;
    });
};

if (timelineScrollers.length) {
    requestAnimationFrame(showLatestTimelineEntries);
    window.addEventListener('load', showLatestTimelineEntries, { once: true });
    window.addEventListener('resize', showLatestTimelineEntries);
}

const hero = document.querySelector('.hero');
const heroVisual = document.querySelector('.hero-visual');
const weatherThemeButtons = [...document.querySelectorAll('[data-weather-theme]')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

weatherThemeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const theme = button.dataset.weatherTheme;
        if (!hero || !theme) return;

        hero.dataset.theme = theme;
        weatherThemeButtons.forEach((item) => item.classList.toggle('active', item === button));
    });
});

if (heroVisual && !reducedMotion) {
    heroVisual.addEventListener('pointermove', (event) => {
        const bounds = heroVisual.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
        const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
        heroVisual.style.setProperty('--pointer-x', x.toFixed(3));
        heroVisual.style.setProperty('--pointer-y', y.toFixed(3));
    });

    heroVisual.addEventListener('pointerleave', () => {
        heroVisual.style.setProperty('--pointer-x', '0');
        heroVisual.style.setProperty('--pointer-y', '0');
    });
}
