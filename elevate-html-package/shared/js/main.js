// Shared JavaScript functionality for all template variations

(function() {
    'use strict';
    
    // Common variables
    const isMobile = window.innerWidth < 992;
    
    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            setTimeout(function() {
                preloader.style.opacity = '0';
                setTimeout(function() {
                    preloader.style.display = 'none';
                }, 300);
            }, 500);
        }
    });
    
    // Sticky Header
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        }
    });
    
    // Smooth Scrolling for Navigation Links
    document.addEventListener('DOMContentLoaded', function() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                if (targetId.startsWith('#') && targetId.length > 1) {
                    e.preventDefault();
                    
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        // Close mobile menu if open
                        const navbarCollapse = document.querySelector('.navbar-collapse');
                        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                            const navbarToggler = document.querySelector('.navbar-toggler');
                            if (navbarToggler) {
                                navbarToggler.click();
                            }
                        }
                        
                        // Scroll to target
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                        
                        // Update active link
                        navLinks.forEach(function(link) {
                            link.classList.remove('active');
                        });
                        this.classList.add('active');
                    }
                }
            });
        });
    });
    
    // Portfolio Filtering
    document.addEventListener('DOMContentLoaded', function() {
        const filterButtons = document.querySelectorAll('.portfolio-filter li');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        filterButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(function(btn) {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Filter portfolio items
                portfolioItems.forEach(function(item) {
                    if (filterValue === '*') {
                        item.style.display = 'block';
                    } else if (item.classList.contains(filterValue.substring(1))) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    });
    
    // Testimonials Slider
    document.addEventListener('DOMContentLoaded', function() {
        const testimonialItems = document.querySelectorAll('.testimonial-item');
        let currentIndex = 0;
        
        function showTestimonial(index) {
            testimonialItems.forEach(function(item, i) {
                if (i === index) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }
        
        function nextTestimonial() {
            currentIndex = (currentIndex + 1) % testimonialItems.length;
            showTestimonial(currentIndex);
        }
        
        // Initialize testimonials
        if (testimonialItems.length > 0) {
            showTestimonial(0);
            
            // Auto-rotate testimonials
            setInterval(nextTestimonial, 5000);
        }
    });
    
    // Back to Top Button
    document.addEventListener('DOMContentLoaded', function() {
        const backToTopButton = document.querySelector('.back-to-top');
        
        if (backToTopButton) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 300) {
                    backToTopButton.classList.add('active');
                } else {
                    backToTopButton.classList.remove('active');
                }
            });
            
            backToTopButton.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    });
    
    // Form Validation
    document.addEventListener('DOMContentLoaded', function() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Basic validation
                let isValid = true;
                const formElements = contactForm.elements;
                
                for (let i = 0; i < formElements.length; i++) {
                    if (formElements[i].hasAttribute('required') && formElements[i].value.trim() === '') {
                        isValid = false;
                        formElements[i].classList.add('is-invalid');
                    } else {
                        formElements[i].classList.remove('is-invalid');
                    }
                }
                
                // Email validation
                const emailInput = document.getElementById('email');
                if (emailInput && emailInput.value.trim() !== '') {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(emailInput.value.trim())) {
                        isValid = false;
                        emailInput.classList.add('is-invalid');
                    }
                }
                
                if (isValid) {
                    // Form is valid, show success message
                    const formContainer = contactForm.parentElement;
                    
                    // Create success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'alert alert-success mt-3';
                    successMessage.textContent = 'Thank you! Your message has been sent successfully.';
                    
                    // Replace form with success message
                    formContainer.innerHTML = '';
                    formContainer.appendChild(successMessage);
                }
            });
        }
    });
    
    // Animate on Scroll
    document.addEventListener('DOMContentLoaded', function() {
        const animatedElements = document.querySelectorAll('.service-item, .portfolio-item, .testimonial-item');
        
        function checkIfInView() {
            const windowHeight = window.innerHeight;
            const windowTopPosition = window.scrollY;
            const windowBottomPosition = windowTopPosition + windowHeight;
            
            animatedElements.forEach(function(element) {
                const elementHeight = element.offsetHeight;
                const elementTopPosition = element.offsetTop;
                const elementBottomPosition = elementTopPosition + elementHeight;
                
                // Check if element is in viewport
                if (
                    (elementBottomPosition >= windowTopPosition) &&
                    (elementTopPosition <= windowBottomPosition)
                ) {
                    element.classList.add('animated');
                }
            });
        }
        
        // Add initial animation class
        window.addEventListener('load', checkIfInView);
        
        // Check for animations on scroll
        window.addEventListener('scroll', checkIfInView);
    });
    
    // Newsletter Form
    document.addEventListener('DOMContentLoaded', function() {
        const newsletterForm = document.querySelector('.newsletter-form');
        
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const emailInput = newsletterForm.querySelector('input[type="email"]');
                
                if (emailInput && emailInput.value.trim() !== '') {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    
                    if (emailPattern.test(emailInput.value.trim())) {
                        // Valid email, show success message
                        const formContainer = newsletterForm.parentElement;
                        
                        // Create success message
                        const successMessage = document.createElement('div');
                        successMessage.className = 'alert alert-success mt-3';
                        successMessage.textContent = 'Thank you for subscribing to our newsletter!';
                        
                        // Replace form with success message
                        formContainer.innerHTML = '';
                        formContainer.appendChild(successMessage);
                    } else {
                        // Invalid email
                        emailInput.classList.add('is-invalid');
                    }
                } else {
                    // Empty email
                    emailInput.classList.add('is-invalid');
                }
            });
        }
    });
    
    // Theme Switcher - For templates with theme switching capability
    document.addEventListener('DOMContentLoaded', function() {
        const themeSwitcher = document.querySelector('.theme-switcher');
        
        if (themeSwitcher) {
            themeSwitcher.addEventListener('click', function() {
                document.body.classList.toggle('dark-theme');
                
                // Store preference in localStorage
                if (document.body.classList.contains('dark-theme')) {
                    localStorage.setItem('theme', 'dark');
                } else {
                    localStorage.setItem('theme', 'light');
                }
            });
            
            // Check for saved theme preference
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                document.body.classList.add('dark-theme');
            }
        }
    });
    
    // Expose common functions for all templates
    window.ElevateTemplate = {
        // Initialize all components
        init: function() {
            // Any additional initialization can be added here
            console.log('Template initialized');
        },
        
        // Utility function to toggle classes
        toggleClass: function(element, className) {
            if (element.classList.contains(className)) {
                element.classList.remove(className);
                return false;
            } else {
                element.classList.add(className);
                return true;
            }
        },
        
        // Utility function to check if element is in viewport
        isInViewport: function(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
    };
})();
