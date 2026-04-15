# Adobe CEP Plugin Setup Guide

## Overview

This document outlines the setup required to transform the React-based web application into a proper Adobe CEP (Common Extensibility Platform) plugin for Adobe Illustrator.

## What is CEP?

CEP is Adobe's framework for building extensions that can communicate between a web-based UI panel and Adobe applications (like Illustrator) through ExtendScript.

## Architecture

```
┌─────────────────────────────────────────┐
│     Adobe Illustrator Application       │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐   │
│  │   ExtendScript Host Layer       │   │
│  │   (host.jsx)                    │   │
│  │   - Grid engine logic           │   │
│  │   - Guide creation/management   │   │
│  │   - Artboard interaction        │   │
│  └──────────────┬──────────────────┘   │
│                 │                       │
│                 │ (CEP Bridge)          │
│                 │                       │
│  ┌──────────────▼──────────────────┐   │
│  │   CEP Panel (HTML/CSS/JS)       │   │
│  │   - React UI                    │   │
│  │   - User controls               │   │
│  │   - Preset management           │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

## Key Files Required

### 1. **manifest.xml**
- Adobe plugin configuration file
- Defines plugin metadata, version, requirements
- Specifies the CEP panel entry point

### 2. **host.jsx** (ExtendScript)
- Runs inside Illustrator
- Contains grid generation logic
- Handles guide creation/deletion
- Communicates with the UI panel via CSInterface

### 3. **index.html** (Updated)
- Entry point for the CEP panel
- Must include CSInterface.js library
- Loads React application

### 4. **Panel Communication Bridge**
- JavaScript utility to handle CEP communication
- Sends commands from UI to ExtendScript
- Receives responses and updates

## Installation Paths

CEP plugins are installed in platform-specific directories:

### macOS
```
~/Library/Application Support/Adobe/CEP/extensions/
```

### Windows
```
C:\Users\[Username]\AppData\Roaming\Adobe\CEP\extensions\
```

### Linux
```
~/.config/Adobe/CEP/extensions/
```

## Build and Deployment Process

1. **Development**: Run `pnpm dev` to start the dev server
2. **Build**: Run `pnpm build` to create production assets
3. **Package**: Create the plugin package structure
4. **Install**: Copy to the CEP extensions directory
5. **Enable**: Enable unsigned extensions in Illustrator preferences (for development)

## Development vs. Production

### Development
- Panel loads from local dev server (http://localhost:3000)
- Hot reload enabled
- Debug tools available
- Manifest points to dev server

### Production
- Panel loads from bundled HTML/CSS/JS
- All assets embedded in plugin package
- Optimized build
- Manifest points to local files

## Next Steps

1. Create `manifest.xml` with plugin metadata
2. Create `host.jsx` with ExtendScript logic
3. Create CEP bridge communication utility
4. Update build process to handle both dev and production modes
5. Create installation script for developers
6. Test in Illustrator

## References

- [Adobe CEP Documentation](https://github.com/Adobe-CEP/CEP-Resources)
- [ExtendScript Documentation](https://github.com/Adobe-CEP/CEP-Resources/tree/master/ExtendScript-Toolkit)
- [CEP Panel Development Guide](https://github.com/Adobe-CEP/CEP-Resources/wiki)
