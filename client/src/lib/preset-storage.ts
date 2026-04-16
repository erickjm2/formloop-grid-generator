/**
 * Preset Storage - Handles persistence of custom presets
 * 
 * Stores presets in browser's localStorage with versioning support
 */

import { Preset, GridConfig } from "./grid-schema";

const STORAGE_KEY = "formloop_grid_presets_v1";
const MAX_PRESETS = 50;

interface StorageData {
  version: number;
  presets: Preset[];
  lastModified: number;
}

/**
 * Get all custom presets from storage
 */
export function getCustomPresets(): Preset[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      return [];
    }

    const parsed: StorageData = JSON.parse(data);
    
    // Validate version
    if (parsed.version !== 1) {
      console.warn("Preset storage version mismatch, clearing");
      clearAllPresets();
      return [];
    }

    return parsed.presets || [];
  } catch (error) {
    console.error("Failed to load presets from storage:", error);
    return [];
  }
}

/**
 * Save a new custom preset
 */
export function savePreset(name: string, description: string, config: GridConfig): Preset {
  try {
    const presets = getCustomPresets();

    // Check if we've reached max presets
    if (presets.length >= MAX_PRESETS) {
      throw new Error(`Maximum number of presets (${MAX_PRESETS}) reached`);
    }

    // Check if preset name already exists
    if (presets.some((p) => p.name.toLowerCase() === name.toLowerCase())) {
      throw new Error(`Preset "${name}" already exists`);
    }

    // Create new preset
    const newPreset: Preset = {
      id: `preset_custom_${Date.now()}`,
      name,
      description,
      builtIn: false,
      config,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    // Add to presets
    presets.push(newPreset);

    // Save to storage
    const storageData: StorageData = {
      version: 1,
      presets,
      lastModified: Date.now(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData));

    return newPreset;
  } catch (error) {
    console.error("Failed to save preset:", error);
    throw error;
  }
}

/**
 * Update an existing custom preset
 */
export function updatePreset(presetId: string, name: string, description: string, config: GridConfig): Preset {
  try {
    const presets = getCustomPresets();
    const presetIndex = presets.findIndex((p) => p.id === presetId);

    if (presetIndex === -1) {
      throw new Error("Preset not found");
    }

    const preset = presets[presetIndex];

    // Check if preset is custom (not built-in)
    if (preset.builtIn) {
      throw new Error("Cannot update built-in presets");
    }

    // Check if new name conflicts with other presets
    if (
      name.toLowerCase() !== preset.name.toLowerCase() &&
      presets.some((p) => p.name.toLowerCase() === name.toLowerCase())
    ) {
      throw new Error(`Preset "${name}" already exists`);
    }

    // Update preset
    const updatedPreset: Preset = {
      ...preset,
      name,
      description,
      config,
      updatedAt: Date.now(),
    };

    presets[presetIndex] = updatedPreset;

    // Save to storage
    const storageData: StorageData = {
      version: 1,
      presets,
      lastModified: Date.now(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData));

    return updatedPreset;
  } catch (error) {
    console.error("Failed to update preset:", error);
    throw error;
  }
}

/**
 * Delete a custom preset
 */
export function deletePreset(presetId: string): void {
  try {
    const presets = getCustomPresets();
    const presetIndex = presets.findIndex((p) => p.id === presetId);

    if (presetIndex === -1) {
      throw new Error("Preset not found");
    }

    const preset = presets[presetIndex];

    // Check if preset is custom (not built-in)
    if (preset.builtIn) {
      throw new Error("Cannot delete built-in presets");
    }

    // Remove preset
    presets.splice(presetIndex, 1);

    // Save to storage
    const storageData: StorageData = {
      version: 1,
      presets,
      lastModified: Date.now(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData));
  } catch (error) {
    console.error("Failed to delete preset:", error);
    throw error;
  }
}

/**
 * Get a preset by ID
 */
export function getPresetById(presetId: string): Preset | null {
  try {
    const presets = getCustomPresets();
    return presets.find((p) => p.id === presetId) || null;
  } catch (error) {
    console.error("Failed to get preset:", error);
    return null;
  }
}

/**
 * Clear all custom presets
 */
export function clearAllPresets(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear presets:", error);
  }
}

/**
 * Export presets as JSON
 */
export function exportPresetsAsJSON(): string {
  try {
    const presets = getCustomPresets();
    return JSON.stringify(presets, null, 2);
  } catch (error) {
    console.error("Failed to export presets:", error);
    return "[]";
  }
}

/**
 * Import presets from JSON
 */
export function importPresetsFromJSON(jsonString: string): number {
  try {
    const importedPresets: Preset[] = JSON.parse(jsonString);

    // Validate imported presets
    if (!Array.isArray(importedPresets)) {
      throw new Error("Invalid preset format");
    }

    const currentPresets = getCustomPresets();
    let importedCount = 0;

    for (const importedPreset of importedPresets) {
      // Skip if already exists
      if (currentPresets.some((p) => p.id === importedPreset.id)) {
        continue;
      }

      // Skip if we've reached max presets
      if (currentPresets.length + importedCount >= MAX_PRESETS) {
        break;
      }

      // Validate preset structure
      if (!importedPreset.name || !importedPreset.config) {
        continue;
      }

      // Add imported preset
      currentPresets.push({
        ...importedPreset,
        builtIn: false,
        createdAt: importedPreset.createdAt || Date.now(),
        updatedAt: importedPreset.updatedAt || Date.now(),
      });

      importedCount++;
    }

    // Save to storage
    const storageData: StorageData = {
      version: 1,
      presets: currentPresets,
      lastModified: Date.now(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData));

    return importedCount;
  } catch (error) {
    console.error("Failed to import presets:", error);
    throw error;
  }
}

/**
 * Get storage statistics
 */
export function getStorageStats(): {
  customPresetCount: number;
  maxPresets: number;
  storageUsed: number;
  lastModified: number | null;
} {
  try {
    const presets = getCustomPresets();
    const data = localStorage.getItem(STORAGE_KEY);
    const parsed: StorageData | null = data ? JSON.parse(data) : null;

    return {
      customPresetCount: presets.length,
      maxPresets: MAX_PRESETS,
      storageUsed: data ? data.length : 0,
      lastModified: parsed?.lastModified || null,
    };
  } catch (error) {
    console.error("Failed to get storage stats:", error);
    return {
      customPresetCount: 0,
      maxPresets: MAX_PRESETS,
      storageUsed: 0,
      lastModified: null,
    };
  }
}

export default {
  getCustomPresets,
  savePreset,
  updatePreset,
  deletePreset,
  getPresetById,
  clearAllPresets,
  exportPresetsAsJSON,
  importPresetsFromJSON,
  getStorageStats,
};
