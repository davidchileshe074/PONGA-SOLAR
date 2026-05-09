// Header Scroll Effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileToggle.querySelector('.material-icons');
        icon.textContent = navLinks.classList.contains('active') ? 'close' : 'menu';
    });
}

// Active Link Highlighting
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Close mobile menu when a link is clicked
const navLinksList = document.querySelector('.nav-links');
const mobileToggleBtn = document.getElementById('mobileToggle');
const navLinksAnchors = document.querySelectorAll('.nav-links a');

navLinksAnchors.forEach(anchor => {
    anchor.addEventListener('click', () => {
        if (navLinksList.classList.contains('active')) {
            navLinksList.classList.remove('active');
            const icon = mobileToggleBtn.querySelector('.material-icons');
            if (icon) icon.textContent = 'menu';
        }
    });
});

// Solar Pump Calculator
function calculatePump() {
    const depth = parseFloat(document.getElementById('depth').value);
    const flow = parseFloat(document.getElementById('flow').value);
    const resultDiv = document.getElementById('pumpResult');

    if (isNaN(depth) || isNaN(flow)) {
        resultDiv.style.display = 'block';
        resultDiv.textContent = 'Please enter valid numbers.';
        return;
    }

    // Rough calculation logic for HP
    // HP = (Flow in L/h * Depth in m) / (Constant for efficiency)
    // This is a simplified estimation
    let hp = (flow * depth) / 15000;
    
    let recommendation = "";
    if (hp <= 0.75) recommendation = "0.75HP Well Pump";
    else if (hp <= 1.0) recommendation = "1.0HP Solar Pump Kit";
    else if (hp <= 1.5) recommendation = "1.5HP Solar Pump Kit";
    else if (hp <= 2.0) recommendation = "2.0HP Solar Pump Kit";
    else if (hp <= 3.0) recommendation = "3.0HP Solar Pump";
    else if (hp <= 5.0) recommendation = "5.0HP Solar Pump";
    else if (hp <= 7.5) recommendation = "7.5HP Solar Pump";
    else recommendation = "10HP Solar Pump (Industrial)";

    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `<strong>Estimated Need:</strong> ~${hp.toFixed(2)} HP<br><strong>Recommendation:</strong> ${recommendation}`;
}

// Tank Size Estimator
function estimateTank() {
    const people = parseInt(document.getElementById('people').value);
    const usageType = document.getElementById('usageType').value;
    const resultDiv = document.getElementById('tankResult');

    if (isNaN(people)) {
        resultDiv.style.display = 'block';
        resultDiv.textContent = 'Please enter number of people.';
        return;
    }

    let dailyUsage = people * (usageType === 'farm' ? 150 : 80); // Liters per day
    let recommendedSize = dailyUsage * 2; // 2 days storage

    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `<strong>Daily Consumption:</strong> ${dailyUsage} Liters<br><strong>Recommended Tank:</strong> ${recommendedSize}L - ${Math.ceil(recommendedSize/500)*500}L`;
}

// Form Submission Simulation
const quoteForm = document.getElementById('quoteRequestForm');
if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = quoteForm.querySelector('button');
        const originalText = btn.textContent;
        
        btn.disabled = true;
        btn.textContent = 'Sending...';
        
        setTimeout(() => {
            alert('Thank you! Your inquiry has been sent successfully. Our team will contact you shortly.');
            btn.disabled = false;
            btn.textContent = originalText;
            quoteForm.reset();
        }, 1500);
    });
}

// Newsletter Simulation
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
    });
}
// Modal Logic
function openModal(name, price) {
    document.getElementById('modalProductName').textContent = name;
    document.getElementById('modalProductPrice').textContent = price;
    document.getElementById('modalHiddenName').value = name;
    document.getElementById('productModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('productModal').style.display = 'none';
}

// Close modal on outside click
window.onclick = function(event) {
    const modal = document.getElementById('productModal');
    if (event.target == modal) {
        closeModal();
    }
}

const modalForm = document.getElementById('modalForm');
if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you! Your inquiry for ' + document.getElementById('modalHiddenName').value + ' has been sent.');
        closeModal();
    });
}
