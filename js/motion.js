(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const root = document.documentElement;
    const body = document.body;

    const progress = document.createElement('div');
    progress.className = 'motion-progress';
    progress.setAttribute('aria-hidden', 'true');
    body.appendChild(progress);

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
        '.shell > .copy',
        '.hero-icon',
        '.footer'
    ];

    const revealItems = [...new Set(
        revealSelectors.flatMap((selector) => [...document.querySelectorAll(selector)])
    )].filter((element) => !element.classList.contains('reveal'));

    revealItems.forEach((element, index) => {
        element.classList.add('motion-reveal');
        element.style.setProperty('--motion-delay', `${Math.min(index % 4, 3) * 70}ms`);
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

    document.querySelectorAll(
        '.project-card, .rule-card, .live-card, .ctx-card, .offline-card, .widget-item, .widget-card, .feature-card, .placeholder, .app-screen, .privacy-facts article'
    ).forEach((element) => element.classList.add('motion-tilt'));

    document.querySelectorAll(
        '.button, .header-cta, .back-link, .portfolio-link, .theme-btn, .theme-button, .filter-button'
    ).forEach((element) => element.classList.add('motion-magnetic'));

    const parallaxItems = [
        ['.hero-visual:not([data-motion-static])', 0.055],
        ['.hero-stage', 0.04],
        ['.hero-scene', 0.035],
        ['.screen-shell--hero:not([data-motion-static])', 0.045]
    ].flatMap(([selector, speed]) =>
        [...document.querySelectorAll(selector)].map((element) => ({ element, speed }))
    );

    let ticking = false;
    const updateScrollMotion = () => {
        const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        root.style.setProperty('--motion-scroll', String(Math.min(window.scrollY / scrollable, 1)));

        if (!reducedMotion) {
            parallaxItems.forEach(({ element, speed }) => {
                const rect = element.getBoundingClientRect();
                const distance = rect.top + rect.height / 2 - window.innerHeight / 2;
                const shift = Math.max(-34, Math.min(34, -distance * speed));
                element.classList.add('motion-parallax');
                element.style.translate = `0 ${shift}px`;
            });
        }
        ticking = false;
    };

    const requestScrollMotion = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(updateScrollMotion);
    };

    updateScrollMotion();
    window.addEventListener('scroll', requestScrollMotion, { passive: true });
    window.addEventListener('resize', requestScrollMotion);

    if (!finePointer || reducedMotion) return;

    const glow = document.createElement('div');
    glow.className = 'motion-cursor-glow';
    glow.setAttribute('aria-hidden', 'true');
    body.appendChild(glow);

    window.addEventListener('pointermove', (event) => {
        glow.style.left = `${event.clientX}px`;
        glow.style.top = `${event.clientY}px`;
        body.classList.add('motion-pointer-active');
    }, { passive: true });

    document.querySelectorAll('.motion-tilt').forEach((element) => {
        element.addEventListener('pointermove', (event) => {
            const rect = element.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;
            element.style.setProperty('--motion-rx', `${-y * 3.5}deg`);
            element.style.setProperty('--motion-ry', `${x * 4.5}deg`);
        });
        element.addEventListener('pointerleave', () => {
            element.style.setProperty('--motion-rx', '0deg');
            element.style.setProperty('--motion-ry', '0deg');
        });
    });

    document.querySelectorAll('.motion-magnetic').forEach((element) => {
        element.addEventListener('pointermove', (event) => {
            const rect = element.getBoundingClientRect();
            const x = (event.clientX - rect.left - rect.width / 2) * 0.12;
            const y = (event.clientY - rect.top - rect.height / 2) * 0.16;
            element.style.setProperty('--motion-x', `${x}px`);
            element.style.setProperty('--motion-y', `${y}px`);
        });
        element.addEventListener('pointerleave', () => {
            element.style.setProperty('--motion-x', '0px');
            element.style.setProperty('--motion-y', '0px');
        });
    });
})();
