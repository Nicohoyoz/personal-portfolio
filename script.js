// Theme toggle with persistence
const root = document.documentElement;
const THEME_KEY = "nhoyos-theme";

function applyTheme(theme) {
    if (theme === "dark") {
        root.classList.add("dark");
    } else {
        root.classList.remove("dark");
    }
}

function getPreferredTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark") return stored;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? "dark" : "light";
}

function toggleTheme() {
    const next = root.classList.contains("dark") ? "light" : "dark";
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
    const btn = document.getElementById("themeToggle");
    if (btn) btn.textContent = next === "dark" ? "☀️" : "🌙";
}

document.addEventListener("DOMContentLoaded", () => {
    // Theme init
    applyTheme(getPreferredTheme());
    const btn = document.getElementById("themeToggle");
    if (btn) {
        btn.addEventListener("click", toggleTheme);
        btn.textContent = root.classList.contains("dark") ? "☀️" : "🌙";
    }

    // Update year
    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();

    // Close mobile nav on link click (placeholder)
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(a => {
        a.addEventListener('click', () => {
            // placeholder for future mobile menu handling
        });
    });

    // Reveal-on-scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Subtle tilt for cards
    const tiltCards = document.querySelectorAll('.tilt');
    tiltCards.forEach(card => {
        const handleMove = (ev) => {
            const rect = card.getBoundingClientRect();
            const x = ev.clientX - rect.left;
            const y = ev.clientY - rect.top;
            const rx = ((y / rect.height) - 0.5) * -6; // tilt range
            const ry = ((x / rect.width) - 0.5) * 6;
            card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
        };
        const reset = () => { card.style.transform = ""; };
        card.addEventListener('mousemove', handleMove);
        card.addEventListener('mouseleave', reset);
    });
});

