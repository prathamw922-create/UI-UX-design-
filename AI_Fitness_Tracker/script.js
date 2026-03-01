document.addEventListener('DOMContentLoaded', () => {

    // --- Elements ---
    const loadingScreen = document.getElementById('loading-screen');
    const appContainer = document.getElementById('app-container');
    const navLinks = document.querySelectorAll('.nav-links li');
    const sections = document.querySelectorAll('.section');
    const loginForm = document.getElementById('login-form');
    const authOverlay = document.getElementById('auth-overlay');
    const logoutBtn = document.getElementById('logout-btn');

    // --- Loading Screen ---
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            // Show Auth First (Demo purposes: Auto-show app for smoother preview, or keep auth)
            // letting auth stay for interaction
        }, 500);
    }, 2000);

    // --- Auth Logic (Mock) ---
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        authOverlay.classList.remove('active');
        appContainer.classList.remove('app-hidden');
        appContainer.classList.add('app-visible');
        initCharts(); // Initialize charts after app is visible
    });

    logoutBtn.addEventListener('click', () => {
        appContainer.classList.remove('app-visible');
        appContainer.classList.add('app-hidden');
        setTimeout(() => {
            authOverlay.classList.add('active');
        }, 500);
    });

    // --- Navigation Logic ---
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            link.classList.add('active');

            const targetId = link.getAttribute('data-section');

            // Hide all sections
            sections.forEach(sec => {
                sec.classList.remove('active');
                sec.style.display = 'none'; // Ensure display none for animation reset
            });

            // Show target section with animation
            const targetSection = document.getElementById(targetId);
            targetSection.style.display = 'block';
            // Small timeout to allow display:block to apply before adding opacity class if we used CSS transitions
            // But we used keyframes 'fadeIn', so removing/adding class triggers it re-run effortlessly
            targetSection.classList.add('active');
        });
    });


    // --- Charts Initialization ---
    // We delay this slightly or put in a function to ensure canvas is rendered
    function initCharts() {

        // 1. Weekly Activity Chart (Bar)
        const ctxActivity = document.getElementById('activityChart').getContext('2d');

        // Gradient for bars
        const gradientActivity = ctxActivity.createLinearGradient(0, 0, 0, 400);
        gradientActivity.addColorStop(0, '#00f2ff');
        gradientActivity.addColorStop(1, '#bc13fe');

        new Chart(ctxActivity, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Calories Burned',
                    data: [320, 450, 300, 500, 280, 600, 400],
                    backgroundColor: gradientActivity,
                    borderRadius: 5,
                    barThickness: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: 'rgba(255, 255, 255, 0.6)' }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: 'rgba(255, 255, 255, 0.6)' }
                    }
                }
            }
        });

        // 2. Heart Rate Mini Chart (Line)
        const ctxHeart = document.getElementById('heartRateMiniChart').getContext('2d');
        new Chart(ctxHeart, {
            type: 'line',
            data: {
                labels: ['1', '2', '3', '4', '5', '6', '7'],
                datasets: [{
                    data: [70, 75, 72, 85, 90, 80, 78],
                    borderColor: '#ff4500',
                    borderWidth: 2,
                    pointRadius: 0,
                    tension: 0.4,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { display: false },
                    y: { display: false }
                }
            }
        });

        // 3. Weight Tracker Chart (Line Area)
        const ctxWeight = document.getElementById('weightChart').getContext('2d');

        const gradientWeight = ctxWeight.createLinearGradient(0, 0, 0, 400);
        gradientWeight.addColorStop(0, 'rgba(188, 19, 254, 0.5)');
        gradientWeight.addColorStop(1, 'rgba(188, 19, 254, 0)');

        new Chart(ctxWeight, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
                datasets: [{
                    label: 'Weight (kg)',
                    data: [75, 74.2, 73.5, 72.8, 72.0],
                    borderColor: '#bc13fe',
                    backgroundColor: gradientWeight,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { labels: { color: 'white' } }
                },
                scales: {
                    y: {
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: 'rgba(255, 255, 255, 0.6)' }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: 'rgba(255, 255, 255, 0.6)' }
                    }
                }
            }
        });
    }

    // --- Sidebar Toggle Logic ---
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            if (window.innerWidth > 900) {
                sidebar.classList.toggle('collapsed');
            } else {
                sidebar.classList.toggle('active-mobile');
            }
        });
    }

    // Close mobile sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 900 &&
            sidebar.classList.contains('active-mobile') &&
            !sidebar.contains(e.target) &&
            !menuToggle.contains(e.target)) {
            sidebar.classList.remove('active-mobile');
        }
    });

    // Handle resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 900) {
            sidebar.classList.remove('active-mobile');
        } else {
            sidebar.classList.remove('collapsed');
        }
    });

});
