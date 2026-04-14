# Design Brief

## Direction

Medical Serenity with Warmth — Professional medical clinic design balancing trust and welcome through cool-ocean blue primary and warm cream background.

## Tone

Clean, professional minimalism with subtle warmth. Serene and calm without clinical coldness; welcoming to diverse patient base.

## Differentiation

Intentional LGBTQ+ friendly messaging in footer and bilingual (English/Hindi) navigation toggle position trust centrally—not afterthought design.

## Color Palette

| Token      | OKLCH          | Role                                  |
| ---------- | -------------- | ------------------------------------- |
| background | 0.98 0.008 230 | Warm cream off-white, breathing room  |
| foreground | 0.18 0.015 230 | Deep cool-grey, high contrast text    |
| card       | 1.0 0.004 230  | Pure white cards with soft elevation  |
| primary    | 0.42 0.14 240  | Ocean blue—trust, authority, medical  |
| accent     | 0.6 0.15 170   | Muted teal—growth, health, vitality   |
| muted      | 0.94 0.01 230  | Soft background, section dividers     |

## Typography

- Display: Space Grotesk — geometric, professional, headline hierarchy
- Body: Figtree — warm, readable, medical-appropriate for all patient demographics
- Scale: hero `text-5xl md:text-7xl font-bold tracking-tight`, h2 `text-3xl md:text-5xl font-bold`, labels `text-sm font-semibold tracking-widest uppercase`

## Elevation & Depth

Soft shadow hierarchy (none on cards at rest, `shadow-subtle` on hover, `shadow-elevated` on modals) creates perceived depth without clinical sterility; borders minimal or no-fill.

## Structural Zones

| Zone    | Background        | Border     | Notes                                          |
| ------- | ----------------- | ---------- | ---------------------------------------------- |
| Header  | card/white        | border-b   | Sticky, bilingual toggle top-right, logo left  |
| Hero    | gradient-medical  | —          | Primary/accent gradient, centered CTAs         |
| Content | background/cream  | —          | Alternating card/muted sections                |
| Footer  | muted/soft        | border-t   | LGBTQ+ badge, address, hours, contact links    |

## Spacing & Rhythm

Spacious grid (6-8 units between sections, 4 units within groups) creates breathing room befitting medical environment; `gap-4` default, `gap-6` between major sections.

## Component Patterns

- Buttons: primary (ocean blue bg, white text), secondary (border-primary), compact pill corners (rounded-lg)
- Cards: white bg, no shadow at rest, `shadow-subtle` hover, 8px radius
- Badges: LGBTQ+ badge—teal accent bg, white text, 16px pill shape
- Service icons: muted-foreground, scale with heading size

## Motion

- Entrance: cards fade-in staggered 0.1s intervals on scroll visibility
- Hover: shadow-subtle, text slight scale (1.02) on interactive elements
- Decorative: none—clarity over animation

## Constraints

- Only use OKLCH tokens from palette; no arbitrary hex/rgb
- All text >= 14px for accessibility; 16px default body
- No full-page gradients; gradients only on hero and buttons
- Mobile-first: hero text scales via typography tiers, not viewport units

## Signature Detail

Warm cream background on cool blue primary creates medical professionalism without sterility; paired with sage accent, signals growth and patient care—a palette that welcomes rather than intimidates.
