---
name: NutraLens
colors:
  surface: '#f2fcf5'
  surface-dim: '#d2dcd6'
  surface-bright: '#f2fcf5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#ecf6ef'
  surface-container: '#e6f0e9'
  surface-container-high: '#e0ebe4'
  surface-container-highest: '#dbe5de'
  on-surface: '#141d1a'
  on-surface-variant: '#3f4943'
  inverse-surface: '#29322e'
  inverse-on-surface: '#e9f3ec'
  outline: '#6f7a73'
  outline-variant: '#bec9c1'
  surface-tint: '#176b4d'
  primary: '#005138'
  on-primary: '#ffffff'
  primary-container: '#176b4d'
  on-primary-container: '#9ae9c3'
  inverse-primary: '#89d6b1'
  secondary: '#52625c'
  on-secondary: '#ffffff'
  secondary-container: '#d5e7df'
  on-secondary-container: '#576862'
  tertiary: '#1c503d'
  on-tertiary: '#ffffff'
  tertiary-container: '#366854'
  on-tertiary-container: '#afe5cb'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a4f3cc'
  primary-fixed-dim: '#89d6b1'
  on-primary-fixed: '#002114'
  on-primary-fixed-variant: '#005138'
  secondary-fixed: '#d5e7df'
  secondary-fixed-dim: '#b9cac3'
  on-secondary-fixed: '#0f1e1a'
  on-secondary-fixed-variant: '#3a4a44'
  tertiary-fixed: '#b8eed5'
  tertiary-fixed-dim: '#9dd2b9'
  on-tertiary-fixed: '#002116'
  on-tertiary-fixed-variant: '#1c4f3d'
  background: '#f2fcf5'
  on-background: '#141d1a'
  surface-variant: '#dbe5de'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  title-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: -0.005em
  title-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.02em
  data-mono:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system establishes a neutral, transparent utility for exploring packaged food data. It deliberately eschews the gamified, prescriptive aesthetics of fitness trackers, medical diagnostic tools, and diet coaching applications. There are no arbitrary "health scores," moralizing badges ("guilt-free", "cheat day"), or bright warning systems indicating "bad" foods. Instead, the interface operates with the quiet confidence of an archival reference tool: objective, organized, and scientifically grounded.

The visual direction merges **Minimalism** with subtle **Tactile Tiers**:
- **Objective Clarity:** Data points are rendered with structured legibility. Missing values are declared transparently (`N/A`) rather than hidden or approximated.
- **Natural Modernism:** A restrained palette of botanical greens and mineral tones anchors the experience, avoiding clinical sterile whites and loud synthetic hues.
- **Utility-First Flow:** High contrast, frictionless scanning, ergonomic bottom-sheet product cards, and rapid information discovery optimized for one-handed in-aisle mobile use.

## Colors

The palette is engineered to present pure nutritional and ingredient data without emotional bias. Neutral tones form the dominant canvas, supported by botanical greens that establish authority and trust.

### Primary Palette
- **Primary Brand (`#176B4D`):** Applied to primary actions, interactive iconography, focused states, and key data emphasis points.
- **Primary Dark (`#0F4533`):** Reserved for high-priority headings, brand marks, and prominent product classifications requiring maximum contrast against light surfaces.
- **Secondary Light Green (`#DDEFE7`):** Non-intrusive container fill for data pills, status chips, selected filters, and active tab indicators.

### Surfaces & Neutrals
- **Background (`#F7F9F6`):** A soft, natural mineral off-white canvas that reduces eye strain in harsh retail lighting.
- **Surface / Card (`#FFFFFF`):** Pure white container surfaces that elevate structured tables, cards, and bottom sheets above the canvas.
- **Border (`#E1E7E3`):** Subtle structural dividers and component perimeters maintaining clean definition without heavy visual weight.
- **Text Primary (`#17201C`):** High-contrast deep slate for body copy, table labels, and values.
- **Text Secondary (`#65736D`):** Balanced secondary gray-green for metadata, serving sizes, and subtext.
- **Text Muted (`#98A39E`):** Low-emphasis label markers, inactive states, and explicit empty data indicators (`N/A`).

### Functional Alerts (Restrained)
- **Warning / Info (`#D9822B`):** Muted amber, utilized solely for informational notices (e.g., allergens present, unverified crowdsourced data) without alarming the user.
- **Error / Scanner Alert (`#C94A4A`):** Low-saturation red, strictly restricted to system-level issues (barcode unreadable, camera permission denied, product not found in database). Never used to flag nutritional content.

