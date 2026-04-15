/**
 * Formloop Grid & Margin Generator - ExtendScript Host
 * 
 * This file runs inside Adobe Illustrator and handles:
 * - Grid generation logic
 * - Guide creation and management
 * - Artboard interaction
 * - Communication with the CEP panel
 * 
 * Version: 1.0.0
 */

// ============================================================================
// CEP Communication Bridge
// ============================================================================

var csInterface = new CSInterface();

/**
 * Listen for messages from the CEP panel
 */
csInterface.addEventListener("com.formloop.grid.apply", function(event) {
    try {
        var config = JSON.parse(event.data);
        var result = applyGrid(config);
        csInterface.evalScript("handleGridApply(" + JSON.stringify(result) + ")");
    } catch (e) {
        csInterface.evalScript("handleGridError('" + e.message + "')");
    }
});

/**
 * Listen for preview requests
 */
csInterface.addEventListener("com.formloop.grid.preview", function(event) {
    try {
        var config = JSON.parse(event.data);
        var result = previewGrid(config);
        csInterface.evalScript("handleGridPreview(" + JSON.stringify(result) + ")");
    } catch (e) {
        csInterface.evalScript("handleGridError('" + e.message + "')");
    }
});

/**
 * Listen for auto-detect requests
 */
csInterface.addEventListener("com.formloop.grid.autodetect", function(event) {
    try {
        var artboardRect = JSON.parse(event.data);
        var config = generateAutoDetectConfig(artboardRect);
        csInterface.evalScript("handleAutoDetect(" + JSON.stringify(config) + ")");
    } catch (e) {
        csInterface.evalScript("handleGridError('" + e.message + "')");
    }
});

// ============================================================================
// Core Grid Engine
// ============================================================================

/**
 * Main function to apply grid to artboards
 * @param {Object} config - Grid configuration object
 * @returns {Object} Result with status and message
 */
function applyGrid(config) {
    if (!app.documents.length) {
        return { success: false, message: "No document open" };
    }

    var doc = app.activeDocument;
    
    try {
        // Ensure plugin-owned layer exists
        var pluginLayer = ensurePluginLayer(doc);
        
        // Clear existing plugin guides
        clearPluginGuides(doc, pluginLayer);
        
        // Get target artboards
        var artboards = getTargetArtboards(doc, config.scope);
        
        if (artboards.length === 0) {
            return { success: false, message: "No artboards found" };
        }
        
        // Generate guides for each artboard
        for (var i = 0; i < artboards.length; i++) {
            generateGridForArtboard(doc, artboards[i], config, pluginLayer);
        }
        
        // Lock the layer
        pluginLayer.locked = true;
        
        return { 
            success: true, 
            message: "Grid applied to " + artboards.length + " artboard(s)",
            artboardsProcessed: artboards.length
        };
    } catch (e) {
        return { success: false, message: e.message };
    }
}

/**
 * Preview grid without permanently applying
 * @param {Object} config - Grid configuration object
 * @returns {Object} Result with preview data
 */
function previewGrid(config) {
    if (!app.documents.length) {
        return { success: false, message: "No document open" };
    }

    var doc = app.activeDocument;
    
    try {
        // Create temporary layer for preview
        var previewLayer = doc.layers.add();
        previewLayer.name = "Formloop Grid Preview";
        
        // Get target artboards
        var artboards = getTargetArtboards(doc, config.scope);
        
        // Generate guides for preview
        for (var i = 0; i < artboards.length; i++) {
            generateGridForArtboard(doc, artboards[i], config, previewLayer);
        }
        
        return { 
            success: true, 
            message: "Preview generated",
            previewLayerId: previewLayer.name
        };
    } catch (e) {
        return { success: false, message: e.message };
    }
}

/**
 * Generate auto-detect configuration based on artboard dimensions
 * @param {Array} artboardRect - [left, top, right, bottom]
 * @returns {Object} Auto-detected configuration
 */
