/**
 * Grid Configuration Schema
 * 
 * Defines the structure and types for grid configurations,
 * presets, and related data models.
 */

/**
 * Margin configuration
 */
export interface MarginConfig {
  linked: boolean;
  top: number;
  right: number;
  bottom: number;
  left: number;
  unit: "px" | "pt" | "mm" | "cm" | "in";
}

/**
 * Column configuration
 */
export interface ColumnConfig {
  count: number;
  gutter: number;
  unit: "px" | "pt" | "mm" | "cm" | "in";
}

/**
 * Row configuration
 */
export interface RowConfig {
  count: number;
  gutter: number;
  unit: "px" | "pt" | "mm" | "cm" | "in";
}

/**
 * Baseline grid configuration
 */
export interface BaselineConfig {
  step: number;
  unit: "px" | "pt" | "mm" | "cm" | "in";
}

/**
 * Include toggles for grid elements
 */
export interface IncludeConfig {
  margins: boolean;
  columns: boolean;
  rows: boolean;
  baseline: boolean;
}

/**
 * Main grid configuration object
 */
export interface GridConfig {
  mode: "auto" | "custom";
  scope: "activeArtboard" | "allArtboards";
  include: IncludeConfig;
  margins: MarginConfig;
  columns: ColumnConfig;
  rows: RowConfig;
  baseline: BaselineConfig;
}

/**
 * Preset object
 */
export interface Preset {
  id: string;
  name: string;
  description?: string;
  builtIn: boolean;
  config: GridConfig;
  createdAt?: number;
  updatedAt?: number;
}

/**
 * Default grid configuration
 */
export const DEFAULT_GRID_CONFIG: GridConfig = {
  mode: "auto",
  scope: "activeArtboard",
  include: {
    margins: true,
    columns: true,
    rows: true,
    baseline: true,
  },
  margins: {
    linked: true,
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
    unit: "px",
  },
  columns: {
    count: 12,
    gutter: 20,
    unit: "px",
  },
  rows: {
    count: 8,
    gutter: 15,
    unit: "px",
  },
  baseline: {
    step: 12,
    unit: "px",
  },
};

/**
 * Built-in presets
 */
export const BUILTIN_PRESETS: Preset[] = [
  {
    id: "preset_mobile",
    name: "Mobile",
    description: "4-column grid for mobile layouts",
    builtIn: true,
    config: {
      mode: "custom",
      scope: "allArtboards",
      include: {
        margins: true,
        columns: true,
        rows: true,
        baseline: true,
      },
      margins: {
        linked: true,
        top: 16,
        right: 16,
        bottom: 16,
        left: 16,
        unit: "px",
      },
      columns: {
        count: 4,
        gutter: 16,
        unit: "px",
      },
      rows: {
        count: 6,
        gutter: 12,
        unit: "px",
      },
      baseline: {
        step: 12,
        unit: "px",
      },
    },
  },
  {
    id: "preset_tablet",
    name: "Tablet",
    description: "6-column grid for tablet layouts",
    builtIn: true,
    config: {
      mode: "custom",
      scope: "allArtboards",
      include: {
        margins: true,
        columns: true,
        rows: true,
        baseline: true,
      },
      margins: {
        linked: true,
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
        unit: "px",
      },
      columns: {
        count: 6,
        gutter: 20,
        unit: "px",
      },
      rows: {
        count: 8,
        gutter: 16,
        unit: "px",
      },
      baseline: {
        step: 12,
        unit: "px",
      },
    },
  },
  {
    id: "preset_desktop",
    name: "Desktop",
    description: "12-column grid for desktop layouts",
    builtIn: true,
    config: {
      mode: "custom",
      scope: "allArtboards",
      include: {
        margins: true,
        columns: true,
        rows: true,
        baseline: true,
      },
      margins: {
        linked: true,
        top: 24,
        right: 24,
        bottom: 24,
        left: 24,
        unit: "px",
      },
      columns: {
        count: 12,
        gutter: 24,
        unit: "px",
      },
      rows: {
        count: 8,
        gutter: 20,
        unit: "px",
      },
      baseline: {
        step: 12,
        unit: "px",
      },
    },
  },
  {
    id: "preset_square",
    name: "Square",
    description: "8-column grid for square formats",
    builtIn: true,
    config: {
      mode: "custom",
      scope: "allArtboards",
      include: {
        margins: true,
        columns: true,
        rows: true,
        baseline: true,
      },
      margins: {
        linked: true,
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
        unit: "px",
      },
      columns: {
        count: 8,
        gutter: 16,
        unit: "px",
      },
      rows: {
        count: 8,
        gutter: 16,
        unit: "px",
      },
      baseline: {
        step: 12,
        unit: "px",
      },
    },
  },
  {
    id: "preset_banner",
    name: "Banner",
    description: "16-column grid for wide banner formats",
    builtIn: true,
    config: {
      mode: "custom",
      scope: "allArtboards",
      include: {
        margins: true,
        columns: true,
        rows: true,
        baseline: true,
      },
      margins: {
        linked: true,
        top: 16,
        right: 16,
        bottom: 16,
        left: 16,
        unit: "px",
      },
      columns: {
        count: 16,
        gutter: 12,
        unit: "px",
      },
      rows: {
        count: 4,
        gutter: 12,
        unit: "px",
      },
      baseline: {
        step: 12,
        unit: "px",
      },
    },
  },
  {
    id: "preset_a4",
    name: "A4",
    description: "8-column grid for A4 print layouts",
    builtIn: true,
    config: {
      mode: "custom",
      scope: "allArtboards",
      include: {
        margins: true,
        columns: true,
        rows: true,
        baseline: true,
      },
      margins: {
        linked: true,
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
        unit: "mm",
      },
      columns: {
        count: 8,
        gutter: 10,
        unit: "mm",
      },
      rows: {
        count: 12,
        gutter: 8,
        unit: "mm",
      },
      baseline: {
        step: 4,
        unit: "mm",
      },
    },
  },
];