## Typography

Inter provides systematic, mechanical neutrality across the entire mobile application. Tabular lining numbers (`font-variant-numeric: tabular-nums`) must be enabled across all nutritional tables, barcodes, and metric outputs to maintain strict columnar vertical alignment.

### Typographic Hierarchy
- **Headline Large (`28px/36px, Bold`):** Reserved for product names inside modal bottom sheets and view titles.
- **Headline Medium / Small (`22px` & `18px`, Semi-Bold):** Used for categorical section titles (e.g., "Nutritional Facts per 100g", "Ingredients List", "Packaging & Certifications").
- **Title Medium / Small (`16px` & `14px`, Semi-Bold):** Applied to table grouping labels, interactive row headers, and modal drawer controls.
- **Body Large / Medium (`16px` & `14px`, Regular):** Dedicated to running narrative text, ingredient sentences, and manufacturer descriptions.
- **Data / Label Medium (`11-13px`, Medium/Semi-Bold):** Used for badge tags, macro pills, table headers, and metadata chips.
- **Data Mono (`14px`, Medium):** Used specifically for raw numeric values, measurement units (`g`, `mg`, `kcal`), and barcode serial digits.

## Layout & Spacing

The layout is built on a rigid 8-point spatial rhythm (`8px`, `16px`, `24px`, `32px`, `40px`, `48px`), supplemented by an explicit `4px` sub-step for compact metadata tags and inline data chips.

### Mobile Viewport Structure (React Native / Expo)
- **Screen Margins:** Fixed `16px` (`margin`) safe margin along left and right view edges for mobile handheld contexts. Expands to `24px` on tablet viewports.
- **Component Gap Rhythms:**
  - `space-xs` (4px): Gap between micro badges, icon-to-text inline locks.
  - `space-sm` (8px): Spacing within stacked list items, row content padding, and badge margins.
  - `space-md` (16px): Default padding inside cards, sheets, and between discrete form controls.
  - `space-lg` (24px): Vertical spacing between independent SectionCards and category clusters.
  - `space-xl` (32px): Major vertical separations between screen header blocks and dynamic content tiers.
- **Ergonomic Safe Zones:** Primary scan triggers and persistent actions sit within a 64px thumb-accessible zone from the bottom display inset.

## Elevation & Depth

This design system avoids theatrical 3D drops, skeuomorphic bevels, and heavy blurred shadows. Depth is communicated primarily through structural surface contrast and crisp 1px borders, complemented by soft ambient diffusion on floating components.

- **Level 0 (Flat / Canvas):** Surface color `#F7F9F6`. No border, no shadow. Hosts background scroll regions and scanner framing underlays.
- **Level 1 (Card & Section):** Surface color `#FFFFFF`. Contained with a solid `1px` border (`#E1E7E3`). Zero shadow offset in default state; utilizes subtle border contrast to establish boundaries against the warm `#F7F9F6` canvas.
- **Level 2 (Floating Controls & Bottom Sheets):** Surface color `#FFFFFF` with border `#E1E7E3`. Ambient shadow defined by `0px 4px 16px rgba(23, 32, 28, 0.06)`. Used for bottom sheets presenting product sheets, floating scan triggers, and contextual search bars.
- **Scanner Viewport Layer:** Fullscreen camera feed darkened by an ambient overlay (`rgba(15, 69, 51, 0.45)`) punctuated by an unmasked, clean viewport cutout with precise focus bounds.

## Shapes

Shapes communicate approachable utility with precise, calculated geometry. All corner radiuses scale consistently across component classifications:

- **Interactive Inputs & Controls (10px - 12px):** Search fields, secondary action toggles, and barcode manual entry inputs utilize a clean `10px` or `12px` radius.
- **Buttons (14px - 16px):** Primary and secondary action buttons feature a uniform `14px` (compact) or `16px` (full-height) corner radius.
- **Cards & Data Tables (16px):** Standard content modules, nutritional overview blocks, and ingredient list containers use a structured `16px` radius.
- **Surfaces, Modals & Floating Drawers (20px - 24px):** Product detail bottom sheets and camera viewport cards employ a deep `20px` to `24px` radius along top apex curves.
- **Status Badges & Pills (9999px):** Nutritional badges, allergen indicators, and metric tags use fully circular pill geometry.

## Components

