# Formloop Grid & Margin Generator - Installation Guide

**Version**: 1.0.0  
**Last Updated**: April 15, 2026  
**Compatibility**: Illustrator 2022 (v26) and later

---

## System Requirements

### Minimum Requirements

**macOS**:
- macOS 10.15 or later
- Intel or Apple Silicon processor
- Illustrator 2022 (v26) or later
- 50 MB free disk space

**Windows**:
- Windows 10 or Windows 11
- Illustrator 2022 (v26) or later
- 50 MB free disk space

### Recommended Requirements

**macOS**:
- macOS 12 or later
- Illustrator 2024 (v28) or later
- 100 MB free disk space

**Windows**:
- Windows 11
- Illustrator 2024 (v28) or later
- 100 MB free disk space

---

## Installation Steps

### macOS Installation

**Step 1: Locate the Extensions Folder**

Open Finder and navigate to:
```
~/Library/Application Support/Adobe/CEP/extensions/
```

If the `extensions` folder doesn't exist, create it:
1. Open Terminal
2. Run: `mkdir -p ~/Library/Application\ Support/Adobe/CEP/extensions/`

**Step 2: Extract the Plugin**

1. Download `formloop-grid-generator.zip`
2. Extract the ZIP file
3. You should see a folder named `formloop-grid-generator`

**Step 3: Move to Extensions Folder**

1. Move the extracted `formloop-grid-generator` folder to the extensions directory
2. The path should be: `~/Library/Application Support/Adobe/CEP/extensions/formloop-grid-generator`

**Step 4: Rename the Folder** (Optional but Recommended)

For better organization, rename the folder to use the plugin ID:
```
mv formloop-grid-generator com.formloop.grid-generator
```

**Step 5: Restart Illustrator**

1. Close Illustrator completely
2. Reopen Illustrator
3. Go to **Window > Extensions > Formloop Grid Tool**
4. The plugin panel should appear

---

### Windows Installation

**Step 1: Locate the Extensions Folder**

Navigate to:
```
C:\Program Files\Common Files\Adobe\CEP\extensions\
```

