// Fonction pour vérifier si un élément est visible dans la fenêtre
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    return rect.top <= windowHeight * 0.85;
}

// Configuration des éléments à animer
const animatedElements = {
    sections: 'section:not(.home-img):not(:first-child)',
    headings: 'section:not(.home-img):not(:first-child) h1, section:not(.home-img):not(:first-child) h2, section:not(.home-img):not(:first-child) h3',
    text: 'section:not(.home-img):not(:first-child) p:not(.animated), section:not(.home-img):not(:first-child) .text-gray-600',
    cards: 'section:not(.home-img):not(:first-child) .service-card, section:not(.home-img):not(:first-child) .cards, section:not(.home-img):not(:first-child) [class*="rounded-lg"]',
    images: 'section:not(.home-img):not(:first-child) img:not(.client-logo)',
    forms: 'section:not(.home-img):not(:first-child) form, section:not(.home-img):not(:first-child) input, section:not(.home-img):not(:first-child) textarea',
    buttons: 'section:not(.home-img):not(:first-child) button:not(.spots)',
    lists: 'section:not(.home-img):not(:first-child) ul, section:not(.home-img):not(:first-child) li'
};

// Configuration des animations par type d'élément
const animations = {
    fadeUp: {
        initial: { opacity: 0, transform: 'translateY(30px)' },
        final: { opacity: 1, transform: 'translateY(0)' },
        transition: 'opacity 0.8s cubic-bezier(0.17, 0.67, 0.45, 1), transform 0.8s cubic-bezier(0.17, 0.67, 0.45, 1)'
    },
    fadeIn: {
        initial: { opacity: 0 },
        final: { opacity: 1 },
        transition: 'opacity 0.8s ease-out'
    },
    scaleUp: {
        initial: { opacity: 0, transform: 'scale(0.95)' },
        final: { opacity: 1, transform: 'scale(1)' },
        transition: 'opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.17, 0.67, 0.45, 1)'
    }
};

// Fonction pour appliquer les styles initiaux
function applyInitialStyles(element, animation) {
    Object.entries(animation.initial).forEach(([property, value]) => {
        element.style[property] = value;
    });
    element.style.transition = animation.transition;
}

// Fonction pour appliquer les styles finaux
function applyFinalStyles(element, animation) {
    Object.entries(animation.final).forEach(([property, value]) => {
        element.style[property] = value;
    });
}

// Fonction pour initialiser les éléments à animer
function initializeElements() {
    // S'assurer que la première section est toujours visible
    const firstSection = document.querySelector('.home-img');
    if (firstSection) {
        firstSection.style.opacity = '1';
        firstSection.style.transform = 'none';
    }

    // Initialiser les sections
    document.querySelectorAll(animatedElements.sections).forEach(section => {
        if (!section.classList.contains('fade-init')) {
            applyInitialStyles(section, animations.fadeUp);
            section.classList.add('fade-init');
        }
    });

    // Initialiser les éléments internes
    Object.entries(animatedElements).forEach(([key, selector]) => {
        if (key === 'sections') return; // Sections déjà traitées

        document.querySelectorAll(selector).forEach(element => {
            if (!element.classList.contains('fade-init')) {
                const animation = key === 'cards' ? animations.scaleUp :
                                key === 'images' ? animations.fadeIn :
                                animations.fadeUp;
                                
                applyInitialStyles(element, animation);
                element.classList.add('fade-init');
            }
        });
    });
}

// Fonction pour animer les éléments
function animateOnScroll() {
    // Animer les sections
    document.querySelectorAll(animatedElements.sections).forEach((section, index) => {
        if (isElementInViewport(section)) {
            setTimeout(() => {
                applyFinalStyles(section, animations.fadeUp);
                section.classList.add('animated');
                
                // Animer les éléments internes une fois la section visible
                Object.entries(animatedElements).forEach(([key, selector]) => {
                    if (key === 'sections') return;

                    section.querySelectorAll(`${selector.split(',').map(s => s.trim().replace('section:not(.home-img):not(:first-child)', '')).join(',')}`).forEach((element, elementIndex) => {
                        const delay = 150 + (elementIndex * 100);
                        setTimeout(() => {
                            const animation = key === 'cards' ? animations.scaleUp :
                                           key === 'images' ? animations.fadeIn :
                                           animations.fadeUp;
                            
                            applyFinalStyles(element, animation);
                            element.classList.add('animated');
                        }, delay);
                    });
                });
            }, index * 100);
        }
    });
}

// Optimisation du scroll avec throttle
let isScrolling = false;
window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            animateOnScroll();
            isScrolling = false;
        });
        isScrolling = true;
    }
}, { passive: true });

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    initializeElements();
    // Petit délai pour s'assurer que les styles initiaux sont appliqués
    setTimeout(animateOnScroll, 100);
});