function generateAutoDetectConfig(artboardRect) {
    var width = artboardRect[2] - artboardRect[0];
    var height = artboardRect[1] - artboardRect[3];
    var aspectRatio = width / height;
    
    // Calculate default margins (5% of minimum dimension)
    var minDim = Math.min(width, height);
    var defaultMargin = Math.round(minDim * 0.05);
    
    // Determine column count based on aspect ratio
    var columnCount = 12; // Default
    if (aspectRatio < 0.8) {
        columnCount = 6; // Portrait
    } else if (aspectRatio > 1.4) {
        columnCount = 12; // Landscape
    } else {
        columnCount = 8; // Square-ish
    }
    
    // Determine row count (inverse of column logic)
    var rowCount = 8;
    if (aspectRatio < 0.8) {
        rowCount = 12; // Portrait - more rows
    } else if (aspectRatio > 1.4) {
        rowCount = 6; // Landscape - fewer rows
    }
    
    return {
        mode: "auto",
        scope: "activeArtboard",
        include: {
            margins: true,
            columns: true,
            rows: true,
            baseline: true
        },
        margins: {
            linked: true,
            top: defaultMargin,
            right: defaultMargin,
            bottom: defaultMargin,
            left: defaultMargin,
            unit: "px"
        },
        columns: {
            count: columnCount,
            gutter: 20,
            unit: "px"
        },
        rows: {
            count: rowCount,
            gutter: 15,
            unit: "px"
        },
        baseline: {
            step: 12,
            unit: "px"
        }
    };
}

// ============================================================================
// Layer Management
// ============================================================================

/**
 * Ensure plugin-owned layer exists
 * @param {Document} doc - Active document
 * @returns {Layer} Plugin layer
 */
function ensurePluginLayer(doc) {
    var layerName = "Formloop Grid";
    
    // Check if layer already exists
    for (var i = 0; i < doc.layers.length; i++) {
        if (doc.layers[i].name === layerName) {
            var layer = doc.layers[i];
            layer.locked = false;
            return layer;
        }
    }
    
    // Create new layer if it doesn't exist
    var newLayer = doc.layers.add();
    newLayer.name = layerName;
    return newLayer;
}

/**
 * Clear all plugin-owned guides
 * @param {Document} doc - Active document
 * @param {Layer} pluginLayer - Plugin layer
 */
function clearPluginGuides(doc, pluginLayer) {
    // Remove all items from plugin layer
    while (pluginLayer.pageItems.length > 0) {
        pluginLayer.pageItems[0].remove();
    }
}

/**
 * Get target artboards based on scope
 * @param {Document} doc - Active document
 * @param {String} scope - "activeArtboard" or "allArtboards"
 * @returns {Array} Array of artboard objects
 */
function getTargetArtboards(doc, scope) {
    if (scope === "activeArtboard") {
        return [doc.artboards[doc.artboards.getActiveArtboardIndex()]];
    } else {
        // Return all artboards
        var artboards = [];
        for (var i = 0; i < doc.artboards.length; i++) {
            artboards.push(doc.artboards[i]);
        }
        return artboards;
    }
}

// ============================================================================
// Grid Generation
// ============================================================================

/**
 * Generate grid for a single artboard
 * @param {Document} doc - Active document
 * @param {Artboard} artboard - Target artboard
 * @param {Object} config - Grid configuration
 * @param {Layer} targetLayer - Layer to place guides on
 */
function generateGridForArtboard(doc, artboard, config, targetLayer) {
    var rect = artboard.artboardRect;
    var left = rect[0];
    var top = rect[1];
    var right = rect[2];
    var bottom = rect[3];
    var width = right - left;
    var height = top - bottom;
    
    // Draw margins
    if (config.include.margins) {
        drawMargins(doc, left, top, right, bottom, config.margins, targetLayer);
    }
    
    // Draw columns
    if (config.include.columns) {
        drawColumns(doc, left, top, right, bottom, config.margins, config.columns, targetLayer);
    }
    
    // Draw rows
    if (config.include.rows) {
        drawRows(doc, left, top, right, bottom, config.margins, config.rows, targetLayer);
    }
    
    // Draw baseline grid
    if (config.include.baseline && config.baseline.step > 0) {
        drawBaseline(doc, left, top, right, bottom, config.margins, config.baseline, targetLayer);
    }
}

/**
 * Draw margin guides
 */
