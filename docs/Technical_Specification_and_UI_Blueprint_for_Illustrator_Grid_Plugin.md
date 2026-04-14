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
