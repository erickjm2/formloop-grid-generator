# Formloop Grid & Margin Generator

**Authors:** Manus AI, Erick Melendez, and ChatGPT  
**Updated:** April 14, 2026

## Overview

This repository holds the planning docs for evolving the original Illustrator script into a lightweight plugin panel.

The goal for v1 is simple but meaningful:
- keep the tool focused on grids, margins, rows, and baseline controls
- improve usability with a persistent panel and presets
- make the experience feel unmistakably Formloop through color, type, spacing, tone, and interaction design
- avoid expanding into a larger zone or layout-system product at this stage

## Product Direction

**Product name:** Formloop Grid & Margin Generator  
**Panel title:** Grid Tool

This is an evolution of the existing script, not a full reinvention.

## v1 Scope

### Included
- Auto-Detect mode
- Custom mode
- Linked and unlinked margin controls
- Column count and gutter
- Row count and gutter
- Baseline step
- Toggle controls for margins, columns, rows, and baseline
- Save, load, and delete presets
- Safer regeneration of plugin-owned guides
- Optional debounced live preview
- Active artboard or all artboards scope

### Deferred
- Formloop zone system as a feature
- Safe-area overlays
- Template overlays
- Content-aware layout logic
- Brand composition guidance inside the tool
- Advanced layout systems beyond core grid generation

## Design Principle

The plugin should feel calm, confident, helpful, and design-led. It should be more polished than the current script, but still behave like a practical design utility.

It should use Formloop visual language, not a generic Apple-style or startup-style UI.

## Files

- `docs/UI_UX_Design_Guide_for_Illustrator_Grid_Plugin.md`
- `docs/Technical_Specification_and_UI_Blueprint_for_Illustrator_Grid_Plugin.md`

## Current Focus

The current work is centered on clarifying:
- naming
- feature scope
- panel structure
- presets
- guide ownership and regeneration
- Formloop-aligned visual design
