// ============================================
// GIT DASH - GitHub Profile Style
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeHeatmap();
    initializeAnimations();
    initializeInteractions();
});

// ============================================
// HEATMAP GENERATION
// ============================================

function initializeHeatmap() {
    const heatmapContainer = document.getElementById('heatmap');
    const weekCount = 12;
    const daysPerWeek = 7;
    const totalDays = weekCount * daysPerWeek;

    for (let i = 0; i < totalDays; i++) {
        const cell = document.createElement('div');
        cell.className = 'heatmap-cell';
        
        const activityLevel = Math.floor(Math.random() * 5);
        cell.classList.add(`level-${activityLevel}`);
        
        const date = new Date();
        date.setDate(date.getDate() - (totalDays - i - 1));
        
        const commits = activityLevel * Math.floor(Math.random() * 10 + 1);
        cell.title = `${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}: ${commits} commits`;
        
        cell.addEventListener('mouseenter', function() {
            showTooltip(this, cell.title);
        });
        
        cell.addEventListener('mouseleave', hideTooltip);
        
        heatmapContainer.appendChild(cell);
    }
}

function showTooltip(element, text) {
    let tooltip = document.getElementById('heatmap-tooltip');
    
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'heatmap-tooltip';
        tooltip.style.cssText = `
            position: fixed;
            background: var(--bg-card);
            border: 2px solid var(--neon-lime);
            color: var(--neon-lime);
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 12px;
            pointer-events: none;
            z-index: 1001;
            box-shadow: 0 0 15px rgba(57, 255, 20, 0.5);
        `;
        document.body.appendChild(tooltip);
    }
    
    tooltip.textContent = text;
    const rect = element.getBoundingClientRect();
    tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
    tooltip.style.opacity = '1';
}

function hideTooltip() {
    const tooltip = document.getElementById('heatmap-tooltip');
    if (tooltip) {
        tooltip.style.opacity = '0';
    }
}

// ============================================
// ANIMATIONS
// ============================================

function initializeAnimations() {
    // Fade in elements on scroll
    observeElements('.section-heading', 'fadeIn');
    observeElements('.repo-card', 'fadeIn');
    observeElements('.health-card', 'fadeIn');
    observeElements('.timeline-item', 'fadeIn');
}

function observeElements(selector, animationClass) {
    const elements = document.querySelectorAll(selector);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.animation = 'slideDown 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });
}

// ============================================
// INTERACTIONS
// ============================================

function initializeInteractions() {
    // Add hover effects to tech stack
    const techImages = document.querySelectorAll('.tech-stack img');
    techImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.filter = 'drop-shadow(0 0 20px var(--neon-cyan)) brightness(1.2)';
        });
        img.addEventListener('mouseleave', function() {
            this.style.filter = 'drop-shadow(0 0 8px rgba(0, 212, 255, 0.3))';
        });
    });

    // Add hover effects to social links
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.filter = 'drop-shadow(0 0 20px var(--neon-cyan)) brightness(1.2)';
        });
        link.addEventListener('mouseleave', function() {
            this.style.filter = 'drop-shadow(0 0 8px rgba(0, 212, 255, 0.3))';
        });
    });

    // Smooth scroll for links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// ============================================
// EASTER EGG
// ============================================

let konamiIndex = 0;
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', function(e) {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateMatrixMode();
            konamiIndex = 0;
        }
    } else if (e.key !== konamiCode[0]) {
        konamiIndex = 0;
    }
});

function activateMatrixMode() {
    const style = document.createElement('style');
    style.textContent = `
        * {
            text-shadow: 0 0 15px var(--neon-lime) !important;
        }
        body {
            animation: matrixFlicker 0.3s ease-in-out;
        }
        @keyframes matrixFlicker {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
        }
    `;
    document.head.appendChild(style);
    showNotification('🤖 MATRIX MODE ACTIVATED 🤖', 2000);
}

function showNotification(message, duration = 3000) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--neon-lime);
        color: var(--bg-darker);
        padding: 16px 32px;
        border-radius: 8px;
        font-weight: bold;
        z-index: 9999;
        box-shadow: 0 0 30px var(--neon-lime);
        animation: slideDown 0.3s ease-out;
    `;
    notification.textContent = message;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideDown 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

console.log('%c🚀 Git Dash GitHub Profile Loaded', 'color: #00d4ff; font-size: 16px; font-weight: bold;');
console.log('%cKonami Code: ↑↑↓↓←→←→BA for Matrix Mode!', 'color: #39ff14; font-size: 12px;');
