# Technical Specification and UI Blueprint for Illustrator Grid Plugin

**Authors:** Manus AI, Erick Melendez, and ChatGPT  
**Updated:** April 14, 2026

## 1. Overview

This document defines the technical direction for evolving the original Illustrator script into the first plugin version of **Formloop Grid & Margin Generator**.

The goal for v1 is to create a simpler but meaningful upgrade.

The plugin should:
- preserve the utility of the original script
- improve the workflow through a persistent panel
- add presets and safer regeneration behavior
- adopt Formloop visual language and interaction principles
- stay focused on grid generation only

This version should **not** expand into a larger Formloop layout system feature set.

## 2. Product Definition

### Product name
**Formloop Grid & Margin Generator**

### Panel title
**Grid Tool**

### v1 Product Scope
The plugin is a grid-building utility for Illustrator.

It is responsible for:
- margins
- columns
- rows
- baseline grid
- presets
- plugin-owned guide redraw

It is not responsible for:
- content zones
- safe-area systems
- layout templates
- composition logic
- content-aware design suggestions

## 3. Current Script Summary

The original script already handles:
- document-open validation
- auto or custom settings
- margins
- columns
- baseline grid
- guide creation on a dedicated layer
- regeneration across artboards

The current weaknesses are:
- destructive guide workflow
- no persistent UI
- no presets
- basic auto-detect logic
- no rows
- no scope control beyond all artboards

## 4. v1 Feature Set

### Core features
- Auto-Detect mode
- Custom mode
- linked and unlinked margin controls
- column count and gutter
- row count and gutter
- baseline step
- include / exclude toggles for margins, columns, rows, baseline
- Save Preset
- Load Preset
- Delete Preset
- Apply Grid
- scope selector: Active Artboard or All Artboards

### Nice to have for v1
- debounced live preview
- remember last used settings
- unit-aware preset display

### Deferred
- named zones
- safe-area overlays
- content templates
- advanced responsive layout logic
- brand-specific layout behavior inside the product

## 5. Technical Architecture

### 5.1 General Approach

Use a panel-based architecture with a clear split between:
- UI layer
- state and preset layer
- Illustrator execution layer

The exact Adobe runtime should be verified before implementation is locked. Regardless of runtime choice, the system should preserve this separation.

### 5.2 Recommended File Structure

```text
formloop-grid-generator/
  README.md
  docs/
    UI_UX_Design_Guide_for_Illustrator_Grid_Plugin.md
    Technical_Specification_and_UI_Blueprint_for_Illustrator_Grid_Plugin.md
  src/
    ui/
      index.html
      styles.css
      panel.js
      components/
    core/
      preset-schema.js
      defaults.js
      unit-utils.js
      validation.js
      preview-state.js
    host/
      grid-engine.jsx
      guide-manager.jsx
      artboard-scope.jsx
      preset-bridge.jsx
```

The exact file naming may change, but the responsibilities should stay separated.

## 6. Core System Responsibilities

### 6.1 UI Layer

The UI layer is responsible for:
- rendering the panel
- collecting input values
- switching between Auto-Detect and Custom
- showing preset UI
- passing clean values to the host logic
- receiving update success or error states

### 6.2 Core Logic Layer

The core logic layer is responsible for:
- preset schema
- default values
- unit conversion helpers
- validation
- active panel state
- optional preview debounce logic

### 6.3 Host Execution Layer

The Illustrator execution layer is responsible for:
- reading document state
- resolving artboard scope
- calculating actual grid geometry
- creating and updating guides
- tracking plugin-owned guide items
- clearing only plugin-owned output

## 7. Guide Ownership Strategy

This is one of the most important v1 improvements.

The plugin should **not** blindly remove the entire `Guides` layer.

Instead, it should use one of these approaches.

### Preferred approach

Create a dedicated plugin-owned layer, for example:
- `Formloop Grid`

Within that layer, tag or name generated items clearly so they can be replaced safely.

### Behavior

- On preview or apply, remove only plugin-owned guide objects in that layer.
- Do not modify unrelated user layers.
- If the layer does not exist, create it.
- If it exists, unlock and update it as needed.
- Lock it after apply if appropriate.

This gives the tool safer behavior than the original script.

## 8. Artboard Scope

v1 should support:
- Active Artboard
- All Artboards

This is enough for a useful first version.

“Selected Artboards” can be deferred.

### Expected behavior

- In Active Artboard mode, only the current artboard receives output.
- In All Artboards mode, the same settings are applied consistently across all artboards.

## 9. Grid Data Model

Use a normalized config object.

Example:

```js
{
  mode: "custom",
  scope: "activeArtboard",
  include: {
    margins: true,
    columns: true,
    rows: true,
    baseline: true
  },
  margins: {
    linked: true,
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
    unit: "px"
  },
  columns: {
    count: 12,
    gutter: 20,
    unit: "px"
  },
  rows: {
    count: 8,
    gutter: 15,
    unit: "px"
  },
  baseline: {
    step: 12,
    unit: "px"
  }
}
```

This does not need to be the final shape, but the preset and host systems should use a consistent structure.

## 10. Preset Schema

Presets should stay simple in v1.

Each preset should store:
- preset name
- mode
- margins
- linked state
- column count
- column gutter
- row count
- row gutter
- baseline step
- enabled element toggles
- optional unit metadata
- optional scope metadata

Example:

