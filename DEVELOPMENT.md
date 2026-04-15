# Development Guide - Formloop Grid & Margin Generator Plugin

## Overview

This guide explains how to set up, develop, and build the Formloop Grid & Margin Generator as an Adobe CEP plugin for Adobe Illustrator.

## Prerequisites

- Node.js 18+ and pnpm
- Adobe Illustrator 2024 or later (version 26.0+)
- Basic understanding of ExtendScript and CEP plugins

## Project Structure

```
illustrator-grid-plugin/
├── client/                    # React UI panel
│   ├── src/
│   │   ├── lib/
│   │   │   └── cep-bridge.ts # CEP communication utility
│   │   ├── pages/            # Page components
│   │   ├── components/       # Reusable UI components
│   │   ├── App.tsx           # Main app component
│   │   └── main.tsx          # React entry point
│   ├── index.html            # Panel HTML
│   └── public/               # Static assets
├── host/
│   └── host.jsx              # ExtendScript host logic
├── manifest.xml              # Adobe plugin manifest
├── vite.config.ts            # Vite build configuration
└── package.json              # Node dependencies
```

## Development Workflow

### 1. Install Dependencies

```bash
cd /home/ubuntu/illustrator-grid-plugin
pnpm install
```

### 2. Start Development Server

```bash
pnpm dev
```

This starts a local dev server at `http://localhost:3000`. The CEP panel will load from this server during development.

### 3. Build for Production

```bash
pnpm build
```

This creates optimized production assets in the `dist/public` directory.

## Setting Up the Plugin for Testing

### macOS

1. Create the CEP extensions directory if it doesn't exist:
   ```bash
   mkdir -p ~/Library/Application\ Support/Adobe/CEP/extensions/
   ```

2. Create a symbolic link to the plugin:
   ```bash
   ln -s /home/ubuntu/illustrator-grid-plugin ~/Library/Application\ Support/Adobe/CEP/extensions/com.formloop.grid-generator
   ```

### Windows

1. Create the CEP extensions directory if it doesn't exist:
   ```
   C:\Users\[Username]\AppData\Roaming\Adobe\CEP\extensions\
   ```

2. Create a symbolic link or copy the plugin folder:
   ```
   mklink /D "C:\Users\[Username]\AppData\Roaming\Adobe\CEP\extensions\com.formloop.grid-generator" "C:\path\to\illustrator-grid-plugin"
   ```

### Linux

1. Create the CEP extensions directory if it doesn't exist:
   ```bash
   mkdir -p ~/.config/Adobe/CEP/extensions/
   ```

2. Create a symbolic link:
   ```bash
   ln -s /home/ubuntu/illustrator-grid-plugin ~/.config/Adobe/CEP/extensions/com.formloop.grid-generator
   ```

## Enabling Unsigned Extensions (Development Only)

To test unsigned plugins during development, you need to enable them in Adobe Illustrator:

### macOS & Windows

1. Open Illustrator
2. Go to **Preferences** → **Security** (or **Edit** → **Preferences** → **Security**)
3. Check **Allow unsigned extensions**
4. Restart Illustrator

### Linux

Edit the configuration file:
```bash
nano ~/.config/Adobe/Common/Media Cache/cache.db
```

Or use the Preferences dialog if available.

## Loading the Plugin in Illustrator

1. Start Illustrator
2. Go to **Window** → **Extensions** → **Formloop Grid & Margin Generator**
3. The panel should appear on the right side

If the panel doesn't appear:
- Check the Illustrator console for errors (Window → Developer → JavaScript Console)
- Verify the manifest.xml is valid
- Check that the CEP extensions folder is correct
- Ensure Illustrator is version 26.0 or later

## Development Tips

### Hot Reload

During development, changes to React components will hot-reload automatically thanks to Vite. However, changes to ExtendScript (host.jsx) require restarting Illustrator.

### Debugging

#### React UI Debugging

1. Open the browser console in the CEP panel:
   - Right-click in the panel → Inspect Element
   - Or use the browser developer tools

2. Check logs:
   ```bash
   tail -f .manus-logs/browserConsole.log
   ```

#### ExtendScript Debugging

1. Open the JavaScript Console in Illustrator:
   - **Window** → **Developer** → **JavaScript Console**

2. Add debug logging in host.jsx:
   ```javascript
   $.writeln("Debug message: " + value);
   ```

### Testing Auto-Detect

To test the auto-detect functionality:

1. Create artboards of different sizes in Illustrator
2. Open the Grid Tool panel
3. Switch to Auto-Detect mode
4. Select different artboards to see suggested values change

## Building for Distribution

### 1. Update Version Numbers

Update version in:
- `package.json` (version field)
- `manifest.xml` (Version and ExtensionBundleVersion attributes)

### 2. Build Production Assets

```bash
pnpm build
```

### 3. Create Plugin Package

The plugin package should include:
- `manifest.xml`
- `index.html` (from dist/public)
- `host/host.jsx`
- `icons/` (icon files)
- All bundled assets from `dist/public`

### 4. Sign the Plugin (Optional but Recommended)

Adobe provides signing tools. See the [Adobe CEP Resources](https://github.com/Adobe-CEP/CEP-Resources) for details.

## Troubleshooting

### Panel doesn't load

1. Check manifest.xml syntax:
   ```bash
   xmllint manifest.xml
   ```

2. Verify the MainPath in manifest.xml points to index.html

3. Check Illustrator error logs

### ExtendScript errors

1. Open JavaScript Console in Illustrator
2. Look for error messages
3. Check that host.jsx syntax is valid

### Communication issues

1. Verify CSInterface is available:
   ```javascript
   console.log(typeof CSInterface);
   ```

2. Check event names match between UI and host

3. Verify JSON serialization of data

### Performance issues

1. Debounce preview updates
2. Limit the number of guides being drawn
3. Profile with browser DevTools

## File Reference

### manifest.xml

Defines plugin metadata and requirements:
- Plugin ID and version
- Illustrator version requirements (26.0+)
- Panel dimensions and icons
- Entry points (HTML and ExtendScript)

### host.jsx

ExtendScript code running inside Illustrator:
- Handles grid generation logic
- Manages guides and layers
- Communicates with the UI panel

### cep-bridge.ts

TypeScript utility for UI-to-ExtendScript communication:
- Initializes CEP communication
- Sends commands to host
- Listens for responses
- Handles errors

### index.html

CEP panel entry point:
- Must include CSInterface.js (injected by Adobe)
- Loads React application
- Sets up communication bridge

## Next Steps

1. Implement the React UI components (Phase 4)
2. Connect UI to ExtendScript logic (Phase 6)
3. Implement preset system (Phase 7)
4. Test thoroughly in Illustrator
5. Package for distribution

## Resources

- [Adobe CEP Resources](https://github.com/Adobe-CEP/CEP-Resources)
- [ExtendScript Documentation](https://github.com/Adobe-CEP/CEP-Resources/tree/master/ExtendScript-Toolkit)
- [CEP Panel Development](https://github.com/Adobe-CEP/CEP-Resources/wiki)
- [Illustrator Scripting Guide](https://www.adobe.io/open/standards/PDFL/PDFLScriptingAPI.html)

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review Adobe CEP documentation
3. Check browser console for errors
4. Check Illustrator JavaScript console for ExtendScript errors