### 1. Logo & Brand Mark (NutraLens)
- **Structure:** A hybrid icon featuring an abstract organic leaf contour seamlessly intersecting a geometric camera lens aperture or scanning bracket.
- **Palette:** Leaf apex rendered in `#176B4D`, lens/scan arc in `#0F4533`.
- **Display Rules:** Paired horizontally with the "NutraLens" wordmark set in Inter Semi-Bold (`headline-sm`). Displayed as an unobtrusive top navigation centerpoint or header.

### 2. Camera Scanner Viewport
- **Container:** Fullscreen native camera feed (`Expo-Camera` / `VisionCamera`) layered beneath a translucent dark forest mask (`rgba(15, 69, 51, 0.5)`).
- **Scan Box:** Centered 280px × 180px landscape cutout with rounded corners (`16px`). Transparent aperture bordered by a 2px stroke in `#FFFFFF` with reinforced 4px corner accents in `#176B4D`.
- **Scanline:** A subtle, continuous 1.5px horizontal beam (`#176B4D` with soft gradient falloff) animating vertically between the scan box margins.
- **Controls:** Floating torch toggle and manual barcode entry icon positioned 32px below the scan box in circular 48px translucent glass containers (`rgba(255, 255, 255, 0.2)` with `#FFFFFF` icons).

### 3. Product Header Card
- **Layout:** Contained within a Level 1 `#FFFFFF` surface card (`16px` radius).
- **Structure:** 
  - Top: Brand name in `label-lg` uppercase (`#65736D`), followed immediately by Product Title in `headline-md` (`#0F4533`).
  - Middle: Barcode number rendered in `data-mono` (`#98A39E`) with a copy-to-clipboard micro action.
  - Bottom: Horizontal pill array displaying packaging format, quantity (e.g., "500g / 17.6 oz"), and country of origin.

### 4. InformationRow (Data Key | Value)
- **Layout:** Full-width flex row, min-height 44px, padding `8px 0px`. Separated by a 1px border (`#E1E7E3`).
- **Left Column (Label):** `body-md` in `#17201C`. Subordinate units or serving references set in `body-sm` (`#65736D`).
- **Right Column (Value):** `data-mono` in `#17201C` (Semi-Bold).
- **Missing Data Treatment ('N/A'):** When data is absent from Open Food Facts, render value strictly as `"N/A"` in `label-md` uppercase, colored with `#98A39E`, wrapped in an ultra-subtle borderless pill (`#F7F9F6`). Never leave the row blank and never display `"0g"` for unknown metrics.

### 5. SectionCard
- **Layout:** Surface `#FFFFFF`, border 1px `#E1E7E3`, radius `16px`, padding `16px`.
- **Header:** Contains a category icon (20px, `#176B4D`), Section Title (`headline-sm`, `#0F4533`), and an optional right-aligned metadata toggle (e.g., "Per 100g / Per Serving").
- **Content:** Hosts vertical sequences of `InformationRow` items or paragraph blocks for raw ingredient lists with highlighted potential allergens (underlined with a 1px dotted `#D9822B` stroke).

### 6. Action Buttons
- **Primary Button:** Height 52px, background `#176B4D`, label `#FFFFFF` (`title-md`), corner radius `16px`. Active press state dims to `#0F4533`.
- **Secondary Button:** Height 52px, background `#DDEFE7`, label `#176B4D` (`title-md`), corner radius `16px`. Active press state scales to `rgba(221, 239, 231, 0.7)`.
- **Ghost / Utility Button:** Height 44px, transparent background, 1px border `#E1E7E3`, label `#17201C` (`body-md`), corner radius `12px`.

### 7. StatusBadge & Pills
- **Neutral Data Pill:** Height 24px, background `#F7F9F6`, border 1px `#E1E7E3`, text `#65736D` (`label-md`), radius `9999px`.
- **Accent Attribute Pill:** Height 24px, background `#DDEFE7`, text `#176B4D` (`label-md`, Semi-Bold), radius `9999px`.
- **Informational Alert Badge:** Height 26px, background `rgba(217, 130, 43, 0.12)`, border 1px `rgba(217, 130, 43, 0.25)`, text `#D9822B` (`label-md`), radius `9999px`.
- **System Error Badge:** Height 26px, background `rgba(201, 74, 74, 0.1)`, border 1px `rgba(201, 74, 74, 0.2)`, text `#C94A4A` (`label-md`), radius `9999px`.