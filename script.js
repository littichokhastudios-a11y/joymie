// Smooth scroll reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.intro-section, .features, .beta-notice, .privacy-section, .download-section, .feedback-section, .footer');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Add parallax effect to gradient orbs
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 100;
        mouseY = (e.clientY / window.innerHeight) * 100;
    });

    function animateOrbs() {
        currentX += (mouseX - currentX) * 0.05;
        currentY += (mouseY - currentY) * 0.05;

        const orbs = document.querySelectorAll('.gradient-orb');
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.5;
            orb.style.transform = `translate(${currentX * speed}px, ${currentY * speed}px)`;
        });

        requestAnimationFrame(animateOrbs);
    }

    animateOrbs();

    // Download button interaction
    const downloadBtn = document.getElementById('downloadBtn');
    
    downloadBtn.addEventListener('click', (e) => {
        // Add a subtle click animation
        downloadBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            downloadBtn.style.transform = 'scale(1.05)';
            setTimeout(() => {
                downloadBtn.style.transform = 'scale(1)';
            }, 150);
        }, 150);
    });

    // Add ripple effect on touch
    downloadBtn.addEventListener('touchstart', (e) => {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        const rect = downloadBtn.getBoundingClientRect();
        const touch = e.touches[0];
        ripple.style.left = (touch.clientX - rect.left - 10) + 'px';
        ripple.style.top = (touch.clientY - rect.top - 10) + 'px';
        
        downloadBtn.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });

    // Feature cards stagger animation on scroll
    const featureCards = document.querySelectorAll('.feature-card');
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
            }
        });
    }, { threshold: 0.2 });

    featureCards.forEach(card => {
        featureObserver.observe(card);
    });

    // Add dynamic color to beta badge
    const betaBadge = document.querySelector('.beta-badge');
    setInterval(() => {
        betaBadge.style.borderColor = betaBadge.style.borderColor === 'rgb(255, 181, 194)' 
            ? '#D4F4DD' 
            : '#FFB5C2';
    }, 3000);

    // Smooth scroll for any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add touch feedback to all interactive elements
    const interactiveElements = document.querySelectorAll('.feature-card, .notice-card, .privacy-card, .feedback-card');
    interactiveElements.forEach(el => {
        el.addEventListener('touchstart', () => {
            el.style.transform = 'scale(0.98)';
        });
        el.addEventListener('touchend', () => {
            el.style.transform = 'scale(1)';
        });
    });

    // Create floating particles effect
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(229, 217, 242, 0.4);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            left: ${Math.random() * 100}%;
            top: 100%;
            animation: floatParticle ${5 + Math.random() * 5}s linear forwards;
        `;
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 10000);
    }

    // Occasionally create particles
    setInterval(createParticle, 2000);

    // Add CSS animation for particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            to {
                top: -10%;
                opacity: 0;
                transform: translateX(${Math.random() * 100 - 50}px);
            }
        }
        @keyframes ripple {
            to {
                width: 100px;
                height: 100px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Performance optimization: pause animations when tab is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            document.body.style.animationPlayState = 'paused';
        } else {
            document.body.style.animationPlayState = 'running';
        }
    });

    // Add accessibility: keyboard navigation improvements
    const focusableElements = document.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    focusableElements.forEach(el => {
        el.addEventListener('focus', () => {
            el.style.outline = '2px solid #FFB5C2';
            el.style.outlineOffset = '4px';
        });
        el.addEventListener('blur', () => {
            el.style.outline = 'none';
        });
    });

    // Log page load time for optimization
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Portal website loaded in ${loadTime.toFixed(2)}ms`);
    });
});

// Preload check for APK file
window.addEventListener('load', () => {
    const downloadBtn = document.getElementById('downloadBtn');
    const apkPath = 'portal.apk';
    
    // Check if APK exists (this will work once deployed)
    fetch(apkPath, { method: 'HEAD' })
        .then(response => {
            if (!response.ok) {
                console.warn('APK file not found. Make sure to upload portal.apk to your repository.');
            }
        })
        .catch(() => {
            console.warn('Could not verify APK file. Make sure portal.apk is in the root directory.');
        });
});
