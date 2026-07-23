document.addEventListener('DOMContentLoaded', () => {
    // Theme Management & LocalStorage Persistence
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else {
        htmlElement.setAttribute('data-theme', 'dark');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // Sticky Navbar & Scroll Progress Bar
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        
        if (scrollProgress) {
            scrollProgress.style.width = scrollPercent + '%';
        }

        if (navbar) {
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        if (scrollTopBtn) {
            if (scrollTop > 400) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Mobile Hamburger Menu
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-link');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (hamburger) hamburger.classList.remove('active');
            if (navLinks) navLinks.classList.remove('active');
        });
    });

    // Active Section Highlight on Scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // Typed Animation Effect
    const typedTextSpan = document.getElementById('typedText');
    const textArray = [
        "AI-First Powered Web Developer",
        "Frontend Developer",
        "Creative Coder",
        "Problem Solver"
    ];
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (typedTextSpan && charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 80);
        } else {
            setTimeout(erase, 2000);
        }
    }

    function erase() {
        if (typedTextSpan && charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 40);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, 500);
        }
    }

    if (typedTextSpan && textArray.length) {
        setTimeout(type, 1000);
    }

    // Contact Form Submission handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('senderName').value;
            const email = document.getElementById('senderEmail').value;
            const message = document.getElementById('senderMessage').value;

            const mailtoLink = `mailto:sanawebdeveloper098@gmail.com?subject=New Message from ${encodeURIComponent(name)} (${encodeURIComponent(email)})&body=${encodeURIComponent(message)}`;
            window.location.href = mailtoLink;
        });
    }

    // Show All Projects Functionality
    const showAllProjectsBtn = document.getElementById('showAllProjectsBtn');
    const hiddenProjects = document.querySelectorAll('.hidden-project');

    if (showAllProjectsBtn) {
        showAllProjectsBtn.addEventListener('click', () => {
            hiddenProjects.forEach((project, index) => {
                setTimeout(() => {
                    project.classList.add('revealed');
                }, index * 150);
            });
            showAllProjectsBtn.style.display = 'none';
        });
    }

    // Button Ripple Effect
    const rippleButtons = document.querySelectorAll('.ripple');
    rippleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const span = document.createElement('span');
            span.classList.add('ripple-span');
            span.style.left = x + 'px';
            span.style.top = y + 'px';

            this.appendChild(span);

            setTimeout(() => {
                span.remove();
            }, 600);
        });
    });

    // General Scroll Animations using IntersectionObserver
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const generalObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up, .slide-left, .slide-right, .zoom-in');
    animatedElements.forEach(el => generalObserver.observe(el));

    // Fixed Timeline One-by-One Animation Handler
    const timelineItems = document.querySelectorAll(".timeline-item");
    
    const timelineObserver = new IntersectionObserver((entries, observer) => {
        // Entries ko top to bottom position ke lehaz se sort karein taake delay theek bane
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Har item ke index ya DOM position ke mutabiq delay dein
                const item = entry.target;
                
                // Index pata lagane ke liye querySelectorAll mein position check karein
                const index = Array.from(timelineItems).indexOf(item);
                
                setTimeout(() => {
                    item.classList.add("visible");
                }, index * 300); // Har box ke darmiyan 0.3 seconds ka gap
                
                observer.unobserve(item);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -30px 0px'
    });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
});