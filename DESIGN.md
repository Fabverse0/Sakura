---
name: Sakura
description: A contemplative pause framed by timber, shoji paper, and one landscape.
colors:
  ink: "#151619"
  paper: "#ede8e3"
  maple: "#bf1818"
  ivory: "#f2eee7"
typography:
  display:
    fontFamily: '"Cormorant Garamond", Georgia, serif'
    fontSize: "4.035vw"
    fontWeight: 500
    lineHeight: 0.86
    letterSpacing: "-0.01em"
  title:
    fontFamily: '"Cormorant Garamond", Georgia, serif'
    fontSize: "2.97vw"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.025em"
  body:
    fontFamily: '"Cormorant Garamond", Georgia, serif'
    fontSize: "1.32vw"
    fontWeight: 400
    lineHeight: 1.18
  navigation:
    fontFamily: '"Cormorant Garamond", Georgia, serif'
    fontSize: "1.45vw"
    fontWeight: 500
    lineHeight: 1
  view-label:
    fontFamily: '"Cormorant Garamond", Georgia, serif'
    fontSize: "1.15vw"
    fontWeight: 500
    lineHeight: 1
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
components:
  button-primary:
    backgroundColor: "{colors.maple}"
    textColor: "#f8f5f4"
    typography: "{typography.action}"
    width: "18.73%"
    height: "6.05%"
  button-primary-hover:
    backgroundColor: "#a91616"
    textColor: "#fff"
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
---

# Design System: Sakura

## Overview

**Creative North Star: "Engawa, Teras Menghadap Lanskap"**

One supplied Japanese landscape is the page's visual anchor. Charred timber forms a narrow upper beam and a sightline rail; warm shoji paper closes the composition below the art. The interface stays sparse and contemplative, with Cormorant Garamond for its working type and Cantata One only for the wordmark.

Product truth bounds the message: Sakura is a pause around the illustration, not a travel service. Keep prose in Indonesian and describe only what the illustration shows. The focus controls offer three viewpoints of the same image.

**Key Characteristics:**
- One supplied panorama is shown as a single, full-width view.
- Dark timber textures frame the image; a warm paper texture carries the closing description.
- Maple red marks the main action and selected navigation or focus states.
- The visual depth comes from the image, raster materials, and one soft maple shadow on the shoji field.

## Colors

The four reusable CSS custom properties are ink, warm paper, maple red, and ivory. Material texture and much of the illustration's color come from the placed raster assets.

### Primary
- **Maple Red** (`#bf1818`): The primary action plaque.

### Neutral
- **Ink** (`#151619`): The page background and frame.
- **Warm Paper** (`#ede8e3`): The fallback color beneath the shoji paper texture.
- **Ivory** (`#f2eee7`): The global foreground and hero headline.
- **Text Ink** (`#141211`): The shoji heading and description.

Supporting colors remain literal values in `src/styles.css`: the rail base is `#1a1817`; the action hover is `#a91616`; active rules use `#d51e1a`; keyboard focus uses `#e03a32`; and selection uses `#9f1717`. The wordmark, header links, action label, and rail labels use `#f1f0e9`, `#f5f5f3`, `#f8f5f4`, and `#f2f1ee` respectively.

## Typography

**Display Font:** Cormorant Garamond (with Georgia, serif fallback)  
**Body Font:** Cormorant Garamond (with Georgia, serif fallback)  
**Label Font:** Cormorant Garamond (with Georgia, serif fallback)  
**Wordmark Font:** Cantata One (with Georgia, serif fallback)

Both families are imported locally through Fontsource in `src/main.jsx`. The global fallback is Georgia, Times New Roman, serif. Cormorant Garamond carries the display, body, navigation, and control hierarchy; Cantata One is reserved for the tracked SAKURA wordmark.

