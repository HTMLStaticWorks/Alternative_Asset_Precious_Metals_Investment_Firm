# Aurex Capital — Alternative Asset & Precious Metals Investment Firm

A premium, luxury-refined website template built for an alternative asset and precious metals investment firm.

## 🎨 Design Direction

- **Aesthetic**: Luxury-refined with subtle art-deco influences
- **Color Palette**: Deep Navy (#0B1426) · Burnished Gold (#C9A96E) · Warm Ivory (#FAF8F4)
- **Typography**: Cormorant (headings) + Outfit (body) — both variable-weight Google Fonts
- **Icons**: Lucide Icons via CDN

## 📁 File Structure

```
├── index.html           ← Home page (hero with parallax + stats bar)
├── home2.html           ← Alternate home (typing effect + live price cards)
├── about.html           ← Company story, timeline, team
├── services.html        ← Core services + account tier comparison
├── products.html        ← Gold, silver, platinum, palladium products
├── vaulting.html         ← Storage & security, insurance, vault locations
├── insights.html        ← Market insights, ticker, educational resources
├── blog.html            ← Blog listing with 6 articles
├── blog-single.html     ← Single blog post
├── contact.html         ← Contact form + info + map
├── login.html           ← Client login (no navbar/theme toggle)
├── register.html        ← Registration with T&C checkbox
├── dashboard.html       ← Full client dashboard (8 tabs)
├── 404.html             ← Custom 404 page
├── coming-soon.html     ← Countdown + email signup
├── assets/
│   ├── css/
│   │   ├── style.css    ← All styles + design tokens + dark mode
│   │   └── rtl.css      ← RTL layout overrides
│   └── js/
│       ├── main.js      ← Nav, theme, RTL, animations, forms, carousel
│       └── dashboard.js ← Dashboard sidebar, tabs, chart
└── README.md
```

## ✨ Features

- **Dark / Light Theme** — System preference detection + localStorage persistence
- **RTL Support** — Toggle via button, CSS logical properties, separate rtl.css
- **Responsive** — 5 breakpoints: 1440+, 1025–1439, ≤1024 (hamburger), ≤768, ≤360
- **Client Dashboard** — Portfolio overview, holdings, buy/sell orders, market trends, transactions, documents, messages, settings
- **Form Validation** — Client-side validation on all forms with visual feedback
- **Animations** — Fade-slide hero, scroll reveal, testimonials carousel, typing effect, market ticker
- **SEO** — Unique titles, meta descriptions, semantic HTML, JSON-LD structured data
- **Accessibility** — WCAG 2.1 AA, skip links, ARIA labels, keyboard navigation, focus states

## 🚀 Getting Started

Simply open `index.html` in a browser. No build step or server required.

All images are loaded from Unsplash CDN — no local image files needed.

## 📱 Responsive Breakpoints

| Viewport      | Behavior                    |
|----------------|-----------------------------|
| > 1440px       | Large desktop               |
| 1025–1439px    | Desktop with full navbar    |
| ≤ 1024px       | Hamburger + slide drawer    |
| ≤ 768px        | Mobile optimizations        |
| ≤ 360px        | Small mobile, full-width drawer |

## 🌙 Theme Toggle

- Desktop (>1024px): Visible in navbar
- Mobile (≤1024px): Inside hamburger drawer only
- Auth pages: No theme toggle

## 🔄 RTL Support

- Toggle via ⇆ button in navbar/drawer
- Uses `dir="rtl"` on `<html>`
- All layouts use CSS logical properties
- Drawer slides from left in RTL mode
