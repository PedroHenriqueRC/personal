/* =========================================================
   PORTFÓLIO — PEDRO HENRIQUE
   JavaScript principal
========================================================= */

/* =========================================================
   PORTFÓLIO — PEDRO HENRIQUE
   JavaScript principal (refatorado em módulos)
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const navbarEl = document.getElementById("navbar");
    const menuToggleEl = document.getElementById("menu-toggle");
    const navigationEl = document.querySelector(".main-navigation");
    const navLinks = document.querySelectorAll(".nav-link");

    const cursorGlowEl = document.querySelector(".cursor-glow");

    const projectModalEl = document.getElementById("project-modal");
    const modalOverlayEl = document.getElementById("modal-overlay");
    const modalCloseEl = document.getElementById("modal-close");

    const modalCategoryEl = document.getElementById("modal-category");
    const modalTitleEl = document.getElementById("modal-title");
    const modalDescriptionEl = document.getElementById("modal-description");
    const modalChallengeEl = document.getElementById("modal-challenge");
    const modalRoleEl = document.getElementById("modal-role");
    const modalTechnologiesEl = document.getElementById("modal-technologies");
    const modalResultEl = document.getElementById("modal-result");

    let projectCards = document.querySelectorAll(".project-card");
    const sections = document.querySelectorAll("main section[id]");

    // Project data centralizada como array (fácil de iterar e estender)
    const projects = [
        {
            id: "databricks",
            category: "DATA ENGINEERING",
            title: "Migração Alteryx → Databricks",
            description: "Projeto de modernização de workflows analíticos, reduzindo custos de licenciamento e melhorando governança e escalabilidade.",
            challenge: "Modernizar workflows existentes desenvolvidos em Alteryx e adaptar regras de negócio para um ambiente distribuído.",
            role: "Análise dos workflows, mapeamento de regras de negócio e suporte na adaptação técnica para Databricks/Spark.",
            technologies: ["Databricks", "Apache Spark", "Python", "SQL", "Engenharia de Dados", "Governança"],
            result: "Arquitetura modernizada com processos analíticos mais escaláveis e melhor governança."
        },
        {
            id: "cnpj",
            category: "DATA & REGULATORY",
            title: "Adequação ao CNPJ Alfanumérico",
            description: "Preparação de sistemas, integrações e pipelines para suportar a evolução do padrão de identificação do CNPJ.",
            challenge: "Garantir compatibilidade com identificadores alfanuméricos sem impactar integrações legadas.",
            role: "Levantamento de impactos, identificação de pontos críticos e apoio na estratégia de migração.",
            technologies: ["XML", "Shell Script", "Python", "IA Generativa", "Data Engineering", "Integrações"],
            result: "Componentes mapeados e preparados para uma transição controlada ao novo padrão regulatório."
        },
        {
            id: "devops",
            category: "DEVOPS",
            title: "Adequação à Esteira DevOps",
            description: "Modernização de projetos legados para adoção de práticas de versionamento, automação e integração contínua.",
            challenge: "Reduzir dependências manuais e aumentar rastreabilidade em projetos sem fluxo de CI/CD.",
            role: "Organização dos repositórios, definição de pipelines e estrutura de integração com a esteira corporativa.",
            technologies: ["Azure DevOps", "Git", "YAML", "CI/CD", "Linux", "Shell Script"],
            result: "Maior padronização e automação dos processos de desenvolvimento e entrega."
        }
    ];

    /* ---------------------- Helpers ---------------------- */
    function findProjectById(id) {
        return projects.find((p) => p.id === id);
    }

    /* ----------------- Navigation (desktop) ---------------- */
    function initNavigation() {
        function updateNavbar() {
            if (!navbarEl) return;
            if (window.scrollY > 40) navbarEl.classList.add("scrolled");
            else navbarEl.classList.remove("scrolled");
        }

        function updateActiveNavigation() {
            let currentSection = "";
            const scrollPosition = window.scrollY + 180;
            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute("id");
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) currentSection = sectionId;
            });

            navLinks.forEach((link) => {
                const href = link.getAttribute("href");
                link.classList.remove("active");
                if (href === `#${currentSection}`) link.classList.add("active");
            });
        }

        updateNavbar();
        updateActiveNavigation();

        window.addEventListener("scroll", updateNavbar, { passive: true });
        window.addEventListener("scroll", updateActiveNavigation, { passive: true });

        // Smooth scroll with navbar offset
        document.querySelectorAll('a[href^="#"]').forEach((link) => {
            link.addEventListener("click", (event) => {
                const targetId = link.getAttribute("href");
                if (!targetId || targetId === "#") return;
                const target = document.querySelector(targetId);
                if (!target) return;
                event.preventDefault();
                const navbarHeight = navbarEl ? navbarEl.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
                window.scrollTo({ top: targetPosition, behavior: prefersReducedMotion ? "auto" : "smooth" });
            });
        });
    }

    /* ---------------- Mobile menu (accessible) --------------- */
    function initMobileMenu() {
        if (!menuToggleEl || !navigationEl) return;

        // create overlay element if not present
        let menuOverlay = document.querySelector(".menu-overlay");
        if (!menuOverlay) {
            menuOverlay = document.createElement("div");
            menuOverlay.className = "menu-overlay";
            document.body.appendChild(menuOverlay);
        }

        function openMenu() {
            navigationEl.classList.add("active");
            menuToggleEl.classList.add("active");
            menuToggleEl.setAttribute("aria-expanded", "true");
            menuToggleEl.setAttribute("aria-label", "Fechar menu");
            document.body.classList.add("menu-open");
            navigationEl.setAttribute("aria-hidden", "false");
            menuOverlay.classList.add("active");
        }

        function closeMenu() {
            navigationEl.classList.remove("active");
            menuToggleEl.classList.remove("active");
            menuToggleEl.setAttribute("aria-expanded", "false");
            menuToggleEl.setAttribute("aria-label", "Abrir menu");
            document.body.classList.remove("menu-open");
            navigationEl.setAttribute("aria-hidden", "true");
            menuOverlay.classList.remove("active");
        }

        menuToggleEl.addEventListener("click", (e) => {
            const isOpen = navigationEl.classList.toggle("active");
            menuToggleEl.classList.toggle("active", isOpen);
            menuToggleEl.setAttribute("aria-expanded", String(isOpen));
            menuToggleEl.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
            document.body.classList.toggle("menu-open", isOpen);
            navigationEl.setAttribute("aria-hidden", String(!isOpen));
            menuOverlay.classList.toggle("active", isOpen);
        });

        navLinks.forEach((link) => link.addEventListener("click", () => closeMenu()));

        menuOverlay.addEventListener("click", closeMenu);

        // close on ESC
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && navigationEl.classList.contains("active")) closeMenu();
        });

        // ensure menu closes on resize
        window.addEventListener("resize", () => {
            if (window.innerWidth > 900) {
                navigationEl.classList.remove("active");
                menuToggleEl.classList.remove("active");
                menuToggleEl.setAttribute("aria-expanded", "false");
                document.body.classList.remove("menu-open");
                navigationEl.setAttribute("aria-hidden", "false");
            }
        });
    }

    /* ---------------- Cursor glow (desktop only) ------------- */
    function initCursorGlow() {
        if (!cursorGlowEl || prefersReducedMotion) return;
        let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;
        document.addEventListener("mousemove", (e) => { mouseX = e.clientX; mouseY = e.clientY; });
        function animate() {
            glowX += (mouseX - glowX) * 0.12; glowY += (mouseY - glowY) * 0.12;
            cursorGlowEl.style.transform = `translate3d(${glowX}px, ${glowY}px, 0)`;
            requestAnimationFrame(animate);
        }
        animate();

        document.addEventListener("mouseenter", () => cursorGlowEl.classList.add("visible"));
        document.addEventListener("mouseleave", () => cursorGlowEl.classList.remove("visible"));

        const interactiveElements = document.querySelectorAll("a, button, .project-card, .profile-card, .result-card");
        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", () => cursorGlowEl.classList.add("cursor-large"));
            el.addEventListener("mouseleave", () => cursorGlowEl.classList.remove("cursor-large"));
        });
    }

    /* ---------------- Scroll reveal (IntersectionObserver) --- */
    function initScrollReveal() {
        const animatedElements = document.querySelectorAll(
            ".section-header, .about-content, .profile-card, .timeline-item, .featured-project, .project-card, .skills-column, .technology-cloud, .knowledge-content, .result-card, .objective-content, .contact-content"
        );

        if ("IntersectionObserver" in window && !prefersReducedMotion) {
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add("active");
                    obs.unobserve(entry.target);
                });
            }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

            animatedElements.forEach((el) => { el.classList.add("reveal"); observer.observe(el); });
        } else {
            animatedElements.forEach((el) => el.classList.add("active"));
        }
    }

    /* ---------------- Project modal (accessible) ------------- */
    function initProjectModal() {
        if (!projectModalEl) return;

        let lastFocused = null;
        const focusableSelector = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

        function openModal(projectId) {
            const project = findProjectById(projectId);
            if (!project) { console.warn(`Projeto "${projectId}" não encontrado.`); return; }

            modalCategoryEl.textContent = project.category;
            modalTitleEl.textContent = project.title;
            modalDescriptionEl.textContent = project.description;
            modalChallengeEl.textContent = project.challenge;
            modalRoleEl.textContent = project.role;
            modalResultEl.textContent = project.result;

            modalTechnologiesEl.innerHTML = "";
            project.technologies.forEach((t) => { const tag = document.createElement("span"); tag.textContent = t; modalTechnologiesEl.appendChild(tag); });

            lastFocused = document.activeElement;

            // lock scroll (preserve position)
            const scrollY = window.scrollY; document.documentElement.style.setProperty('--scroll-y', `${scrollY}px`);
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;

            projectModalEl.classList.add('active');
            projectModalEl.setAttribute('aria-hidden', 'false');
            document.body.classList.add('modal-open');
            document.querySelector('main').setAttribute('aria-hidden', 'true');

            // focus management
            setTimeout(() => { modalCloseEl.focus(); }, 120);

            // trap focus
            trapFocusIn(projectModalEl);
        }

        function closeModal() {
            projectModalEl.classList.remove('active');
            projectModalEl.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('modal-open');
            document.querySelector('main').setAttribute('aria-hidden', 'false');

            // restore scroll
            const scrollY = document.body.style.top ? -parseInt(document.body.style.top || '0', 10) : 0;
            document.body.style.position = '';
            document.body.style.top = '';
            window.scrollTo(0, scrollY);

            // restore focus
            if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
        }

        function trapFocusIn(container) {
            const focusable = Array.from(container.querySelectorAll(focusableSelector));
            if (!focusable.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            function handleKey(e) {
                if (e.key !== 'Tab') return;
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault(); last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault(); first.focus();
                }
            }

            container.addEventListener('keydown', handleKey);
            // remove listener when modal closes
            const removeOnClose = () => { container.removeEventListener('keydown', handleKey); projectModalEl.removeEventListener('transitionend', removeOnClose); };
            projectModalEl.addEventListener('transitionend', removeOnClose);
        }

        // bind openers
        projectCards.forEach((card) => {
            const projectId = card.dataset.project;
            card.addEventListener('click', (ev) => {
                if (ev.target.closest('.project-button')) return; // button handles separately
                openModal(projectId);
            });
            const btn = card.querySelector('.project-button');
            if (btn) btn.addEventListener('click', (ev) => { ev.preventDefault(); ev.stopPropagation(); openModal(projectId); });
        });

        // close bindings
        modalCloseEl && modalCloseEl.addEventListener('click', closeModal);
        modalOverlayEl && modalOverlayEl.addEventListener('click', closeModal);
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && projectModalEl.classList.contains('active')) closeModal(); });
    }

    /* ---------------- Project cards interaction ------------- */
    function initProjectCards() {
        if (prefersReducedMotion) return;
        projectCards.forEach((card) => {
            card.addEventListener('mousemove', (event) => {
                const rect = card.getBoundingClientRect();
                const x = event.clientX - rect.left; const y = event.clientY - rect.top;
                const centerX = rect.width / 2; const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -2; const rotateY = ((x - centerX) / centerX) * 2;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
            });
            card.addEventListener('mouseleave', () => { card.style.transform = ''; });
        });
    }

    /* ---------------- Hero parallax & title effects --------- */
    function initHeroEffects() {
        const hero = document.querySelector('.hero');
        const heroVisual = document.querySelector('.hero-visual');
        if (!hero || !heroVisual || prefersReducedMotion) return;
        hero.addEventListener('mousemove', (event) => {
            const rect = hero.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5; const y = (event.clientY - rect.top) / rect.height - 0.5;
            heroVisual.style.transform = `translate3d(${x * 12}px, ${y * 12}px, 0)`;
        });
        hero.addEventListener('mouseleave', () => { heroVisual.style.transform = ''; });

        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle && !prefersReducedMotion) heroTitle.classList.add('hero-title-ready');
    }

    /* ---------------- Technologies hover ------------------- */
    function initTechHover() {
        const items = document.querySelectorAll('.technology-cloud span');
        items.forEach((item) => {
            item.addEventListener('mouseenter', () => item.classList.add('technology-active'));
            item.addEventListener('mouseleave', () => item.classList.remove('technology-active'));
        });
    }

    /* ---------------- Initialization ----------------------- */
    initNavigation();
    initMobileMenu();
    initCursorGlow();
    initScrollReveal();
    initProjectModal();
    initProjectCards();
    initHeroEffects();
    initTechHover();

    console.log('Portfólio carregado com sucesso.');
    projectCards = document.querySelectorAll('.project-card');
    console.log(`${projectCards.length} projetos encontrados.`);
});
