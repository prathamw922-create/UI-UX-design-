document.addEventListener('DOMContentLoaded', () => {

    // --- Elements ---
    const loadingScreen = document.getElementById('loading-screen');
    const landingPage = document.getElementById('landing-page');
    const authOverlay = document.getElementById('auth-overlay');
    const appContainer = document.getElementById('app-container');
    const loginForm = document.getElementById('login-form');
    const loginBtn = document.getElementById('landing-login-btn');
    const authClose = document.getElementById('auth-close');
    const roleOptions = document.querySelectorAll('.role-option');
    const navLinks = document.querySelectorAll('.nav-links li');
    const sections = document.querySelectorAll('.section');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const logoutBtn = document.getElementById('logout-btn');

    // --- State ---
    let currentRole = 'candidate'; // Default

    // --- Loading Screen ---
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);

    // --- Auth Logic ---
    loginBtn.addEventListener('click', () => {
        authOverlay.classList.remove('hidden');
    });

    authClose.addEventListener('click', () => {
        authOverlay.classList.add('hidden');
    });

    roleOptions.forEach(option => {
        option.addEventListener('click', () => {
            roleOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            currentRole = option.getAttribute('data-role');
        });
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Hide Landing & Auth
        authOverlay.classList.add('hidden');
        landingPage.classList.add('hidden');

        // Show App
        appContainer.classList.remove('app-hidden');

        // Initialize App based on Role
        configureDashboard(currentRole);
    });

    logoutBtn.addEventListener('click', () => {
        appContainer.classList.add('app-hidden');
        landingPage.classList.remove('hidden');
        // Reset to default state if needed
    });

    // --- Dashboard Configuration ---
    function configureDashboard(role) {
        const recruiterItems = document.querySelectorAll('.recruiter-only');
        const candidateItems = document.querySelectorAll('.candidate-only');
        const recruiterDash = document.getElementById('recruiter-dashboard');
        const candidateDash = document.getElementById('candidate-dashboard');

        // Sidebar Links
        if (role === 'recruiter') {
            recruiterItems.forEach(el => el.classList.remove('hidden'));
            candidateItems.forEach(el => el.classList.add('hidden'));
            recruiterDash.classList.remove('hidden');
            candidateDash.classList.add('hidden');
            initRecruiterChart();
        } else {
            recruiterItems.forEach(el => el.classList.add('hidden'));
            candidateItems.forEach(el => el.classList.remove('hidden'));
            recruiterDash.classList.add('hidden');
            candidateDash.classList.remove('hidden');
            initCandidateChart();
        }
    }

    // --- Navigation Logic ---
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            const targetId = link.getAttribute('data-section');

            // Hide all sections
            sections.forEach(sec => {
                sec.classList.remove('active');
                sec.style.display = 'none';
            });

            // Show target
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.style.display = 'block';
                setTimeout(() => targetSection.classList.add('active'), 10);
            }

            // Update Header Title
            const titleMap = {
                'dashboard': 'Dashboard',
                'job-posts': 'My Job Posts',
                'candidates': 'Candidate List',
                'job-search': 'Find Jobs',
                'resume-analyzer': 'AI Resume Check',
                'messages': 'Messages',
                'profile': 'My Profile'
            };
            document.getElementById('page-title').innerText = titleMap[targetId] || 'Dashboard';
        });
    });

    // --- Sidebar Toggle ---
    sidebarToggle.addEventListener('click', () => {
        if (window.innerWidth > 768) {
            sidebar.classList.toggle('collapsed');
            appContainer.classList.toggle('sidebar-collapsed'); // Optional for main content adjustment
        } else {
            sidebar.classList.toggle('active');
        }
    });

    // --- Charts ---
    function initRecruiterChart() {
        const ctx = document.getElementById('recruiterChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Applications Received',
                    data: [12, 19, 3, 5, 2, 3, 10],
                    borderColor: '#06b6d4',
                    backgroundColor: 'rgba(6, 182, 212, 0.2)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#94a3b8' } },
                    x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
                }
            }
        });
    }

    function initCandidateChart() {
        const ctx = document.getElementById('candidateChart').getContext('2d');
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Coding', 'Design', 'Communication', 'Management', 'Problem Solving'],
                datasets: [{
                    label: 'Start Profile',
                    data: [90, 85, 70, 60, 95],
                    borderColor: '#7c3aed',
                    backgroundColor: 'rgba(124, 58, 237, 0.2)',
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        grid: { color: 'rgba(255,255,255,0.1)' },
                        angleLines: { color: 'rgba(255,255,255,0.1)' },
                        pointLabels: { color: '#fff' }
                    }
                }
            }
        });
    }

    // --- Counter Animation ---
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / 200;
            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });

    // --- NOTIFICATIONS ---
    const notificationBell = document.querySelector('.notifications');
    notificationBell.addEventListener('click', () => {
        alert("🔔 Notifications:\n\n1. Sarah Connor viewed your profile\n2. New job match: React Developer\n3. Application status updated: Interview Scheduled\n4. Your resume score increased!");
    });

    // --- JOB SEARCH DATA & LOGIC ---
    const jobs = [
        {
            id: 1,
            title: "Frontend Engineer",
            company: "Microsoft",
            location: "Redmond, WA",
            type: "Remote",
            salary: "$120k - $160k",
            tags: ["Full Attributes", "React"],
            posted: "2 days ago",
            logo: "M",
            desc: "We are looking for a skilled Frontend Engineer to join our Azure team building the next generation of cloud dashboards."
        },
        {
            id: 2,
            title: "UI/UX Designer",
            company: "Netflix",
            location: "Los Gatos, CA",
            type: "Hybrid",
            salary: "$140k+",
            tags: ["Design System", "Figma"],
            posted: "5 hours ago",
            logo: "N",
            desc: "Join our design team to create immersive experiences for millions of users worldwide."
        },
        {
            id: 3,
            title: "Backend Developer",
            company: "Amazon",
            location: "Seattle, WA",
            type: "On-site",
            salary: "$130k - $170k",
            tags: ["Java", "AWS"],
            posted: "1 day ago",
            logo: "A",
            desc: "Build scalable backend services for our e-commerce platform handling millions of transactions."
        },
        {
            id: 4,
            title: "Data Scientist",
            company: "Google",
            location: "Mountain View, CA",
            type: "Remote",
            salary: "$150k - $200k",
            tags: ["Python", "AI/ML"],
            posted: "3 days ago",
            logo: "G",
            desc: "Analyze large datasets to improve search relevance and user experience using advanced ML models."
        },
        {
            id: 5,
            title: "Product Manager",
            company: "Tesla",
            location: "Austin, TX",
            type: "On-site",
            salary: "$140k - $180k",
            tags: ["Agile", "Auto"],
            posted: "Just now",
            logo: "T",
            desc: "Lead the development of new autopilot features and work cross-functionally with engineering teams."
        },
        {
            id: 6,
            title: "DevOps Engineer",
            company: "Spotify",
            location: "New York, NY",
            type: "Hybrid",
            salary: "$125k - $165k",
            tags: ["Kubernetes", "CI/CD"],
            posted: "1 week ago",
            logo: "S",
            desc: "Ensure reliability and scalability of our audio streaming infrastructure."
        }
    ];

    const jobsContainer = document.getElementById('jobs-container');
    const searchBtn = document.getElementById('search-jobs-btn');
    const keywordInput = document.getElementById('job-keyword');
    const locationInput = document.getElementById('job-location');

    function renderJobs(jobsToRender) {
        jobsContainer.innerHTML = '';
        if (jobsToRender.length === 0) {
            jobsContainer.innerHTML = '<p class="text-muted" style="text-align:center; grid-column: 1/-1;">No jobs found matching your criteria.</p>';
            return;
        }

        jobsToRender.forEach(job => {
            const card = document.createElement('div');
            card.className = 'job-card glass-card h-effect';
            card.innerHTML = `
                <div class="job-header">
                    <div class="company-logo">${job.logo}</div>
                    <div>
                        <h3>${job.title}</h3>
                        <p>${job.company} • ${job.location}</p>
                    </div>
                    <ion-icon name="bookmark-outline" class="save-icon"></ion-icon>
                </div>
                <div class="tags">
                    ${job.tags.map(tag => `<span>${tag}</span>`).join('')}
                    <span>${job.type}</span>
                    <span>${job.salary}</span>
                </div>
                <p class="job-desc">${job.desc}</p>
                <div class="job-footer">
                    <span class="posted">Posted ${job.posted}</span>
                    <button class="btn-secondary">Apply Now</button>
                </div>
            `;
            jobsContainer.appendChild(card);
        });
    }

    // Initial Render
    renderJobs(jobs);

    // Search Logic
    searchBtn.addEventListener('click', () => {
        const keyword = keywordInput.value.toLowerCase();
        const location = locationInput.value.toLowerCase();

        const filtered = jobs.filter(job => {
            const matchKeyword = job.title.toLowerCase().includes(keyword) ||
                job.company.toLowerCase().includes(keyword) ||
                job.desc.toLowerCase().includes(keyword);
            const matchLocation = job.location.toLowerCase().includes(location);
            return matchKeyword && matchLocation;
        });

        renderJobs(filtered);
    });


    // --- CHAT FUNCTIONALITY ---
    const msgInput = document.getElementById('message-input');
    const sendMsgBtn = document.getElementById('send-message-btn');
    const msgContainer = document.getElementById('chat-messages');

    function sendMessage() {
        const text = msgInput.value.trim();
        if (!text) return;

        // User Message
        const userMsg = document.createElement('div');
        userMsg.className = 'message sent';
        userMsg.innerHTML = `<p>${text}</p><span class="msg-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>`;
        msgContainer.appendChild(userMsg);
        msgInput.value = '';
        msgContainer.scrollTop = msgContainer.scrollHeight;

        // Auto Reply Simulation
        setTimeout(() => {
            const replyMsg = document.createElement('div');
            replyMsg.className = 'message received';
            const replies = [
                "Thanks for the update! We'll get back to you shortly.",
                "Can you send over your portfolio?",
                "That works for us. See you then!",
                "Great, thanks for letting me know.",
                "I'll forward this to the hiring manager."
            ];
            const randomReply = replies[Math.floor(Math.random() * replies.length)];
            replyMsg.innerHTML = `<p>${randomReply}</p><span class="msg-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>`;
            msgContainer.appendChild(replyMsg);
            msgContainer.scrollTop = msgContainer.scrollHeight;
        }, 1500);
    }

    sendMsgBtn.addEventListener('click', sendMessage);
    msgInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });


    // --- PROFILE ACTIONS ---
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const uploadResumeBtn = document.getElementById('upload-resume-btn');
    const hiddenResumeInput = document.getElementById('hidden-resume-input');
    const profileFields = ['profile-email', 'profile-phone', 'profile-location'];
    let isEditing = false;

    editProfileBtn.addEventListener('click', () => {
        isEditing = !isEditing;

        profileFields.forEach(id => {
            const field = document.getElementById(id);
            field.contentEditable = isEditing;
            field.style.borderBottom = isEditing ? '1px solid var(--neon-cyan)' : 'none';
            field.style.background = isEditing ? 'rgba(255,255,255,0.1)' : 'transparent';
        });

        if (isEditing) {
            editProfileBtn.innerText = 'Save Changes';
            editProfileBtn.classList.add('glow-btn');
        } else {
            editProfileBtn.innerText = 'Edit Profile';
            editProfileBtn.classList.remove('glow-btn');
            alert('Profile updated successfully!');
        }
    });

    uploadResumeBtn.addEventListener('click', () => {
        hiddenResumeInput.click();
    });

    hiddenResumeInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            alert(`Resume "${e.target.files[0].name}" uploaded successfully!`);
        }
    });

    // --- Resume Upload Simulation (Existing) ---
    const dropZone = document.getElementById('drop-zone');
    const resultArea = document.getElementById('analysis-result');

    if (dropZone) {
        dropZone.addEventListener('click', () => {
            // Simulate processing
            dropZone.innerHTML = '<div class="loader-content"><h3>Analyzing Resume...</h3></div>';
            setTimeout(() => {
                dropZone.classList.add('hidden');
                resultArea.classList.remove('hidden');
                // Animate score circle
                const circle = document.getElementById('score-circle');
                // Calculate dashoffset: 440 - (440 * 85) / 100 = 66
                setTimeout(() => { circle.style.strokeDashoffset = 66; }, 100);
            }, 2000);
        });
    }

});
