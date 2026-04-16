/**
 * Artboard Memory - Stores grid settings per artboard
 * 
 * Remembers grid configurations for specific artboards so users
 * don't have to reconfigure when switching between artboards
 */

import { GridConfig } from "./grid-schema";

interface ArtboardSettings {
  artboardId: string;
  artboardName: string;
  config: GridConfig;
  savedAt: number;
}

interface StorageData {
  version: number;
  documentName: string;
  settings: ArtboardSettings[];
  lastModified: number;
}

const STORAGE_KEY_PREFIX = "formloop_artboard_memory_";
const MAX_ARTBOARDS_PER_DOCUMENT = 100;

/**
 * Generate storage key for a document
 */
function getStorageKey(documentName: string): string {
  // Sanitize document name to be safe for localStorage key
  const sanitized = documentName.replace(/[^a-zA-Z0-9_-]/g, "_");
  return `${STORAGE_KEY_PREFIX}${sanitized}`;
}

/**
 * Get all artboard settings for a document
 */
export function getArtboardSettings(documentName: string): ArtboardSettings[] {
  try {
    const key = getStorageKey(documentName);
    const data = localStorage.getItem(key);

    if (!data) {
      return [];
    }

    const parsed: StorageData = JSON.parse(data);

    // Validate version
    if (parsed.version !== 1) {
      console.warn("Artboard memory version mismatch");
      return [];
    }

    return parsed.settings || [];
  } catch (error) {
    console.error("Failed to load artboard settings:", error);
    return [];
  }
}

/**
 * Get settings for a specific artboard
 */
export function getArtboardConfig(
  documentName: string,
  artboardName: string
): GridConfig | null {
  try {
    const settings = getArtboardSettings(documentName);
    const artboardSetting = settings.find((s) => s.artboardName === artboardName);

    return artboardSetting?.config || null;
  } catch (error) {
    console.error("Failed to get artboard config:", error);
    return null;
  }
}

/**
 * Save grid configuration for an artboard
 */
export function saveArtboardConfig(
  documentName: string,
  artboardName: string,
  artboardId: string,
  config: GridConfig
): void {
  try {
    const key = getStorageKey(documentName);
    let settings = getArtboardSettings(documentName);

    // Check if we've reached max artboards
    if (settings.length >= MAX_ARTBOARDS_PER_DOCUMENT) {
      // Remove oldest setting
      settings = settings.sort((a, b) => a.savedAt - b.savedAt).slice(1);
    }

    // Check if artboard already has settings
    const existingIndex = settings.findIndex((s) => s.artboardName === artboardName);

    const newSetting: ArtboardSettings = {
      artboardId,
      artboardName,
      config,
      savedAt: Date.now(),
    };

    if (existingIndex >= 0) {
      // Update existing
      settings[existingIndex] = newSetting;
    } else {
      // Add new
      settings.push(newSetting);
    }

    // Save to storage
    const storageData: StorageData = {
      version: 1,
      documentName,
      settings,
      lastModified: Date.now(),
    };

    localStorage.setItem(key, JSON.stringify(storageData));
  } catch (error) {
    console.error("Failed to save artboard config:", error);
  }
}

/**
 * Delete settings for a specific artboard
 */
export function deleteArtboardConfig(documentName: string, artboardName: string): void {
  try {
    const key = getStorageKey(documentName);
    let settings = getArtboardSettings(documentName);

    // Remove artboard setting
    settings = settings.filter((s) => s.artboardName !== artboardName);

    // Save to storage
    const storageData: StorageData = {
      version: 1,
      documentName,
      settings,
      lastModified: Date.now(),
    };

    localStorage.setItem(key, JSON.stringify(storageData));
  } catch (error) {
    console.error("Failed to delete artboard config:", error);
  }
}

/**
 * Clear all settings for a document
 */
export function clearDocumentSettings(documentName: string): void {
  try {
    const key = getStorageKey(documentName);
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Failed to clear document settings:", error);
  }
}

/**
 * Get list of all documents with saved artboard settings
 */
export function getDocumentsWithSettings(): string[] {
  try {
    const documents: string[] = [];

    // Iterate through all localStorage keys
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      if (key && key.startsWith(STORAGE_KEY_PREFIX)) {
        try {
          const data = localStorage.getItem(key);
          if (data) {
            const parsed: StorageData = JSON.parse(data);
            documents.push(parsed.documentName);
          }
        } catch (e) {
          // Skip invalid entries
        }
      }
    }

    return documents;
  } catch (error) {
    console.error("Failed to get documents with settings:", error);
    return [];
  }
}

/**
 * Get memory statistics
 */
export function getMemoryStats(documentName: string): {
  documentName: string;
  artboardCount: number;
  maxArtboards: number;
  storageUsed: number;
  lastModified: number | null;
} {
  try {
    const key = getStorageKey(documentName);
    const data = localStorage.getItem(key);
    const parsed: StorageData | null = data ? JSON.parse(data) : null;

    return {
      documentName,
      artboardCount: parsed?.settings.length || 0,
      maxArtboards: MAX_ARTBOARDS_PER_DOCUMENT,
      storageUsed: data ? data.length : 0,
      lastModified: parsed?.lastModified || null,
    };
  } catch (error) {
    console.error("Failed to get memory stats:", error);
    return {
      documentName,
      artboardCount: 0,
      maxArtboards: MAX_ARTBOARDS_PER_DOCUMENT,
      storageUsed: 0,
      lastModified: null,
    };
  }
}

/**
 * Clean up old settings (older than specified days)
 */
export function cleanupOldSettings(documentName: string, daysOld: number = 30): number {
  try {
    const key = getStorageKey(documentName);
    let settings = getArtboardSettings(documentName);
    const cutoffTime = Date.now() - daysOld * 24 * 60 * 60 * 1000;

    const beforeCount = settings.length;
    settings = settings.filter((s) => s.savedAt > cutoffTime);
    const deletedCount = beforeCount - settings.length;

    if (deletedCount > 0) {
      const storageData: StorageData = {
        version: 1,
        documentName,
        settings,
        lastModified: Date.now(),
      };

      localStorage.setItem(key, JSON.stringify(storageData));
    }

    return deletedCount;
  } catch (error) {
    console.error("Failed to cleanup old settings:", error);
    return 0;
  }
}

export default {
  getArtboardSettings,
  getArtboardConfig,
  saveArtboardConfig,
  deleteArtboardConfig,
  clearDocumentSettings,
  getDocumentsWithSettings,
  getMemoryStats,
  cleanupOldSettings,
};
