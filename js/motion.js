(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const root = document.documentElement;
    const body = document.body;
    const isPortfolio = root.dataset.motionPage === 'portfolio';

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
        ['[data-motion-page="portfolio"] .hero-visual', 0.065],
        ['[data-motion-page="portfolio"] .portrait-frame img', 0.045],
        ['[data-motion-page="portfolio"] .project-media', 0.035],
        ['.hero-stage', 0.04],
        ['.hero-scene', 0.035],
        ['.screen-shell--hero:not([data-motion-static])', 0.045]
    ].flatMap(([selector, speed]) =>
        [...document.querySelectorAll(selector)].map((element) => ({ element, speed }))
    );

    const flowSelectors = [
        'main section > h1',
        'main section h2',
        '.hero h1',
        '.project-title-row h3',
        '.path-group-label',
        '.hero-copy',
        '.hero-lead',
        '.hero-lede',
        '.section-label',
        '.eyebrow',
        '.section-heading-row',
        '.intro-grid',
        '.split-layout',
        '.project-card',
        '.project-media',
        '.project-copy',
        '.weather-wordmark',
        '.about-column',
        '.approach-list li',
        '.path-group',
        '.timeline article',
        '.contact',
        '.feature-card',
        '.rule-card',
        '.live-card',
        '.ctx-card',
        '.offline-card',
        '.widget-item',
        '.widget-card',
        '.privacy-facts article',
        '.tech-cloud li',
        '.placeholder',
        '.media-placeholder',
        '.screen-shell',
        '.device',
        '.shift-console',
        '.chart-card',
        '.calendar-layout',
        '.closing-inner'
    ];

    const flowItems = [...new Set(
        flowSelectors.flatMap((selector) => [...document.querySelectorAll(selector)])
    )].map((element, index) => {
        const isText = element.matches('h1, h2, h3, .hero-lead, .hero-lede, .section-label, .eyebrow, .path-group-label, .project-copy, .about-column, .contact');
        element.classList.add('motion-flow');
        if (isText) element.classList.add('motion-flow-text');
        return {
            element,
            depth: (isPortfolio ? 0.82 : 0.55) + (index % 5) * (isPortfolio ? 0.22 : 0.16),
            direction: index % 2 === 0 ? 1 : -1,
            isText
        };
    });

    const portfolioItems = isPortfolio ? [...new Set([
        ...document.querySelectorAll('.project-card'),
        ...document.querySelectorAll('.about-column'),
        ...document.querySelectorAll('.timeline article'),
        ...document.querySelectorAll('.contact'),
        ...document.querySelectorAll('.hero-visual')
    ])].map((element, index) => {
        element.classList.add('portfolio-scroll-motion');
        return {
            element,
            direction: index % 2 === 0 ? 1 : -1,
            depth: 0.85 + (index % 4) * 0.18
        };
    }) : [];

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
    const smoothstep = (value) => value * value * (3 - 2 * value);

    let ticking = false;
    const updateScrollMotion = () => {
        const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        root.style.setProperty('--motion-scroll', String(Math.min(window.scrollY / scrollable, 1)));

        if (!reducedMotion) {
            const compactViewport = window.innerWidth < 700;

            parallaxItems.forEach(({ element, speed }) => {
                const rect = element.getBoundingClientRect();
                const distance = rect.top + rect.height / 2 - window.innerHeight / 2;
                const shift = Math.max(-34, Math.min(34, -distance * speed));
                element.classList.add('motion-parallax');
                element.style.translate = `0 ${shift}px`;
            });

            flowItems.forEach(({ element, depth, direction, isText }) => {
                const rect = element.getBoundingClientRect();
                const viewport = window.innerHeight || document.documentElement.clientHeight;
                const progress = clamp((viewport - rect.top) / (viewport + rect.height), 0, 1);
                const eased = smoothstep(progress);
                const centered = eased - 0.5;
                const yAmplitude = isPortfolio ? 76 : 54;
                const y = clamp(-centered * (compactViewport ? 38 : yAmplitude) * depth, -54, 54);
                const xAmplitude = isPortfolio ? 28 : 14;
                const x = isText && !compactViewport ? clamp(centered * xAmplitude * direction, -22, 22) : 0;
                const rotate = isText
                    ? clamp(centered * (compactViewport ? 3 : (isPortfolio ? 8 : 5.2)) * direction, -5, 5)
                    : clamp(centered * (compactViewport ? 1.4 : (isPortfolio ? 4.6 : 2.4)) * direction, -3.2, 3.2);
                const scale = (compactViewport ? 0.985 : (isPortfolio ? 0.955 : 0.975)) + eased * (compactViewport ? 0.02 : (isPortfolio ? 0.06 : 0.035));
                const opacity = clamp(0.58 + eased * 0.48, 0.58, 1);

                element.style.setProperty('--motion-scroll-x', `${x.toFixed(2)}px`);
                element.style.setProperty('--motion-scroll-y', `${y.toFixed(2)}px`);
                element.style.setProperty('--motion-scroll-rotate', `${rotate.toFixed(3)}deg`);
                element.style.setProperty('--motion-scroll-scale', scale.toFixed(3));
                element.style.setProperty('--motion-flow-opacity', opacity.toFixed(3));
            });

            portfolioItems.forEach(({ element, direction, depth }) => {
                const rect = element.getBoundingClientRect();
                const viewport = window.innerHeight || document.documentElement.clientHeight;
                const progress = clamp((viewport - rect.top) / (viewport + rect.height), 0, 1);
                const eased = smoothstep(progress);
                const centered = eased - 0.5;
                const compactScale = compactViewport ? 0.55 : 1;
                const x = compactViewport ? 0 : clamp(centered * 52 * direction * depth, -42, 42);
                const y = clamp((0.5 - eased) * 72 * depth * compactScale, -42, 56);
                const rotate = clamp(centered * 7.5 * direction * compactScale, -5.4, 5.4);
                const scale = (compactViewport ? 0.992 : 0.94) + eased * (compactViewport ? 0.012 : 0.08);
                const opacity = clamp(0.46 + eased * 0.62, 0.46, 1);

                element.style.setProperty('--portfolio-x', `${x.toFixed(2)}px`);
                element.style.setProperty('--portfolio-y', `${y.toFixed(2)}px`);
                element.style.setProperty('--portfolio-rotate', `${rotate.toFixed(3)}deg`);
                element.style.setProperty('--portfolio-scale', scale.toFixed(3));
                element.style.setProperty('--portfolio-opacity', opacity.toFixed(3));
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
