---
name: Sakura
description: A contemplative pause framed by timber, shoji paper, and one landscape.
colors:
  ink: "#151619"
  paper: "#ede8e3"
  maple: "#bf1818"
  ivory: "#f2eee7"
  text-ink: "#141211"
  maple-hover: "#a91616"
  maple-active: "#8f1212"
  maple-rule: "#d51e1a"
  maple-selection: "#9f1717"
  focus-ring: "#e03a32"
  rail-base: "#1a1817"
  sumi: "#1e1a22"
  mist: "#e7ddd9"
  dusk-snow: "#f4edea"
  dusk-ash: "#baa6a2"
  maple-deep: "#a62728"
  ink-900: "#0f1013"
  paper-50: "#f7f3ee"
  night-paper: "#1e1a22"
  night-text: "#ece4df"
  night-glow: "#e8c896"
typography:
  display:
    fontFamily: '"Cormorant Garamond", Georgia, serif'
    fontSize: "4.035vw"
    fontWeight: 500
    lineHeight: 0.95
    letterSpacing: "-0.01em"
  room-title:
    fontFamily: '"Cormorant Garamond", Georgia, serif'
    fontSize: "clamp(44px, 4.2vw, 70px)"
    fontWeight: 600
    lineHeight: 0.96
    letterSpacing: "-0.025em"
  title:
    fontFamily: '"Cormorant Garamond", Georgia, serif'
    fontSize: "2.97vw"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.025em"
  lead:
    fontFamily: '"Cormorant Garamond", Georgia, serif'
    fontSize: "clamp(20px, 1.45vw, 24px)"
    fontWeight: 400
    lineHeight: 1.45
  body:
    fontFamily: '"Cormorant Garamond", Georgia, serif'
    fontSize: "clamp(18px, 1.2vw, 20px)"
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: '"Cormorant Garamond", Georgia, serif'
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.2
  navigation:
    fontFamily: '"Cormorant Garamond", Georgia, serif'
    fontSize: "1.45vw"
    fontWeight: 500
    lineHeight: 1
  view-label:
    fontFamily: '"Cormorant Garamond", Georgia, serif'
    fontSize: "1.55vw"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.04em"
  action:
    fontFamily: '"Cormorant Garamond", Georgia, serif'
    fontSize: "1.55vw"
    fontWeight: 600
    lineHeight: 1
  wordmark:
    fontFamily: '"Cantata One", Georgia, serif'
    fontSize: "1.89vw"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.3em"
spacing:
  content-max: "1320px"
  gutter: "max(4.9vw, calc((100vw - 1320px) / 2))"
  room-pad: "clamp(96px, 9vw, 150px)"
  head-gap: "clamp(40px, 4vw, 64px)"
  lintel: "16px"
  post: "14px"
components:
  button-primary:
    backgroundColor: "{colors.maple}"
    textColor: "#f8f5f4"
    typography: "{typography.action}"
    width: "18.73%"
    height: "6.05%"
  button-primary-hover:
    backgroundColor: "{colors.maple-hover}"
    textColor: "#fff"
  button-primary-active:
    backgroundColor: "{colors.maple-active}"
  room-button:
    backgroundColor: "{colors.maple}"
    textColor: "#f8f5f4"
    padding: "10px 20px"
    height: "48px"
  room-button-hover:
    backgroundColor: "{colors.maple-hover}"
  room-button-quiet:
    backgroundColor: "transparent"
    padding: "10px 20px"
    height: "48px"
  nav-link:
    textColor: "#f5f5f3"
    typography: "{typography.navigation}"
  view-control:
    textColor: "#f2f1ee"
    typography: "{typography.view-label}"
  view-control-active:
    textColor: "#fff"
  wordmark:
    textColor: "#f1f0e9"
    typography: "{typography.wordmark}"
  detail-card:
    backgroundColor: "{colors.dusk-snow}"
    textColor: "{colors.text-ink}"
  nav-panel:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.text-ink}"
    width: "min(460px, 92vw)"
---

# Design System: Sakura

## Overview

**Creative North Star: "Engawa, Teras Menghadap Lanskap"**

One supplied Japanese landscape is the page's visual anchor. Charred timber forms a narrow upper beam and a sightline rail; warm shoji paper closes the composition below the art. The interface stays sparse and contemplative, with Cormorant Garamond for its working type and Cantata One only for the wordmark.

