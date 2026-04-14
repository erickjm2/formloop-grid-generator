# UI/UX Design Guide for Illustrator Grid Plugin

**Author:** Manus AI
**Date:** April 13, 2026

## 1. Overview

This document provides a comprehensive design guide for the Adobe Illustrator Grid & Margin Generator plugin. It includes design principles, component specifications, color palette, typography, spacing, and interaction patterns. This guide ensures consistency and quality throughout the plugin's user interface.

## 2. Design Philosophy

The plugin's design is inspired by modern, premium applications such as Robinhood and Apple. The core principles are:

*   **Clarity:** Every element has a clear purpose. Visual hierarchy guides the user's attention.
*   **Simplicity:** Unnecessary elements are removed. The interface is clean and uncluttered.
*   **Consistency:** All components follow the same design language and patterns.
*   **Accessibility:** The interface is intuitive and easy to navigate for users of all skill levels.
*   **Premium Feel:** The design conveys quality and professionalism through thoughtful details and spacing.

## 3. Design System

### 3.1 Color Palette

| Color Name | Hex Code | Usage | Notes |
|---|---|---|---|
| **White** | #FFFFFF | Primary background | Clean, bright, minimal. |
| **Light Gray** | #F5F5F5 | Secondary background, panel backgrounds | Subtle, neutral. |
| **Medium Gray** | #EFEFEF | Inactive button backgrounds, borders | Slightly darker than light gray. |
| **Border Gray** | #E0E0E0 | Input field borders, dividers | Subtle, non-intrusive. |
| **Text Dark** | #333333 | Primary text, headings | High contrast, readable. |
| **Text Medium** | #666666 | Secondary text, labels | Medium contrast. |
| **Text Light** | #999999 | Tertiary text, hints | Low contrast, subtle. |
| **Accent Blue** | #0066CC | Active buttons, toggles, highlights | Primary brand color. Vibrant but professional. |
| **Accent Blue Light** | #E8F4F8 | Active button backgrounds (light), hover states | Subtle blue tint for visual feedback. |
| **Accent Blue Hover** | #0052A3 | Hover state for primary buttons | Darker shade of accent blue for depth. |
| **Success Green** | #34C759 | Success messages, checkmarks | Positive feedback. |
| **Error Red** | #FF3B30 | Error messages, warnings | Negative feedback. |

### 3.2 Typography

*   **Font Family:** System default sans-serif (e.g., `-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif`). This ensures the plugin matches the host application's typography.
*   **Font Sizes:**
    - **Heading 1 (Panel Title):** 18px, bold (font-weight: 600)
    - **Heading 2 (Section Header):** 14px, bold (font-weight: 600)
    - **Body Text:** 13px, regular (font-weight: 400)
    - **Label Text:** 12px, regular (font-weight: 400)
    - **Button Text:** 13px, medium (font-weight: 500)
    - **Small Text (Hints, Descriptions):** 11px, regular (font-weight: 400)

*   **Line Height:**
    - **Headings:** 1.2
    - **Body Text:** 1.5
    - **Compact Text:** 1.4

### 3.3 Spacing

The plugin uses an 8px base unit for consistent spacing throughout the interface.

| Spacing Unit | Pixels | Usage |
|---|---|---|
| **xs** | 4px | Minimal spacing, icon margins |
| **sm** | 8px | Padding within components, small gaps |
| **md** | 16px | Standard padding, medium gaps |
| **lg** | 24px | Section spacing, large gaps |
| **xl** | 32px | Major section breaks |

### 3.4 Border Radius

*   **Pill Buttons:** 14px (fully rounded for a soft, modern appearance)
*   **Input Fields:** 12px (slightly less rounded than buttons for visual distinction)
*   **Sections/Panels:** 8px (subtle rounding for contained areas)
*   **Icons:** 2-4px (minimal rounding for line-based icons)

### 3.5 Shadows

**No drop shadows are used.** The design relies on color, spacing, and typography to create visual hierarchy and depth.

## 4. Component Specifications

### 4.1 Buttons

#### Primary Button (Apply Grid)

