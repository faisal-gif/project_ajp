---
name: AJP — Aplikasi Jurnalisme Positif
description: Publication packages for institutions, edited and published by the TIMES Indonesia newsroom; the public landing is a Merz collage of torn newsprint, ticket stock and rubber stamps.
colors:
  ink: "#1c1a17"
  stock: "#e6d7b8"
  buff: "#d9c6a0"
  newsprint: "#dcd9d0"
  fiber-white: "#f3eee2"
  dull: "#7b0f1f"
  foil: "#f0a51c"
  foil-hover: "#f5b43d"
  olive: "#5c5a3e"
typography:
  display:
    fontFamily: "'Big Shoulders Display', Figtree, sans-serif"
    fontSize: "clamp(3.1rem, 7.4vw, 6rem)"
    fontWeight: 900
    lineHeight: 0.86
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "'Big Shoulders Display', Figtree, sans-serif"
    fontSize: "clamp(2.4rem, 5vw, 4rem)"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "normal"
  title:
    fontFamily: "'Big Shoulders Display', Figtree, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.025em"
  numeral:
    fontFamily: "'Alfa Slab One', Georgia, serif"
    fontSize: "2.1rem"
    fontWeight: 400
    lineHeight: 1
    fontFeature: "'tnum'"
  news:
    fontFamily: "'Old Standard TT', Georgia, serif"
    fontSize: "1.45rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "'Courier Prime', 'Courier New', monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.25
rounded:
  none: "0px"
  full: "9999px"
spacing:
  gutter: "16px"
  section: "80px"
  section-lg: "112px"
  container: "1280px"
components:
  button-primary:
    backgroundColor: "{colors.foil}"
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: "14px 28px 14px 24px"
  button-primary-hover:
    backgroundColor: "{colors.foil-hover}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.stock}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: "10px 20px"
  button-ink-hover:
    backgroundColor: "{colors.dull}"
  button-outline:
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: "12px 20px"
  button-outline-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.stock}"
  nav-link:
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    padding: "4px 12px"
  nav-link-hover:
    backgroundColor: "{colors.buff}"
  nav-link-active:
    backgroundColor: "{colors.dull}"
    textColor: "{colors.stock}"
  ticket-card:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "20px 24px 24px"
  channel-chip:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "4px 10px"
  channel-chip-lead:
    backgroundColor: "{colors.dull}"
    textColor: "{colors.stock}"
  proof-strip:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.stock}"
    padding: "12px 16px"
---

# Design System: AJP — Aplikasi Jurnalisme Positif

> **Scope.** This system governs the **public landing surface only**: the Welcome page (`resources/js/Pages/Welcome`) and the `LandingLayout` nav and footer, all rendered inside the `.landing` wrapper. The authenticated app (dashboard, CMS, subscription pages) runs on daisyUI with the `times` theme (`--color-primary: #7b0f1f`, 0.25–0.5rem radii, white base surfaces) and was **not** redesigned. Do not assume dashboard screens follow the collage rules below, and do not port collage materials into the dashboard without a deliberate redesign pass. The two surfaces share exactly one value: the AJP red.

## Overview

**Creative North Star: "The Kliping Board"**

The landing page is a Merz assemblage: an institution's story is torn out of TIMES Indonesia, the e-koran, Instagram and the WA Channel and glued down on a board as proof of publication. Packages are not floating price cards; they are tickets with perforated stubs you tear off. Every surface is a physical material (ticket stock, newsprint, ink-black board, red duotone print) and every edge admits how it was made: torn, perforated, taped, stamped.

Density is poster-like at the top of each section and printed-matter fine underneath. Wood-type headlines shout in uppercase; a slab-serif aside interrupts them in lowercase olive; a newsprint serif word lands the point in red. Beneath, Figtree body copy and Courier fine print carry the facts. Composition is deliberately off-square: scraps and tickets sit at small rotations (−5° to +4°) and overlap, but the reading column beside them stays straight.

The build refuses the centered SaaS hero, icon-card feature grids and floating price cards. Motion is stepped, never eased: things are pasted on and lifted off, not glided.

