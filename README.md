# Redeemer Wasteland Website

A post-apocalyptic themed website for the Redeemer code redemption application, built for GitHub Pages.

## 🌵 Theme: Wasteland

This website features a comprehensive wasteland/post-apocalyptic theme that reflects the digital wastelands of lost gaming codes. The design includes:

- **Color Palette**: Sandy browns, rust oranges, and charcoal grays
- **Typography**: Futuristic fonts (Orbitron, Exo 2) for that post-apocalyptic feel
- **Visual Effects**: Particle backgrounds, glowing elements, and hover animations
- **Interactive Elements**: Smooth scrolling, mobile-responsive navigation, and special effects

## 📁 File Structure

```
website/
├── index.html          # Main website page
├── css/
│   └── style.css       # Wasteland-themed stylesheet
├── js/
│   └── main.js         # Interactive JavaScript features
├── _config.yml         # GitHub Pages configuration
├── README.md           # This file
└── images/             # Image assets (ready for screenshots)
```

## 🚀 Features

### Visual Design
- **Responsive Design**: Works perfectly on all devices
- **Particle Background**: Animated wasteland-themed particle system
- **Smooth Animations**: Fade-in effects, hover states, and scroll animations
- **Mobile Menu**: Collapsible navigation for mobile devices

### Interactive Elements
- **Smooth Scrolling**: Navigation links smoothly scroll to sections
- **Counter Animations**: Statistics count up on page load
- **Form Handling**: Contact form with wasteland-themed messages
- **Typing Effects**: Animated text reveal for hero titles
- **Glitch Effects**: Special hover effects on key elements
- **Easter Egg**: Konami code activation for wasteland mode

### Sections
1. **Hero Section**: Eye-catching introduction with app mockup
2. **About Section**: Company/app description with wasteland map
3. **Features Section**: Grid of app features with detailed lists
4. **Screenshots Section**: Gallery placeholder for app screenshots
5. **Download Section**: Multiple download options for different platforms
6. **Contact Section**: Contact form and social links
7. **Footer**: Links, badges, and technology stack

## 🛠️ Technical Stack

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern CSS with custom properties and Grid/Flexbox
- **JavaScript**: Vanilla JS with modern ES6+ features
- **External Libraries**:
  - Particles.js for background effects
  - Google Fonts (Orbitron, Exo 2) for typography

## 🎨 Color Scheme

```css
/* Primary Colors */
--wasteland-orange: #FF6B35;  /* Main accent */
--wasteland-rust: #B7410E;     /* Secondary accent */
--wasteland-sunset: #F7931E;   /* Highlight */
--wasteland-sand: #D4A574;     /* Light text */
--wasteland-charcoal: #2C2C2C; /* Dark background */
```

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🚀 Deployment to GitHub Pages

### Method 1: Using GitHub Pages (Recommended)

1. **Push to GitHub**: Ensure your project is on GitHub
2. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
3. **Access**: Your site will be available at `https://username.github.io/redeemer/`

### Method 2: Using GitHub Actions (For Advanced Setup)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2

    - name: Setup GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
```

## 🔧 Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/tquick/redeemer.git
   cd redeemer/website
   ```

2. **Open in browser**:
   ```bash
   # Simple HTTP server
   python -m http.server 8000
   # Or
   npx serve .
   ```

3. **Access**: Open `http://localhost:8000` in your browser

## 📸 Adding Screenshots

Replace the placeholder screenshots in the HTML with actual app screenshots:

1. Add your screenshots to the `images/` folder
2. Update the `src` attributes in the screenshots section
3. Recommended sizes:
   - Mobile screenshots: 375x667px (iPhone SE size)
   - Desktop screenshots: 1200x675px

## 🎯 Customization

### Changing Colors
Edit the CSS custom properties in `css/style.css`:

```css
:root {
  --primary-color: #YOUR_COLOR;
  --secondary-color: #YOUR_COLOR;
  /* ... */
}
```

### Updating Content
- Edit text content directly in `index.html`
- Modify feature lists in the features section
- Update download links in the download section

### Adding New Sections
1. Add HTML structure in `index.html`
2. Add corresponding CSS styles in `css/style.css`
3. Update navigation in the header

## 🌟 Performance

- **Optimized Images**: Use WebP format for better compression
- **Minimal Dependencies**: Only Particles.js external library
- **Efficient CSS**: Uses CSS Grid and Flexbox for layouts
- **Debounced Scroll**: Optimized scroll event handling

## 🔒 Security

- **No External Forms**: Contact form is for display purposes
- **Safe External Links**: All external links use `rel="noopener"`
- **No Sensitive Data**: No hardcoded credentials or API keys

## 📝 License

This website is part of the Redeemer project and follows the same MIT license.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on multiple devices
5. Submit a pull request

## 📞 Support

For questions about the website:
- Email: support@redeemer.app
- GitHub Issues: Create an issue in this repository
- Discord: Join our wasteland community

---

*"In the wasteland of codes, hope never dies."*

🛡️ **Stay safe out there in the digital wasteland, survivor.** 🛡️
