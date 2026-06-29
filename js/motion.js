(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const root = document.documentElement;

    const revealSelectors = [
        '.chapter-transition',
        'main section > .section-label',
        'main section > h2',
        '.section-heading-row',
        '.project-card',
        '.about-column',
        '.path-group',
        '.contact',
        '.site-footer',
        '.section-shell > .section-heading',
        '.rule-card',
        '.live-card',
        '.ctx-card',
        '.offline-card',
        '.widget-item',
        '.feature-card',
        '.placeholder',
        '.tech-list',
        '.timeline article',
        '.hero h1',
        '.hero-actions',
        '.hero-visual',
        '.project-media',
        '.shell > .copy',
        '.hero-icon',
        '.footer'
    ];

    const revealItems = [...new Set(
        revealSelectors.flatMap((selector) => [...document.querySelectorAll(selector)])
    )].filter((element) => !element.classList.contains('reveal'));

    revealItems.forEach((element, index) => {
        element.classList.add('motion-reveal');
        element.style.setProperty('--motion-delay', `${Math.min(index % 3, 2) * 45}ms`);
    });

    root.classList.add('motion-ready');

    if (reducedMotion || !('IntersectionObserver' in window)) {
        revealItems.forEach((element) => element.classList.add('motion-visible'));
    } else {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('motion-visible');
                revealObserver.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

        revealItems.forEach((element) => revealObserver.observe(element));
    }
})();
