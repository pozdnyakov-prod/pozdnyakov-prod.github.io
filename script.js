(() => {
  const body = document.body;
  // В этой версии пользователь явно выбрал полноценный motion-дизайн.
  // Системный режим «Уменьшение движения» больше не сокращает интро и не
  // отключает эффекты сайта.
  const reducedMotion = false;

  /*
   * Soft Light Cursor.
   * It keeps the native cursor, adds only an ambient light layer and never
   * captures clicks. Touch devices skip it entirely.
   */
  const softCursorQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

  if (softCursorQuery.matches) {
    const softCursor = document.createElement('div');
    softCursor.className = 'soft-light-cursor';
    softCursor.setAttribute('aria-hidden', 'true');
    softCursor.innerHTML = '<span class="soft-light-cursor__halo"></span><span class="soft-light-cursor__core"></span>';
    body.append(softCursor);

    const interactiveSelector = [
      'a',
      'button',
      'input',
      'textarea',
      'select',
      'summary',
      '[role="button"]',
      '.dw-compare__range',
      '.case-accordion__tab'
    ].join(',');

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let cursorFrame = 0;
    let cursorVisible = false;

    const renderSoftCursor = () => {
      currentX += (targetX - currentX) * .16;
      currentY += (targetY - currentY) * .16;
      softCursor.style.transform = `translate3d(${currentX}px,${currentY}px,0) translate3d(-50%,-50%,0)`;

      const stillMoving = Math.abs(targetX - currentX) > .08 || Math.abs(targetY - currentY) > .08;
      cursorFrame = stillMoving && cursorVisible ? requestAnimationFrame(renderSoftCursor) : 0;
    };

    const queueSoftCursor = () => {
      if (!cursorFrame) cursorFrame = requestAnimationFrame(renderSoftCursor);
    };

    window.addEventListener('pointermove', (event) => {
      targetX = event.clientX;
      targetY = event.clientY;

      if (!cursorVisible) {
        currentX = targetX;
        currentY = targetY;
        cursorVisible = true;
        softCursor.classList.add('is-visible');
      }

      softCursor.classList.toggle('is-interactive', Boolean(event.target.closest?.(interactiveSelector)));
      queueSoftCursor();
    }, { passive: true });

    window.addEventListener('pointerdown', () => softCursor.classList.add('is-pressed'), { passive: true });
    window.addEventListener('pointerup', () => softCursor.classList.remove('is-pressed'), { passive: true });
    window.addEventListener('pointercancel', () => softCursor.classList.remove('is-pressed'), { passive: true });
    document.documentElement.addEventListener('mouseleave', () => {
      cursorVisible = false;
      softCursor.classList.remove('is-visible', 'is-interactive', 'is-pressed');
    });
    window.addEventListener('blur', () => {
      cursorVisible = false;
      softCursor.classList.remove('is-visible', 'is-interactive', 'is-pressed');
    });
  }

  /*
   * Premium button system.
   * The original links, href values and button types stay untouched; only the
   * visual layer is rebuilt so every action keeps its existing behaviour.
   */
  const premiumButtonSelector = [
    '.button',
    '.header-ai',
    '.header-contact',
    '.header-cta',
    '.sound-button',
    '.skip-button',
    '.back-link',
    '.faq-intro > a',
    '.contact-links > a'
  ].join(',');

  const premiumIcons = {
    upRight: '<svg viewBox="0 0 18 18" focusable="false"><path d="M5 13 13 5M7 5h6v6"/></svg>',
    right: '<svg viewBox="0 0 18 18" focusable="false"><path d="M4 9h10M10 5l4 4-4 4"/></svg>',
    left: '<svg viewBox="0 0 18 18" focusable="false"><path d="M14 9H4M8 5 4 9l4 4"/></svg>',
    sound: '<svg viewBox="0 0 18 18" focusable="false"><path d="M4 7v4M8 5v8M12 3v12M16 7v4"/></svg>'
  };

  const setPremiumButtonLabel = (button, text) => {
    const label = button?.querySelector('.premium-button__label');
    if (label) {
      label.textContent = text;
      requestAnimationFrame(() => button._syncPremiumButton?.());
      return;
    }
    if (button) button.textContent = text;
  };

  const premiumButtons = [...document.querySelectorAll(premiumButtonSelector)];
  const premiumButtonResizeObserver = 'ResizeObserver' in window
    ? new ResizeObserver((entries) => entries.forEach(({ target }) => target._syncPremiumButton?.()))
    : null;

  premiumButtons.forEach((button) => {
    if (button.dataset.premiumReady === 'true') return;

    const originalText = button.textContent.replace(/\s+/g, ' ').trim();
    const labelText = originalText
      .replace(/^[↗→←›]+\s*/u, '')
      .replace(/\s*[↗→←›]+$/u, '')
      .trim();
    const isBack = button.classList.contains('back-link') || originalText.startsWith('←');
    const isSound = button.classList.contains('sound-button');
    const isExternal = originalText.includes('↗') || button.matches('.header-contact, .header-cta');
    const iconName = isBack ? 'left' : isSound ? 'sound' : isExternal ? 'upRight' : 'right';

    const isPackageDetails = button.closest('.price-card') && labelText === 'Подробнее';
    const isUtility = button.matches('.sound-button, .skip-button, .back-link, .faq-intro > a, .contact-links > a');

    button.classList.add('premium-button');
    if (isPackageDetails || button.matches('.button-ghost')) {
      button.classList.add('premium-button--morph');
      button.dataset.premiumStyle = 'morph';
    } else if (button.matches('.button-light, .button-hero, .header-ai, .header-contact, .header-cta')) {
      button.classList.add('premium-button--orbit');
      button.dataset.premiumStyle = 'orbit';
    } else {
      button.classList.add('premium-button--flow');
      button.dataset.premiumStyle = 'flow';
    }
    if (isUtility) button.classList.add('premium-button--utility');

    const label = document.createElement('span');
    label.className = 'premium-button__label';
    label.textContent = labelText;

    const orbit = document.createElement('span');
    orbit.className = 'premium-button__orbit';
    orbit.setAttribute('aria-hidden', 'true');
    orbit.innerHTML = premiumIcons[iconName];

    button.replaceChildren(label, orbit);
    button.dataset.premiumReady = 'true';

    button._syncPremiumButton = () => {
      const styles = getComputedStyle(button);
      const inset = Number.parseFloat(styles.getPropertyValue('--pb-inset')) || 5;
      const orbitWidth = orbit.getBoundingClientRect().width;
      const travel = Math.max(0, button.clientWidth - orbitWidth - inset * 2);
      button.style.setProperty('--pb-travel', `${travel}px`);
      button.style.setProperty('--pb-center-travel', `${travel / -2}px`);
      button.style.setProperty('--pb-morph-scale', String(Math.max(.12, orbitWidth / Math.max(button.clientWidth - inset * 2, 1))));
    };

    button.addEventListener('pointermove', (event) => {
      const rect = button.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / Math.max(rect.width, 1)) * 100;
      const y = ((event.clientY - rect.top) / Math.max(rect.height, 1)) * 100;
      button.style.setProperty('--pb-pointer-x', `${x}%`);
      button.style.setProperty('--pb-pointer-y', `${y}%`);
    }, { passive: true });

    button.addEventListener('pointerleave', () => {
      button.style.setProperty('--pb-pointer-x', '50%');
      button.style.setProperty('--pb-pointer-y', '50%');
    }, { passive: true });

    premiumButtonResizeObserver?.observe(button);
    requestAnimationFrame(button._syncPremiumButton);
  });

  const header = document.querySelector('.site-header');
  const menuButton = document.getElementById('menuButton');
  const mainNav = document.getElementById('mainNav');
  const navLinks = mainNav ? [...mainNav.querySelectorAll('a[href]')] : [];
  let activeNavLink = null;

  const navItems = navLinks.map((link) => {
    const url = new URL(link.href, window.location.href);
    const samePage = url.origin === window.location.origin && url.pathname === window.location.pathname;
    const target = samePage && url.hash ? document.querySelector(url.hash) : null;
    return { link, url, target };
  });

  const localNavItems = navItems.filter((item) => item.target);
  const navPill = mainNav && navLinks.length ? document.createElement('span') : null;

  if (navPill && mainNav) {
    navPill.className = 'nav-active-pill';
    navPill.setAttribute('aria-hidden', 'true');
    mainNav.prepend(navPill);
  }

  const moveNavPill = (link, instant = false) => {
    if (!mainNav || !navPill || !link) return;
    activeNavLink = link;
    navLinks.forEach((item) => {
      const active = item === link;
      item.classList.toggle('is-active', active);
      if (active) item.setAttribute('aria-current', 'location');
      else item.removeAttribute('aria-current');
    });

    if (window.innerWidth <= 760) return;
    if (instant) mainNav.classList.add('nav-pill-instant');
    mainNav.style.setProperty('--pill-x', `${link.offsetLeft}px`);
    mainNav.style.setProperty('--pill-width', `${link.offsetWidth}px`);
    mainNav.classList.add('nav-pill-mounted');
    if (instant) requestAnimationFrame(() => mainNav.classList.remove('nav-pill-instant'));
  };

  const updateNavFromScroll = (instant = false) => {
    if (!localNavItems.length) {
      moveNavPill(activeNavLink || navLinks[0], instant);
      return;
    }

    const marker = window.scrollY + Math.min(window.innerHeight * .38, 320);
    let current = localNavItems[0];
    localNavItems.forEach((item) => {
      if (item.target.offsetTop <= marker) current = item;
    });
    moveNavPill(current.link, instant);
  };

  let navScrollFrame = 0;
  const syncNavOnScroll = () => {
    if (navScrollFrame) return;
    navScrollFrame = requestAnimationFrame(() => {
      updateNavFromScroll();
      navScrollFrame = 0;
    });
  };

  navItems.forEach(({ link, url, target }) => {
    if (!target) return;
    link.addEventListener('click', (event) => {
      event.preventDefault();
      closeMenu();
      moveNavPill(link);
      const headerOffset = (header?.offsetHeight || 64) + 34;
      const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerOffset);
      try { window.history.pushState(null, '', url.hash); } catch (_) { /* file:// fallback */ }
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  requestAnimationFrame(() => updateNavFromScroll(true));
  document.fonts?.ready?.then(() => moveNavPill(activeNavLink || navLinks[0], true));
  window.addEventListener('resize', () => moveNavPill(activeNavLink || navLinks[0], true));
  window.addEventListener('scroll', syncNavOnScroll, { passive: true });

  const closeMenu = () => {
    if (!menuButton || !mainNav) return;
    menuButton.setAttribute('aria-expanded', 'false');
    mainNav.classList.remove('open');
    body.classList.remove('menu-open');
  };

  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    mainNav?.classList.toggle('open', open);
    body.classList.toggle('menu-open', open);
  });

  mainNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('scroll', () => header?.classList.toggle('scrolled', window.scrollY > 24), { passive: true });

  const preIntro = document.getElementById('preIntro');
  const intro = document.getElementById('intro');
  const audio = document.getElementById('introAudio');
  const soundButton = document.getElementById('soundButton');
  const skipButton = document.getElementById('skipIntro');
  // Интро должно работать и при прямом открытии index.html через file://.
  // Поэтому здесь намеренно нет sessionStorage: на локальных файлах некоторые
  // браузеры запрещают его и раньше останавливали весь скрипт.
  const shouldShowIntro = Boolean(intro && !window.location.hash);
  let preIntroTimer = null;
  let introTimer = null;
  let fadeTimer = null;
  let introClosed = false;
  let mainIntroStarted = false;
  let audioPrimed = false;

  const preparePreIntroTyping = () => {
    if (!preIntro) return;
    preIntro.querySelectorAll('[data-pre-type]').forEach((line) => {
      const source = line.textContent.trim();
      const start = Number(line.dataset.preTypeStart || 0);
      const step = Number(line.dataset.preTypeStep || 100);
      const fragment = document.createDocumentFragment();

      line.textContent = '';
      [...source].forEach((character, index) => {
        const letter = document.createElement('span');
        letter.className = 'pre-intro__char';
        letter.textContent = character;
        letter.style.setProperty('--pre-char-delay', `${(start + index * step) / 1000}s`);
        fragment.append(letter);
      });
      line.append(fragment);
    });
  };

  const prepareIntroTyping = () => {
    if (!intro) return;
    intro.querySelectorAll('[data-type-start]').forEach((line) => {
      const source = line.textContent.trim();
      const start = Number(line.dataset.typeStart || 0);
      const step = Number(line.dataset.typeStep || 40);
      const fragment = document.createDocumentFragment();

      line.textContent = '';
      line.setAttribute('aria-label', source);

      [...source].forEach((character, index) => {
        const letter = document.createElement('span');
        const isSpace = character === ' ';
        letter.className = isSpace ? 'typed-char typed-space' : 'typed-char';
        if (character === '·') letter.classList.add('typed-dot');
        letter.textContent = isSpace ? '\u00a0' : character;
        letter.setAttribute('aria-hidden', 'true');
        letter.style.setProperty('--char-delay', `${(start + index * step) / 1000}s`);
        fragment.append(letter);
      });

      line.append(fragment);
    });
  };

  const fadeAudio = (to, duration, pauseAfter = false) => {
    if (!audio) return;
    window.clearInterval(fadeTimer);
    const from = audio.volume;
    const started = performance.now();
    fadeTimer = window.setInterval(() => {
      const progress = Math.min((performance.now() - started) / duration, 1);
      audio.volume = Math.max(0, Math.min(1, from + (to - from) * progress));
      if (progress >= 1) {
        window.clearInterval(fadeTimer);
        if (pauseAfter) audio.pause();
      }
    }, 40);
  };

  const closeIntro = () => {
    if (!intro || introClosed) return;
    introClosed = true;
    window.clearTimeout(preIntroTimer);
    window.clearTimeout(introTimer);
    body.classList.add('intro-leaving');
    fadeAudio(0, 900, true);
    window.setTimeout(() => {
      body.classList.add('site-ready');
      window.dispatchEvent(new CustomEvent('dw-site-ready'));
    }, 300);
    window.setTimeout(() => {
      body.classList.remove('intro-active', 'intro-leaving');
      intro.setAttribute('aria-hidden', 'true');
    }, 1210);
  };

  const enableSound = async () => {
    if (!audio || !soundButton) return;
    try {
      audio.currentTime = Math.min(audio.currentTime || 0, 7.5);
      audio.volume = 0;
      await audio.play();
      body.classList.add('audio-live');
      fadeAudio(.52, 1200);
      setPremiumButtonLabel(soundButton, 'Музыка включена');
      soundButton.setAttribute('aria-pressed', 'true');
    } catch {
      setPremiumButtonLabel(soundButton, 'Нажмите ещё раз');
    }
  };

  const primeIntroAudio = async () => {
    if (!audio || audioPrimed) return;
    try {
      audio.currentTime = 0;
      audio.volume = 0;
      await audio.play();
      audioPrimed = true;
    } catch {
      audioPrimed = false;
    }
  };

  const startMainIntro = () => {
    if (mainIntroStarted || !intro) return;
    mainIntroStarted = true;
    body.classList.remove('pre-intro-active', 'pre-intro-leaving');
    preIntro?.setAttribute('aria-hidden', 'true');
    if (audioPrimed && audio) audio.currentTime = 0;
    enableSound();
    introTimer = window.setTimeout(closeIntro, 8500);
  };

  const closePreIntro = () => {
    if (!preIntro || mainIntroStarted) {
      startMainIntro();
      return;
    }
    window.clearTimeout(preIntroTimer);
    body.classList.add('pre-intro-leaving');
    window.setTimeout(startMainIntro, 880);
  };

  if (shouldShowIntro) {
    body.classList.add('intro-active');
    preparePreIntroTyping();
    prepareIntroTyping();
    audio?.load();
    soundButton?.addEventListener('click', enableSound);
    skipButton?.addEventListener('click', closeIntro);
    intro.addEventListener('pointerdown', (event) => {
      if (event.target.closest('button')) return;
      enableSound();
    }, { once: true });
    intro.addEventListener('dblclick', closeIntro);
    if (preIntro) {
      body.classList.add('pre-intro-active');
      preIntro.addEventListener('pointerdown', primeIntroAudio, { once: true });
      preIntroTimer = window.setTimeout(closePreIntro, 3200);
    } else {
      startMainIntro();
    }
  } else if (intro) {
    body.classList.remove('intro-active', 'pre-intro-active', 'pre-intro-leaving');
    preIntro?.setAttribute('aria-hidden', 'true');
    intro.setAttribute('aria-hidden', 'true');
    body.classList.add('site-ready');
    window.dispatchEvent(new CustomEvent('dw-site-ready'));
  } else {
    body.classList.add('site-ready');
    window.dispatchEvent(new CustomEvent('dw-site-ready'));
  }

  document.querySelectorAll('.bento-grid, .feature-grid, .pricing-grid').forEach((group) => {
    [...group.children].forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index * 85, 340)}ms`;
    });
  });

  const revealItems = document.querySelectorAll('.reveal');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .13, rootMargin: '0px 0px -5% 0px' });
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  document.querySelectorAll('[data-case-accordion]').forEach((accordion) => {
    const items = [...accordion.querySelectorAll('[data-case-item]')];
    const activateCase = (activeItem) => {
      items.forEach((item) => {
        const active = item === activeItem;
        item.classList.toggle('is-active', active);
        item.querySelector('.case-accordion__tab')?.setAttribute('aria-expanded', String(active));
        const panel = item.querySelector('.case-accordion__panel');
        panel?.setAttribute('aria-hidden', String(!active));
        panel?.toggleAttribute('inert', !active);
      });
    };

    items.forEach((item) => {
      item.addEventListener('mouseenter', () => activateCase(item));
      item.querySelector('.case-accordion__tab')?.addEventListener('click', () => activateCase(item));
      item.querySelector('.case-accordion__tab')?.addEventListener('focus', () => activateCase(item));
    });
  });

  const journeyItems = [...document.querySelectorAll('.journey-mini > div')];
  if (journeyItems.length > 1) {
    let journeyIndex = 0;
    const startJourney = () => window.setTimeout(() => {
      window.setInterval(() => {
        journeyItems[journeyIndex].classList.remove('active');
        journeyIndex = (journeyIndex + 1) % journeyItems.length;
        journeyItems[journeyIndex].classList.add('active');
      }, 1350);
    }, 1250);
    if (body.classList.contains('site-ready')) startJourney();
    else window.addEventListener('dw-site-ready', startJourney, { once: true });
  }

  const featureCards = [...document.querySelectorAll('.feature-grid .feature-card')];
  if (featureCards.length > 1) {
    let featureIndex = 0;
    let featureTimer = null;
    const setFeature = () => {
      featureCards.forEach((card, index) => card.classList.toggle('auto-active', index === featureIndex));
      featureIndex = (featureIndex + 1) % featureCards.length;
    };
    const featureObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !featureTimer) {
        setFeature();
        featureTimer = window.setInterval(setFeature, 1650);
      } else if (!entry.isIntersecting && featureTimer) {
        window.clearInterval(featureTimer);
        featureTimer = null;
      }
    }, { threshold: .22 });
    featureObserver.observe(document.querySelector('.feature-grid'));
  }

  const comparison = document.querySelector('.comparison');
  const beforeRows = [...document.querySelectorAll('.muted-column > div')];
  const afterRows = [...document.querySelectorAll('.light-column > div')];
  if (comparison && beforeRows.length && beforeRows.length === afterRows.length) {
    let comparisonIndex = 0;
    const setComparison = (index) => {
      beforeRows.forEach((row, rowIndex) => row.classList.toggle('row-active', rowIndex === index));
      afterRows.forEach((row, rowIndex) => row.classList.toggle('row-active', rowIndex === index));
    };
    setComparison(comparisonIndex);
    const comparisonObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      window.setInterval(() => {
        comparisonIndex = (comparisonIndex + 1) % beforeRows.length;
        setComparison(comparisonIndex);
      }, 1900);
      comparisonObserver.disconnect();
    }, { threshold: .3 });
    comparisonObserver.observe(comparison);
  }

  document.querySelectorAll('[data-dw-compare]').forEach((compare) => {
    const range = compare.querySelector('.dw-compare__range');
    const beforeLabel = compare.querySelector('.dw-compare__side-label--before');
    const afterLabel = compare.querySelector('.dw-compare__side-label--after');
    if (!(range instanceof HTMLInputElement)) return;

    const clampUnit = (number) => Math.max(0, Math.min(1, number));
    const updateLabels = (value) => {
      const dividerX = compare.clientWidth * (value / 100);
      let beforeOpacity = 1;
      let afterOpacity = 1;

      if (beforeLabel instanceof HTMLElement) {
        const fadeStart = beforeLabel.offsetLeft + beforeLabel.offsetWidth * .5;
        const fadeEnd = beforeLabel.offsetLeft;
        beforeOpacity = dividerX >= fadeStart
          ? 1
          : clampUnit((dividerX - fadeEnd) / Math.max(fadeStart - fadeEnd, 1));
        beforeLabel.style.setProperty('--label-opacity', beforeOpacity.toFixed(3));
        beforeLabel.style.setProperty('--label-shift', `${(-14 * (1 - beforeOpacity)).toFixed(2)}px`);
      }

      if (afterLabel instanceof HTMLElement) {
        const fadeStart = afterLabel.offsetLeft + afterLabel.offsetWidth * .5;
        const fadeEnd = afterLabel.offsetLeft + afterLabel.offsetWidth;
        afterOpacity = dividerX <= fadeStart
          ? 1
          : clampUnit((fadeEnd - dividerX) / Math.max(fadeEnd - fadeStart, 1));
        afterLabel.style.setProperty('--label-opacity', afterOpacity.toFixed(3));
        afterLabel.style.setProperty('--label-shift', `${(14 * (1 - afterOpacity)).toFixed(2)}px`);
      }

      compare.classList.toggle('is-after-full', beforeOpacity <= .01);
      compare.classList.toggle('is-before-full', afterOpacity <= .01);
    };

    const updateCompare = () => {
      const value = Math.max(0, Math.min(100, Number(range.value || 50)));
      compare.style.setProperty('--compare', `${value}%`);
      updateLabels(value);
      const description = value <= 1
        ? 'Полностью показан подход Pozdnyakov Prod'
        : value >= 99
          ? 'Полностью показан обычный подход'
          : value < 42
            ? 'Преимущественно показан подход Pozdnyakov Prod'
            : value > 58
              ? 'Преимущественно показан обычный подход'
              : 'Поровну: обычный подход и Pozdnyakov Prod';
      range.setAttribute('aria-valuetext', description);
    };

    range.addEventListener('input', updateCompare);
    let dragPointer = null;
    const updateFromPointer = (event) => {
      const rect = compare.getBoundingClientRect();
      const value = ((event.clientX - rect.left) / Math.max(rect.width, 1)) * 100;
      range.value = String(Math.max(0, Math.min(100, value)));
      updateCompare();
    };
    const finishDrag = (event) => {
      if (dragPointer !== null && event.pointerId !== dragPointer) return;
      dragPointer = null;
      compare.classList.remove('is-dragging');
    };

    range.addEventListener('pointerdown', (event) => {
      if (event.button !== 0) return;
      event.preventDefault();
      dragPointer = event.pointerId;
      range.setPointerCapture?.(event.pointerId);
      range.focus({ preventScroll: true });
      compare.classList.add('is-dragging');
      updateFromPointer(event);
    });
    range.addEventListener('pointermove', (event) => {
      if (event.pointerId !== dragPointer) return;
      event.preventDefault();
      updateFromPointer(event);
    });
    range.addEventListener('pointerup', finishDrag);
    range.addEventListener('pointercancel', finishDrag);
    range.addEventListener('lostpointercapture', finishDrag);
    range.addEventListener('blur', () => compare.classList.remove('is-dragging'));
    window.addEventListener('resize', updateCompare, { passive: true });
    updateCompare();
  });

  document.querySelectorAll('[data-system-chart]').forEach((chart) => {
    const columns = [...chart.querySelectorAll('[data-chart-value]')];
    const summary = chart.querySelector('[data-chart-summary]');
    let chartFrame = 0;
    let played = false;

    const resetChart = () => {
      cancelAnimationFrame(chartFrame);
      chart.classList.remove('is-chart-active');
      columns.forEach((column) => {
        const number = column.querySelector('[data-chart-number]');
        if (number) number.textContent = '0';
      });
      if (summary) summary.textContent = '0';
    };

    const playChart = () => {
      resetChart();
      void chart.offsetWidth;
      requestAnimationFrame(() => chart.classList.add('is-chart-active'));
      const start = performance.now() + 180;
      const duration = 1450;
      const tick = (time) => {
        const progress = Math.max(0, Math.min((time - start) / duration, 1));
        const eased = 1 - Math.pow(1 - progress, 3);
        columns.forEach((column) => {
          const target = Number(column.dataset.chartValue || 0);
          const number = column.querySelector('[data-chart-number]');
          if (number) number.textContent = String(Math.round(target * eased));
        });
        if (summary) summary.textContent = String(Math.round(95 * eased));
        if (progress < 1) chartFrame = requestAnimationFrame(tick);
      };
      chartFrame = requestAnimationFrame(tick);
    };

    if ('IntersectionObserver' in window) {
      const chartObserver = new IntersectionObserver(([entry]) => {
        if (entry.intersectionRatio >= .3 && !played) {
          played = true;
          playChart();
        } else if (!entry.isIntersecting) {
          played = false;
          resetChart();
        }
      }, { threshold: [0, .3] });
      chartObserver.observe(chart);
    } else {
      playChart();
    }
  });

  const counters = [...document.querySelectorAll('[data-count]')];
  if (counters.length) {
    const animateCounter = (counter) => {
      const target = Number(counter.dataset.count || 0);
      const prefix = counter.dataset.prefix || '';
      if (reducedMotion) {
        counter.textContent = `${prefix}${target}`;
        return;
      }
      const started = performance.now();
      const duration = 1100;
      const tick = (time) => {
        const progress = Math.min((time - started) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = `${prefix}${Math.round(target * eased)}`;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: .75 });
    counters.forEach((counter) => counterObserver.observe(counter));
  }

  const steps = [...document.querySelectorAll('.stepper .step')];
  if (steps.length && 'IntersectionObserver' in window) {
    const stepObserver = new IntersectionObserver((entries) => {
      const activeEntry = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!activeEntry) return;
      steps.forEach((step) => step.classList.toggle('is-active', step === activeEntry.target));
    }, { threshold: [.45, .7], rootMargin: '-20% 0px -32% 0px' });
    steps.forEach((step) => stepObserver.observe(step));
  }

  const trackedSections = [...document.querySelectorAll('main > section[id]')];
  if (trackedSections.length > 2) {
    const rail = document.createElement('nav');
    rail.className = 'section-rail';
    rail.setAttribute('aria-label', 'Навигация по разделам');
    trackedSections.forEach((section, index) => {
      const link = document.createElement('a');
      link.href = `#${section.id}`;
      link.dataset.section = section.id;
      link.innerHTML = `<span>${String(index + 1).padStart(2, '0')}</span><i></i>`;
      link.setAttribute('aria-label', `Перейти к разделу ${index + 1}`);
      rail.append(link);
    });
    body.append(rail);
    const railLinks = [...rail.querySelectorAll('a')];
    const railObserver = new IntersectionObserver((entries) => {
      const current = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!current) return;
      railLinks.forEach((link) => link.classList.toggle('active', link.dataset.section === current.target.id));
    }, { threshold: [.2, .4, .65], rootMargin: '-24% 0px -45% 0px' });
    trackedSections.forEach((section) => railObserver.observe(section));
  }

  const canvas = document.getElementById('waveCanvas');
  if (canvas instanceof HTMLCanvasElement) {
    const context = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let visible = true;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context?.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = (time) => {
      if (!context || !visible || document.hidden) {
        animationFrame = requestAnimationFrame(draw);
        return;
      }
      context.clearRect(0, 0, width, height);
      const center = height * .48;
      const compact = width < 720;
      const lines = compact ? 24 : 38;
      for (let line = 0; line < lines; line += 1) {
        const progress = line / Math.max(1, lines - 1);
        const y = center + (progress - .5) * (compact ? 310 : 470);
        context.beginPath();
        for (let x = -20; x <= width + 20; x += 9) {
          const distance = Math.abs(x - width * .68) / Math.max(width, 1);
          const envelope = Math.max(0, 1 - distance * 2.15);
          const amplitude = (18 + progress * 35) * envelope;
          const wave = Math.sin(x * .012 + time * .00042 + line * .34) * amplitude;
          const secondary = Math.sin(x * .0045 - time * .00019 + line) * 10 * envelope;
          const pointY = y + wave + secondary;
          if (x === -20) context.moveTo(x, pointY); else context.lineTo(x, pointY);
        }
        const alpha = .025 + (1 - Math.abs(progress - .5) * 2) * .1;
        context.strokeStyle = `rgba(255,255,255,${alpha})`;
        context.lineWidth = .8;
        context.stroke();
      }
      animationFrame = requestAnimationFrame(draw);
    };

    const canvasObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0 });
    canvasObserver.observe(canvas);
    resize();
    window.addEventListener('resize', resize, { passive: true });
    animationFrame = requestAnimationFrame(draw);
    window.addEventListener('pagehide', () => cancelAnimationFrame(animationFrame), { once: true });
  }

  const hero = document.getElementById('hero');
  hero?.addEventListener('pointermove', (event) => {
    const rect = hero.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / Math.max(rect.width, 1)) * 100;
    const y = ((event.clientY - rect.top) / Math.max(rect.height, 1)) * 100;
    hero.style.setProperty('--pointer-x', `${x}%`);
    hero.style.setProperty('--pointer-y', `${y}%`);
  }, { passive: true });

  const faqItems = [...document.querySelectorAll('.faq-list details')];
  const faqCloseTimers = new WeakMap();
  const clearFaqTimer = (item) => {
    const timer = faqCloseTimers.get(item);
    if (timer) window.clearTimeout(timer);
    faqCloseTimers.delete(item);
  };
  const openFaq = (item) => {
    clearFaqTimer(item);
    item.open = true;
    item.querySelector('summary')?.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(() => item.classList.add('is-open'));
  };
  const closeFaq = (item) => {
    clearFaqTimer(item);
    item.classList.remove('is-open');
    item.querySelector('summary')?.setAttribute('aria-expanded', 'false');
    const timer = window.setTimeout(() => {
      if (!item.classList.contains('is-open')) item.open = false;
      faqCloseTimers.delete(item);
    }, 640);
    faqCloseTimers.set(item, timer);
  };

  faqItems.forEach((item) => {
    const summary = item.querySelector('summary');
    if (!summary) return;
    summary.setAttribute('aria-expanded', String(item.open));
    if (item.open) item.classList.add('is-open');
    summary.addEventListener('click', (event) => {
      event.preventDefault();
      if (item.classList.contains('is-open')) {
        closeFaq(item);
        return;
      }
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.open) closeFaq(otherItem);
      });
      openFaq(item);
    });
  });

  const form = document.getElementById('contactForm');
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const business = String(data.get('business') || '').trim();
    const link = String(data.get('link') || '').trim();
    const task = String(data.get('task') || '').trim();
    const message = [
      'Здравствуйте! Хочу получить мини-аудит моего профиля дизайнера.',
      '',
      `Имя: ${name}`,
      `Направление: ${business}`,
      link ? `Ссылка: ${link}` : '',
      `Задача: ${task}`
    ].filter(Boolean).join('\n');
    window.open(`https://t.me/vlpozd?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  });

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
