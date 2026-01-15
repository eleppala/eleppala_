# Personal Website

A personal website built for learning purposes.

## Tech Stack

- **React 19** - UI library
- **Vite 7** - Build tool with fast HMR
- **Tailwind CSS v4** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript

## Components

### Terminal

An interactive terminal component (`src/components/Terminal.tsx`) that simulates a command-line interface:

- **Intro animation**: Types `whoami` and `help` commands letter by letter on load
- **Interactive mode**: Accepts user input after intro completes
- **Available commands**: `help`, `whoami`, `clear`, `ls`, `cd`
- **Responsive**: Scales width/height and font size for mobile and desktop
- **Dark themed**: Custom scrollbar styling

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Theme Configuration

Custom colors and fonts are configured in `src/index.css` using Tailwind v4's `@theme` directive:

```css
@theme {
  --font-sans: 'FontName', system-ui, sans-serif;
  --color-primary: #hexvalue;
  --color-secondary: #hexvalue;
  --color-third: #hexvalue;
}
```

**Usage:**
- Colors: `bg-primary`, `text-secondary`, `border-third`
- Font weights: `font-normal`, `font-medium`, `font-semibold`, `font-bold`

## Git Workflow

This project uses a simplified Git Flow:

```
main (production)
  └── dev (integration)
        └── feat/* or fix/* (feature branches)
```

### Commit Convention

```
<type>: <description>
```

Types: `feat`, `fix`, `refactor`, `chore`, `docs`, `style`

## Documentation

See [SETUP_LOG.md](SETUP_LOG.md) for detailed setup steps and conventions.