```js
{
  id: "preset_001",
  name: "Desktop 12 Col",
  builtIn: false,
  config: {
    mode: "custom",
    scope: "allArtboards",
    include: {
      margins: true,
      columns: true,
      rows: true,
      baseline: true
    },
    margins: {
      linked: true,
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
      unit: "px"
    },
    columns: {
      count: 12,
      gutter: 24,
      unit: "px"
    },
    rows: {
      count: 8,
      gutter: 16,
      unit: "px"
    },
    baseline: {
      step: 12,
      unit: "px"
    }
  }
}
```

## 11. Built-in Presets for v1

Keep built-in presets generic and useful.

Recommended initial set:
- Mobile
- Tablet
- Desktop
- Square
- Banner
- A4

These should help users start quickly without turning the product into a more opinionated system.

## 12. Auto-Detect Logic

Auto-Detect should remain simple in v1.

Suggested behavior:
- inspect artboard width and height
- classify format broadly
- suggest a practical default column count
- suggest row count proportional to format
- suggest margin and gutter defaults
- preserve user control if they switch to Custom

Example default logic:
- portrait or narrow formats: fewer columns, more rows
- wide formats: more columns, fewer rows
- square-ish formats: balanced column and row counts

This should be useful, not magical.

## 13. Unit Strategy

Unit handling needs to be explicitly defined.

### Recommendation for v1
- store numeric values in the document's working unit context, or in a normalized internal unit with reliable conversion
- display units in the UI clearly
- allow built-in presets to carry unit metadata

### Minimum requirements
- preserve numeric accuracy
- do not mix px and mm blindly
- show unit labels next to values
- convert preset values intentionally when needed

If full unit conversion adds risk, keep v1 conservative and predictable.

## 14. Validation Rules

Validation should happen before apply.

### Required checks
- margin values must be non-negative
- gutters must be non-negative
- counts must be positive integers where required
- baseline step must be greater than zero when enabled
- combined margins cannot exceed artboard dimensions
- column gutter and count cannot collapse usable width into zero or negative values
- row gutter and count cannot collapse usable height into zero or negative values

### Error behavior
- show clear inline error messages where possible
- block Apply Grid when config is invalid
- avoid vague alerts when specific guidance can be shown

## 15. Grid Engine Responsibilities

The grid engine should:
- accept a normalized config
- resolve artboard scope
- calculate inner content area after margins
- derive column widths from available width, gutter, and count
- derive row heights from available height, gutter, and count
- generate baseline lines from step value
- output guides consistently on the plugin-owned layer

### Recommended host functions
- `ensurePluginLayer()`
- `clearPluginGuides()`
- `getTargetArtboards(scope)`
- `resolveAutoDetectConfig(artboardRect)`
- `validateGridConfig(config, artboardRect)`
- `drawMargins(config, artboard)`
- `drawColumns(config, artboard)`
- `drawRows(config, artboard)`
- `drawBaseline(config, artboard)`
- `applyGrid(config)`

## 16. Preview Strategy

Preview is valuable if it remains lightweight.

### Recommended v1 preview behavior
- UI changes trigger a debounced preview call
- preview clears only plugin-owned guides
- preview redraws only current plugin output
- Apply Grid commits the same config as the preview

### Fallback if performance is weak
- make preview optional
- allow users to click Apply only

The product should prefer reliability over flashy responsiveness.

## 17. UI Blueprint

### 17.1 Panel Layout

Recommended order:
1. Header
2. Mode toggle
3. Margins
4. Columns
5. Rows
6. Baseline Grid
7. Presets
8. Scope
9. Footer actions

### 17.2 Main Controls

#### Mode
- Auto-Detect
- Custom

#### Margins
- Top
- Right
- Bottom
- Left
- link or unlink margins

#### Columns
- Count
- Gutter

#### Rows
- Count
- Gutter

#### Baseline Grid
- Step

#### Presets
- Save Preset
- Load Preset

#### Scope
- Active Artboard
- All Artboards

#### Footer
- Cancel or Reset Preview
- Apply Grid

## 18. UI Behavior Rules

### Margin linking
When linked:
- updating one margin updates the others

When unlinked:
- each field is independent

### Rows
Rows are part of v1. They should not be labeled as “new feature” in shipping UI.

### Snap to Baseline
Do not include this control in v1 unless its Illustrator-side behavior is fully implemented and tested.

## 19. Persistence

Store:
- saved presets
- last-used config
- last-used scope
- UI mode state if useful

This can be local panel storage in v1.

## 20. Copy and Tone

UI labels should be concise and practical.

Examples:
- Grid Tool
- Apply Grid
- Save Preset
- Load Preset
- Active Artboard
- All Artboards

Avoid technical or promotional language inside the UI.

## 21. Implementation Priorities

### Phase 1
- set up panel shell
- port core grid logic
- add margins, columns, rows, baseline controls
- add plugin-owned guide layer behavior
- add Apply Grid

### Phase 2
- add presets
- add scope selector
- add validation
- add Formloop visual polish

### Phase 3
- add optional debounced preview
- add last-used state memory
- improve unit handling as needed

## 22. Success Criteria for v1

v1 succeeds if it does these things well:
- faster than the original script
- clearer than the original script
- safer than the original script
- visually aligned with Formloop
- still focused on core grid generation

It does not need to solve every future layout problem.

## 23. Open Questions to Resolve Before Build

These items should be finalized before implementation begins:
- exact Adobe runtime target
- canonical unit storage strategy
- whether preview is on by default or optional
- whether Reset Preview and Cancel are separate actions
- whether built-in presets are editable or locked
- whether the plugin layer stays locked after Apply
- whether Active Artboard should be the default scope

## 24. Summary

The first plugin version should be a restrained evolution of the current script.

It should introduce a better panel, stronger guide management, presets, rows, and better overall usability.

It should look and feel like Formloop, but it should remain intentionally narrow in product scope.
