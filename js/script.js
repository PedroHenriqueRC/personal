/* =========================================================
   PORTFÓLIO — PEDRO HENRIQUE
   JavaScript principal
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTOS PRINCIPAIS
    ====================================================== */

    const navbar = document.getElementById("navbar");
    const menuToggle = document.getElementById("menu-toggle");
    const navigation = document.querySelector(".main-navigation");
    const navLinks = document.querySelectorAll(".nav-link");

    const cursorGlow = document.querySelector(".cursor-glow");

    const projectModal = document.getElementById("project-modal");
    const modalOverlay = document.getElementById("modal-overlay");
    const modalClose = document.getElementById("modal-close");

    const modalCategory = document.getElementById("modal-category");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const modalChallenge = document.getElementById("modal-challenge");
    const modalRole = document.getElementById("modal-role");
    const modalTechnologies = document.getElementById("modal-technologies");
    const modalResult = document.getElementById("modal-result");

    const projectCards = document.querySelectorAll(".project-card");

    const sections = document.querySelectorAll("main section[id]");


    /* =====================================================
       CONFIGURAÇÕES
    ====================================================== */

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    /* =====================================================
       MENU MOBILE
    ====================================================== */

    if (menuToggle && navigation) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navigation.classList.toggle("active");

            menuToggle.classList.toggle("active", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Fechar menu" : "Abrir menu"
            );

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );

        });


        /* Fechar menu ao clicar em qualquer link */

        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                navigation.classList.remove("active");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Abrir menu"
                );

                document.body.classList.remove(
                    "menu-open"
                );

            });

        });


        /* Fechar menu ao clicar fora */

        document.addEventListener("click", (event) => {

            const clickedInsideNavigation =
                navigation.contains(event.target);

            const clickedMenuButton =
                menuToggle.contains(event.target);

            if (
                navigation.classList.contains("active") &&
                !clickedInsideNavigation &&
                !clickedMenuButton
            ) {

                navigation.classList.remove("active");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Abrir menu"
                );

                document.body.classList.remove(
                    "menu-open"
                );

            }

        });

    }


    /* =====================================================
       NAVBAR DINÂMICA
    ====================================================== */

    function updateNavbar() {

        if (!navbar) return;

        if (window.scrollY > 40) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }

    updateNavbar();

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );


    /* =====================================================
       NAVEGAÇÃO ATIVA
    ====================================================== */

    function updateActiveNavigation() {

        let currentSection = "";

        const scrollPosition =
            window.scrollY + 180;


        sections.forEach((section) => {

            const sectionTop = section.offsetTop;

            const sectionHeight = section.offsetHeight;

            const sectionId = section.getAttribute("id");


            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {

                currentSection = sectionId;

            }

        });


        navLinks.forEach((link) => {

            const href = link.getAttribute("href");

            link.classList.remove("active");

            if (
                href === `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    }

    updateActiveNavigation();

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );


    /* =====================================================
       SCROLL SUAVE
    ====================================================== */

    document.querySelectorAll('a[href^="#"]').forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const navbarHeight =
                navbar ? navbar.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight;

            window.scrollTo({

                top: targetPosition,

                behavior: prefersReducedMotion
                    ? "auto"
                    : "smooth"

            });

        });

    });


    /* =====================================================
       CURSOR GLOW
    ====================================================== */

    if (cursorGlow && !prefersReducedMotion) {

        let mouseX = 0;
        let mouseY = 0;

        let glowX = 0;
        let glowY = 0;


        document.addEventListener("mousemove", (event) => {

            mouseX = event.clientX;
            mouseY = event.clientY;

        });


        function animateCursor() {

            glowX += (mouseX - glowX) * 0.12;

            glowY += (mouseY - glowY) * 0.12;

            cursorGlow.style.transform =
                `translate3d(${glowX}px, ${glowY}px, 0)`;


            requestAnimationFrame(
                animateCursor
            );

        }

        animateCursor();


        document.addEventListener("mouseenter", () => {

            cursorGlow.classList.add("visible");

        });


        document.addEventListener("mouseleave", () => {

            cursorGlow.classList.remove("visible");

        });


        const interactiveElements =
            document.querySelectorAll(
                "a, button, .project-card, .profile-card, .result-card"
            );


        interactiveElements.forEach((element) => {

            element.addEventListener(
                "mouseenter",
                () => {

                    cursorGlow.classList.add(
                        "cursor-large"
                    );

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    cursorGlow.classList.remove(
                        "cursor-large"
                    );

                }
            );

        });

    }


    /* =====================================================
       ANIMAÇÕES DE SCROLL
    ====================================================== */

    const animatedElements =
        document.querySelectorAll(
            ".section-header, " +
            ".about-content, " +
            ".profile-card, " +
            ".timeline-item, " +
            ".featured-project, " +
            ".project-card, " +
            ".skills-column, " +
            ".technology-cloud, " +
            ".knowledge-content, " +
            ".result-card, " +
            ".objective-content, " +
            ".contact-content"
        );


    if (
        "IntersectionObserver" in window &&
        !prefersReducedMotion
    ) {

        const observer =
            new IntersectionObserver(
                (entries, observerInstance) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add(
                            "is-visible"
                        );

                        observerInstance.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -60px 0px"
                }
            );


        animatedElements.forEach((element) => {

            element.classList.add(
                "scroll-reveal"
            );

            observer.observe(element);

        });

    } else {

        animatedElements.forEach((element) => {

            element.classList.add(
                "is-visible"
            );

        });

    }


    /* =====================================================
       DADOS DOS PROJETOS
    ====================================================== */

    const projects = {

        databricks: {

            category: "DATA ENGINEERING",

            title: "Migração Alteryx → Databricks",

            description:
                "Projeto de modernização de workflows analíticos, buscando reduzir custos de licenciamento, aumentar a escalabilidade das soluções e fortalecer a governança dos processos de dados.",

            challenge:
                "A necessidade era modernizar workflows existentes desenvolvidos em Alteryx, avaliando alternativas tecnológicas mais escaláveis e alinhadas à estratégia de dados da organização.",

            role:
                "Atuação na análise dos workflows, entendimento das regras de negócio, avaliação da solução técnica e participação na construção e adequação dos processos para o novo ambiente.",

            technologies: [
                "Databricks",
                "Apache Spark",
                "Python",
                "SQL",
                "Engenharia de Dados",
                "Governança"
            ],

            result:
                "Evolução dos processos analíticos para uma arquitetura mais escalável, com maior aderência às estratégias de modernização e governança de dados."
        },


        cnpj: {

            category: "DATA & REGULATORY",

            title: "Adequação ao CNPJ Alfanumérico",

            description:
                "Iniciativa de preparação de sistemas, integrações e pipelines para suportar a evolução do padrão de identificação do CNPJ definido pela Receita Federal.",

            challenge:
                "O novo formato de CNPJ exige que aplicações e processos de dados estejam preparados para trabalhar com identificadores alfanuméricos, evitando falhas em integrações, validações e sistemas legados.",

            role:
                "Participação no levantamento de impactos, identificação de pontos críticos, análise de estruturas existentes e apoio na construção de estratégias para adequação dos processos.",

            technologies: [
                "XML",
                "Shell Script",
                "Python",
                "IA Generativa",
                "Data Engineering",
                "Integrações"
            ],

            result:
                "Mapeamento e preparação dos componentes impactados, contribuindo para uma transição mais segura e controlada para o novo padrão regulatório."
        },


        devops: {

            category: "DEVOPS",

            title: "Adequação à Esteira DevOps",

            description:
                "Modernização de projetos e processos legados para adoção de práticas de versionamento, automação e integração contínua.",

            challenge:
                "Projetos existentes precisavam evoluir para um fluxo mais organizado de desenvolvimento, versionamento e implantação, reduzindo dependências manuais e aumentando a rastreabilidade.",

            role:
                "Atuação na organização dos projetos, implementação de controle de versão, adequação de pipelines e estruturação dos processos necessários para integração com a esteira corporativa.",

            technologies: [
                "Azure DevOps",
                "Git",
                "YAML",
                "CI/CD",
                "Linux",
                "Shell Script"
            ],

            result:
                "Maior padronização dos projetos, melhoria da rastreabilidade das alterações e evolução do processo de desenvolvimento para um modelo mais automatizado."
        }

    };


    /* =====================================================
       ABRIR MODAL
    ====================================================== */

    function openProjectModal(projectId) {

        const project =
            projects[projectId];


        if (!project) {

            console.warn(
                `Projeto "${projectId}" não encontrado.`
            );

            return;

        }


        /* Preencher conteúdo */

        modalCategory.textContent =
            project.category;

        modalTitle.textContent =
            project.title;

        modalDescription.textContent =
            project.description;

        modalChallenge.textContent =
            project.challenge;

        modalRole.textContent =
            project.role;

        modalResult.textContent =
            project.result;


        /* Tecnologias */

        modalTechnologies.innerHTML = "";


        project.technologies.forEach(
            (technology) => {

                const tag =
                    document.createElement("span");

                tag.textContent =
                    technology;

                modalTechnologies.appendChild(
                    tag
                );

            }
        );


        /* Abrir */

        projectModal.classList.add(
            "active"
        );

        projectModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "modal-open"
        );


        /* Foco no botão fechar */

        setTimeout(() => {

            modalClose.focus();

        }, 100);


    }


    /* =====================================================
       FECHAR MODAL
    ====================================================== */

    function closeProjectModal() {

        if (!projectModal) return;


        projectModal.classList.remove(
            "active"
        );

        projectModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "modal-open"
        );

    }


    /* =====================================================
       EVENTOS DOS CARDS
    ====================================================== */

    projectCards.forEach((card) => {

        const projectId =
            card.dataset.project;


        /* Clique no card inteiro */

        card.addEventListener(
            "click",
            (event) => {

                /*
                 Evita abrir duas vezes caso
                 o usuário clique diretamente
                 no botão.
                */

                if (
                    event.target.closest(
                        ".project-button"
                    )
                ) {
                    return;
                }

                openProjectModal(
                    projectId
                );

            }
        );


        /* Botão Explorar */

        const button =
            card.querySelector(
                ".project-button"
            );


        if (button) {

            button.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                    event.stopPropagation();

                    openProjectModal(
                        projectId
                    );

                }
            );

        }

    });


    /* =====================================================
       FECHAR MODAL — BOTÃO X
    ====================================================== */

    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeProjectModal
        );

    }


    /* =====================================================
       FECHAR MODAL — OVERLAY
    ====================================================== */

    if (modalOverlay) {

        modalOverlay.addEventListener(
            "click",
            closeProjectModal
        );

    }


    /* =====================================================
       FECHAR MODAL — ESC
    ====================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                projectModal.classList.contains("active")
            ) {

                closeProjectModal();

            }


            /* Fechar menu mobile com ESC */

            if (
                event.key === "Escape" &&
                navigation &&
                navigation.classList.contains("active")
            ) {

                navigation.classList.remove(
                    "active"
                );

                menuToggle.classList.remove(
                    "active"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Abrir menu"
                );

                document.body.classList.remove(
                    "menu-open"
                );

            }

        }
    );


    /* =====================================================
       EFEITO HOVER DOS PROJECT CARDS
    ====================================================== */

    if (!prefersReducedMotion) {

        projectCards.forEach((card) => {

            card.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX - rect.left;


                    const y =
                        event.clientY - rect.top;


                    const centerX =
                        rect.width / 2;


                    const centerY =
                        rect.height / 2;


                    const rotateX =
                        ((y - centerY) / centerY) * -2;


                    const rotateY =
                        ((x - centerX) / centerX) * 2;


                    card.style.transform =
                        `perspective(1000px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-6px)`;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "";

                }
            );

        });

    }


    /* =====================================================
       PARALLAX DO HERO
    ====================================================== */

    const hero =
        document.querySelector(".hero");

    const heroVisual =
        document.querySelector(".hero-visual");


    if (
        hero &&
        heroVisual &&
        !prefersReducedMotion
    ) {

        hero.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    hero.getBoundingClientRect();


                const x =
                    (event.clientX - rect.left) /
                    rect.width -
                    0.5;


                const y =
                    (event.clientY - rect.top) /
                    rect.height -
                    0.5;


                heroVisual.style.transform =
                    `translate3d(
                        ${x * 12}px,
                        ${y * 12}px,
                        0
                    )`;

            }
        );


        hero.addEventListener(
            "mouseleave",
            () => {

                heroVisual.style.transform =
                    "";

            }
        );

    }


    /* =====================================================
       EFEITO DE TÍTULO — HERO
    ====================================================== */

    const heroTitle =
        document.querySelector(".hero-title");


    if (
        heroTitle &&
        !prefersReducedMotion
    ) {

        heroTitle.classList.add(
            "hero-title-ready"
        );

    }


    /* =====================================================
       TECNOLOGIAS — HOVER
    ====================================================== */

    const technologyItems =
        document.querySelectorAll(
            ".technology-cloud span"
        );


    technologyItems.forEach((item) => {

        item.addEventListener(
            "mouseenter",
            () => {

                item.classList.add(
                    "technology-active"
                );

            }
        );


        item.addEventListener(
            "mouseleave",
            () => {

                item.classList.remove(
                    "technology-active"
                );

            }
        );

    });


    /* =====================================================
       FECHAR MODAL SE REDIMENSIONAR PARA MOBILE
    ====================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 900 &&
                navigation
            ) {

                navigation.classList.remove(
                    "active"
                );

                if (menuToggle) {

                    menuToggle.classList.remove(
                        "active"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

                document.body.classList.remove(
                    "menu-open"
                );

            }

        }
    );


    /* =====================================================
       LOG DE INICIALIZAÇÃO
    ====================================================== */

    console.log(
        "Portfólio carregado com sucesso."
    );

    console.log(
        `${projectCards.length} projetos encontrados.`
    );

});
