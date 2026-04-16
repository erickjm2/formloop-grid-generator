/**
 * PresetsSection - Controls for preset management
 * 
 * Handles saving, loading, and deleting custom presets
 */

import { useState } from "react";
import { Preset, GridConfig, BUILTIN_PRESETS } from "@/lib/grid-schema";
import { getCustomPresets, savePreset, deletePreset, updatePreset } from "@/lib/preset-storage";
import { Save, Download, Trash2, Edit2 } from "lucide-react";

interface PresetsSectionProps {
  currentConfig: GridConfig;
  onPresetLoad: (preset: Preset) => void;
}

export default function PresetsSection({ currentConfig, onPresetLoad }: PresetsSectionProps) {
  const [showPresets, setShowPresets] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [customPresets, setCustomPresets] = useState<Preset[]>(getCustomPresets());
  const [presetName, setPresetName] = useState("");
  const [presetDescription, setPresetDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingPresetId, setEditingPresetId] = useState<string | null>(null);

  // Load presets
  const loadPresets = () => {
    setCustomPresets(getCustomPresets());
  };

  // Handle save preset
  const handleSavePreset = () => {
    setError(null);
    setSuccess(null);

    if (!presetName.trim()) {
      setError("Preset name is required");
      return;
    }

    try {
      if (editingPresetId) {
        // Update existing preset
        updatePreset(editingPresetId, presetName, presetDescription, currentConfig);
        setSuccess(`Preset "${presetName}" updated`);
      } else {
        // Save new preset
        savePreset(presetName, presetDescription, currentConfig);
        setSuccess(`Preset "${presetName}" saved`);
      }

      // Reset form
      setPresetName("");
      setPresetDescription("");
      setEditingPresetId(null);
      setShowSaveDialog(false);

      // Reload presets
      loadPresets();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save preset");
    }
  };

  // Handle load preset
  const handleLoadPreset = (preset: Preset) => {
    onPresetLoad(preset);
    setShowPresets(false);
    setSuccess(`Loaded preset "${preset.name}"`);
  };

  // Handle delete preset
  const handleDeletePreset = (presetId: string) => {
    if (confirm("Are you sure you want to delete this preset?")) {
      try {
        deletePreset(presetId);
        setSuccess("Preset deleted");
        loadPresets();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to delete preset");
      }
    }
  };

  // Handle edit preset
  const handleEditPreset = (preset: Preset) => {
    setEditingPresetId(preset.id);
    setPresetName(preset.name);
    setPresetDescription(preset.description || "");
    setShowSaveDialog(true);
  };

  // Handle cancel save dialog
  const handleCancelSaveDialog = () => {
    setShowSaveDialog(false);
    setPresetName("");
    setPresetDescription("");
    setEditingPresetId(null);
    setError(null);
  };

  return (
    <div className="grid-section">
      <h2 className="grid-section-header mb-3">Presets</h2>

      {/* Success message */}
      {success && (
        <div className="mb-3 p-2 rounded-[12px] bg-green-50 border border-green-200 text-green-700 text-xs">
          {success}
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="mb-3 p-2 rounded-[12px] bg-red-50 border border-red-200 text-red-700 text-xs">
          {error}
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={() => setShowSaveDialog(true)}
          className="grid-button-secondary flex-1 flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save
        </button>
        <button
          onClick={() => {
            loadPresets();
            setShowPresets(!showPresets);
          }}
          className="grid-button-secondary flex-1 flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          Load
        </button>
      </div>

      {/* Save Preset Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="grid-modal-content max-w-sm">
            <div className="grid-modal-header">
              <h3 className="font-semibold">
                {editingPresetId ? "Edit Preset" : "Save New Preset"}
              </h3>
              <button
                onClick={handleCancelSaveDialog}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>

            <div className="grid-modal-body space-y-3">
              <div>
                <label className="block text-xs font-medium mb-1">Preset Name *</label>
                <input
                  type="text"
                  value={presetName}
                  onChange={(e) => setPresetName(e.target.value)}
                  placeholder="e.g., My Custom Grid"
                  className="grid-input w-full"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Description</label>
                <input
                  type="text"
                  value={presetDescription}
                  onChange={(e) => setPresetDescription(e.target.value)}
                  placeholder="Optional description"
                  className="grid-input w-full"
                />
              </div>

              <div className="text-xs text-muted-foreground bg-secondary/50 p-2 rounded-[8px]">
                <p className="font-medium mb-1">Current Configuration:</p>
                <p>
                  {currentConfig.columns.count} cols × {currentConfig.rows.count} rows
                </p>
                <p>
                  Margins: {currentConfig.margins.top}
                  {currentConfig.margins.unit}
                </p>
              </div>
            </div>

            <div className="grid-modal-footer gap-2">
              <button
                onClick={handleCancelSaveDialog}
                className="grid-button-secondary flex-1"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePreset}
                className="grid-button-primary flex-1"
              >
                {editingPresetId ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Presets Modal */}
      {showPresets && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="grid-modal-content max-w-md max-h-96 overflow-y-auto">
            <div className="grid-modal-header sticky top-0 bg-background">
              <h3 className="font-semibold">Presets</h3>
              <button
                onClick={() => setShowPresets(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>

            <div className="grid-modal-body space-y-4">
              {/* Built-in Presets */}
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground mb-2">Built-in Presets</h4>
                <div className="space-y-1">
                  {BUILTIN_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => handleLoadPreset(preset)}
                      className="preset-item w-full text-left"
                    >
                      <div className="font-medium text-sm">{preset.name}</div>
                      <div className="text-xs text-muted-foreground">{preset.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Presets */}
              {customPresets.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground mb-2">
                    Custom Presets ({customPresets.length})
                  </h4>
                  <div className="space-y-1">
                    {customPresets.map((preset) => (
                      <div
                        key={preset.id}
                        className="flex items-start gap-2 p-2 rounded-[12px] hover:bg-secondary/50 transition-colors group"
                      >
                        <button
                          onClick={() => handleLoadPreset(preset)}
                          className="flex-1 text-left"
                        >
                          <div className="font-medium text-sm">{preset.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {preset.description}
                          </div>
                        </button>

                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEditPreset(preset)}
                            className="p-1 hover:bg-secondary rounded-[6px]"
                            title="Edit preset"
                          >
                            <Edit2 className="w-3 h-3 text-muted-foreground" />
                          </button>
                          <button
                            onClick={() => handleDeletePreset(preset.id)}
                            className="p-1 hover:bg-destructive/10 rounded-[6px]"
                            title="Delete preset"
                          >
                            <Trash2 className="w-3 h-3 text-destructive" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {customPresets.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-xs text-muted-foreground">
                    No custom presets yet. Save your first preset!
                  </p>
                </div>
              )}
            </div>

            <div className="grid-modal-footer sticky bottom-0 bg-background">
              <button
                onClick={() => setShowPresets(false)}
                className="grid-button-secondary flex-1"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
