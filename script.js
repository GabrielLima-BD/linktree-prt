// ===== CONFIGURAÇÃO DOS LINKS =====
const links = [
    { 
        text: 'GitHub', 
        subtitle: 'Meus projetos e código',
        url: 'https://github.com',
        icon: 'fab fa-github',
        color: '#333333'
    },
    { 
        text: 'LinkedIn', 
        subtitle: 'Rede profissional',
        url: 'https://linkedin.com',
        icon: 'fab fa-linkedin',
        color: '#0077B5'
    },
    { 
        text: 'Instagram', 
        subtitle: 'Acompanhe meu dia a dia',
        url: 'https://instagram.com',
        icon: 'fab fa-instagram',
        color: '#E4405F'
    },
    { 
        text: 'Portfólio', 
        subtitle: 'Projetos e experiências',
        url: 'https://www.behance.net',
        icon: 'fas fa-laptop-code',
        color: '#667eea'
    },
    { 
        text: 'YouTube', 
        subtitle: 'Tutoriais de programação',
        url: 'https://youtube.com',
        icon: 'fab fa-youtube',
        color: '#FF0000'
    },
    { 
        text: 'Discord', 
        subtitle: 'Comunidade de devs',
        url: 'https://discord.com',
        icon: 'fab fa-discord',
        color: '#5865F2'
    }
];

// ===== GERENCIAMENTO DE TEMA =====
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.setTheme(this.theme);
        this.bindEvents();
    }

    setTheme(theme) {
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.updateThemeIcon();
    }

    toggleTheme() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        
        // Adiciona efeito visual ao alternar
        const button = document.getElementById('theme-toggle');
        button.style.transform = 'scale(0.9) rotate(180deg)';
        setTimeout(() => {
            button.style.transform = '';
        }, 200);
    }

    updateThemeIcon() {
        const icon = document.querySelector('#theme-toggle i');
        if (icon) {
            icon.className = this.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }

    bindEvents() {
        const toggleButton = document.getElementById('theme-toggle');
        if (toggleButton) {
            toggleButton.addEventListener('click', () => this.toggleTheme());
        }
    }
}

// ===== GERENCIAMENTO DE LINKS =====
class LinkManager {
    constructor() {
        this.container = document.getElementById('links-container');
        this.animationDelay = 100;
    }

    addLinks() {
        if (!this.container) return;

        links.forEach((link, index) => {
            const linkElement = this.createLinkElement(link, index);
            this.container.appendChild(linkElement);
        });
    }

    createLinkElement(link, index) {
        const linkEl = document.createElement('a');
        linkEl.href = link.url;
        linkEl.className = 'link-button';
        linkEl.target = '_blank';
        linkEl.rel = 'noopener noreferrer';
        linkEl.style.setProperty('--index', index + 2); // +2 porque o WhatsApp é index 1
        
        // Adiciona analytics/tracking
        linkEl.addEventListener('click', () => this.trackClick(link.text));
        
        linkEl.innerHTML = `
            <div class="link-icon">
                <i class="${link.icon}"></i>
            </div>
            <div class="link-content">
                <span class="link-title">${link.text}</span>
                <span class="link-subtitle">${link.subtitle}</span>
            </div>
            <div class="link-arrow">
                <i class="fas fa-arrow-right"></i>
            </div>
        `;

        // Adiciona hover personalizado com a cor do link
        if (link.color) {
            linkEl.addEventListener('mouseenter', () => {
                linkEl.style.borderColor = link.color;
                const icon = linkEl.querySelector('.link-icon i');
                if (icon) icon.style.color = link.color;
            });
            
            linkEl.addEventListener('mouseleave', () => {
                linkEl.style.borderColor = '';
                const icon = linkEl.querySelector('.link-icon i');
                if (icon) icon.style.color = '';
            });
        }

        return linkEl;
    }

    trackClick(linkName) {
        // Analytics simples (você pode integrar com Google Analytics, etc.)
        console.log(`Link clicado: ${linkName}`);
        
        // Exemplo de como poderia enviar para Google Analytics
        // if (typeof gtag !== 'undefined') {
        //     gtag('event', 'click', {
        //         event_category: 'Link',
        //         event_label: linkName
        //     });
        // }
    }
}