*   **Background Color:** Accent Blue (#0066CC)
*   **Text Color:** White (#FFFFFF)
*   **Text Style:** 13px, medium (font-weight: 500)
*   **Padding:** 12px 24px
*   **Border Radius:** 14px
*   **Width:** Full width of the panel
*   **Height:** 44px (minimum touch target size)
*   **Hover State:** Background color changes to Accent Blue Hover (#0052A3)
*   **Active State:** Background color darkens slightly; text may have a subtle opacity change.
*   **Disabled State:** Background color becomes Medium Gray (#EFEFEF); text color becomes Text Light (#999999).

#### Secondary Buttons (Save Preset, Load Preset, Cancel)

*   **Background Color:** Medium Gray (#EFEFEF)
*   **Text Color:** Text Dark (#333333)
*   **Text Style:** 13px, medium (font-weight: 500)
*   **Padding:** 10px 20px
*   **Border Radius:** 14px
*   **Width:** Flexible, typically 48% of the panel width when displayed side-by-side.
*   **Height:** 40px
*   **Hover State:** Background color becomes slightly darker (e.g., #E0E0E0).
*   **Active State:** Background color becomes Accent Blue Light (#E8F4F8); text color becomes Accent Blue (#0066CC).

### 4.2 Input Fields

*   **Background Color:** White (#FFFFFF)
*   **Border Color:** Border Gray (#E0E0E0)
*   **Border Width:** 1px
*   **Border Radius:** 12px
*   **Padding:** 8px 12px
*   **Text Color:** Text Dark (#333333)
*   **Text Style:** 13px, regular (font-weight: 400)
*   **Placeholder Text Color:** Text Light (#999999)
*   **Focus State:** Border color changes to Accent Blue (#0066CC); a subtle box-shadow may be applied (e.g., `0 0 0 3px rgba(0, 102, 204, 0.1)`).
*   **Error State:** Border color changes to Error Red (#FF3B30); an error message appears below the field.

### 4.3 Toggles/Checkboxes

*   **Default State:** A square outline with Border Gray (#E0E0E0) border, 14px × 14px, border-radius 4px.
*   **Checked State:** Background color becomes Accent Blue (#0066CC); a white checkmark appears inside.
*   **Hover State:** Border color becomes Accent Blue (#0066CC).
*   **Disabled State:** Border color becomes Medium Gray (#EFEFEF); the checkmark (if present) becomes Text Light (#999999).

### 4.4 Sliders

*   **Track (Inactive):** Light gray background (#E0E0E0), height 4px, border-radius 2px.
*   **Track (Active):** Accent Blue (#0066CC), height 4px, border-radius 2px.
*   **Thumb:** Circle, 16px diameter, Accent Blue (#0066CC) background, with a subtle border (1px, Border Gray #E0E0E0).
*   **Thumb (Hover):** Slightly larger (18px diameter) or with a subtle shadow to indicate interactivity.
*   **Thumb (Active):** Same as hover state.

### 4.5 Mode Toggle Buttons

These are two pill buttons displayed side-by-side to toggle between "Auto-Detect" and "Custom" modes.

*   **Default State (Inactive):** Background color Medium Gray (#EFEFEF), text color Text Dark (#333333).
*   **Active State:** Background color Accent Blue (#0066CC), text color White (#FFFFFF).
*   **Hover State (Inactive):** Background color becomes slightly darker (e.g., #E0E0E0).
*   **Hover State (Active):** Background color becomes Accent Blue Hover (#0052A3).
*   **Padding:** 10px 20px
*   **Border Radius:** 14px
*   **Text Style:** 13px, medium (font-weight: 500)

### 4.6 Icons

All icons are designed as clean, minimalist line icons with the following specifications:

*   **Stroke Weight:** 2px
*   **Color:** Text Dark (#333333) by default; Accent Blue (#0066CC) when active.
*   **Size:** Typically 16px × 16px for inline icons, 24px × 24px for standalone icons.
*   **Style:** No fill, only stroke. Rounded corners (2-4px radius) where appropriate.
*   **Consistency:** All icons maintain the same visual weight and style.

#### Icon Set

The plugin includes the following icons:

| Icon Name | Purpose | Notes |
|---|---|---|
| **Margins** | Represents margin controls | Square with inward-pointing arrows. |
| **Columns** | Represents column controls | Rectangle divided into vertical sections. |
| **Rows** | Represents row controls | Rectangle divided into horizontal sections. |
| **Baseline Grid** | Represents baseline grid controls | Rectangle with evenly spaced horizontal lines. |
| **Link** | Indicates linked values | Two connected chain links. |
| **Unlink** | Indicates unlinked values | Broken chain. |
| **Save** | Save preset action | Floppy disk outline. |
| **Load/Open** | Load preset action | Open folder outline. |
| **Settings** | Settings or configuration | Gear icon. |
| **Reset** | Reset to defaults | Circular arrow (counterclockwise). |
| **Slider** | Slider control | Horizontal line with circle in the middle. |
| **Artboard** | Artboard or canvas representation | Rectangle outline. |
| **Close** | Close dialog or panel | X icon. |
| **Delete** | Delete preset | Trash can icon. |

## 5. Layout and Spacing

### 5.1 Panel Dimensions

*   **Width:** 320px (standard CEP panel width)
*   **Height:** Flexible, scrollable content area (minimum 600px for initial view)
*   **Padding:** 16px (md spacing unit) on all sides

### 5.2 Section Layout

Each section (Margins, Columns, Rows, Baseline Grid) follows this structure:

```
+------------------------------------------+
| Section Header (Bold, 14px)              |
+------------------------------------------+
| [Control 1] [Control 2]                  |
| [Control 3] [Control 4]                  |
+------------------------------------------+
| 16px spacing to next section             |
```

*   **Section Header:** 14px, bold, Text Dark (#333333), 16px bottom margin.
*   **Control Rows:** Each row contains one or more controls (input fields, sliders, etc.) with 8px horizontal spacing between them.
*   **Row Height:** 40px (minimum touch target size).
*   **Vertical Spacing Between Rows:** 8px (sm spacing unit).
*   **Vertical Spacing Between Sections:** 24px (lg spacing unit).

### 5.3 Margins Section Layout

The Margins section uses a 2×2 grid layout:

```
+------------------------------------------+
| Margins                                  |
+------------------------------------------+
| [Top: ___] [Right: ___]                  |
| [Bottom: ___] [Left: ___]  [Link Icon]   |
+------------------------------------------+
```

*   **Grid Columns:** 2 columns, each taking 48% of the available width, with 4% gap between them.
*   **Link Icon:** Positioned to the right of the grid, vertically centered.
*   **Link Icon Size:** 24px × 24px.
*   **Link Icon Color:** Text Medium (#666666) by default; Accent Blue (#0066CC) when linked.

### 5.4 Columns and Rows Sections Layout

Both sections follow this structure:

```
+------------------------------------------+
| Columns                                  |
+------------------------------------------+
| Count: [___] [===========●]              |
| Gutter: [___] [===========●]             |
+------------------------------------------+
```

*   **Label Width:** 60px (fixed).
*   **Input Field Width:** 60px.
*   **Slider Width:** Remaining space (approximately 160px).
*   **Vertical Spacing Between Rows:** 12px.

### 5.5 Action Buttons Layout

```
+------------------------------------------+
| [Save Preset] [Load Preset]              |
| [Apply Grid (Full Width)]                |
+------------------------------------------+
```

*   **Top Button Row:** Two buttons, each 48% width, 4% gap between them.
*   **Bottom Button Row:** One button, 100% width.
*   **Vertical Spacing Between Rows:** 12px.

## 6. Interaction Patterns

### 6.1 Mode Toggle

*   **User Action:** Click on "Auto-Detect" or "Custom" button.
*   **Visual Feedback:** The active button's background color changes to Accent Blue (#0066CC), and the text color changes to white. The inactive button's background color remains Medium Gray (#EFEFEF).
*   **Functional Change:** Switching to "Custom" mode enables all input fields and sliders. Switching to "Auto-Detect" mode disables them and displays auto-calculated values.

### 6.2 Input Field Interaction

*   **Focus:** When a user clicks on an input field, the border color changes to Accent Blue (#0066CC), and a subtle blue shadow appears.
*   **Typing:** As the user types, the input is validated in real-time (numeric values only). Invalid characters are removed.
*   **Blur:** When the user leaves the field, the border color returns to Border Gray (#E0E0E0). The value is finalized.

### 6.3 Slider Interaction

*   **Hover:** When the user hovers over the slider thumb, it becomes slightly larger or displays a subtle shadow.
*   **Drag:** As the user drags the slider, the thumb follows the cursor, and the corresponding input field updates in real-time.
*   **Release:** When the user releases the slider, the value is finalized.

### 6.4 Link/Unlink Margins

*   **Default State:** The link icon is active (Accent Blue #0066CC), indicating that the margins are linked.
*   **User Action:** Click on the link icon to toggle between linked and unlinked states.
*   **Linked State:** When linked, changing one margin value automatically updates the others to match.
*   **Unlinked State:** When unlinked, each margin can be adjusted independently.
*   **Visual Feedback:** The link icon's color changes based on the state (Accent Blue for linked, Text Medium for unlinked).

### 6.5 Apply Grid Action

*   **User Action:** Click the "Apply Grid" button.
*   **Visual Feedback:** The button's background color changes to Accent Blue Hover (#0052A3) during the click. A brief loading indicator may appear (e.g., a spinner).
*   **Result:** The grid is applied to the active artboard(s) in Illustrator. A success message or notification may appear.

### 6.6 Preset Management

*   **Save Preset:** Click the "Save Preset" button. A modal dialog appears asking for a preset name. The user enters a name and clicks "Save." The preset is stored locally.
*   **Load Preset:** Click the "Load Preset" button. A modal dialog appears displaying a list of saved presets. The user selects a preset and clicks "Load Selected." The preset values are loaded into the control panel.
*   **Delete Preset:** In the preset list, click the trash icon next to a preset. A confirmation dialog may appear. The preset is deleted.

## 7. Responsive Behavior

### 7.1 Panel Resizing

The plugin panel is designed to work at a fixed width of 320px. However, if the user resizes the panel:

*   **Minimum Width:** 280px. Below this, some controls may become cramped or hidden.
*   **Maximum Width:** 400px. Beyond this, controls may appear too spaced out.
*   **Recommended Width:** 320px.

### 7.2 Content Overflow

If the content exceeds the panel height:

*   A vertical scrollbar appears on the right side of the panel.
*   The scrollbar uses the same color scheme (Border Gray for the track, Accent Blue for the thumb).
*   All sections remain accessible by scrolling.

## 8. Accessibility

### 8.1 Keyboard Navigation

*   All interactive elements are accessible via keyboard (Tab to navigate, Enter/Space to activate).
*   The tab order follows the visual layout (top to bottom, left to right).
*   Focus indicators are visible (e.g., a subtle border or outline around the focused element).

### 8.2 Color Contrast

*   All text meets WCAG AA contrast ratios (at least 4.5:1 for normal text, 3:1 for large text).
*   The color palette is designed to be distinguishable for users with color blindness.

### 8.3 Labels and Descriptions

*   All input fields have associated labels.
*   Buttons have clear, descriptive labels.
*   Icons are accompanied by text labels or tooltips.

## 9. Animation and Transitions

While the design is primarily static, subtle animations can enhance the user experience:

*   **Button Hover:** A smooth color transition (100-150ms) when hovering over buttons.
*   **Input Focus:** A smooth border color transition (100-150ms) when focusing on input fields.
*   **Slider Drag:** Smooth, real-time updates as the user drags the slider.
*   **Modal Appearance:** A subtle fade-in animation (200ms) when a modal dialog appears.

## 10. Dark Mode Considerations

If Adobe Illustrator introduces a dark mode in the future, the plugin should adapt:

*   **Background Colors:** Light Gray (#F5F5F5) becomes Dark Gray (e.g., #1E1E1E).
*   **Text Colors:** Text Dark (#333333) becomes Light Gray (e.g., #F5F5F5).
*   **Input Field Backgrounds:** White (#FFFFFF) becomes Dark Gray (e.g., #2A2A2A).
*   **Accent Colors:** Remain the same (Accent Blue #0066CC).

## 11. References

[1] Apple Human Interface Guidelines: [https://developer.apple.com/design/human-interface-guidelines/](https://developer.apple.com/design/human-interface-guidelines/)
[2] Material Design: [https://material.io/design/](https://material.io/design/)
[3] WCAG 2.1 Accessibility Guidelines: [https://www.w3.org/WAI/WCAG21/quickref/](https://www.w3.org/WAI/WCAG21/quickref/)
