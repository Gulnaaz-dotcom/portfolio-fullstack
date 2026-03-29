document.addEventListener('DOMContentLoaded', function () {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function () {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Sticky Navigation
    window.addEventListener('scroll', function () {
        const nav = document.querySelector('nav');
        nav.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate Skills Bars on Scroll
    function animateSkills() {
        const skillBars = document.querySelectorAll('.skill-progress');

        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';

            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    bar.style.width = width;
                    observer.unobserve(bar);
                }
            });

            observer.observe(bar);
        });
    }

    // Animate Stats Counting
    function animateStats() {
        const counters = document.querySelectorAll('.number');
        const speed = 200;

        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateStats, 1);
            } else {
                counter.innerText = target + '+';
            }
        });
    }

    // Initialize animations when elements are in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('skills')) {
                    animateSkills();
                }
                if (entry.target.classList.contains('about-stats')) {
                    animateStats();
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // ----------------- Form Submission -----------------
    const contactForm = document.querySelector('.contact-form');
    // if (contactForm) {
    //     contactForm.addEventListener('submit', function (e) {
    //         e.preventDefault();

    //         // Here you would typically send the form data to a server
    //         // For demo purposes, we'll just show an alert
    //         alert('Thank you for your message! I will get back to you soon.');
    //         this.reset();
    //     });
    // }



    // ------------------- MOdel box -----------------------

    const modal = document.getElementById("projectModal");
    const modalImg = modal.querySelector(".modal-image img");
    const modalTitle = modal.querySelector(".modal-title");
    const modalText = modal.querySelector(".modal-text");
    const closeBtn = modal.querySelector(".close-btn");

    //   logic fro showing only 100 characters on the card
    document.querySelectorAll(".project-info p").forEach(p => {
        const fullText = p.textContent.trim();
        const maxLength = 100;

        if (fullText.length > maxLength) {
            const truncatedText = fullText.substring(0, maxLength) + "...";

            // Store full text in a data attribute (optional but useful)
            p.setAttribute("data-full-text", fullText);

            // Replace visible text with truncated version
            p.textContent = truncatedText;
        }
    });


    // Attach event listeners to all Read More buttons
    document.querySelectorAll(".read-more-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const card = btn.closest(".project-card");
            const imgSrc = card.querySelector(".project-image img").src;
            const title = card.querySelector(".project-info h3").textContent;
            const visibleText = card.querySelector(".project-info p").outerHTML;
            const hiddenText = card.querySelector(".more-content").innerHTML;

            // Populate modal
            modalImg.src = imgSrc;
            modalTitle.textContent = title;
            modalText.innerHTML = visibleText + hiddenText;

            // Show modal
            modal.style.display = "flex";
            document.body.style.overflow = "hidden"; // prevent background scroll
        });
    });

    // Close button
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    });

    // Close modal when clicking outside content
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });


});