Below the hero, the engawa continues as a sequence of rooms. Each room opens under a timber lintel and is built from the same materials: shoji paper, ivory, mist, sumi, or ink grounds; timber posts and frames; and the same painting cropped, magnified, recoloured, or sampled. Every room studies the one illustration, and none adds new imagery. Motion behaves like the house: doors slide, panels wipe like shoji, and focus settles slowly.

Product truth bounds the message: Sakura is a pause around the illustration, not a travel service. Keep prose in Indonesian and describe only what the illustration shows. The focus controls offer three viewpoints of the same image. The four-season room is an imagined recolouring, presented as interpretation. The surface targets desktop browsers; narrower widths fall back to a single column without overflow and get no extra features.

The user accepted the rendered hero. This extension's finish review returned a "fix" disposition, and all of its material fixes have shipped (removed eyebrow labels, night legibility on paper, title and lead spacing, lens readout contrast).

**Key Characteristics:**
- One supplied panorama is shown as a single, full-width view, and every room below works from that same painting.
- Dark timber frames the image, its rooms, and its controls; warm shoji paper carries reading surfaces.
- Maple red marks the main action and selected navigation or focus states.
- Depth comes from the image, raster materials, ink vignettes, and long soft drop shadows beneath framed panes.
- Motion is architectural: sliding doors, shoji wipes, and a slow 900ms focal settle, with a still path for reduced motion.

## Colors

The system is a warm-neutral house of ink, paper, and timber with one maple red voice. The core and role colors are custom properties in `src/styles/tokens.css`. The extended palette was sampled from the painting, so new surfaces stay inside the illustration's own color.

### Primary
- **Maple Red** (`maple`): The primary action plaque and the room buttons. Hover deepens to Maple Hover; press deepens to Maple Active.
- **Maple Rule** (`maple-rule`): Thin active rules and indicators, including the gliding rail bar, scroll-beam underline, lens crosshair, and finder marks.
- **Maple Deep** (`maple-deep`): Painting-sampled maple, used for journal accents.

### Neutral
- **Ink** (`ink`): The page background, frame, and the ink room.
- **Deep Ink** (`ink-900`): The ground behind framed art in the lens, seasons, and footer.
- **Sumi** (`sumi`): A violet-black sampled from the painting. It grounds the sumi rooms (lens and pause).
- **Warm Paper** (`paper`): The fallback color under the shoji paper texture, the paper rooms, the nav panel, and the doors.
- **Light Paper** (`paper-50`): The ivory room ground and journal surfaces.
- **Ivory** (`ivory`): Foreground on ink and sumi; the hero headline.
- **Mist** (`mist`) and **Dusk Snow** (`dusk-snow`): Painting-sampled pale grounds for the mist rooms and the shoji panes inside rooms.
- **Dusk Ash** (`dusk-ash`): Secondary labels on dark rooms, such as the lens readout.
- **Text Ink** (`text-ink`): Headings and copy on paper.
- **Rail Base** (`rail-base`): The timber fallback color under every raster timber plate, plus lintels, posts, and frame borders.
- **Focus Ring** (`focus-ring`) and **Selection** (`maple-selection`): Keyboard focus outlines and the text selection color.

Light tints on timber remain role tokens in `tokens.css`: the wordmark, timber links, rail labels, and the action label (`#f1f0e9`, `#f5f5f3`, `#f2f1ee`, `#f8f5f4`). `tokens.css` also declares sampled values that the Palette room shows as content but that are not applied as UI roles (sky white, rose mist, fuji grey, pagoda shadow, petal, `ink-700`, `ink-600`).

### Night
Night mode (`:root[data-mode="night"]`, `src/styles/night.css`) changes the light rooms to Night Paper (`night-paper`) with Night Text (`night-text`). Maple stays the action color. The hero receives a sumi wash, lit lanterns with a Lantern Glow (`night-glow`) drop shadow, and fireflies.

### Named Rules
**The Paper Stays Paper Rule.** At night, shoji surfaces (the hero shoji wall, detail cards, route panel, journal form and slips, haiku scroll, toast) keep their day paper and Text Ink. They read as lit from behind by an inset lantern glow (`inset 0 0 90px rgb(232 200 150 / 32%)`); they never turn dark or lose their text.

**The Painting's Own Colour Rule.** Before introducing a new hue, sample it from the painting and add it to the extended palette. Maple is the only saturated UI accent.

## Typography

**Display Font:** Cormorant Garamond (with Georgia, serif fallback)  
**Body Font:** Cormorant Garamond (with Georgia, serif fallback)  
**Label Font:** Cormorant Garamond (with Georgia, serif fallback)  
**Wordmark Font:** Cantata One (with Georgia, serif fallback)

