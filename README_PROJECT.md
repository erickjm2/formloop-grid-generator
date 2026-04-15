# Formloop Grid & Margin Generator - Adobe Illustrator Plugin

A premium, clean Adobe Illustrator CEP plugin for generating responsive grid systems with intelligent margin, column, row, and baseline controls. Built with React, TypeScript, and ExtendScript.

## Overview

The Formloop Grid & Margin Generator transforms Illustrator's guide system into a powerful layout tool. It provides:

- **Auto-Detect Mode**: Intelligent grid suggestions based on artboard dimensions
- **Custom Mode**: Full control over margins, columns, rows, and baseline grids
- **Preset System**: 6 built-in presets (Mobile, Tablet, Desktop, Square, Banner, A4)
- **Non-Destructive**: Uses a dedicated plugin layer for guides
- **Live Preview**: See grids before applying them
- **Artboard Scope**: Apply to active or all artboards

## Design Philosophy

The plugin embodies Formloop's design principles: **calm, confident, helpful, minimal, and design-led**. The interface uses a restrained color palette, generous spacing, and clear typography to create a premium experience.

## Project Structure

```
illustrator-grid-plugin/
├── client/                    # React UI panel
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── lib/              # Utilities (CEP bridge, schemas)
│   │   ├── App.tsx           # Root app component
│   │   ├── index.css         # Design system
│   │   └── main.tsx          # React entry point
│   ├── index.html            # CEP panel HTML
│   └── public/               # Static assets
├── host/
│   └── host.jsx              # ExtendScript host logic
├── manifest.xml              # Adobe plugin manifest
├── DEVELOPMENT.md            # Development guide
├── NEXT_STEPS.md             # Phases 5-8 roadmap
└── package.json              # Node dependencies
```

## Quick Start

### Prerequisites

- Node.js 18+ and pnpm
- Adobe Illustrator 2024 or later
- macOS, Windows, or Linux

### Installation

1. **Clone and install dependencies**:
   ```bash
   cd /home/ubuntu/illustrator-grid-plugin
   pnpm install
   ```

2. **Start development server**:
   ```bash
   pnpm dev
   ```

3. **Set up plugin for testing** (see DEVELOPMENT.md for platform-specific instructions)

4. **Enable unsigned extensions** in Illustrator preferences (development only)

5. **Open Illustrator** and go to **Window → Extensions → Formloop Grid & Margin Generator**

## Development

### Available Scripts

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build for production
- `pnpm check` - TypeScript type checking
- `pnpm format` - Format code with Prettier

### Project Phases

| Phase | Status | Description |
|-------|--------|-------------|
| 1 | ✅ Complete | Analysis and technical specification |
| 2 | ✅ Complete | UI/UX design and icon set |
| 3 | ✅ Complete | Adobe CEP plugin setup |
| 4 | ✅ Complete | React UI development |
| 5 | ⏳ Pending | Enhance grid logic |
| 6 | ⏳ Pending | Connect UI to ExtendScript |
| 7 | ⏳ Pending | Preset system |
| 8 | ⏳ Pending | Testing and packaging |

## Current Status (Phase 4)

✅ **Completed**:
- Full React UI with Formloop design system
- All components built and type-checked
- CEP bridge ready for integration
- Grid configuration schema with validation
- 6 built-in presets
- Comprehensive documentation

⏳ **Not Yet Implemented**:
- UI ↔ ExtendScript communication
- Live preview functionality
- Preset persistence
- Auto-detect mode
- Grid generation testing

## Architecture

### UI Layer (React)
- **GridPanel**: Root component managing state
- **Section Components**: Margins, Columns, Rows, Baseline, Presets, Scope
- **Design System**: Formloop colors, typography, spacing

### Communication Layer (CEP Bridge)
- **cep-bridge.ts**: Handles UI ↔ ExtendScript communication
- **Commands**: applyGrid, previewGrid, requestAutoDetect
- **Events**: Results, errors, status updates

### Host Layer (ExtendScript)
- **host.jsx**: Grid generation logic
- **Guide Management**: Non-destructive guide creation
- **Auto-Detect**: Smart grid suggestions
- **Artboard Handling**: Single or batch processing

## Key Features

