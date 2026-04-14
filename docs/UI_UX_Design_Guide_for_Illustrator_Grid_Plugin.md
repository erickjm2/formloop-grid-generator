# UI/UX Design Guide for Illustrator Grid Plugin

**Authors:** Manus AI, Erick Melendez, and ChatGPT  
**Updated:** April 14, 2026

## 1. Overview

This document defines the visual and interaction direction for the first plugin version of **Formloop Grid & Margin Generator**.

The goal is to evolve the original Illustrator script into a clearer, faster, more polished panel without expanding it into a full layout system.

This version should focus on core grid-building workflows:
- margins
- columns
- rows
- baseline grid
- presets
- safer guide regeneration

The plugin should reflect **Formloop design principles, color, and type**, but it should **not** include the Formloop zone system as a product feature at this stage.

## 2. Product Naming

- **Product name:** Formloop Grid & Margin Generator
- **Panel title:** Grid Tool

The longer name preserves continuity with the existing script. The shorter panel title keeps the interface clean.

## 3. Product Principles

The plugin should feel:
- calm
- confident
- helpful
- minimal
- design-led
- systematic without feeling rigid

The plugin should feel like a thoughtful design utility. It should not feel like a generic startup dashboard or a lifestyle product UI.

## 4. v1 Scope

### Included in v1
- Auto-Detect mode
- Custom mode
- linked and unlinked margins
- column count and gutter
- row count and gutter
- baseline step
- toggle controls for margins, columns, rows, and baseline
- save preset
- load preset
- delete preset
- Apply Grid
- safe regeneration of plugin-owned guides
- optional debounced live preview
- scope selector for Active Artboard or All Artboards

### Deferred for later
- zone overlays
- safe-area overlays
- template overlays
- composition guidance
- content-aware layout logic
- brand-specific layout zones inside the tool

## 5. Visual Design Direction

The plugin should use Formloop’s visual language.

It should feel clean, spacious, and intentional. Accent color should be used sparingly. The interface should rely on alignment, spacing, and typography more than visual effects.

### Do
- use clear section grouping
- use restrained color
- keep text left-aligned
- make controls easy to scan
- preserve negative space

### Do not
- overuse bright blue
- use heavy shadows
- over-round every element
- make the panel feel like a mobile finance app
- add decorative UI elements that do not improve clarity

## 6. Design Tokens

### 6.1 Color System

Use the Formloop brand palette as the base.

| Token | Value | Usage |
|---|---:|---|
| `--bg-app` | `#F5F8FC` | Main panel background |
| `--bg-section` | `#E6ECF4` | Grouped surface, subtle section fill |
| `--text-primary` | `#070C14` | Primary text |
| `--text-secondary` | `rgba(7,12,20,0.65)` | Labels, helper text |
| `--border-soft` | `rgba(7,12,20,0.12)` | Input borders, dividers |
| `--accent-primary` | `#003AAA` | Primary action, active state |
| `--accent-strong` | `#0057FF` | Focus ring, active drag, stronger highlight |
| `--success` | `#66FF86` | Success feedback, optional validation |
| `--highlight` | `#FFFF53` | Rare callout use only |
| `--deep-accent` | `#002366` | Pressed state or deep accent use |

### 6.2 Color Rules

- Default surfaces should remain light.
- Obsidian should carry most text.
- Cobalt should be the main action color.
- Electric Blue should be used sparingly for focus or stronger active moments.
- Sea Green and Lemon should only appear where they communicate something useful.
- Accent colors should not dominate the whole panel.

## 7. Typography

### 7.1 Typeface

Use **Inter** throughout the plugin.

### 7.2 Type Scale

| Role | Size | Weight | Notes |
|---|---:|---:|---|
| Panel title | 18px | 600 | Main title |
| Section title | 14px | 600 | Section headers |
| Body / labels | 13px | 400 or 500 | Main UI text |
| Secondary labels | 12px | 400 | Supporting labels |
| Small helper text | 11px | 400 | Hint text only |

### 7.3 Type Rules

- Keep type left-aligned.
- Do not rely on many font weights.
- Use spacing and hierarchy before adding visual noise.
- Avoid overly light gray text that hurts legibility.

## 8. Spacing and Shape

### 8.1 Spacing Scale

Use an 8px base system.

| Token | Value |
|---|---:|
| xs | 4px |
| sm | 8px |
| md | 16px |
| lg | 24px |
| xl | 32px |

### 8.2 Radius

| Element | Radius |
|---|---:|
| Main panel corners | 20px |
| Section cards / grouped areas | 14px |
| Input fields | 12px |
| Buttons | 14px |
| Small icon buttons | 12px |

