# Elevate - Modern HTML Template

## Documentation

### Table of Contents
1. [Introduction](#introduction)
2. [File Structure](#file-structure)
3. [Getting Started](#getting-started)
4. [HTML Structure](#html-structure)
5. [CSS Files](#css-files)
6. [JavaScript](#javascript)
7. [Customization](#customization)
8. [Browser Compatibility](#browser-compatibility)
9. [Credits](#credits)
10. [Support](#support)

## Introduction

Elevate is a modern, responsive HTML template designed for businesses, agencies, and portfolios. It features a clean and professional design with smooth animations and a fully responsive layout that looks great on all devices.

## File Structure

```
elevate/
├── css/
│   ├── main.css
│   ├── responsive.css
│   └── variables.css
├── fonts/
├── img/
│   ├── about-image.png
│   ├── favicon.ico
│   ├── hero-image.png
│   ├── logo.png
│   ├── logo-white.png
│   ├── pattern.png
│   ├── portfolio/
│   │   ├── portfolio-1.jpg
│   │   ├── portfolio-2.jpg
│   │   ├── portfolio-3.jpg
│   │   ├── portfolio-4.jpg
│   │   ├── portfolio-5.jpg
│   │   └── portfolio-6.jpg
│   └── testimonials/
│       ├── testimonial-1.jpg
│       ├── testimonial-2.jpg
│       └── testimonial-3.jpg
├── js/
│   └── main.js
├── index.html
└── documentation.md
```

## Getting Started

To get started with the Elevate template, follow these steps:

1. Download and extract the template files.
2. Open the `index.html` file in your preferred code editor.
3. Customize the content, images, and styling to match your brand.
4. Upload the files to your web server.

## HTML Structure

The template uses a clean and semantic HTML5 structure. The main sections include:

- **Header**: Contains the logo and navigation menu.
- **Hero Section**: The main banner section with a call-to-action.
- **About Section**: Information about your company or services.
- **Services Section**: Showcase your services or features.
- **Portfolio Section**: Display your work with filterable categories.
- **Testimonials Section**: Customer reviews and testimonials.
- **Contact Section**: Contact form and information.
- **Footer**: Copyright information, quick links, and newsletter signup.

Example of a section structure:

```html
<section id="about" class="about-section section-padding">
    <div class="container">
        <div class="section-header text-center">
            <h2>About Us</h2>
            <p>Learn more about our company and our mission</p>
        </div>
        <!-- Section content -->
    </div>
</section>
```

## CSS Files

The template includes three CSS files:

1. **variables.css**: Contains CSS variables for colors, typography, spacing, etc.
2. **main.css**: Main stylesheet with styles for all components and sections.
3. **responsive.css**: Contains media queries for responsive design.

### CSS Variables

The template uses CSS variables for easy customization. You can modify the colors, fonts, and other design elements by editing the variables in `variables.css`.

Example of changing the primary color:

```css
:root {
    --primary-color: #4e57d4; /* Change this to your preferred color */
}
```

## JavaScript

The template includes a `main.js` file that handles various interactive features:

- Preloader animation
- Sticky header
- Smooth scrolling
- Portfolio filtering
- Testimonials slider
- Form validation
- Back to top button
- Animation on scroll

## Customization

### Changing Colors

To change the color scheme, edit the color variables in `css/variables.css`:

```css
:root {
    /* Primary Colors */
    --primary-color: #4e57d4;
    --primary-dark: #3a42b3;
    --primary-light: #7c83e6;
    
    /* Secondary Colors */
    --secondary-color: #ff6b6b;
    --secondary-dark: #e55c5c;
    --secondary-light: #ff8a8a;
    
    /* Neutral Colors */
    --dark-color: #2d2e32;
    --dark-medium: #555555;
    --medium-color: #777777;
    --light-medium: #a0a0a0;
    --light-color: #f5f5f5;
    --white-color: #ffffff;
}
```

### Changing Fonts

To change the fonts, update the Google Fonts link in the `<head>` section of `index.html` and update the font variables in `css/variables.css`:

```css
:root {
    /* Typography */
    --heading-font: 'Montserrat', sans-serif;
    --body-font: 'Poppins', sans-serif;
}
```

### Adding New Sections

To add a new section, follow the existing section structure:

1. Create a new section element with an ID and class.
2. Add the container and content structure.
3. Style the section in `main.css`.
4. Add responsive styles in `responsive.css` if needed.

## Browser Compatibility

The template is compatible with the following browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Credits

### Libraries & Resources

- [Bootstrap 5](https://getbootstrap.com/)
- [Font Awesome](https://fontawesome.com/)
- [Google Fonts](https://fonts.google.com/)
- [jQuery](https://jquery.com/)

### Fonts

- [Poppins](https://fonts.google.com/specimen/Poppins)
- [Montserrat](https://fonts.google.com/specimen/Montserrat)

## Support

If you need help with the template, please contact us at support@example.com.

---

Thank you for using the Elevate HTML Template!
