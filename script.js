document.addEventListener('DOMContentLoaded', () => {
    // 1. Loader - Ensuring it disappears even if 'load' event is delayed
    const loader = document.getElementById('loader');
    const hideLoader = () => {
        if (!loader) return;
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    };

    window.addEventListener('load', hideLoader);
    // Backup: Hide loader after 3 seconds anyway
    setTimeout(hideLoader, 3000);

    // 2. Sticky Header
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('.material-icons');
            if (icon) icon.innerText = navLinks.classList.contains('active') ? 'close' : 'menu';
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
        });
    }

    // 4. Product Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            productCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        });
    });

    // 5. Intersection Observer for Animations - FIXED CLASS NAME
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-up').forEach(el => {
        observer.observe(el);
    });

    // 6. Simple Quote Form Simulation
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = quoteForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                alert('Thank you for your inquiry! One of our solar experts will contact you shortly.');
                quoteForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }

    // 7. Calculators
    window.runCalculator = function() {
        const depth = document.getElementById('depth').value;
        const flow = document.getElementById('flow').value;
        const resultDiv = document.getElementById('calc-result');

        if (depth && flow) {
            const hp = (parseFloat(depth) / 40) + (parseFloat(flow) / 2000);
            resultDiv.innerText = `Recommended: ${hp.toFixed(1)} HP Pump`;
        } else {
            resultDiv.innerText = "Please fill all fields";
        }
    };

    window.estimateTank = function() {
        const people = document.getElementById('people').value;
        const resultDiv = document.getElementById('tank-result');

        if (people) {
            const size = parseInt(people) * 50 * 2;
            resultDiv.innerText = `Recommended: ${size}L Tank`;
        } else {
            resultDiv.innerText = "Enter number of people";
        }
    };

    // 8. Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.parentElement.classList.contains('dropdown')) return;
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
                
                // Close mobile menu
                if (navLinks) {
                    navLinks.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('.material-icons');
                    if (icon) icon.innerText = 'menu';
                    document.body.style.overflow = 'auto';
                }
            }
        });
    });

    // 9. Mobile Dropdown Toggle
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const content = dropdown.querySelector('.dropdown-content');
                const isVisible = window.getComputedStyle(content).display === 'block';
                content.style.display = isVisible ? 'none' : 'block';
                
                const icon = link.querySelector('.material-icons');
                if (icon) icon.innerText = isVisible ? 'expand_more' : 'expand_less';
            }
        });
    });
});