The UI should feel soft but controlled. Avoid oversized rounding.

### 8.3 Shadows

Keep shadows very subtle or omit them entirely.

Hierarchy should come mainly from:
- spacing
- grouping
- contrast
- size

## 9. Panel Structure

The main panel should follow this order:

1. Header
2. Mode toggle
3. Margins
4. Columns
5. Rows
6. Baseline Grid
7. Presets
8. Scope
9. Footer actions

### 9.1 Header

- Panel title: **Grid Tool**
- Small close icon only if required by host context
- No large decorative branding block

### 9.2 Mode Toggle

Use a two-option segmented control:
- Auto-Detect
- Custom

Auto-Detect should surface suggested values but still show the full structure.

### 9.3 Margins Section

Controls:
- Top
- Right
- Bottom
- Left
- link / unlink control

Behavior:
- When linked, editing one value updates all margin values.
- When unlinked, each field behaves independently.

### 9.4 Columns Section

Controls:
- Count
- Gutter

Preferred control model:
- numeric input + slider

### 9.5 Rows Section

Controls:
- Count
- Gutter

Rows are part of the product now. They should not be labeled as a new feature in shipping UI.

### 9.6 Baseline Grid Section

Controls:
- Step
- optional baseline toggle if needed

If “Snap to Baseline” is not fully implemented, do not show it in v1.

### 9.7 Presets Section

Controls:
- Save Preset
- Load Preset
- Delete Preset inside preset modal

Presets should feel integrated into the panel, not like detached utilities.

### 9.8 Scope Section

Controls:
- Active Artboard
- All Artboards

This should be lightweight and easy to understand.

### 9.9 Footer Actions

Actions:
- Cancel or Reset Preview
- Apply Grid

Apply Grid is the primary CTA.

## 10. Component Guidance

### 10.1 Primary Button

Use for **Apply Grid**.

- Fill: Cobalt
- Text: White Smoke or white
- Height: 44px minimum
- Full width when placed at footer
- Hover / pressed state should deepen, not glow excessively

### 10.2 Secondary Buttons

Use for preset utilities and lower-priority actions.

- light surface fill
- Obsidian text
- clear border
- less visual weight than primary CTA

### 10.3 Inputs

- light background
- soft border
- clear focus state using Electric Blue or a subtle cobalt ring
- numeric formatting should be easy to read
- units should be visually secondary to the value

### 10.4 Sliders

- thin active track in Cobalt
- soft inactive track
- round thumb with restrained size
- should feel precise, not oversized

### 10.5 Icons

Use clean outlined icons.

Guidance:
- 2px stroke weight
- rounded joins where appropriate
- default color: Obsidian or subdued Obsidian tint
- active color: Cobalt

Icons should support the interface, not become decoration.

## 11. Preset Modal Guidance

The preset modal is worth keeping in v1.

Structure:
- header
- Built-in Presets
- Custom Presets
- footer actions

Built-in presets for v1 should stay generic and useful:
- Mobile
- Tablet
- Desktop
- Square
- Banner
- A4

Do not bake Formloop marketing layout logic into preset behavior yet.

Each preset card should show:
- preset name
- column count
- row count if applicable
- gutter
- margin model or unit context

## 12. Interaction Rules

### 12.1 Auto-Detect Mode

- shows suggested values
- keeps the interface readable
- does not hide the structure of the panel

### 12.2 Custom Mode

- enables manual editing of all relevant controls
- keeps linked margin logic clear
- updates live preview if enabled

### 12.3 Live Preview

If included in v1:
- debounce redraws
- only update plugin-owned guides
- keep redraw behavior fast and reversible

If performance becomes a problem, preview can be made optional.

### 12.4 Presets

Saving a preset should store:
- mode
- margin values
- linked state
- column count
- column gutter
- row count
- row gutter
- baseline step
- enabled elements
- scope if desired

## 13. Accessibility and Clarity

- All controls should be keyboard accessible.
- Labels should always be visible.
- Focus states should be obvious.
- Contrast should stay strong.
- Avoid tiny gray helper text as the main way to communicate meaning.

## 14. Copy Style

UI copy should follow Formloop tone:
- direct
- helpful
- minimal
- non-technical when possible

Examples:
- “Apply Grid”
- “Save Preset”
- “Load Preset”
- “Link Margins”
- “All Artboards”

Avoid overexplaining inside the interface.

## 15. Summary

The v1 plugin should be a focused evolution of the original script.

It should improve:
- usability
- persistence
- clarity
- safety
- visual polish

It should do that while staying intentionally narrow in scope.

The tool should look and feel like Formloop, but it should remain a grid tool first.
