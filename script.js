/* ============================================
   April Fools Website - Main Script
   ============================================ */

// ---- Particle Background ----
function createParticles() {
    const container = document.getElementById('particles');
    const colors = ['#fcc8dc', '#ddd0fe', '#fba4c4', '#c5acfd', '#f9ecd4', '#fde4ed'];
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 12 + 4;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const duration = Math.random() * 10 + 8;
        const delay = Math.random() * 10;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color;
        particle.style.left = `${left}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;

        container.appendChild(particle);
    }
}

// ---- Section Navigation ----
function goToSection(targetId) {
    const currentSection = document.querySelector('.section.active');
    const targetSection = document.getElementById(targetId);

    if (!targetSection || targetSection === currentSection) return;

    // Fade out current
    currentSection.classList.remove('active');

    // Fade in target after a brief delay
    setTimeout(() => {
        targetSection.classList.add('active');

        // Trigger section-specific animations
        if (targetId === 'section-prank') {
            startPrankAnimation();
        } else if (targetId === 'section-real') {
            triggerFadeUps(targetSection);
        } else if (targetId === 'section-final') {
            triggerFadeUps(targetSection);
            startFloatingHearts();
        }
    }, 400);
}

// ---- Section 2: Prank Scanner Animation ----
function startPrankAnimation() {
    const steps = [
        document.getElementById('step-1'),
        document.getElementById('step-2'),
        document.getElementById('step-3'),
    ];
    const checks = [
        document.getElementById('check-1'),
        document.getElementById('check-2'),
        document.getElementById('check-3'),
    ];
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const scannerContainer = document.getElementById('scanner-container');
    const resultContainer = document.getElementById('result-container');
    const resultLoading = document.getElementById('result-loading');

    let progress = 0;
    const totalDuration = 4000; // 4 seconds total
    const stepInterval = totalDuration / 3;

    // Animate steps one by one
    steps.forEach((step, index) => {
        setTimeout(() => {
            step.classList.add('active');
        }, index * stepInterval);

        setTimeout(() => {
            step.classList.remove('active');
            step.classList.add('done');
        }, (index + 1) * stepInterval - 300);
    });

    // Animate progress bar
    const progressInterval = setInterval(() => {
        progress += 1;
        if (progress > 100) {
            clearInterval(progressInterval);
            return;
        }
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${progress}%`;
    }, totalDuration / 100);

    // Show result after scanning completes
    setTimeout(() => {
        scannerContainer.style.opacity = '0';
        scannerContainer.style.transform = 'scale(0.95)';
        scannerContainer.style.transition = 'all 0.5s ease';

        setTimeout(() => {
            scannerContainer.classList.add('hidden');
            resultContainer.classList.remove('hidden');
        }, 500);
    }, totalDuration + 600);
}

// ---- Section 3 & 5: Trigger Fade-Up Animations ----
function triggerFadeUps(section) {
    const elements = section.querySelectorAll('.fade-up');
    elements.forEach((el) => {
        const delay = parseInt(el.getAttribute('data-delay') || '0', 10);
        setTimeout(() => {
            el.classList.add('visible');
        }, delay);
    });
}

// ---- Section 4: Interactive Replies ----
const replies = {
    cute: "Good, I was hoping you'd say that 😄",
    okay: "Okay?! Just okay?! I spent like... minutes on this 😤😂",
    af: "Nope, this one's actually real… mostly 😌",
    dontclick: "I knew you would click it 😂 …you really can't resist, can you?",
};

function showReply(type) {
    const interactiveMain = document.getElementById('interactive-main');
    const replyContainer = document.getElementById('reply-container');
    const replyText = document.getElementById('reply-text');

    replyText.textContent = replies[type];

    // Smooth transition
    interactiveMain.style.opacity = '0';
    interactiveMain.style.transform = 'translateY(-20px)';
    interactiveMain.style.transition = 'all 0.4s ease';

    setTimeout(() => {
        interactiveMain.classList.add('hidden');
        replyContainer.classList.remove('hidden');
    }, 400);
}

// ---- Section 5: Floating Hearts ----
function startFloatingHearts() {
    const container = document.getElementById('final-hearts');
    const heartEmojis = ['💖', '💕', '🌸', '✨', '💗', '🩷'];

    function spawnHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDuration = `${Math.random() * 2 + 3}s`;
        heart.style.fontSize = `${Math.random() * 1 + 1}rem`;

        container.appendChild(heart);

        // Remove after animation
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }

    // Spawn hearts periodically
    const heartInterval = setInterval(() => {
        spawnHeart();
    }, 400);

    // Initial burst
    for (let i = 0; i < 8; i++) {
        setTimeout(spawnHeart, i * 150);
    }

    // Store interval so we could clear it later if needed
    window._heartInterval = heartInterval;
}

// ---- Go Back to Interactive Section ----
function goBackToInteractive() {
    // Stop floating hearts
    if (window._heartInterval) {
        clearInterval(window._heartInterval);
        window._heartInterval = null;
    }
    const heartsContainer = document.getElementById('final-hearts');
    heartsContainer.innerHTML = '';

    // Reset interactive section state
    const interactiveMain = document.getElementById('interactive-main');
    const replyContainer = document.getElementById('reply-container');
    interactiveMain.classList.remove('hidden');
    interactiveMain.style.opacity = '';
    interactiveMain.style.transform = '';
    replyContainer.classList.add('hidden');

    // Reset final section fade-ups so they re-animate on next visit
    const finalSection = document.getElementById('section-final');
    finalSection.querySelectorAll('.fade-up').forEach((el) => {
        el.classList.remove('visible');
    });

    goToSection('section-interactive');
}

// ---- Initialize ----
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initMusicToggle();
});

// ---- Music Toggle ----
function initMusicToggle() {
    const btn = document.getElementById('music-toggle');
    const audio = document.getElementById('bg-music');
    let isPlaying = false;

    // Try to autoplay immediately
    function startMusic() {
        audio.play().then(() => {
            isPlaying = true;
            btn.classList.add('is-playing');
            btn.classList.remove('is-off');
        }).catch(() => {
            // Browser blocked autoplay — wait for first user interaction
            btn.classList.add('is-off');
            document.addEventListener('click', handleFirstInteraction, { once: true });
            document.addEventListener('touchstart', handleFirstInteraction, { once: true });
        });
    }

    // On first interaction, auto-start music (unless user clicked the toggle to turn it off)
    function handleFirstInteraction(e) {
        // If they clicked the toggle button itself, let the toggle handler deal with it
        if (btn.contains(e.target)) return;
        audio.play().then(() => {
            isPlaying = true;
            btn.classList.add('is-playing');
            btn.classList.remove('is-off');
        }).catch(() => {});
        // Clean up the other listener
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
    }

    startMusic();

    // Toggle button click
    btn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
            btn.classList.remove('is-playing');
            btn.classList.add('is-off');
            // Remove first-interaction listeners since user made a choice
            document.removeEventListener('click', handleFirstInteraction);
            document.removeEventListener('touchstart', handleFirstInteraction);
        } else {
            audio.play().then(() => {
                isPlaying = true;
                btn.classList.add('is-playing');
                btn.classList.remove('is-off');
            }).catch((err) => {
                console.warn('Audio playback failed:', err);
            });
        }
    });

    // Handle audio ending (in case loop fails)
    audio.addEventListener('ended', () => {
        isPlaying = false;
        btn.classList.remove('is-playing');
        btn.classList.add('is-off');
    });
}
