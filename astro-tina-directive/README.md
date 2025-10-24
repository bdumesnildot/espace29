# Astro TinaCMS Client Directive

Custom Astro client directive for conditional hydration of TinaCMS components.

## Purpose

Enables React components to hydrate **only when inside the TinaCMS admin iframe**, preventing
unnecessary JavaScript from loading on the public site while maintaining full TinaCMS functionality.

## How It Works

```astro
<Component {...props} client:tina />
```

- **Inside TinaCMS admin**: Component hydrates normally for live editing
- **Public site**: Component remains static (no hydration)

## Files

- `register.js` - Astro integration registration
- `tina.js` - Client directive implementation
- `index.d.ts` - TypeScript definitions

## Usage

Already configured in `astro.config.mjs`. Use the `client:tina` directive on any React component
that needs to be editable in TinaCMS:

```astro
import {AdminComponent} from '@/components/AdminComponent';

<AdminComponent {...tinaProps} client:tina />
```

## Detection Logic

Checks if the page is running in an iframe (`window.self !== window.top`). If true, the component
hydrates; otherwise, it remains static.