function drawMargins(doc, left, top, right, bottom, marginConfig, targetLayer) {
    var m = marginConfig;
    
    // Top margin
    drawLine(doc, left, top - m.top, right, top - m.top, targetLayer);
    
    // Bottom margin
    drawLine(doc, left, bottom + m.bottom, right, bottom + m.bottom, targetLayer);
    
    // Left margin
    drawLine(doc, left + m.left, top, left + m.left, bottom, targetLayer);
    
    // Right margin
    drawLine(doc, right - m.right, top, right - m.right, bottom, targetLayer);
}

/**
 * Draw column guides
 */
function drawColumns(doc, left, top, right, bottom, marginConfig, columnConfig, targetLayer) {
    var contentWidth = (right - left) - marginConfig.left - marginConfig.right;
    var totalGutter = columnConfig.gutter * (columnConfig.count - 1);
    var totalColumnWidth = contentWidth - totalGutter;
    var colWidth = totalColumnWidth / columnConfig.count;
    
    var x = left + marginConfig.left;
    
    for (var i = 0; i < columnConfig.count; i++) {
        // Column left edge
        drawLine(doc, x, top, x, bottom, targetLayer);
        
        // Gutter edges (if not last column)
        if (i < columnConfig.count - 1) {
            var gutterStart = x + colWidth;
            var gutterEnd = gutterStart + columnConfig.gutter;
            
            drawLine(doc, gutterStart, top, gutterStart, bottom, targetLayer);
            drawLine(doc, gutterEnd, top, gutterEnd, bottom, targetLayer);
        }
        
        x += colWidth + columnConfig.gutter;
    }
}

/**
 * Draw row guides
 */
function drawRows(doc, left, top, right, bottom, marginConfig, rowConfig, targetLayer) {
    var contentHeight = (top - bottom) - marginConfig.top - marginConfig.bottom;
    var totalGutter = rowConfig.gutter * (rowConfig.count - 1);
    var totalRowHeight = contentHeight - totalGutter;
    var rowHeight = totalRowHeight / rowConfig.count;
    
    var y = top - marginConfig.top;
    
    for (var i = 0; i < rowConfig.count; i++) {
        // Row top edge
        drawLine(doc, left, y, right, y, targetLayer);
        
        // Gutter edges (if not last row)
        if (i < rowConfig.count - 1) {
            var gutterStart = y - rowHeight;
            var gutterEnd = gutterStart - rowConfig.gutter;
            
            drawLine(doc, left, gutterStart, right, gutterStart, targetLayer);
            drawLine(doc, left, gutterEnd, right, gutterEnd, targetLayer);
        }
        
        y -= rowHeight + rowConfig.gutter;
    }
}

/**
 * Draw baseline grid
 */
function drawBaseline(doc, left, top, right, bottom, marginConfig, baselineConfig, targetLayer) {
    var y = top - marginConfig.top;
    var bottomY = bottom + marginConfig.bottom;
    
    while (y > bottomY) {
        drawLine(doc, left, y, right, y, targetLayer);
        y -= baselineConfig.step;
    }
}

/**
 * Draw a single line (guide)
 */
function drawLine(doc, x1, y1, x2, y2, targetLayer) {
    var line = doc.pathItems.add();
    line.setEntirePath([[x1, y1], [x2, y2]]);
    line.stroked = false;
    line.filled = false;
    line.guides = true;
    line.move(targetLayer, ElementPlacement.PLACEATBEGINNING);
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Convert units (basic implementation)
 * @param {Number} value - Value to convert
 * @param {String} fromUnit - Source unit
 * @param {String} toUnit - Target unit
 * @returns {Number} Converted value
 */
function convertUnit(value, fromUnit, toUnit) {
    if (fromUnit === toUnit) {
        return value;
    }
    
    // Conversion factors to pixels (assuming 72 DPI)
    var toPx = {
        "px": 1,
        "pt": 1,
        "mm": 2.834645669,
        "cm": 28.34645669,
        "in": 72
    };
    
    var toOriginal = {
        "px": 1,
        "pt": 1,
        "mm": 0.352777778,
        "cm": 0.0352777778,
        "in": 0.0138888889
    };
    
    if (!toPx[fromUnit] || !toPx[toUnit]) {
        return value; // Return unchanged if unit not recognized
    }
    
    var px = value * toPx[fromUnit];
    return px * toOriginal[toUnit];
}

// ============================================================================
// Initialization
// ============================================================================

// Log that the host script has loaded
$.writeln("Formloop Grid Generator host script loaded");
