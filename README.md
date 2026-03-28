# Velour Café — A Luxury Experience

A premium luxury café website showcasing an artisan coffee and pastry experience in Paris.

## 🎯 Features

- **Responsive Design**: Fully responsive layout for desktop, tablet, and mobile devices
- **Interactive Slider**: Dynamic hero section with image carousel and progress tracking
- **Smooth Navigation**: Fixed navbar with smooth scrolling to sections
- **Modern Styling**: Elegant typography with custom CSS variables for consistent branding
- **Gallery Section**: Beautiful showcase of café ambiance and offerings
- **Customer Reviews**: Testimonials from satisfied patrons
- **Reservation System**: Contact form for table reservations
- **Loyalty Program**: Membership section with exclusive benefits
- **Mobile Menu**: Hamburger navigation for smaller screens
- **TypeScript Modules**: Modular, type-safe JavaScript architecture

## 🛠️ Technology Stack

- **HTML5**: Semantic markup and structure
- **CSS3**: Custom properties, flexbox, and responsive design
- **TypeScript**: Modern, modular JavaScript with full type safety
- **Google Fonts**: Playfair Display, Cormorant Garamond, and Jost fonts
- **Remix Icon**: Icon library for UI elements

## 📁 Project Structure

```
Wizaa_cafe/
├── src/                    # TypeScript source files
│   ├── main.ts            # Entry point - initializes all modules
│   ├── slider.ts          # Hero slider functionality
│   ├── navbar.ts          # Navigation menu & mobile menu
│   ├── animations.ts      # Scroll animations, parallax, counters
│   ├── menus.ts           # Menu tabs and magnetic effects
│   ├── gallery.ts         # Lightbox image gallery
│   ├── forms.ts           # Contact and newsletter forms
│   ├── effects.ts         # Tilt, back-to-top, smooth scroll effects
│   └── utils.ts           # Utility functions and helpers
├── dist/                  # Compiled JavaScript output
├── sprites/               # Sprite sheets and assets
├── index.html            # Main HTML template
├── style.css             # Complete stylesheet
├── tsconfig.json         # TypeScript configuration
├── package.json          # Project dependencies and scripts
├── .gitignore            # Git ignore rules
└── README.md             # This file
```

## 🚀 Getting Started

### Installation

1. Clone this repository:
```bash
git clone https://github.com/Ahmvdaziz/Wizaa_cafe.git
cd Wizaa_cafe
```

2. Install dependencies:
```bash
npm install
```

3. Build TypeScript:
```bash
npm run build
```

### Development

To watch for changes and automatically rebuild:
```bash
npm run watch
```

Or use the development mode:
```bash
npm run dev
```

### Production

1. Build the TypeScript:
```bash
npm run build
```

2. Open `index.html` in your web browser

## 📦 Key Modules

### `main.ts` — Initialization
Central entry point that initializes all modules when the DOM is ready.

### `slider.ts` — Hero Slider
- Auto-play carousel with 6-second intervals
- Keyboard navigation (Arrow keys)
- Touch/swipe support
- Progress bar indicator
- Pause on hover

### `navbar.ts` — Navigation
- Sticky navbar on scroll
- Mobile hamburger menu
- Active link highlighting
- Smooth scroll navigation

### `animations.ts` — Effects
- **Scroll Animations**: Trigger animations when elements enter viewport
- **Parallax**: 3D parallax effect on hero slides
- **Counters**: Animated number counters for statistics

### `menus.ts` — Menu Interactions
- Tabbed menu system with fade transitions
- Magnetic hover effect on menu items
- Dynamic content switching

### `gallery.ts` — Lightbox Gallery
- Click-to-enlarge gallery images
- Keyboard navigation in lightbox
- Touch swipe support
- Image counter display

### `forms.ts` — Form Handling
- **Contact Form**: Reservation requests with validation
- **Newsletter**: Email subscription with feedback
- Real-time email validation
- User feedback messages

### `effects.ts` — Visual Effects
- **Tilt Effect**: 3D tilt on experience cards
- **Back-to-Top**: Smooth scroll to top button
- **Lazy Loading**: Image lazy loading fallback
- **Hours Highlight**: Highlights today's operating hours

## 🎨 Customization

### Adding New Sprites

Place sprite files in the `sprites/` directory and reference in CSS:
```css
.icon-coffee {
  background-image: url('/sprites/icons/coffee-cup.png');
}
```

### Extending TypeScript Modules

Each module is self-contained. To add new functionality:

1. Create a new `.ts` file in `src/`
2. Export your initialization function
3. Import and call it in `main.ts`

Example:
```typescript
// src/my-feature.ts
export function initMyFeature(): void {
  // Feature code here
}

// In main.ts
import { initMyFeature } from './my-feature';

function initializeApp(): void {
  // ... other inits
  initMyFeature();
}
```

## 🌐 Browser Support

- Chrome (v90+)
- Firefox (v88+)
- Safari (v14+)
- Edge (v90+)
- Mobile browsers (iOS Safari 12+, Chrome Mobile)

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus indicators
- Reduced motion preferences respected

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to submit pull requests or open issues.

## 👨‍💻 Author

Created by **Ahmvdaziz** as part of the ITI46 Projects initiative.

---

**Enjoy the luxurious experience of Velour Café!** ☕
