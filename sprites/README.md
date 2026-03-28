# Sprites Directory

This directory contains sprite sheets and sprite-related assets for the Velour Café website.

## Structure

```
sprites/
├── icons/              # Icon sprites
├── animations/         # Animation sprites
├── decorations/        # Decorative sprites
└── ui/                 # UI element sprites
```

## Usage

### In TypeScript/JavaScript
```typescript
// Example: Using sprite background-image
element.style.backgroundImage = 'url(/sprites/icons/coffee-cup.png)';
```

### In CSS
```css
.icon-coffee {
  background-image: url('/sprites/icons/coffee-cup.png');
  background-size: contain;
  background-repeat: no-repeat;
}
```

## Recommended Formats

- **PNG**: For transparent backgrounds and high-quality graphics
- **SVG**: For scalable vector graphics
- **WebP**: For modern browsers (with PNG fallback)

## Best Practices

1. **Optimize images**: Use tools like ImageOptim or TinyPNG
2. **Use appropriate resolution**: 1x and 2x versions for crisp display
3. **Consistent sizing**: Maintain uniform dimensions within categories
4. **Naming conventions**: Use descriptive, kebab-case names (e.g., `coffee-bean-dark.png`)

## Adding New Sprites

1. Create subdirectory if needed (e.g., `sprites/badges/`)
2. Add optimized sprite files
3. Update your CSS/TypeScript imports
4. Test on multiple devices for visual quality
