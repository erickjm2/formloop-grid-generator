# Technical Specification and UI Blueprint for Illustrator Grid Plugin

**Author:** Manus AI
**Date:** April 13, 2026

## 1. Introduction

This document outlines the technical specifications and UI blueprint for transforming the existing `Grid-Margin-Generator.jsx` Illustrator script into a robust, premium Adobe CEP (Common Extensibility Platform) plugin. The goal is to enhance functionality, improve user experience, and align the design with modern aesthetics, drawing inspiration from Robinhood and Apple.

## 2. Existing Script Analysis (`Grid-Margin-Generator.jsx`)

The provided JavaScript script for Adobe Illustrator automates the creation of layout grids, including margins, columns, and a baseline grid. It operates on all artboards within the active document and manages guides by placing them on a dedicated "Guides" layer.

### 2.1 Core Functions and Logic

| Function/Variable | Description | Key Logic | Improvements/Notes |
|---|---|---|---|
| `(function () { ... })();` | Self-executing anonymous function to encapsulate script logic. | Standard JavaScript pattern for preventing global scope pollution. | Will be adapted into a CEP extension structure. |
| `app.documents.length === 0` | Checks if a document is open. | Basic validation. | Remains relevant for plugin. |
| `win = new Window("dialog", ...)` | Creates the native script UI dialog. | Uses Adobe's built-in UI API for ExtendScript. | Will be replaced by an HTML/CSS-based CEP panel. |
| `useCustom` checkbox | Toggles between auto-detect and custom settings. | Enables/disables the custom settings panel. | Concept will be retained, but implemented with modern UI elements. |
| `addInput(label)` | Helper to create text input fields. | Simplifies UI creation for multiple parameters. | Will be replaced by HTML input elements with enhanced controls. |
| `fields.onChange` | Input sanitization. | Removes non-numeric characters from input fields. | Essential for robust input handling in the new UI. |
| `generateBtn.onClick` | Main trigger for grid generation. | Gathers configuration (auto or custom) and calls `generateGuides`. | Will be the primary action in the new UI, potentially with a "Live Preview" trigger. |
| `generateGuides(config)` | Orchestrates guide creation. | Iterates through artboards, calculates grid parameters, and draws lines. | This core logic will be ported to ExtendScript and called from the CEP panel. |
| `guidesLayer` management | Handles the "Guides" layer. | Checks for existing "Guides" layer, prompts to clear, or creates a new one. | This is a destructive workflow. Will be improved for non-destructive management. |
| `makeLine(x1, y1, x2, y2, parent)` | Draws individual guide lines. | Creates `pathItems` and sets them as guides. | This function is fundamental and will be reused in ExtendScript. |
| `smartColumnCount(width, height)` | Determines column count based on aspect ratio. | Simple conditional logic (12 for landscape, 6 for portrait, 4 for square-ish). | Needs significant enhancement for more intelligent suggestions. |
| `getDefaultMargins(width, height)` | Calculates default margins. | Uses 5% of the minimum artboard dimension. | Can be enhanced with more sophisticated default logic. |

### 2.2 Strengths

*   **Functional Core:** The script successfully generates margins, columns, and a baseline grid across all artboards.
*   **Dual Mode:** The auto-detect and custom settings provide flexibility.
*   **Layer Organization:** Guides are placed on a dedicated, locked layer.

### 2.3 Weaknesses & Opportunities

*   **Destructive Workflow:** The prompt to clear existing guides is disruptive. A non-destructive approach is needed.
*   **Limited Smart Logic:** The auto-detection for columns is basic and can be significantly improved.
*   **Static UI:** The native dialog is not persistent and lacks modern UI/UX features.
*   **No Presets:** Users cannot save or recall custom grid configurations.
*   **Lack of Visual Feedback:** No real-time preview of grid changes.
*   **Basic Input Controls:** Standard text fields limit usability.

## 3. Technical Requirements & Architecture

The plugin will be developed using Adobe's Common Extensibility Platform (CEP), which allows for the creation of panels using web technologies (HTML, CSS, JavaScript) that communicate with Illustrator's ExtendScript engine.

### 3.1 Technology Stack