// ===== EFEITOS VISUAIS E ANIMAÇÕES =====
class VisualEffects {
    constructor() {
        this.init();
    }

    init() {
        this.addScrollEffects();
        this.addParallaxEffect();
        this.addProfileImageEffects();
        this.addTypingEffect();
    }

    addScrollEffects() {
        // Intersection Observer para animações on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        // Observa elementos para animação
        document.querySelectorAll('.link-button, .social-link').forEach(el => {
            observer.observe(el);
        });
    }

    addParallaxEffect() {
        // Efeito parallax sutil nas partículas
        let ticking = false;
        
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.particle');
            
            parallaxElements.forEach((element, index) => {
                const speed = (index + 1) * 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
            
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick);
    }

    addProfileImageEffects() {
        const profileImg = document.getElementById('profile-img');
        if (!profileImg) return;

        // Efeito de clique na imagem
        profileImg.addEventListener('click', () => {
            profileImg.style.transform = 'scale(0.95)';
            setTimeout(() => {
                profileImg.style.transform = '';
            }, 150);
        });

        // Efeito de movimento do mouse
        profileImg.addEventListener('mousemove', (e) => {
            const rect = profileImg.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = (e.clientX - centerX) / 10;
            const deltaY = (e.clientY - centerY) / 10;
            
            profileImg.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.05)`;
        });

        profileImg.addEventListener('mouseleave', () => {
            profileImg.style.transform = '';
        });
    }

    addTypingEffect() {
        // Efeito de digitação no título (opcional)
        const title = document.querySelector('h1');
        if (!title) return;

        const originalText = title.textContent;
        title.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                title.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };

        // Inicia o efeito após um delay
        setTimeout(typeWriter, 800);
    }
}

// ===== UTILITÁRIOS =====
class Utils {
    static formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num.toString();
    }

    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static isMobile() {
        return window.innerWidth <= 768;
    }
}

// ===== INICIALIZAÇÃO =====
class App {
    constructor() {
        this.themeManager = new ThemeManager();
        this.linkManager = new LinkManager();
        this.visualEffects = new VisualEffects();
        this.init();
    }

    init() {
        // Aguarda o DOM estar carregado
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.onDOMLoaded());
        } else {
            this.onDOMLoaded();
        }
    }

    onDOMLoaded() {
        // Adiciona os links
        this.linkManager.addLinks();
        
        // Adiciona classe de carregamento completo
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);

        // Easter egg - Konami Code
        this.addKonamiCode();
        
        // Adiciona listener para teclas de atalho
        this.addKeyboardShortcuts();
    }

    addKonamiCode() {
        let konamiCode = [];
        const correctCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
        
        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.keyCode);
            
            if (konamiCode.length > correctCode.length) {
                konamiCode.shift();
            }
            
            if (JSON.stringify(konamiCode) === JSON.stringify(correctCode)) {
                this.activateEasterEgg();
                konamiCode = [];
            }
        });
    }

    activateEasterEgg() {
        // Easter egg: confete e mensagem especial
        document.body.style.animation = 'rainbow 2s infinite';
        
        setTimeout(() => {
            document.body.style.animation = '';
            alert('🎉 Vasco! Parabéns por descobrir o easter egg! 🎉');
        }, 2000);
    }

    addKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + D para alternar tema
            if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
                e.preventDefault();
                this.themeManager.toggleTheme();
            }
        });
    }
}

// ===== CSS ADICIONAL PARA EASTER EGG =====
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    .loaded .fade-in,
    .loaded .fade-in-delay,
    .loaded .fade-in-delay-2,
    .loaded .fade-in-delay-3,
    .loaded .fade-in-delay-4 {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// ===== INICIALIZA A APLICAÇÃO =====
const app = new App();

// ===== EXPORTA PARA DEBUGGING (opcional) =====
if (typeof window !== 'undefined') {
    window.LinkTree = {
        app,
        themeManager: app.themeManager,
        linkManager: app.linkManager,
        visualEffects: app.visualEffects,
        utils: Utils
    };
}