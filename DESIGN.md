# Design Brief

## Direction

Google-Inspired Search Portal — Uncompromising minimalism: pure white background, clean typography, blue primary with red/yellow/green accents for search utilities (Gmail, Maps, Chat, News).

## Tone

Minimalist, functional, accessible. Search-first interface with generous whitespace and subtle shadows; every element serves a purpose.

## Differentiation

Centered search experience on homepage with quick shortcuts; left sidebar navigation on inner pages (Inbox, Maps, Chat, News); blue search button with hover lift effect; pure white backgrounds eliminate visual noise.

## Color Palette

| Token      | OKLCH          | Role                           |
| ---------- | -------------- | ------------------------------ |
| background | 1.0 0.0 0      | Pure white, maximum clarity    |
| foreground | 0.2 0.008 240  | Near-black text, high contrast |
| card       | 1.0 0.0 0      | White cards, soft border       |
| primary    | 0.55 0.22 250  | Google blue—CTAs and accents   |
| accent     | 0.55 0.25 25   | Red—destructive actions        |
| muted      | 0.95 0.005 0   | Light gray dividers/borders    |

## Typography

- Display: Space Grotesk — geometric, professional, headline hierarchy
- Body: General Sans — clean, approachable, search-optimized readability
- Scale: hero `text-5xl md:text-6xl font-bold`, h2 `text-2xl font-semibold`, labels `text-xs font-medium text-muted-foreground`

## Elevation & Depth

Minimal shadow hierarchy—cards at rest have no shadow, subtle on hover (`shadow-subtle`), elevated on interaction modals. Borders on cards use light gray (`border-muted`), not shadows.

## Structural Zones

| Zone    | Background | Border     | Notes                                  |
| ------- | ---------- | ---------- | -------------------------------------- |
| Header  | card       | border-b   | Sticky, minimal—logo left, profile-r   |
| Hero    | background | —          | Centered search, white background      |
| Results | background | —          | Vertical list, alt-row bg-muted/5      |
| Sidebar | card       | border-r   | Left nav (Inbox/Maps/Chat/News)        |
| Footer  | muted/5    | border-t   | Centered links, minimal text           |

## Spacing & Rhythm

Generous whitespace: 8-12 units between sections, 4 units within groups. Search card `gap-4`, result items `py-4 px-6`, header `py-3 px-8`. Mobile-first responsive.

## Component Patterns

- Search input: white bg, light gray border, rounded-sm (3px), no shadow at rest, `search-input-focus` on active
- Buttons: primary (blue bg, white text), secondary (border + transparent), compact 32px height
- Cards: white bg, thin border-muted, 2px radius, `shadow-subtle` on hover
- Badges: accent colors (red/yellow/green/blue), pill shape, 12px height, labels inside

## Motion

- Search input focus: 0.2s ring-primary
- Button hover: opacity shift + lift (shadow-subtle to shadow-elevated)
- No page transitions—single-page app with state changes
- Entrance: no fade-in stagger; content loads instantly

## Constraints

- Background must be pure white (`1.0 0.0 0`), no cream or tint
- Only OKLCH tokens; no arbitrary hex/rgb colors
- All text >= 14px; 16px default body
- Borders prefer light gray over shadows for card separation
- Max 3 accent colors per section (blue, red, yellow, green)

## Signature Detail

Pure white canvas with blue search button creates focus through negative space—a palette that whispers rather than shouts, letting the search box command attention through restraint and positioning.
