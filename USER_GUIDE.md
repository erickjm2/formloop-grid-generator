# Formloop Grid & Margin Generator - User Guide

**Version**: 1.0.0  
**Last Updated**: April 15, 2026

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Interface Overview](#interface-overview)
3. [Auto-Detect Mode](#auto-detect-mode)
4. [Custom Mode](#custom-mode)
5. [Preset Management](#preset-management)
6. [Artboard Memory](#artboard-memory)
7. [Tips and Tricks](#tips-and-tricks)
8. [Common Workflows](#common-workflows)
9. [Keyboard Shortcuts](#keyboard-shortcuts)
10. [FAQ](#faq)

---

## Getting Started

### Opening the Plugin

1. In Adobe Illustrator, go to **Window > Extensions > Formloop Grid Tool**
2. The plugin panel will appear on the right side of your screen
3. Create or open a document with at least one artboard

### First Time Setup

1. **Create an Artboard** (if you don't have one)
   - Go to **File > New** or open an existing document
   - Create an artboard using the Artboard tool

2. **Choose a Mode**
   - **Auto-Detect**: Intelligent grid suggestions based on artboard size
   - **Custom**: Manual grid configuration

3. **Apply Grid**
   - Configure your grid settings
   - Click "Apply Grid"
   - Guides will appear in your artboard

---

## Interface Overview

The plugin panel is organized into several sections:

### Header
- **Grid Tool** title
- Artboard count display (e.g., "3 artboards")

### Mode Toggle
- **Auto-Detect**: Automatic grid suggestions
- **Custom**: Manual configuration

### Sections (in order)

**Margins Section**
- Top, Right, Bottom, Left margin values
- Link/Unlink button to lock all margins together
- Unit selector (px, pt, mm, cm, in)

**Columns Section**
- Column count (1-16)
- Gutter size (space between columns)
- Dual input and slider controls

**Rows Section**
- Row count (1-12)
- Gutter size (space between rows)
- Dual input and slider controls

**Baseline Grid Section**
- Baseline step size
- Suggested values: 8, 12, 16, 24 px

**Presets Section**
- **Save**: Save current configuration as preset
- **Load**: Load saved or built-in presets

**Scope Section**
- **Active Artboard**: Apply grid to current artboard only
- **All Artboards**: Apply grid to all artboards in document

### Include Toggles
- **Margins**: Include margin guides
- **Columns**: Include column guides
- **Rows**: Include row guides
- **Baseline**: Include baseline grid

### Footer
- **Cancel**: Reset to default configuration
- **Apply Grid**: Apply configuration to artboard(s)

---

## Auto-Detect Mode

Auto-Detect uses intelligent algorithms to suggest grid configurations based on your artboard's aspect ratio.

### How It Works

1. **Switch to Auto-Detect Mode**
   - Click the "Auto-Detect" button in the mode toggle

2. **View Format Class**
   - The plugin analyzes your active artboard's dimensions
   - Displays format class (e.g., "wide", "tall", "square")
   - Shows suggested grid (e.g., "12 cols × 6 rows")

3. **Apply or Adjust**
   - Click "Apply Grid" to use suggestions
   - Or adjust values manually before applying

### Format Classes

| Format Class | Aspect Ratio | Suggested Grid | Best For |
|---|---|---|---|
| ultraWide | > 2.4:1 | 16 cols × 4 rows | Cinema, banners |
| wide | 1.5-2.4:1 | 12 cols × 6 rows | HD, landscape |
| standard | 1.2-1.5:1 | 10 cols × 8 rows | 4:3, 16:10 |
| square | 0.75-1.2:1 | 8 cols × 8 rows | Square, social |
| tall | 0.5-0.75:1 | 6 cols × 10 rows | Portrait, mobile |
| ultraTall | < 0.5:1 | 4 cols × 12 rows | Narrow, strips |

### Example

**Artboard**: 1920 × 1080 px  
**Aspect Ratio**: 1.78:1 (wide)  
**Format Class**: wide  
**Suggested Grid**: 12 cols × 6 rows  
**Suggested Margins**: 24px  
**Suggested Baseline**: 12px  

---

## Custom Mode

Custom mode lets you manually configure every aspect of your grid.

### Configuring Margins

**Linked Margins** (Default):
- All margins set to same value
- Click link icon to toggle
- Change one value, all update together

**Unlinked Margins**:
- Each margin can be different
- Click link icon to toggle
- Set top, right, bottom, left independently

**Example**:
- Linked: 20px (all sides)
- Unlinked: Top 20px, Right 30px, Bottom 20px, Left 30px

### Configuring Columns

**Column Count**:
- Minimum: 1, Maximum: 16
- Typical values: 4 (mobile), 6 (tablet), 12 (desktop)
- Use slider or type number

**Column Gutter**:
- Space between columns
- Typical values: 12-24px
- Adjust for desired spacing

**Example**:
- 12 columns with 20px gutters (desktop grid)
- 4 columns with 16px gutters (mobile grid)

### Configuring Rows

**Row Count**:
- Minimum: 1, Maximum: 12
- Typical values: 4-8 rows
- Use slider or type number

**Row Gutter**:
- Space between rows
- Typical values: 12-20px
- Adjust for desired spacing

**Example**:
- 8 rows with 15px gutters (standard)
- 4 rows with 20px gutters (wide format)

### Configuring Baseline Grid

**Baseline Step**:
- Vertical spacing for typography
- Suggested values: 8, 12, 16, 24 px
- Snap to standard values for consistency

**Example**:
- 12px baseline (matches 12px font size)
- 16px baseline (matches 16px font size)

### Include Toggles

Control which guides are generated:

- **Margins**: Outer boundary guides
- **Columns**: Vertical column guides
- **Rows**: Horizontal row guides
- **Baseline**: Horizontal baseline guides

**Example**:
- For layout: Enable Margins, Columns, Rows
- For typography: Enable Baseline
- For quick reference: Enable only Columns

---

## Preset Management

Presets let you save and reuse grid configurations.

### Saving a Preset

1. **Configure Your Grid**
   - Set margins, columns, rows, baseline
   - Adjust to your preference

2. **Click "Save" Button**
   - Save dialog appears

3. **Enter Preset Details**
   - **Name** (required): e.g., "Desktop 12-Column"
   - **Description** (optional): e.g., "12-column grid for desktop layouts"

4. **Click "Save"**
   - Preset is saved
   - Success message appears

### Loading a Preset

1. **Click "Load" Button**
   - Presets modal appears
   - Shows built-in and custom presets

2. **Select a Preset**
   - Click on preset name
   - Configuration updates automatically
   - Modal closes

3. **Apply Grid**
   - Click "Apply Grid" to use the preset

### Editing a Preset

1. **Click "Load" Button**
2. **Hover Over Custom Preset**
   - Edit icon appears
3. **Click Edit Icon**
   - Edit dialog opens
4. **Modify Settings**
   - Change name, description, or configuration
5. **Click "Update"**
   - Preset is updated

### Deleting a Preset

1. **Click "Load" Button**
2. **Hover Over Custom Preset**
   - Delete icon appears
3. **Click Delete Icon**
   - Confirmation dialog appears
4. **Confirm Deletion**
   - Preset is deleted

### Built-in Presets

Six professional presets are included:

**Mobile** (4 cols × 6 rows)
- 16px margins, 16px gutters
- Perfect for mobile app layouts

**Tablet** (6 cols × 8 rows)
- 20px margins, 20px gutters
- Ideal for tablet/iPad layouts

**Desktop** (12 cols × 8 rows)
- 24px margins, 24px gutters
- Standard web layout grid

**Square** (8 cols × 8 rows)
- 20px margins, 16px gutters
- Great for square/social media

**Banner** (16 cols × 4 rows)
- 16px margins, 12px gutters
- Perfect for wide banner formats

**A4** (8 cols × 12 rows)
- 20mm margins, 10mm gutters
- Print-ready A4 layout

---

## Artboard Memory

Artboard Memory automatically remembers your grid settings for each artboard.

### How It Works

1. **Apply Grid to Artboard**
   - Configure and apply grid
   - Settings are saved automatically

2. **Switch to Another Artboard**
   - Click on different artboard
   - Plugin loads saved settings automatically

3. **Reuse Settings**
   - No need to reconfigure
   - Saved settings always available

### Example Workflow

**Document**: "Design System.ai"

**Artboard 1: Mobile**
- Configure: 4 cols, 6 rows, 16px margins
- Apply Grid
- Settings saved automatically

**Artboard 2: Tablet**
- Configure: 6 cols, 8 rows, 20px margins
- Apply Grid
- Settings saved automatically

**Artboard 3: Desktop**
- Configure: 12 cols, 8 rows, 24px margins
- Apply Grid
- Settings saved automatically

**Switch Back to Mobile**
- Mobile settings load automatically
- No reconfiguration needed

### Storage

- Settings stored locally in browser
- Persist across Illustrator restarts
- Specific to each computer
- Maximum 100 artboards per document

---

## Tips and Tricks

### Pro Tips

**Tip 1: Use Linked Margins**
- Keep margins linked for consistency
- Unlink only when needed for asymmetric layouts

**Tip 2: Start with Presets**
- Begin with a built-in preset
- Adjust if needed
- Save as custom preset

**Tip 3: Use Baseline for Typography**
- Set baseline to match your body font size
- Ensures consistent vertical rhythm

**Tip 4: Different Grids for Different Artboards**
- Use artboard memory to save different grids
- Switch artboards to see different grids
- Perfect for multi-device designs

**Tip 5: Save Common Configurations**
- Create presets for each project
- Reuse across documents
- Speeds up workflow

**Tip 6: Use Scope Wisely**
- "Active Artboard" for testing
- "All Artboards" for batch application
- Switch scope as needed

### Workflow Optimization

**Mobile-First Workflow**
1. Create mobile artboard (430×932)
2. Auto-Detect suggests 4 cols
3. Save as "Mobile" preset
4. Apply to other mobile artboards

**Responsive Design Workflow**
1. Create mobile, tablet, desktop artboards
2. Configure each with appropriate grid
3. Save each as preset
4. Reuse presets for new projects

**Print Design Workflow**
1. Create A4 artboard
2. Load "A4" preset
3. Adjust margins as needed
4. Save as custom preset
5. Use for all print projects

---

## Common Workflows

### Workflow 1: Quick Grid for Mobile

1. Create 430×932 artboard (iPhone size)
2. Switch to Auto-Detect mode
3. See "ultraTall" format with 4 cols × 12 rows
4. Click "Apply Grid"
5. Done!

### Workflow 2: Responsive Design System

1. Create three artboards: Mobile, Tablet, Desktop
2. For each artboard:
   - Switch to Custom mode
   - Configure appropriate grid
   - Click "Apply Grid"
3. Switch between artboards
4. Each maintains its own grid

### Workflow 3: Save and Reuse Presets

1. Configure desktop grid: 12 cols, 24px margins
2. Click "Save"
3. Name: "Desktop Standard"
4. Click "Save"
5. Later, click "Load"
6. Select "Desktop Standard"
7. Click "Apply Grid"

### Workflow 4: Batch Apply to All Artboards

1. Configure grid in Custom mode
2. Select "All Artboards" scope
3. Click "Apply Grid"
4. Grid applied to all artboards at once

### Workflow 5: Print Design

1. Create A4 artboard
2. Click "Load"
3. Select "A4" preset
4. Adjust margins if needed
5. Click "Apply Grid"
6. Guides ready for print layout

---

## Keyboard Shortcuts

Currently supported keyboard shortcuts:

| Action | Shortcut |
|---|---|
| Close Modal | Esc |
| Tab Through Controls | Tab |
| Activate Button | Enter |
| Adjust Slider | Arrow Keys |

---

## FAQ

**Q: How do I know if the grid was applied?**  
A: Guides appear in your artboard. Look for thin blue lines (or your guide color).

**Q: Can I delete the guides?**  
A: Yes, go to Object > Guides > Delete Guides. Or select the "Formloop Grid" layer and delete it.

**Q: Why is my grid not showing?**  
A: Guides might be hidden. Go to View > Guides > Show Guides.

**Q: Can I modify the guides after applying?**  
A: Yes, guides are regular Illustrator guides. You can move or delete them.

**Q: What if I make a mistake?**  
A: Use Ctrl+Z (Windows) or Cmd+Z (Mac) to undo.

**Q: Can I apply different grids to different artboards?**  
A: Yes! Use "Active Artboard" scope and apply to each artboard separately.

**Q: Are my presets backed up?**  
A: Presets are stored locally. Export feature coming in v1.1.

**Q: Can I use this for print design?**  
A: Yes! Use the "A4" preset or create custom presets with mm units.

**Q: What's the maximum grid size?**  
A: 16 columns × 12 rows. Larger grids can be created with custom values.

**Q: Can I share presets with others?**  
A: Export feature coming in v1.1. For now, recreate presets manually.

**Q: Does this work with linked files?**  
A: Yes, grid is applied to the active document.

**Q: Can I use this in batch operations?**  
A: Yes, use "All Artboards" scope to apply to multiple artboards at once.

---

## Troubleshooting

### Grid Not Applying

**Check**:
1. Is document open?
2. Does document have artboards?
3. Are grid values valid?
4. Is scope set correctly?

**Solution**:
- Create new document
- Create artboard
- Try applying grid again

### Presets Not Saving

**Check**:
1. Is preset name entered?
2. Is browser storage enabled?
3. Have you reached 50 preset limit?

**Solution**:
- Clear browser cache
- Delete unused presets
- Restart Illustrator

### Plugin Not Loading

**Check**:
1. Is Illustrator version 26 or later?
2. Is plugin installed correctly?
3. Is debug mode enabled (if unsigned)?

**Solution**:
- See INSTALLATION.md for setup help
- Reinstall plugin
- Restart Illustrator

---

## Getting Help

- **Installation Issues**: See INSTALLATION.md
- **Troubleshooting**: See TROUBLESHOOTING.md
- **Bug Reports**: https://github.com/erickjm2/formloop-grid-generator/issues
- **Feature Requests**: https://github.com/erickjm2/formloop-grid-generator/issues

---

## Next Steps

1. **Explore Auto-Detect**: Try with different artboard sizes
2. **Create Presets**: Save your favorite configurations
3. **Use Artboard Memory**: Switch between artboards
4. **Provide Feedback**: Share your thoughts

---

**Happy designing! 🎨**

For more information, visit: https://github.com/erickjm2/formloop-grid-generator
