# Espace29

## About Espace29

Espace29 is a contemporary art space located in Bordeaux's Gambetta-Meriadeck district. Opened in
2006, this 800m² hybrid venue hosts artistic and cultural events, provides studios for 30+ artists
across multiple disciplines, and features a modular exhibition space showcasing both emerging and
established contemporary artists.

## Development Setup

### Prerequisites

- Node.js 18+
- pnpm

### Installation

```sh
pnpm install
```

### Development Commands

| Command        | Action                                       |
| :------------- | :------------------------------------------- |
| `pnpm dev`     | Start development server at `localhost:4321` |
| `pnpm build`   | Build production site to `./dist/`           |
| `pnpm preview` | Preview production build locally             |
| `pnpm lint`    | Run ESLint                                   |

### Project Structure

```
src/
├── components/     # Reusable UI components
├── layouts/        # Page layouts
├── pages/          # Route pages
├── styles/         # Global styles and fonts
└── lib/           # Utility functions
```