### Hierarchy
- **Display** (500, `4.035vw`, line-height `0.86`, letter-spacing `-0.01em`): The two-line hero headline. It changes to `clamp(48px, 6.8vw, 76px)` at `1100px`, `clamp(34px, 9.6vw, 44px)` at `700px`, and `30px` at `360px`.
- **Title** (600, `2.97vw`, line-height `1`, letter-spacing `-0.025em`): The shoji section heading. At `1100px` it uses `clamp(36px, 4.4vw, 52px)`; at `700px`, `clamp(34px, 9vw, 40px)`.
- **Body** (400, `1.32vw`, line-height `1.18`): The visible-scene description. It becomes `clamp(18px, 1.8vw, 21px)` at `1100px` and `18px` at `700px`.
- **Navigation** (500, `1.45vw`, line-height `1`): The desktop header links; responsive sizes are defined at the breakpoints below.
- **View labels** (500, `1.15vw`, line-height `1`): The Cabang, Puncak, and Pagoda controls.
- **Action** (600, `1.55vw`, line-height `1`): The primary action label.
- **Wordmark** (400, `1.89vw`, line-height `1`, letter-spacing `0.3em`): The SAKURA mark.

## Layout

At desktop widths, `.comp-frame` keeps the approved `1586 / 992` aspect ratio. The panorama starts at `5.85%` of the frame and fills its width at `72.18%` height. The timber focus rail starts at `78.02%` and is `6.35%` tall; the shoji section starts at `84.38%`. The art uses `object-fit: cover`. The frame clips its contents and prevents horizontal overflow.

At `1100px` and below, the frame becomes a vertical flex layout. The header, hero, focus rail, and shoji section return to normal flow; the rail becomes a three-column grid, and the shoji text becomes responsive document flow. At `700px` and below, the header and section spacing tighten, the hero height follows `clamp(320px, 92vw, 400px)`, and the paragraph uses a single flowing line block. At `360px` and below, the headline receives a narrower inset and a fixed `30px` size.

The source has no spacing scale. It uses frame percentages, viewport units, pixel values, and `clamp()` values directly. The page minimum width is `320px`.

## Elevation & Depth

There are no box shadows. Depth is carried by the panorama, the repeated timber and paper textures, the layered shoji parts, and the decorative maple shadow image. The hero headline uses `text-shadow: 0 2px 8px rgb(17 12 10 / 28%)`; rail labels use `text-shadow: 0 1px 3px rgb(0 0 0 / 55%)` for contrast.

The shoji maple shadow is positioned at the lower right, at `32%` width on desktop, with `opacity: 0.48` and `mix-blend-mode: multiply`. At `1100px` it grows to `52%` width, is capped at `72%` height, and uses `object-fit: contain`. The served 1280×853 PNG preserves the approved plate's transparency and prompt metadata. It is decorative, has empty alternative text, and does not receive pointer events.

### Raster asset provenance

The unchanged user-supplied panorama is preserved at `assets/originals/sakura-landscape.jpg`. Seven responsive JPEG derivatives at 640, 960, 1280, 1536, 1920, 2880, and 3840 pixels are served from `public/images`; each embeds an `impeccable:prompt` comment naming its source and resize quality. The original panorama plates retain their provenance comments, which name the public path used when those plates were created. The shipped 1280×853 maple-shadow PNG carries the approved plate's `impeccable:prompt` text; the timber and shoji material plates keep their approved-comp sample provenance. `PRODUCT.md` records the original user-supplied artwork path.

## Shapes

The composition uses square-edged rectangular regions. No border-radius scale or border-radius declarations are present. The shoji lattice is generated from two repeating linear gradients; its desktop cells are `40px` with `3px` bars, then use a responsive `18px` to `40px` cell and `2px` bars at `1100px` and below. The raster posts, lintel, and edge lattice form the shoji frame.

## Components