**Key Characteristics:**
- Warm paper grounds (stock, newsprint) with film-grain noise; ink black for proof strips and the footer.
- One red for the brand, one yellow for the primary action, nothing else saturated.
- Wood type + slab aside + newsprint punch word as a three-voice headline.
- Physical edges made in CSS masks and SVG: torn, perforated, notched, taped.
- Sharp corners everywhere; roundness only where the real object is round.
- Stepped `steps()` motion; reduced-motion disables it.

## Colors

A paper-and-ink palette: two warm paper grounds, one ink, one brand red, and a single yellow held back for the action you want taken.

### Primary
- **AJP Dull Red** (`dull`): the brand and the stamp ink. Fills the pricing section ground, the active nav tab, the lead channel chip, the route line in the process section, and colors the punch word of every headline, the TERBIT / REDAKSI stamps, rupiah prices and emphasis bullets. Also the text-selection color and the scrollbar thumb on the landing.

### Secondary
- **Logo Foil Yellow** (`foil`): reserved for the primary action ("Daftarkan Instansi", the popular package's button) and for live numerals on ink (readership stub, proof-strip counts). Also the landing focus ring. Hover brightens to **Foil Highlight** (`foil-hover`).

### Neutral
- **Ticket Stock** (`stock`): default ground for the hero, header, redaksi section and every ticket; the light text color on ink and red.
- **Newsprint Gray** (`newsprint`): the torn newspaper scraps and the process section ground.
- **Aged Buff** (`buff`): hover wash on nav links and quiet buttons; the translucent tape strip.
- **Fiber White** (`fiber-white`): the lighter paper of the WA message and the photo mount. The tear lip under section joins uses a near sibling (#efe8da).
- **Ink Black** (`ink`): all text on paper, 2px rules and borders, proof strip, footer board, the secondary ink button.
- **Faded Olive** (`olive`): fine print, captions, the slab aside inside headlines, ticket serials. It holds roughly 5:1 against stock and newsprint; keep it on those grounds only.

### Named Rules
**The One Foil Rule.** Foil yellow is the primary action, and only a live numeral on ink may borrow it. If a screen has two yellow buttons, one is wrong.

**The Paper Ground Rule.** Section grounds come from the paper set (stock, newsprint), the red print (dull) or the ink board. Never white, never a gradient.

**The Opacity-Not-New-Color Rule.** Secondary text on a ground is the ground's text color at reduced opacity (ink at 80–85%, stock at 70–85%, perforations at 30–50%), not a new gray.

## Typography

**Display Font:** Big Shoulders Display (with Figtree, sans-serif)
**Numeral / Aside Font:** Alfa Slab One (with Georgia)
**News Font:** Old Standard TT (with Georgia)
**Body Font:** Figtree (with ui-sans-serif, system-ui)
**Label/Mono Font:** Courier Prime (with Courier New)

**Character:** Condensed wood type set tight and uppercase for the shout, a fat slab for numbers and asides, a 19th-century newspaper serif for anything that pretends to be printed news, and a typewriter for the fine print. Figtree is the quiet, legible voice that actually explains.

### Hierarchy
- **Display** (900, clamp(3.1rem, 7.4vw, 6rem), 0.86, uppercase): the hero headline only.
- **Headline** (900, clamp(2.4rem, 5vw, 4rem), 0.9, uppercase): section headlines. The closing strip runs a smaller step (clamp(2rem, 4vw, 3.25rem)).
- **Title** (700–900, 1.125–1.25rem, uppercase, 0.025em): nav links, buttons, process-step tags; package names step up to 2.25rem at 900.
- **Numeral** (Alfa Slab 400, 1.125–2.25rem, tabular): prices, counts, step numbers, the 1M+ readership figure, stamp lettering.
- **News** (Old Standard 700, 1–1.45rem, tight): headlines inside newspaper scraps and the red punch word of section headlines.
- **Body** (Figtree 400, 0.95–1.05rem, 1.625): explanatory paragraphs, capped at 34–36rem.
- **Label** (Courier Prime 400/700, 10–13px, uppercase for tags): datelines, serials ("No. 0341-01"), captions, colophon, channel chips.

### Named Rules
**The Three-Voice Headline Rule.** A section headline is wood type, then a lowercase slab aside in olive at 0.42–0.55em, then the landing word in red (wood type or Old Standard). One aside per headline.

**The Numbers-Are-Slab Rule.** Any figure the reader should trust (price, count, readership) is set in Alfa Slab, tabular.

## Layout

A 1280px container (`max-w-7xl`) with a 16px gutter at every width. Sections breathe at 80px vertical padding, 112px from `lg` (1024px). Two-column sections use a 12-column grid at `lg` (hero 6/6, redaksi 5/7, single-package pricing 6/6 with the copy sticky at top 7rem); everything below `lg` stacks in one column.

The hero collage is absolutely positioned on a 37rem board at `lg`; below `lg` the same scraps **repack into a two-column grid, not a scaled-down board**. The process line runs vertical on mobile and horizontal from `lg`. The header is fixed at 64px; content sections begin at 6–7rem top padding to clear it, and anchor targets use `scroll-mt-20`.

Sections join by tearing, not by a flat edge: each section after the hero carries a 26px ragged strip in the previous section's color over a pale fiber lip, and the footer opens with a 12px perforated edge. Stacking order descends down the page (process z-30, pricing z-20) so each tear lies on top of the section below.

## Elevation & Depth

Depth is physical: paper lying on paper. There are no floating cards and no hard offset shadows. Scraps cast a soft, slightly warm drop shadow that follows their torn silhouette (so it is a `filter: drop-shadow`, not `box-shadow`); flat-edged pasted items use a two-layer contact-plus-ambient box shadow. Interactive paper lifts on hover or focus by 3px with a deeper shadow, in two steps.

### Shadow Vocabulary
- **Scrap drop** (`filter: drop-shadow(0 5px 7px rgb(28 26 23 / .3))`): torn or masked scraps whose shadow must follow the mask.
- **Pasted contact** (`box-shadow: 0 1px 1px rgb(28 26 23 / .18), 0 6px 14px -6px rgb(28 26 23 / .35)`): rectangular items glued flat (photo mount, dropdown, channel board).
- **Lifted** (`filter: drop-shadow(0 12px 12px rgb(28 26 23 / .38))` + `translate: 0 -3px`): hover/focus state of scraps and ticket cards.
- **Tape** (`box-shadow: 0 1px 2px rgb(28 26 23 / .15)`): the translucent buff tape strip.

### Named Rules
**The Shadow-Follows-Paper Rule.** A masked shape gets `drop-shadow` on its unmasked wrapper; `box-shadow` is only for true rectangles.

**The Stepped Motion Rule.** Paste-in is 0.36s `steps(3, end)` from −14px, 1.04 scale, 0 opacity, staggered by 0.1s; lift is 0.12s `steps(2, end)`. No smooth easing curves on collage materials, and `prefers-reduced-motion` removes both.

## Shapes

Corners are square. Form comes from the edge treatment instead:

- **Torn** edges (fibrous SVG mask tiles, 240×12px top and bottom; an offset variant so neighbors don't match) for newsprint scraps and pasted strips.
- **Ticket notches**: semicircle bites (`--notch` 5–9px) at a perforation line `--stub` from the right edge (horizontal tickets) or bottom (vertical package tickets), paired with a 6-on/5-off dashed perforation.
- **Section tears**: a 1600px-wide ragged strip plus a pale lip offset beneath it.
- **Tape**: a 5.5rem buff strip, −3° rotation, over the top edge of mounted photos.
- **Rotation**: pasted objects sit between −5° and +4°; text columns never rotate.

Roundness appears only where the depicted object is round: numbered step discs (full radius, 4px ink border), the avatar dot in the Instagram scrap, and the softly rounded WA message bubble. The rubber stamp's inner frame rounds by 3–5px because a stamp does.

## Components

### Buttons
Tickets you tear, not pills you tap.
- **Shape:** square corners; primary and nav "Daftar" buttons are ticket-masked with a notch pair near the right end (primary `--notch` 7px, `--stub` 2.6rem).
- **Primary (foil ticket):** foil ground, ink wood type 900 at 1.25rem uppercase. Hover brightens to foil-hover. When the button needs a pointer, the world's own pointer is the printer's fist beside it, not an icon glyph.
- **Ink:** ink ground, stock text; hover turns AJP red. Used for "Daftar" in the header and non-popular "Pilih paket ini".
- **Outline:** 2px ink border, transparent ground; hover inverts to ink ground with stock text ("Lihat Paket").
- **Focus:** every landing control gets a 3px foil outline at 3px offset.

### Chips
- **Style:** Courier Prime bold 12px uppercase in a 2px ink frame on stock, each at a slight individual rotation (−2° to +2°).
- **State:** the lead channel (TIMES Indonesia) fills AJP red with a red border; the rest stay stock. Inline channel links in hero copy are underlined 2px red and get a translucent foil wash on hover.

### Cards / Containers
The package card is a vertical ticket.
- **Corner Style:** square, notched on both sides at the stub line (`--stub` 4.5rem, `--notch` 9px).
- **Background:** stock with grain, ink text.
- **Shadow Strategy:** flat at rest; Lifted on hover/focus (see Elevation).
- **Border:** a 2px ink rule above the feature list; a dashed perforation above the stub.
- **Internal Padding:** 20px top, 24px sides and bottom; the stub is 4.5rem high holding the full-width button.
- **Detail:** serial "No. 0341-0N" in olive Courier; name in wood type 900 at 2.25rem; price in red Alfa Slab 2.1rem; square 8px bullets (red for newsroom-guaranteed rows). A popular package carries a red double-border slab stamp, rotated 14°, hanging off the right edge. Cards rotate −1°, 0.8°, −0.6° in sequence.

### Navigation
- **Style:** fixed 64px header on grained stock with a 2px ink bottom rule. Links are wood type 700 at 1.125rem uppercase, tracking 0.025em.
- **States:** hover washes buff; the active route fills AJP red with stock text.
- **Mobile:** below `lg`, a 40px square 2px-ink menu button opens a stock dropdown with a Pasted contact shadow.
- **Footer:** an ink board with a perforated top edge; the logo sits in a stock ticket; the colophon is Courier at 13px; footer links are wood type that turn foil and underline on hover; social links are 40px squares in a 40% stock frame that turns foil on hover.

### Newspaper Scrap (signature)
A fake-but-labeled channel artifact pasted on the hero board: torn newsprint or stock paper with grain, an Old Standard masthead over a 2px ink rule, a Courier dateline, an Old Standard headline, a halftone raster image (multiply blend) and two-column 11px body with a hairline column rule. Scraps are focusable; click or focus raises the scrap to the top of the pile. Always pair the board with a visible "Contoh ilustrasi, bukan berita sungguhan." caption.

### Rubber Stamp (signature)
SVG stamp in AJP red, multiply blended: 5px outer and 2px inner frames, Alfa Slab title at 44px with 4px tracking, optional Courier subline, a turbulence displacement for a wobbly ink edge and a speckle mask for wear. Placed rotated (−12° to +8°) straddling the gap between two objects, never centered on one. Always has a text `aria-label`.

### Printer's Fist (signature)
An SVG manicule in stock with a 2.4px ink engraving line, pointing at the headline or the action it introduces; mirrored when it points left. Decorative (`aria-hidden`), hidden below `sm` in the hero.

### Proof Strip
An ink band under the hero: Courier 14px stock text with live counts in foil Alfa Slab, separated by vertical perforations. Only real, sourced numbers appear here.

## Do's and Don'ts

### Do:
- **Do** keep foil for the one primary action per view and for live numerals on ink (The One Foil Rule).
- **Do** build section headlines in three voices: wood type, olive slab aside, red punch word.
- **Do** make every edge tell how the object was made: torn, notched, perforated, taped, stamped.
- **Do** rotate pasted objects by small amounts (−5° to +4°) and keep reading text straight.
- **Do** repack collage items into a grid on small screens instead of scaling the board.
- **Do** use `steps()` timing for paste and lift, and disable it under `prefers-reduced-motion`.
- **Do** label any illustrative scrap as an example; numbers shown as proof must be live or user-confirmed.

### Don't:
- **Don't** use a centered SaaS hero, icon-card feature grids, or floating price cards.
- **Don't** round corners on buttons, cards or containers; roundness is only for objects that are round in life.
- **Don't** use smooth ease curves or glide transitions on collage materials.
- **Don't** introduce white, gradient, or new saturated grounds; stay inside stock, newsprint, dull and ink.
- **Don't** put olive text on red or ink grounds.
- **Don't** apply these collage rules to the authenticated dashboard or CMS without a redesign; that surface is daisyUI `times`.