Both families are imported locally through Fontsource in `src/main.jsx` (Cormorant Garamond 400, 500, and 600; Cantata One 400). Cormorant Garamond carries the whole hierarchy. Cantata One is reserved for the tracked SAKURA wordmark in the hero beam, the scroll beam, and the footer.

### Hierarchy
- **Display** (500, `4.035vw`, line-height `0.95`, `-0.01em`): The two-line hero headline. Its lines rise out of a mask on load.
- **Room title** (600, `clamp(44px, 4.2vw, 70px)`, line-height `0.96`, `-0.025em`): Each room's heading. It spans the left six of twelve columns.
- **Title** (600, `2.97vw`, line-height `1`, `-0.025em`): The hero shoji wall heading.
- **Lead** (400, `clamp(20px, 1.45vw, 24px)`, line-height `1.45`, max `52ch`): The room introduction, in the right six columns at 80% of the current color.
- **Body** (400, `clamp(18px, 1.2vw, 20px)`, line-height `1.45`): Card and panel copy, kept to about `34ch` to `70ch`.
- **Label** (400, `17px`): Help text, readout labels, and small field labels. These are sentence-case Cormorant, sometimes lightly tracked (`0.04em`).
- **Navigation** (500, `1.45vw`) and **View label** (500, `1.55vw`, `0.04em`): The hero beam links and the Cabang, Puncak, and Pagoda rail controls.
- **Action** (600, `1.55vw`): The hero action. Room buttons use 600 at `19px`.
- **Wordmark** (400, `1.89vw`, `0.3em`): SAKURA. The scroll beam uses `20px`.

### Named Rules
**The Heading Stands Alone Rule.** A room opens with its title and lead only. No eyebrow, kicker, or small-caps label sits above a heading.

**The One Family Rule.** Every working role is Cormorant Garamond. Cantata One appears only in the wordmark.

## Layout

The hero keeps the approved `1586 / 992` comp frame. Its regions are positioned by frame percentages in `src/styles/base.css`: the panorama starts at `5.85%` and is `72.18%` tall, the timber rail starts at `78.02%` and is `6.35%` tall, and the shoji wall starts at `84.38%`. The frame clips its contents.

Below the hero, every room uses the shared frame in `src/styles/room.css`. Content is capped at `content-max`, with side gutters set by `gutter` and vertical padding set by `room-pad`. A twelve-column head grid places the title in columns 1 to 6 and the lead in columns 7 to 12, with `head-gap` below it. Room bodies typically split the same twelve columns, such as a sticky six-column source image beside a six-column panel.

Rooms alternate grounds to pace the scroll. Detail, Finder, and Palette use paper; Route and Journal use ivory; Haiku and the sumi canvas use mist; Lens and Pause use sumi; Seasons uses ink. A fixed timber scroll beam (`60px`) slides down once the hero leaves the viewport. The Ruang dialog opens as a right-hand paper panel.

The surface targets desktop and is reviewed at 1280, 1440, 1586, and 1920 pixels wide. At `1100px` and below, the hero frame changes to vertical flow and room heads and bodies stack into one column. The hero's older `700px` and `360px` steps are still in the CSS. Smaller widths only need to avoid horizontal overflow.

Stacking uses named z-index tokens: art `1`, petals `2`, hero text and rail `3`, shoji `4`, beam `5`, scroll beam `50`, toast `80`, doors `90`, skip link `100`.

## Elevation & Depth

Depth is material first: the painting, the raster timber and paper plates, and ink gradients do most of the work. A soft ink scrim behind the hero headline and a focus vignette that dims the painting around the chosen view both carry depth. Framed panes then add one shadow family: long, soft drops with a negative spread, so the pane seems to hang a little off the wall. There are no hard or offset shadows.

### Shadow Vocabulary
- **Hanging pane** (`box-shadow: 0 30px 60px -32px rgb(21 22 25 / 55%)`): Framed art and panels in paper rooms (finder, palette, route). It ranges up to `0 34px 70px -40px` for the detail grid and sumi canvas.
- **Deep stage** (`box-shadow: 0 50px 90px -50px rgb(0 0 0 / 85%)`): Art stages on dark rooms (seasons). Lens and pause use `0 40px 80px` variants.
- **Lintel** (`box-shadow: 0 4px 10px -6px rgb(0 0 0 / 55%)`): The 16px timber lintel above each room. The scroll beam uses `0 10px 24px -14px rgb(0 0 0 / 70%)`.
- **Maple glow** (`box-shadow: 0 0 12px rgb(213 30 26 / 60%)`): The gliding rail indicator.
- **Lantern glow** (night only): An inset warm glow on paper surfaces, plus lantern drop shadows in the hero.
- **Headline contrast** (`text-shadow: 0 2px 6px rgb(15 16 19 / 55%), 0 6px 28px rgb(15 16 19 / 45%)`): The hero headline over the scrim.

