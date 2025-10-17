const baseNavigationItems = [
  { href: "/", label: "Espace29" },
  { href: "/infos", label: "Infos" },
  { href: "/agenda", label: "Agenda" },
  { href: "/artistes", label: "Artistes" },
];

const devNavigationItems = [
  { href: "/dev/design-system", label: "Design system" },
];

export const navigationItems = import.meta.env.DEV
  ? [...baseNavigationItems, ...devNavigationItems]
  : baseNavigationItems;
