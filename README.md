# Espace29

## About Espace29

Espace29 is a contemporary art space located in Bordeaux's Gambetta-Meriadeck district. Opened in
2006, this 800m² hybrid venue hosts artistic and cultural events, provides studios for 30+ artists
across multiple disciplines, and features a modular exhibition space showcasing both emerging and
established contemporary artists.

## Tech Stack

- **[Astro](https://astro.build)** - Static site framework
- **[TinaCMS](https://tina.io)** - Git-backed CMS with visual editing
- **Tailwind CSS** - Styling

## Development Setup

### Prerequisites

- Node.js 18+
- pnpm

### Development Commands

| Command        | Action                                       |
| :------------- | :------------------------------------------- |
| `pnpm dev`     | Start development server at `localhost:4321` |
| `pnpm build`   | Build production site to `./dist/`           |
| `pnpm preview` | Preview production build locally             |
| `pnpm lint`    | Run ESLint                                   |

### Content Management

Access TinaCMS admin at `/admin` to edit content with visual editing enabled.

### Project Structure

```
src/
├── components/     # Reusable UI components
├── content/        # Content collections (blog, pages, config)
├── layouts/        # Page layouts
├── pages/          # Route pages
├── styles/         # Global styles and fonts
└── lib/           # Utility functions
tina/
├── collections/    # TinaCMS schema definitions
├── components/     # TinaCMS UI components
└── pages/          # Visual editing wrappers
```