The shoji maple shadow image still sits at the lower right of the hero wall (`opacity: 0.48`, `mix-blend-mode: multiply`, decorative, no pointer events).

### Named Rules
**The Hanging Pane Rule.** A pane earns a shadow only when it is framed in timber or paper. The shadow is always a long, soft drop with negative spread and is never offset sideways.

### Raster asset provenance

The unchanged user-supplied panorama is preserved at `assets/originals/sakura-landscape.jpg`. Seven responsive JPEG derivatives at 640, 960, 1280, 1536, 1920, 2880, and 3840 pixels are served from `public/images`. Each embeds an `impeccable:prompt` comment naming its source and resize quality. The original panorama plates keep their provenance comments, which name the public path used when those plates were created. The shipped 1280×853 maple-shadow PNG carries the approved plate's `impeccable:prompt` text, and the timber, lintel, post, and shoji paper plates keep their approved-comp sample provenance. `PRODUCT.md` records the original user-supplied artwork path.

## Shapes

Everything is square-edged. The source contains no `border-radius`. Form comes from joinery: 16px timber lintels, 14px timber posts and stiles between panes, 12px timber frame borders around art, and CSS kumiko lattices made from repeating linear gradients. Markers and lenses are square too, such as the square loupe ring on palette samples and the square lens with a timber border. The icon family follows the same geometry (`src/components/Icon.jsx`): inline SVG on a 24px grid, `1.5px` stroke, square caps, and mitred joins.

## Components

### Primary action
- **Shape:** A square-edged anchor styled as a button, `18.73%` by `6.05%` of the hero frame.
- **Color:** Maple with the action-text tint. Hover changes to Maple Hover with white text, and press to Maple Active, over `--dur-feedback` (140ms).
- **Focus:** The global `2px solid` Focus Ring outline with `4px` offset.
- **Destination:** `#panorama`.

### Room button
- **Shape:** Square, at least `48px` tall, `10px 20px` padding, and a `1px` border. Cormorant 600 at `19px`, with an optional 16px to 24px SVG icon and a `10px` gap.
- **Primary:** Maple fill. Hover uses Maple Hover and press uses Maple Active. `aria-pressed="true"` returns to the maple fill.
- **Quiet:** Transparent, with a border at 45% of the current color. Hover shows a maple border and a 10% maple wash. Disabled buttons use `0.45` opacity.

### Header navigation
- **Style:** Karya and Tentang are ivory Cormorant links on the charred timber beam, with a maple-red underline on Karya. A Ruang trigger opens the room dialog.

### Panorama focus rail
- **Style:** Three tracked text buttons on the timber rail. One maple indicator bar (`3px`, with a maple glow) glides between the three views over 900ms.
- **Interaction:** Cabang, Puncak, and Pagoda set the focus origin. The painting scales to `1.28` over `--dur-focal` with `--ease-out`, and a focus vignette fades in around the chosen origin. The shoji note re-writes itself through a view transition (out over 420ms, then a left-to-right clip reveal).
- **Responsive:** At `1100px` and below, the bar is replaced by a short rule under the pressed control.

### Shoji description
- **Style:** Warm paper texture, raster posts and lintel, an edge lattice, and the maple shadow image. A live Indonesian note describes the selected detail.

### Panorama detail cards
- **Style:** Three shoji panes between 14px timber posts, set on paper. Each pane shows a crop of the same painting (4:3, `300%` background size) above a body with a title and description.
- **State:** Hover or pressed zooms the crop to `340%` and lifts saturation. The pressed pane shows a 3px maple top rule. Selecting a pane sets the shared focus and returns to the panorama.

### Guided route
- **Style:** A paper panel on an ivory room. The crop changes through a shoji wipe (`clip-path` from the right, `--ease-slide`). There is a three-step progress list with `aria-current="step"` and a polite live status. The route stays optional and self-paced, and it stays synchronized with the panorama focus.