### Primary action
- **Shape:** Square-edged rectangular anchor styled as a button.
- **Primary:** Maple red (`#bf1818`) with `#f8f5f4` text; desktop size is `18.73%` by `6.05%` of the hero frame.
- **Hover / Focus:** Hover changes the background to `#a91616` and text to white over `180ms ease`. `:focus-visible` uses the global `2px solid #e03a32` outline with `4px` offset.
- **Responsive:** At `1100px`, the action is at least `220px` by `54px` with `24px` horizontal padding. At `700px`, it is at least `190px` by `48px` with `18px` horizontal padding.
- **Destination:** `#panorama`.

### Header navigation
- **Style:** Karya and Tentang are ivory Cormorant Garamond links on the repeated charred timber beam. Hover changes the text to white.
- **Active:** Karya has a maple-red underline, `0.32vh` tall on desktop and `2px` at `1100px` and below.
- **Responsive:** The links become a flex row at `1100px`; the header height and link gaps tighten at `700px`.

### Panorama focus rail
- **Style:** Three text buttons on the repeated timber rail, with transparent backgrounds and no border. The rail labels use the Cormorant Garamond label style.
- **State:** The selected control has white text and a short `1px` maple-red rule. Buttons expose their state through `aria-pressed`.
- **Interaction:** Cabang, Puncak, and Pagoda select image origins `17% 52%`, `52% 40%`, and `72% 57%`. The image scales to `1.12` and transitions its transform over `900ms cubic-bezier(0.16, 1, 0.3, 1)`. The selected view updates the shoji note and the matching detail card. At `700px` and below, `object-position` also follows the selected origin.
- **Responsive:** The rail changes from absolutely positioned controls to a three-column grid at `1100px`.

### Shoji description
- **Style:** A warm paper texture sits behind the heading and a live Indonesian note describing the selected detail. The section uses raster timber for its posts and lintel, a CSS lattice at the edges, and the maple shadow image at the lower right.
- **Typography:** The heading uses the title role; the paragraph uses the body role and becomes a single flowing block on smaller screens.

### Panorama detail cards
- **Style:** Three square-edged paper buttons describe the visible Cabang, Puncak, and Pagoda details below the panorama.
- **Interaction:** Selecting a card updates the shared focus state, marks the matching rail control and card with `aria-pressed`, then returns the visitor to the panorama.
- **Responsive:** Cards form a three-column row on wide screens and adapt to narrower widths without horizontal overflow.

### Guided pause
- **Style:** A dark ink section follows the panorama details. Its shoji pane and large timer keep the optional 30-second pause visually tied to the artwork.
- **Interaction:** Visitors start three cycles of four seconds inhaling and six seconds exhaling. The timer counts down, the status text gives each cue, the pane expands and contracts, and an end action remains available throughout.
- **Reduced motion:** The pane stays still while the status text and timer continue to communicate the sequence.
- **Responsive:** Text and controls use two columns on wide screens and stack on small screens.

### Focus and motion
- **Keyboard focus:** All links and buttons use the global `2px solid #e03a32` focus-visible outline with `4px` offset.
- **Reduced motion:** `prefers-reduced-motion: reduce` disables smooth scrolling, sets transitions to `0.01ms`, and keeps the breathing pane static.

## Do's and Don'ts

### Do:
- **Do** use the responsive panorama JPEG set in `public/images` and preserve the unchanged user source at `assets/originals/sakura-landscape.jpg`.
- **Do** keep the timber textures on the top beam and view rail, and the shoji paper, posts, lintel, lattice, and maple shadow in the lower section.
- **Do** preserve the serif type roles, square-edged action, three view controls, keyboard focus outline, and reduced-motion behavior.
- **Do** keep Indonesian copy limited to the visible illustration and confirmed product information.
- **Do** preserve the embedded provenance metadata when replacing or re-encoding the raster plates.

### Don't:
- **Don't** turn the illustration into a real-world destination, travel service, or booking offer; `PRODUCT.md` excludes those claims.
- **Don't** invent spacing or radius scales; neither is defined in the source stylesheet.
- **Don't** add panorama focus points or behavior beyond the three implemented views without updating the product and surface direction.