*   **UI (CEP Panel):** HTML5, CSS3, JavaScript (ES6+)
*   **Illustrator Interaction (ExtendScript):** JavaScript (Adobe's ExtendScript dialect)
*   **Communication:** `CSInterface.js` for communication between CEP panel and ExtendScript.

### 3.2 Key Technical Implementations

1.  **CEP Panel Setup:** Create a standard CEP extension structure with `manifest.xml`, `index.html`, `style.css`, and `main.js` for the UI, and `host.jsx` for ExtendScript logic.
2.  **Non-Destructive Guide Management:**
    *   Instead of deleting the "Guides" layer, the plugin will clear and redraw guides within it, or manage multiple guide sets on separate sub-layers.
    *   Implement a mechanism to identify guides created by the plugin to avoid interfering with user-created guides.
3.  **Live Preview:**
    *   Utilize `CSInterface` to send UI parameter changes to ExtendScript in real-time.
    *   ExtendScript will rapidly clear and redraw guides based on the new parameters without closing the UI.
    *   Consider debouncing input events to prevent excessive redraws during rapid adjustments.
4.  **Preset System:**
    *   Store presets locally using `localStorage` within the CEP panel or `app.preferences` in ExtendScript.
    *   Implement UI for saving, loading, and deleting presets.
5.  **Enhanced Smart Logic:**
    *   Expand `smartColumnCount` to consider common design breakpoints (e.g., 320px, 768px, 1024px, 1440px) and suggest appropriate column counts (e.g., 4, 6, 8, 12).
    *   Introduce a `smartRowCount` function based on similar principles.
6.  **Row Gutter Control:** Add new ExtendScript logic to generate horizontal guides for rows, mirroring the column generation.

## 4. UI Wireframe Concept

The control panel will embody a premium, clean aesthetic inspired by Robinhood and Apple, focusing on clarity, usability, and visual appeal. It will be a persistent panel within Illustrator.

### 4.1 General Design Principles

*   **No Drop Shadows:** As requested, no drop shadows will be used.
*   **Rounded Elements:** All interactive elements (buttons, input fields) will feature a `border-radius` of 12-16px.
*   **Clean Line Icons:** Custom SVG line icons will be used for toggles and mode selections.
*   **Minimalist Typography:** A clean, sans-serif font (e.g., system default or a suitable web font) with clear hierarchy.
*   **Color Palette:** A restrained palette of grays, whites, and a single accent color for active states.

### 4.2 Panel Layout (Conceptual)

```
+--------------------------------------------------+
| **Grid & Margin Generator**                      |
|--------------------------------------------------|
| [  Toggle: Auto-Detect  ] [  Toggle: Custom  ]   |
|                                                  |
| **[ Margins ]**                                  |
| +----------------------------------------------+ |
| | [  Top: [ 20px ]  ] [  Link Icon  ]          | |
| | [  Bottom: [ 20px ] ]                        | |
| | [  Left: [ 20px ]   ]                        | |
| | [  Right: [ 20px ]  ]                        | |
| +----------------------------------------------+ |
|                                                  |
| **[ Columns ]**                                  |
| +----------------------------------------------+ |
| | [  Count: [ 12 ]  ] [  Slider  ]             | |
| | [  Gutter: [ 20px ] ] [  Slider  ]             | |
| +----------------------------------------------+ |
|                                                  |
| **[ Rows ]** (New Feature)                       |
| +----------------------------------------------+ |
| | [  Count: [ 8 ]   ] [  Slider  ]             | |
| | [  Gutter: [ 20px ] ] [  Slider  ]             | |
| +----------------------------------------------+ |
|                                                  |
| **[ Baseline Grid ]**                            |
| +----------------------------------------------+ |
| | [  Step: [ 12px ] ] [  Slider  ]             | |
| +----------------------------------------------+ |
|                                                  |
| [  Button: Save Preset  ] [  Button: Load Preset ] |
|                                                  |
| [  Pill Button: Apply Grid  ]                    |
+--------------------------------------------------+
```

### 4.3 UI Element Details

*   **Mode Toggles (Auto-Detect/Custom):** Two rounded pill buttons. One will be highlighted when active.
*   **Section Headers:** Bold text for "Margins," "Columns," "Rows," "Baseline Grid."
*   **Input Fields:** Numeric input fields with `border-radius: 12-16px`. Adjacent sliders for interactive adjustment.
*   **Link Icon:** A small, clean line icon next to the margin inputs to toggle linking/unlinking of values.
*   **Action Buttons:** Rounded pill buttons for "Save Preset," "Load Preset," and "Apply Grid." The "Apply Grid" button will be the primary action, potentially larger or more prominent.
*   **Presets Dropdown (Conceptual):** A dropdown menu or similar mechanism to select saved presets, appearing after "Load Preset" is clicked.

## 5. Next Steps

1.  **Design UI Mockups:** Create visual mockups of the control panel based on this blueprint.
2.  **Icon Design:** Develop the set of clean line icons.
3.  **CEP Project Setup:** Initialize the CEP extension project structure.

## 6. References

[1] Adobe Common Extensibility Platform (CEP) Documentation: [https://www.adobe.com/devnet/cs-extension-builder/articles/adobe-extension-sdk-overview.html](https://www.adobe.com/devnet/cs-extension-builder/articles/adobe-extension-sdk-overview.html)
[2] ExtendScript Toolkit Documentation: [https://www.adobe.com/devnet/scripting/estk.html](https://www.adobe.com/devnet/scripting/estk.html)