### Auto-Detect Mode
Analyzes artboard dimensions and automatically suggests:
- Appropriate column count based on aspect ratio
- Sensible row count
- Default margins (5% of minimum dimension)
- Baseline step (12px default)

### Custom Mode
Full control over:
- Margins (linked or independent)
- Column count and gutter
- Row count and gutter
- Baseline grid step
- Include toggles for each element

### Presets
Six professional starting points:
- **Mobile**: 4 columns, 16px margins
- **Tablet**: 6 columns, 20px margins
- **Desktop**: 12 columns, 24px margins
- **Square**: 8×8 grid
- **Banner**: 16 columns for wide formats
- **A4**: Print layout with mm units

## Design System

### Colors
- **Background**: #F5F8FC (light, calm)
- **Text**: #070C14 (Obsidian - primary), rgba(7,12,20,0.65) (secondary)
- **Accent**: #003AAA (Cobalt - primary), #0057FF (Electric - focus)
- **Border**: rgba(7,12,20,0.12) (soft)

### Typography
- **Font**: Inter (400, 500, 600, 700)
- **Title**: 18px/600
- **Section**: 14px/600
- **Body**: 13px/400-500
- **Small**: 12px/400

### Spacing
- **Base**: 8px
- **Scales**: xs (4px), sm (8px), md (16px), lg (24px), xl (32px)

### Radius
- **Panels**: 20px
- **Sections**: 14px
- **Inputs**: 12px
- **Buttons**: 14px

## Documentation

- **DEVELOPMENT.md** - Setup, development workflow, debugging
- **CEP_SETUP.md** - CEP architecture and file structure
- **PHASE_4_SUMMARY.md** - Phase 4 deliverables
- **NEXT_STEPS.md** - Phases 5-8 roadmap
- **TROUBLESHOOTING.md** - Common issues (coming in Phase 8)

## Testing

### Current Testing Status
- ✅ TypeScript compilation
- ✅ Component rendering
- ✅ State management
- ⏳ CEP communication
- ⏳ Grid generation
- ⏳ Preset management

### Testing Checklist
See NEXT_STEPS.md for comprehensive testing checklist.

## Known Limitations

- Gutter color styles (deferred to v2)
- Zone overlays and safe areas (v2)
- Composition guidance (v2)
- Illustrator 26.0+ only (CEP requirement)

## Future Enhancements

- Gutter color styles for visual distinction
- Zone overlays for responsive design
- Composition guidance
- Template library
- Brand-specific layout systems
- Cloud preset sync
- Advanced grid types

## Support & Troubleshooting

See DEVELOPMENT.md for:
- Plugin installation troubleshooting
- Debugging tips
- Performance optimization
- Common issues

## Contributing

When contributing to this project:
1. Follow the existing code style
2. Add TypeScript types for all functions
3. Update documentation
4. Test changes thoroughly
5. Create clear commit messages

## License

MIT

## Credits

Built by Formloop for Adobe Illustrator.

---

## Quick Reference

### Component Hierarchy
```
App
└── GridPanel
    ├── ModeToggle
    ├── MarginsSection
    ├── ColumnsSection
    ├── RowsSection
    ├── BaselineSection
    ├── PresetsSection
    ├── ScopeSection
    └── FooterActions
```

### Key Files
- `client/src/components/GridPanel.tsx` - Main UI
- `client/src/lib/cep-bridge.ts` - Communication
- `client/src/lib/grid-schema.ts` - Data models
- `host/host.jsx` - Grid engine
- `manifest.xml` - Plugin config

### Useful Commands
```bash
# Development
pnpm dev              # Start dev server
pnpm check            # Type check
pnpm format           # Format code

# Building
pnpm build            # Production build
pnpm preview          # Preview build

# Debugging
# Check browser console in CEP panel
# Check Illustrator JavaScript console (Window → Developer)
```

## Next Steps

1. **Phase 5**: Enhance grid logic and optimize performance
2. **Phase 6**: Connect UI to ExtendScript and implement grid generation
3. **Phase 7**: Implement preset persistence and artboard memory
4. **Phase 8**: Comprehensive testing and packaging

See NEXT_STEPS.md for detailed roadmap.
