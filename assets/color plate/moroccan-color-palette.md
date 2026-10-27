# Moroccan Website Color Palette

A palette pulled from the Hassan II Mosque photo at dusk: deep blue sky, glowing amber stone, dark terracotta arch, teal zellige tiles and cream marble.

## Colors

| Role | Name | Hex |
|---|---|---|
| Page base / overlay | Midnight Blue | `#0B1F4B` |
| Secondary background | Dusk Sky | `#1D4FB8` |
| Primary accent / CTA | Amber Glow | `#F2A93B` |
| CTA hover / borders | Deep Gold | `#D98A1F` |
| Dark surfaces, footer | Arch Terracotta | `#4A2418` |
| Highlights, links, icons | Zellige Teal | `#1F9A94` |
| Cards, light sections | Marble Cream | `#F6E7CB` |
| Body text on light | Ink Brown | `#1A1209` |

## CSS Variables

```css
:root {
  --midnight:   #0B1F4B;
  --dusk:       #1D4FB8;
  --amber:      #F2A93B;
  --gold:       #D98A1F;
  --terracotta: #4A2418;
  --teal:       #1F9A94;
  --cream:      #F6E7CB;
  --ink:        #1A1209;
}

.hero {
  background:
    linear-gradient(180deg, rgba(11,31,75,.55) 0%, rgba(74,36,24,.75) 100%),
    url("mosque.jpg") center/cover;
  color: var(--cream);
}

.btn { background: var(--amber); color: var(--ink); }
.btn:hover { background: var(--gold); }
```

## Tailwind Config

```js
theme: {
  extend: {
    colors: {
      midnight: '#0B1F4B',
      dusk: '#1D4FB8',
      amber: '#F2A93B',
      gold: '#D98A1F',
      terracotta: '#4A2418',
      teal: '#1F9A94',
      cream: '#F6E7CB',
      ink: '#1A1209',
    },
  },
}
```

## Usage Tips

- **Add a dark overlay.** The center of the photo is very bright (the glowing minaret), so text over it needs a gradient like the one above, or it will be hard to read.
- **Keep text cream, not pure white.** `#F6E7CB` feels warmer and matches the marble.
- **Use the 60/30/10 rule.** About 60% midnight and terracotta, 30% cream, and 10% amber and teal. Too much amber looks cheap, so reserve it for buttons and key highlights.
- **Use teal sparingly.** It works best for icons, hover states and small details, like zellige tiles.
- **Add a zellige pattern.** A faint geometric pattern at 5-8% opacity in teal or gold on dark sections adds an authentic Moroccan feel.