If the `extensions` folder doesn't exist, create it:
1. Open File Explorer
2. Navigate to `C:\Program Files\Common Files\Adobe\CEP\`
3. Right-click → New → Folder
4. Name it `extensions`

**Step 2: Extract the Plugin**

1. Download `formloop-grid-generator.zip`
2. Right-click the ZIP file
3. Select "Extract All..."
4. Choose a temporary location
5. You should see a folder named `formloop-grid-generator`

**Step 3: Move to Extensions Folder**

1. Cut the extracted `formloop-grid-generator` folder
2. Navigate to `C:\Program Files\Common Files\Adobe\CEP\extensions\`
3. Paste the folder there
4. The path should be: `C:\Program Files\Common Files\Adobe\CEP\extensions\formloop-grid-generator`

**Step 4: Rename the Folder** (Optional but Recommended)

For better organization, rename the folder:
1. Right-click the folder
2. Select "Rename"
3. Change to: `com.formloop.grid-generator`

**Step 5: Restart Illustrator**

1. Close Illustrator completely
2. Reopen Illustrator
3. Go to **Window > Extensions > Formloop Grid Tool**
4. The plugin panel should appear

---

## Enabling Unsigned Extensions (Development Mode)

If you're testing an unsigned version of the plugin, you need to enable debug mode.

### macOS

**Using Terminal**:
```bash
defaults write com.adobe.CSXS.7 PlayerDebugMode 1
```

**Using Finder**:
1. Open Finder
2. Press Cmd+Shift+G (Go to Folder)
3. Enter: `~/Library/Preferences/`
4. Find and open: `com.adobe.CSXS.7.plist`
5. Add key: `PlayerDebugMode` with value: `1`

### Windows

**Using Registry Editor**:
1. Press Win+R
2. Type: `regedit`
3. Navigate to: `HKEY_CURRENT_USER\Software\Adobe\CSXS.7`
4. Right-click → New → DWORD Value
5. Name: `PlayerDebugMode`
6. Value: `1`

**Restart Illustrator after enabling debug mode.**

---

## Verification Steps

### Verify Installation

1. **Open Illustrator**
   - Launch Adobe Illustrator

2. **Access the Plugin**
   - Go to **Window** menu
   - Look for **Extensions** submenu
   - Click **Formloop Grid Tool**

3. **Check Plugin Panel**
   - A panel should appear on the right side
   - Title should read "Grid Tool"
   - You should see sections for Margins, Columns, Rows, Baseline, Presets, and Scope

4. **Test Basic Functionality**
   - Create a new document
   - Create an artboard (if not already present)
   - Select "Custom" mode
   - Adjust column count to 8
   - Click "Apply Grid"
   - Check Illustrator for guides

5. **Check for Errors**
   - Open browser console (F12 in CEP panel)
   - Look for any red error messages
   - Note: Some warnings are normal

### Troubleshooting Verification

If the plugin doesn't appear:

1. **Check File Location**
   - Verify folder is in correct extensions directory
   - Check folder name (should be `formloop-grid-generator` or `com.formloop.grid-generator`)

2. **Check Illustrator Version**
   - Go to **Illustrator > About Illustrator** (macOS) or **Help > About Illustrator** (Windows)
   - Verify version is 26.0 or later

3. **Check Debug Mode**
   - Verify `PlayerDebugMode` is enabled (if using unsigned version)
   - Restart Illustrator after enabling

4. **Check manifest.xml**
   - Verify `manifest.xml` exists in plugin folder
   - Check it's not corrupted (open with text editor)

---

## Uninstallation

### macOS

1. Open Finder
2. Navigate to: `~/Library/Application Support/Adobe/CEP/extensions/`
3. Delete the `formloop-grid-generator` or `com.formloop.grid-generator` folder
4. Restart Illustrator

### Windows

1. Open File Explorer
2. Navigate to: `C:\Program Files\Common Files\Adobe\CEP\extensions\`
3. Delete the `formloop-grid-generator` or `com.formloop.grid-generator` folder
4. Restart Illustrator

---

## Troubleshooting

### Plugin Doesn't Appear in Window Menu

**Solution 1: Check Installation Path**
- Verify the plugin folder is in the correct extensions directory
- macOS: `~/Library/Application Support/Adobe/CEP/extensions/`
- Windows: `C:\Program Files\Common Files\Adobe\CEP\extensions\`

**Solution 2: Restart Illustrator**
- Close Illustrator completely
- Wait 10 seconds
- Reopen Illustrator
- Check Window > Extensions menu again

**Solution 3: Check Illustrator Version**
- Plugin requires Illustrator 2022 (v26) or later
- Go to Help > About Illustrator to check version
- If older, upgrade Illustrator

**Solution 4: Enable Debug Mode**
- If using an unsigned version, enable `PlayerDebugMode`
- See "Enabling Unsigned Extensions" section above

### Plugin Loads but Shows Errors

**Solution 1: Check Browser Console**
- Press F12 in the plugin panel
- Look for red error messages
- Note the error and check troubleshooting guide

**Solution 2: Check Manifest**
- Open `manifest.xml` in text editor
- Verify it's not corrupted
- Check for XML syntax errors

**Solution 3: Reinstall Plugin**
- Delete plugin folder
- Extract fresh copy from ZIP
- Restart Illustrator

### Grid Not Applying

**Solution 1: Check Document**
- Verify you have an open document
- Verify document has at least one artboard
- Create new artboard if needed

**Solution 2: Check Configuration**
- Verify grid values are valid
- Margins should be less than artboard dimensions
- Columns/rows should be at least 1

**Solution 3: Check Permissions**
- Verify Illustrator has permission to create layers
- Try applying to a new document

**Solution 4: Check Console**
- Open browser console (F12)
- Look for error messages
- Report errors if needed

### Plugin Crashes or Freezes

**Solution 1: Restart Illustrator**
- Close Illustrator
- Wait 10 seconds
- Reopen Illustrator

**Solution 2: Clear Cache**
- macOS: `~/Library/Caches/Adobe/CEP/`
- Windows: `C:\Users\[YourUsername]\AppData\Local\Adobe\CEP\`
- Delete cache folder
- Restart Illustrator

**Solution 3: Reinstall Plugin**
- Uninstall plugin (see Uninstallation section)
- Restart Illustrator
- Reinstall plugin

### Storage Issues

**Problem**: "Maximum number of presets (50) reached"

**Solution**:
- Delete unused presets
- Go to Load Presets
- Hover over preset and click delete icon
- Try saving again

**Problem**: Presets not saving

**Solution**:
- Check browser localStorage is enabled
- Try clearing browser cache
- Restart Illustrator
- Try again

### Performance Issues

**Problem**: Grid application is slow

**Solution 1**: Reduce number of artboards
- Apply grid to active artboard only
- Use "Active Artboard" scope

**Solution 2**: Close other applications
- Free up system memory
- Close unnecessary Illustrator documents

**Solution 3**: Restart Illustrator
- Close and reopen Illustrator
- Try again

---

## Getting Help

### Documentation

- **User Guide**: See USER_GUIDE.md for detailed usage instructions
- **Troubleshooting**: See TROUBLESHOOTING.md for common issues
- **FAQ**: See FAQ.md for frequently asked questions

### Support

- **GitHub Issues**: Report bugs at https://github.com/erickjm2/formloop-grid-generator/issues
- **Email**: support@formloop.io (future)
- **Community**: Join our community forum (future)

### Reporting Issues

When reporting an issue, please include:
1. Illustrator version (Help > About Illustrator)
2. Operating system and version
3. Plugin version (check panel title)
4. Steps to reproduce the issue
5. Error message (if any)
6. Browser console output (F12)

---

## Frequently Asked Questions

**Q: Is the plugin free?**  
A: Yes, Formloop Grid & Margin Generator is free and open source.

**Q: What Illustrator versions are supported?**  
A: Illustrator 2022 (v26) and later. Tested on 2022, 2023, and 2024.

**Q: Can I use the plugin on multiple computers?**  
A: Yes, install on any computer with Illustrator.

**Q: Are my presets backed up?**  
A: Presets are stored locally in browser storage. They persist across Illustrator restarts but are specific to each computer.

**Q: Can I export my presets?**  
A: Yes, presets can be exported as JSON (feature coming in v1.1).

**Q: Is my data private?**  
A: Yes, all data is stored locally. No data is sent to servers.

**Q: Can I contribute to the project?**  
A: Yes! See DEVELOPER_GUIDE.md for contribution guidelines.

---

## Next Steps

After installation:

1. **Read the User Guide**: See USER_GUIDE.md for detailed usage
2. **Try Auto-Detect**: Test auto-detect mode with different artboard sizes
3. **Create Presets**: Save your favorite grid configurations
4. **Explore Artboard Memory**: Switch between artboards and see settings remembered
5. **Provide Feedback**: Share your thoughts and suggestions

---

## Support and Feedback

We'd love to hear from you! Please share your feedback, report bugs, or suggest features:

- **GitHub Issues**: https://github.com/erickjm2/formloop-grid-generator/issues
- **Email**: support@formloop.io (future)
- **Twitter**: @formloop (future)

---

## License

Formloop Grid & Margin Generator is released under the MIT License. See LICENSE file for details.

---

**Happy designing! 🎨**
