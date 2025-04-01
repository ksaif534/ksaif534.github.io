/**
 * Main JavaScript for Elevate-Alt Template
 */

// DOM Elements
const portfolioFilters = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const testimonialItems = document.querySelectorAll('.testimonial-item');
const contactForm = document.getElementById('contactForm');

// Portfolio Filtering
function filterPortfolio() {
    portfolioFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            portfolioFilters.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked filter
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === itemCategory) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Testimonial Slider
let currentSlide = 0;

function showSlide(index) {
    // Hide all slides
    testimonialItems.forEach(item => {
        item.style.display = 'none';
    });
    
    // Show current slide
    testimonialItems[index].style.display = 'block';
}

function nextSlide() {
    currentSlide++;
    if (currentSlide >= testimonialItems.length) {
        currentSlide = 0;
    }
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide--;
    if (currentSlide < 0) {
        currentSlide = testimonialItems.length - 1;
    }
    showSlide(currentSlide);
}

// Smooth Scrolling for Navigation Links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.sidebar-nav a, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Get the target section id from the href attribute
            const targetId = this.getAttribute('href');
            
            // Only apply smooth scroll for page anchors
            if (targetId.startsWith('#') && targetId.length > 1) {
                e.preventDefault();
                
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Close sidebar on mobile when a link is clicked
                    if (window.innerWidth < 768 && !document.body.classList.contains('sidebar-hidden')) {
                        document.getElementById('sidebar-toggle').click();
                    }
                    
                    // Scroll to the target section
                    window.scrollTo({
                        top: targetSection.offsetTop - 20,
                        behavior: 'smooth'
                    });
                    
                    // Update active link
                    navLinks.forEach(navLink => navLink.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });
}

// Form Submission
function handleFormSubmission() {
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            // Simulate form submission (in a real project, this would be an AJAX request)
            console.log('Form submitted with values:', formValues);
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.innerHTML = '<p>Thank you for your message! We will get back to you soon.</p>';
            
            // Clear form and append success message
            this.reset();
            this.appendChild(successMessage);
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    }
}

// Scroll Spy for Navigation
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize all functions on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize portfolio filtering
    filterPortfolio();
    
    // Initialize testimonial slider
    showSlide(currentSlide);
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        
        // Auto slide every 5 seconds
        setInterval(nextSlide, 5000);
    }
    
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Initialize form submission
    handleFormSubmission();
    
    // Initialize scroll spy
    initScrollSpy();
});
