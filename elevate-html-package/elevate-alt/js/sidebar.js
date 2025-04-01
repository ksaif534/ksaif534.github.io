/**
 * Toggleable Sidebar JavaScript
 * This script handles the sidebar toggle functionality for the Elevate-Alt template
 */

// DOM Elements
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('main-content');
const toggleButton = document.getElementById('sidebar-toggle');

// Check if sidebar state is saved in localStorage
function initSidebarState() {
    // Check if the sidebar was previously hidden
    const sidebarHidden = localStorage.getItem('sidebarHidden') === 'true';
    
    // Apply the saved state or default state based on screen size
    if (sidebarHidden || window.innerWidth < 768) {
        document.body.classList.add('sidebar-hidden');
    } else {
        document.body.classList.remove('sidebar-hidden');
    }
    
    // Update toggle button ARIA attributes
    updateToggleButtonState();
}

// Toggle sidebar visibility
function toggleSidebar() {
    // Toggle the sidebar-hidden class on the body
    document.body.classList.toggle('sidebar-hidden');
    
    // Save the current state to localStorage
    const isHidden = document.body.classList.contains('sidebar-hidden');
    localStorage.setItem('sidebarHidden', isHidden.toString());
    
    // Update toggle button ARIA attributes
    updateToggleButtonState();
}

// Update toggle button accessibility attributes
function updateToggleButtonState() {
    const isHidden = document.body.classList.contains('sidebar-hidden');
    
    // Update ARIA attributes for accessibility
    toggleButton.setAttribute('aria-expanded', (!isHidden).toString());
    toggleButton.setAttribute('aria-label', isHidden ? 'Show sidebar' : 'Hide sidebar');
    
    // Update toggle icon (optional enhancement)
    const toggleIcon = toggleButton.querySelector('i');
    if (toggleIcon) {
        toggleIcon.className = isHidden ? 'fas fa-bars' : 'fas fa-times';
    }
}

// Close sidebar when clicking outside on mobile
function handleOutsideClick(event) {
    // Only apply this behavior on mobile screens
    if (window.innerWidth < 768) {
        // Check if sidebar is visible and click is outside sidebar and toggle button
        if (!document.body.classList.contains('sidebar-hidden') && 
            !sidebar.contains(event.target) && 
            !toggleButton.contains(event.target)) {
            toggleSidebar();
        }
    }
}

// Initialize sidebar state on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set initial state
    initSidebarState();
    
    // Add event listeners
    toggleButton.addEventListener('click', toggleSidebar);
    document.addEventListener('click', handleOutsideClick);
    
    // Add resize listener to handle responsive behavior
    window.addEventListener('resize', () => {
        // Auto-hide sidebar on small screens
        if (window.innerWidth < 768 && !document.body.classList.contains('sidebar-hidden')) {
            document.body.classList.add('sidebar-hidden');
            localStorage.setItem('sidebarHidden', 'true');
            updateToggleButtonState();
        }
    });
    
    // Set initial ARIA attributes
    toggleButton.setAttribute('aria-controls', 'sidebar');
    toggleButton.setAttribute('aria-haspopup', 'true');
    updateToggleButtonState();
});
