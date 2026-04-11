document.addEventListener('DOMContentLoaded', () => {
    // Inicializar os ícones do Lucide
    lucide.createIcons();

    // 1. Efeito do Header ao rolar a página
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Comportamento do Overlay Menu Fullscreen
    const menuBtn = document.getElementById('menu-btn');
    const menuClose = document.getElementById('menu-close');
    const menuOverlay = document.getElementById('menu-overlay');

    menuBtn.addEventListener('click', () => {
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Impede o scroll de fundo
    });

    menuClose.addEventListener('click', () => {
        menuOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Fechar menu ao clicar em links (navegação)
    document.querySelectorAll('.menu-content a').forEach(link => {
        link.addEventListener('click', (e) => {
            menuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Navegação suave extra se for link interno (opcional)
            const href = link.getAttribute('href');
            if(href.startsWith('#') && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if(target) {
                    setTimeout(() => {
                        window.scrollTo({
                            top: target.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }, 300);
                }
            }
        });
    });

    // Rolação suave para links fora do menu
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Inicialização do Swiper Hero
    const heroSwiper = new Swiper('.heroSwiper', {
        speed: 1800,
        parallax: true,
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        }
    });

    // 4. API Intersection Observer para as Animações de Revelação
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Anima somente uma vez
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });
});
