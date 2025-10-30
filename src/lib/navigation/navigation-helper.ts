const baseNavigationItems = [
  { href: "/", label: "Espace29" },
  { href: "/infos", label: "Infos" },
  { href: "/agenda", label: "Agenda" },
  { href: "/artistes", label: "Artistes" },
  { href: "/contact", label: "Contact" },
]

const devNavigationItems = [
  { href: "/dev/design-system", label: "Design system" },
]

export const navigationItems = import.meta.env.DEV
  ? [...baseNavigationItems, ...devNavigationItems]
  : baseNavigationItems
