/**
 * Grid & Margin Generator v1.3
 * Author: Studio Erick Works
 * www.erickmelendez.com
 * License: Free for personal/commercial use
 */

(function () {
    if (app.documents.length === 0) {
        alert("Please open a document first.");
        return;
    }

    var doc = app.activeDocument;

    // --- UI Dialog ---
    var win = new Window("dialog", "Grid & Margin Generator");
    win.alignChildren = "fill";

    var useCustom = win.add("checkbox", undefined, "Use custom settings (override auto-detect)");
    useCustom.value = false;

    // --- Custom Input Panel ---
    var customGroup = win.add("panel", undefined, "Custom Settings");
    customGroup.orientation = "column";
    customGroup.alignChildren = "left";
    customGroup.enabled = false;

    function addInput(label) {
        var g = customGroup.add("group");
        g.add("statictext", undefined, label);
        var field = g.add("edittext", undefined, "0");
        field.characters = 10;
        return field;
    }

    var marginTop = addInput("Top Margin:");
    var marginBottom = addInput("Bottom Margin:");
    var marginLeft = addInput("Left Margin:");
    var marginRight = addInput("Right Margin:");
    var columnCount = addInput("Columns:");
    var gutterWidth = addInput("Gutter:");
    var baselineStep = addInput("Baseline:");

    useCustom.onClick = function () {
        customGroup.enabled = useCustom.value;
    };

    var addMargins = win.add("checkbox", undefined, "Add Margins");
    var addColumns = win.add("checkbox", undefined, "Add Columns");
    var addBaseline = win.add("checkbox", undefined, "Add Baseline Grid");
    addMargins.value = addColumns.value = addBaseline.value = true;

    // --- Input sanitization
    var fields = [marginTop, marginBottom, marginLeft, marginRight, columnCount, gutterWidth, baselineStep];
    for (var i = 0; i < fields.length; i++) {
        (function (field) {
            field.onChange = function () {
                var value = field.text.replace(/[^\d.]/g, "");
                field.text = value;
            };
        })(fields[i]);
    }

    var btnGroup = win.add("group");
    var cancelBtn = btnGroup.add("button", undefined, "Cancel");
    var generateBtn = btnGroup.add("button", undefined, "Generate");

    generateBtn.onClick = function () {
        var config;

        if (useCustom.value) {
            config = {
                useCustom: true,
                margins: {
                    top: parseFloat(marginTop.text),
                    right: parseFloat(marginRight.text),
                    bottom: parseFloat(marginBottom.text),
                    left: parseFloat(marginLeft.text)
                },
                columns: parseInt(columnCount.text),
                gutter: parseFloat(gutterWidth.text),
                baseline: parseFloat(baselineStep.text)
            };

            if (isNaN(config.columns) || config.columns < 1 || isNaN(config.gutter) || config.gutter < 0) {
                alert("Invalid configuration. Please check your inputs.");
                return;
            }
        } else {
            config = {
                useCustom: false
            };
        }

        win.close();
        generateGuides(config);
    };

    cancelBtn.onClick = function () {
        win.close();
    };

    win.show();

    // --- Generate Guides ---
    function generateGuides(config) {
        try {
            var guidesLayer = doc.layers.item("Guides");
            if (guidesLayer) {
                if (!confirm("Clear existing Guides layer and regenerate?")) return;
                guidesLayer.remove();
            }
        } catch (e) {}

        var guides = doc.layers.add();
        guides.name = "Guides";

        for (var i = 0; i < doc.artboards.length; i++) {
            var ab = doc.artboards[i];
            var abRect = ab.artboardRect;
            var abLeft = abRect[0], abTop = abRect[1];
            var width = abRect[2] - abRect[0];
            var height = abRect[1] - abRect[3];

            var m = config.useCustom
                ? config.margins
                : getDefaultMargins(width, height);

            var columns = config.useCustom
                ? config.columns
                : smartColumnCount(width, height);

            var gutter = config.useCustom
                ? config.gutter
                : 20;

            var baseline = config.useCustom
                ? config.baseline
                : 12;

            // --- MARGINS ---
            if (addMargins.value) {
                makeLine(abLeft + m.left, abTop, abLeft + m.left, abTop - height, guides); // Left
                makeLine(abLeft + width - m.right, abTop, abLeft + width - m.right, abTop - height, guides); // Right
                makeLine(abLeft, abTop - m.top, abLeft + width, abTop - m.top, guides); // Top
                makeLine(abLeft, abTop - height + m.bottom, abLeft + width, abTop - height + m.bottom, guides); // Bottom
            }

            // --- COLUMNS ---
            if (addColumns.value) {
                var totalGutter = gutter * (columns - 1);
                var totalColumnWidth = width - m.left - m.right - totalGutter;
                var colWidth = totalColumnWidth / columns;
                var x = abLeft + m.left;

                for (var c = 0; c < columns; c++) {
                    var colStart = x;
                    var colEnd = x + colWidth;

                    // Column left edge
                    makeLine(colStart, abTop, colStart, abTop - height, guides);

                    if (c < columns - 1) {
                        var gutterStart = colEnd;
                        var gutterEnd = colEnd + gutter;

                        // Gutter edges
                        makeLine(gutterStart, abTop, gutterStart, abTop - height, guides);
                        makeLine(gutterEnd, abTop, gutterEnd, abTop - height, guides);
                    }

                    x = colEnd + gutter;
                }
            }

            // --- BASELINE GRID ---
            if (addBaseline.value && baseline > 0) {
                var y = abTop - m.top;
                var bottomY = abTop - height + m.bottom;
                while (y > bottomY) {
                    makeLine(abLeft, y, abLeft + width, y, guides);
                    y -= baseline;
                }
            }
        }

        guides.locked = true;
    }

    // --- Smart Column Count ---
    function smartColumnCount(width, height) {
        var aspectRatio = width / height;

        if (aspectRatio >= 1.4) {
            return 12; // Landscape
        } else if (aspectRatio <= 0.8) {
            return 6; // Portrait
        } else {
            return 4; // Square-ish
        }
    }

    // --- Default Margins ---
    function getDefaultMargins(width, height) {
        var margin = Math.round(Math.min(width, height) * 0.05);
        return {
            top: margin,
            right: margin,
            bottom: margin,
            left: margin
        };
    }

    // --- Line Creator ---
    function makeLine(x1, y1, x2, y2, parent) {
        var line = doc.pathItems.add();
        line.setEntirePath([[x1, y1], [x2, y2]]);
        line.stroked = false;
        line.filled = false;
        line.guides = true;
        line.move(parent, ElementPlacement.PLACEATBEGINNING);
    }

})();