### Guided pause
- **Style:** A sumi room with the painting dimmed behind it and a large breathing shoji window. It runs three cycles of four seconds in and six seconds out, with a countdown timer and status cues. Reduced motion keeps the window still while the text carries the sequence.

### Lens (Lensa pandang)
- **Style:** A 16:9 painting inside a timber frame. A square magnifier with a 6px timber border has a kumiko crosshair in Maple Rule. The rest of the painting dims while the lens is active. Readout labels use Dusk Ash, and the readout stays hidden until there is something to read.

### Finder, Haiku, Seasons, Palette, Journal, Sumi canvas
- These rooms reuse the same room frame, title and lead, room buttons, timber frames, and hanging-pane shadows.
- **Seasons:** Changes each season with a shoji wipe (`1100ms`, `--ease-slide`) behind an ink veil. The caption sits at the lower left.
- **Palette:** Lands a square loupe marker where each sampled color came from.
- **Journal and Haiku:** Place paper slips and scrolls on light grounds.
- **Sumi canvas:** Offers ink chips and a toolbar of quiet buttons.

### Scroll beam and Ruang dialog
- **Scroll beam:** A fixed 60px timber beam with the Cantata wordmark and room links at 78% of the timber link tint. The current link gets a maple rule.
- **Ruang dialog:** A native `<dialog>` that slides in from the right over `--dur-focal` with `--ease-slide`. It is a paper panel with a 14px timber left edge and a 62% ink backdrop. Its links shift `8px` right and gain a light ivory wash on hover; the current room's label turns maple.

### Motion system
- **Tokens:** Easings `--ease-out`, `--ease-slide`, `--ease-settle`, and `--ease-in-out`; durations of 140ms for feedback, 240ms for state, 420ms for layout, 900ms for focal changes, and 1300ms for the doors.
- **Intro:** Two shoji doors with a kumiko lattice and a timber stile unlatch with a 4px nudge, then slide apart (1300ms, `--ease-slide`). The painting settles from `scale 1.06`, and the headline lines rise in sequence.
- **Day and night:** A circular `clip-path` wipe from the toggle (1000ms, `cubic-bezier(0.65, 0, 0.35, 1)`).
- **Ambient:** Canvas petals and fireflies, an ink stroke written by scroll, and lantern sway at night.
- **Reduced motion:** The doors become a 700ms paper veil fade. Transitions drop to `0.01ms`, the focus zoom and pane breathing stop, and lantern sway is off.

### Focus
- **Keyboard focus:** A `2px solid` Focus Ring outline with `4px` offset. Inside the clipped hero beam, the offset is `-4px`. Detail and route rooms use Maple Hover as the outline color. Forced-colors mode replaces the lintels with `CanvasText` and outlines pressed buttons with `Highlight`.

## Do's and Don'ts

### Do:
- **Do** use the responsive panorama JPEG set in `public/images` and preserve the unchanged user source at `assets/originals/sakura-landscape.jpg`.
- **Do** keep the timber textures on the top beam and view rail, and the shoji paper, posts, lintel, lattice, and maple shadow in the lower section.
- **Do** preserve the serif type roles, square-edged action, three view controls, keyboard focus outline, and reduced-motion behavior.
- **Do** keep the guided route optional, self-paced, and synchronized with the same three implemented panorama views.
- **Do** keep Indonesian copy limited to the visible illustration and confirmed product information.
- **Do** preserve the embedded provenance metadata when replacing or re-encoding the raster plates.
- **Do** open every new room with the shared room frame: timber lintel, `room-pad`, `gutter`, and a twelve-column title and lead head.
- **Do** build new rooms from the same painting and from colors sampled from it.
- **Do** use the motion tokens; move panels like shoji (`--ease-slide` wipes) and settle focus over `--dur-focal`; give every motion a reduced-motion path.
- **Do** keep paper surfaces as paper at night, lit by the lantern glow.

### Don't:
- **Don't** turn the illustration into a real-world destination, travel service, or booking offer; `PRODUCT.md` excludes those claims.
- **Don't** present the four seasons as fact; they are an imagined recolouring of the same painting.
- **Don't** introduce rounded corners or a radius scale; the house is square-edged joinery.
- **Don't** add panorama focus points or behavior beyond the three implemented views without updating the product and surface direction.
- **Don't** place eyebrow or kicker labels above room titles.
- **Don't** use hard or offset shadows; depth is long, soft, and hanging.
- **Don't** invert shoji paper surfaces to dark at night.