/**
 * Validation errors
 */
export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Validate grid configuration
 */
export function validateGridConfig(
  config: GridConfig,
  artboardWidth?: number,
  artboardHeight?: number
): ValidationError[] {
  const errors: ValidationError[] = [];

  // Validate margins
  if (config.margins.top < 0) errors.push({ field: "margins.top", message: "Must be non-negative" });
  if (config.margins.right < 0) errors.push({ field: "margins.right", message: "Must be non-negative" });
  if (config.margins.bottom < 0) errors.push({ field: "margins.bottom", message: "Must be non-negative" });
  if (config.margins.left < 0) errors.push({ field: "margins.left", message: "Must be non-negative" });

  // Validate columns
  if (config.columns.count < 1) errors.push({ field: "columns.count", message: "Must be at least 1" });
  if (!Number.isInteger(config.columns.count)) errors.push({ field: "columns.count", message: "Must be an integer" });
  if (config.columns.gutter < 0) errors.push({ field: "columns.gutter", message: "Must be non-negative" });

  // Validate rows
  if (config.rows.count < 1) errors.push({ field: "rows.count", message: "Must be at least 1" });
  if (!Number.isInteger(config.rows.count)) errors.push({ field: "rows.count", message: "Must be an integer" });
  if (config.rows.gutter < 0) errors.push({ field: "rows.gutter", message: "Must be non-negative" });

  // Validate baseline
  if (config.baseline.step <= 0) errors.push({ field: "baseline.step", message: "Must be greater than 0" });

  // Validate against artboard dimensions if provided
  if (artboardWidth && artboardHeight) {
    const totalMarginWidth = config.margins.left + config.margins.right;
    const totalMarginHeight = config.margins.top + config.margins.bottom;

    if (totalMarginWidth >= artboardWidth) {
      errors.push({ field: "margins", message: "Margins exceed artboard width" });
    }

    if (totalMarginHeight >= artboardHeight) {
      errors.push({ field: "margins", message: "Margins exceed artboard height" });
    }

    // Check if columns can fit
    const contentWidth = artboardWidth - totalMarginWidth;
    const totalGutterWidth = config.columns.gutter * (config.columns.count - 1);
    if (totalGutterWidth >= contentWidth) {
      errors.push({ field: "columns", message: "Gutters exceed available width" });
    }

    // Check if rows can fit
    const contentHeight = artboardHeight - totalMarginHeight;
    const totalGutterHeight = config.rows.gutter * (config.rows.count - 1);
    if (totalGutterHeight >= contentHeight) {
      errors.push({ field: "rows", message: "Gutters exceed available height" });
    }
  }

  return errors;
}

/**
 * Create a deep copy of grid config
 */
export function cloneGridConfig(config: GridConfig): GridConfig {
  return JSON.parse(JSON.stringify(config));
}

/**
 * Merge partial config with defaults
 */
export function mergeWithDefaults(partial: Partial<GridConfig>): GridConfig {
  return {
    ...DEFAULT_GRID_CONFIG,
    ...partial,
    include: {
      ...DEFAULT_GRID_CONFIG.include,
      ...(partial.include || {}),
    },
    margins: {
      ...DEFAULT_GRID_CONFIG.margins,
      ...(partial.margins || {}),
    },
    columns: {
      ...DEFAULT_GRID_CONFIG.columns,
      ...(partial.columns || {}),
    },
    rows: {
      ...DEFAULT_GRID_CONFIG.rows,
      ...(partial.rows || {}),
    },
    baseline: {
      ...DEFAULT_GRID_CONFIG.baseline,
      ...(partial.baseline || {}),
    },
  };
}
