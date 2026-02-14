// ===============================
// MAIN INTERACTIONS & ANIMATIONS
// ===============================

document.addEventListener("DOMContentLoaded", function () {
    // 1) Mobile navigation toggle
    const navToggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".nav");
    const navLinks = document.querySelectorAll(".nav-links a");

    if (navToggle && nav) {
        navToggle.addEventListener("click", () => {
            const isOpen = nav.classList.toggle("open");
            navToggle.classList.toggle("open", isOpen); // Adds .open to button for X animation
            navToggle.setAttribute("aria-expanded", String(isOpen));
        });

        // Close mobile menu when a link is clicked
        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                if (nav.classList.contains("open")) {
                    nav.classList.remove("open");
                    navToggle.classList.remove("open");
                    navToggle.setAttribute("aria-expanded", "false");
                }
            });
        });
    }

    // 2) Scroll-based reveal (fade-in) animations using IntersectionObserver
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window && revealElements.length > 0) {
        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        obs.unobserve(entry.target);
                    }
                });
            },
            {
                root: null,
                threshold: 0.1, // Trigger slightly earlier
            }
        );

        revealElements.forEach((el) => observer.observe(el));
    } else {
        // Fallback
        revealElements.forEach((el) => el.classList.add("visible"));
    }

    // 3) Trading Ticker Randomizer (Optional: Makes it look live)
    const tickerItems = document.querySelectorAll('.ticker-item span.up, .ticker-item span.down');

    // Simple random fluctuation simulation every 3 seconds
    setInterval(() => {
        tickerItems.forEach(item => {
            if (Math.random() > 0.7) { // Only update some
                const originalText = item.innerText;
                const isPercent = originalText.includes('%');
                const isPrice = !isPercent;

                if (isPrice) {
                    // Update price slightly
                    let val = parseFloat(originalText.replace(/,/g, ''));
                    let change = (Math.random() - 0.5) * (val * 0.0005); // 0.05% fluctuation
                    let newVal = (val + change).toFixed(2);
                    // Add commas back
                    item.innerText = Number(newVal).toLocaleString('en-US', { minimumFractionDigits: 2 });
                }
            }
        });
    }, 3000);
});