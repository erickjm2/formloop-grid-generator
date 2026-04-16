# Formloop Grid & Margin Generator

> A premium, intelligent grid and margin generator plugin for Adobe Illustrator. Create professional grids with auto-detect, presets, and artboard memory.

[![Version](https://img.shields.io/badge/version-1.0.0-blue)](https://github.com/erickjm2/formloop-grid-generator/releases)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Illustrator](https://img.shields.io/badge/Illustrator-2022%2B-FF9A00)](https://www.adobe.com/products/illustrator.html)
[![Status](https://img.shields.io/badge/status-production%20ready-brightgreen)]()

---

## ✨ Features

### 🎯 Intelligent Auto-Detect
- Analyzes artboard aspect ratio
- Suggests optimal grid based on format class
- 6 format categories: ultraWide, wide, standard, square, tall, ultraTall
- One-click grid generation

### 🎨 Custom Grid Configuration
- Flexible margins (linked or unlinked)
- Column and row controls (1-16 cols, 1-12 rows)
- Adjustable gutters (column and row spacing)
- Baseline grid for typography
- Toggle individual grid elements

### 💾 Preset Management
- Save custom grid configurations
- Load presets instantly
- Edit and delete presets
- 6 built-in professional presets (Mobile, Tablet, Desktop, Square, Banner, A4)
- Maximum 50 custom presets

### 🧠 Artboard Memory
- Automatically remembers grid settings per artboard
- Loads saved config when switching artboards
- Per-document storage
- Maximum 100 artboards per document

### 🔧 Advanced Features
- Non-destructive guide management (dedicated layer)
- Batch apply to all artboards
- Support for multiple units (px, pt, mm, cm, in)
- Comprehensive error handling
- Real-time validation

### 🎭 Premium Design
- Clean, minimal interface inspired by Robinhood and Apple
- Formloop design system
- No drop shadows, controlled radius
- Responsive controls (input + slider)
- Smooth animations and transitions

---

## 🚀 Quick Start

### Installation

1. **Download** the latest release
2. **Extract** to Adobe CEP extensions folder:
   - macOS: `~/Library/Application Support/Adobe/CEP/extensions/`
   - Windows: `C:\Program Files\Common Files\Adobe\CEP\extensions\`
3. **Restart** Illustrator
4. **Open** Window > Extensions > Formloop Grid Tool

See [INSTALLATION.md](INSTALLATION.md) for detailed setup instructions.

### First Use

1. Create or open a document with artboards
2. Choose **Auto-Detect** or **Custom** mode
3. Configure grid settings
4. Click **Apply Grid**
5. Guides appear in your artboard

See [USER_GUIDE.md](USER_GUIDE.md) for comprehensive usage guide.

---

## 📋 Requirements

### Minimum
- **Illustrator**: 2022 (v26) or later
- **macOS**: 10.15+ or **Windows**: 10/11
- **Disk Space**: 50 MB

### Recommended
- **Illustrator**: 2024 (v28)
- **macOS**: 12+ or **Windows**: 11
- **Disk Space**: 100 MB

---

## 📚 Documentation

- **[USER_GUIDE.md](USER_GUIDE.md)** - Comprehensive user guide with workflows
- **[INSTALLATION.md](INSTALLATION.md)** - Step-by-step installation instructions
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Common issues and solutions
- **[DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md)** - Architecture and development info
- **[PHASE_8_TESTING_QA.md](PHASE_8_TESTING_QA.md)** - Testing and QA procedures

---

## 🎯 Use Cases

### Web Design
- Create responsive grids for mobile, tablet, desktop
- Use presets for consistent layouts
- Switch between artboards with saved settings

### Mobile App Design
- Auto-detect suggests optimal column count
- Save presets for different device sizes
- Artboard memory remembers each device's grid

### Print Design
- Use A4 preset for standard print layouts
- Configure custom margins for bleeds
- Save print-specific presets

### Design Systems
- Create master grid presets
- Apply to all artboards at once
- Maintain consistency across components

### Responsive Design
- Configure grids for each breakpoint
- Artboard memory saves each breakpoint's settings
- Quick switching between breakpoints

---

## 🏗️ Architecture

### Technology Stack
- **Frontend**: React 19 + TypeScript + Tailwind CSS 4
- **Backend**: ExtendScript (Adobe Illustrator API)
- **Communication**: CEP (Common Extensibility Platform)
- **Storage**: Browser localStorage + Illustrator layers

### Key Components

**React UI** (`client/src/`)
- GridPanel: Main component with state management
- Sections: Margins, Columns, Rows, Baseline, Presets, Scope
- Hooks: useGridPreview for preview management

**ExtendScript** (`host/host.jsx`)
- Grid generation engine
- Guide creation and management
- Auto-detect algorithm
- Layer management

**Libraries**
- `cep-bridge.ts`: UI ↔ ExtendScript communication
- `grid-schema.ts`: Data models and validation
- `preset-storage.ts`: Preset persistence
- `artboard-memory.ts`: Artboard settings storage

---

## 🔄 Workflows

### Auto-Detect Workflow
1. Switch to Auto-Detect mode
2. Plugin analyzes active artboard
3. Format class and grid suggestion display
4. Click Apply Grid
5. Guides created automatically

### Custom Workflow
1. Switch to Custom mode
2. Adjust margins, columns, rows, baseline
3. Toggle grid elements as needed
4. Click Apply Grid
5. Guides created with custom settings

### Preset Workflow
1. Configure grid
2. Click Save
3. Enter preset name
4. Click Save
5. Later: Click Load → Select preset → Click Apply Grid

### Artboard Memory Workflow
1. Configure grid for Artboard 1
2. Click Apply Grid
3. Switch to Artboard 2
4. Configure different grid
5. Click Apply Grid
6. Switch back to Artboard 1
7. Saved config loads automatically

---

## 📊 Performance

- **CEP Initialization**: < 100ms
- **Document Info Load**: < 500ms
- **Auto-Detect**: < 1000ms
- **Grid Application (1 artboard)**: < 500ms
- **Grid Application (100 artboards)**: < 2000ms
- **Preset Save/Load**: < 50ms
- **Memory Usage**: < 50MB

---

## 🐛 Known Limitations (v1.0)

- Preview requires manual trigger (not real-time)
- Auto-detect only works with active artboard
- No undo/redo integration
- No cloud sync of presets
- No preset categories
- No batch auto-detect for all artboards
- No grid visualization overlay

---

## 🚀 Future Enhancements (v2+)

- Real-time live preview
- Batch auto-detect for all artboards
- Undo/redo integration
- Cloud sync of presets
- Preset categories and organization
- Grid visualization overlay
- Export/import grid configs as JSON
- Artboard-specific preset overrides
- Community preset library
- Grid comparison view

---

## 🤝 Contributing

Contributions are welcome! Please see [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md) for:
- Development setup
- Architecture overview
- Coding standards
- Pull request process

---

## 📝 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) file for details.

---

## 💬 Support

### Documentation
- **User Guide**: [USER_GUIDE.md](USER_GUIDE.md)
- **Installation**: [INSTALLATION.md](INSTALLATION.md)
- **Troubleshooting**: [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- **Development**: [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md)

### Getting Help
- **GitHub Issues**: [Report bugs or request features](https://github.com/erickjm2/formloop-grid-generator/issues)
- **Email**: support@formloop.io (future)
- **Community**: Join our community forum (future)

---

## 🙏 Acknowledgments

- Inspired by professional design tools like Figma and Adobe XD
- Design philosophy influenced by Robinhood and Apple
- Built with modern web technologies and best practices

---

## 📈 Project Status

**Current Version**: 1.0.0  
**Status**: Production Ready ✅  
**Last Updated**: April 15, 2026

### Version History

**v1.0.0** (April 15, 2026)
- Initial release
- Auto-detect grid generation
- Custom grid configuration
- Preset management system
- Artboard memory feature
- 6 built-in professional presets
- Premium UI design
- Comprehensive documentation

---

## 🎨 Design Credits

- **Design System**: Formloop
- **Inspiration**: Robinhood, Apple, Figma
- **Icons**: Lucide React
- **UI Framework**: Tailwind CSS 4

---

## 📞 Contact

- **GitHub**: https://github.com/erickjm2/formloop-grid-generator
- **Email**: support@formloop.io (future)
- **Twitter**: @formloop (future)

---

## 🎉 Thank You!

Thank you for using Formloop Grid & Margin Generator. We hope it helps you create beautiful, consistent designs!

**Happy designing! 🎨**

---

<div align="center">

**[Installation Guide](INSTALLATION.md)** • **[User Guide](USER_GUIDE.md)** • **[Report Issue](https://github.com/erickjm2/formloop-grid-generator/issues)** • **[Request Feature](https://github.com/erickjm2/formloop-grid-generator/issues)**

Made with ❤️ by the Formloop team

</div>
