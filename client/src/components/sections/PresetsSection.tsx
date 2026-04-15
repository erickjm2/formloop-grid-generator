/**
 * PresetsSection - Controls for preset management
 */

import { useState } from "react";
import { Preset, BUILTIN_PRESETS } from "@/lib/grid-schema";
import { Save, Download } from "lucide-react";

interface PresetsSectionProps {
  onPresetLoad: (preset: Preset) => void;
}

export default function PresetsSection({ onPresetLoad }: PresetsSectionProps) {
  const [showPresets, setShowPresets] = useState(false);
  const [customPresets, setCustomPresets] = useState<Preset[]>([]);

  const handleSavePreset = () => {
    // TODO: Implement save preset dialog
    console.log("Save preset");
  };

  const handleLoadPreset = (preset: Preset) => {
    onPresetLoad(preset);
    setShowPresets(false);
  };

  return (
    <div className="grid-section">
      <h2 className="grid-section-header mb-3">Presets</h2>

      <div className="flex gap-2">
        <button
          onClick={handleSavePreset}
          className="grid-button-secondary flex-1 flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save
        </button>
        <button
          onClick={() => setShowPresets(!showPresets)}
          className="grid-button-secondary flex-1 flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          Load
        </button>
      </div>

      {/* Presets Modal */}
      {showPresets && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="grid-modal-content">
            <div className="grid-modal-header">
              <h3 className="font-semibold">Saved Presets</h3>
              <button
                onClick={() => setShowPresets(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>

            <div className="grid-modal-body space-y-2">
              {/* Built-in Presets */}
              <div className="mb-4">
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
                  <h4 className="text-xs font-semibold text-muted-foreground mb-2">Custom Presets</h4>
                  <div className="space-y-1">
                    {customPresets.map((preset) => (
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
              )}
            </div>

            <div className="grid-modal-footer">
              <button
                onClick={() => setShowPresets(false)}
                className="grid-button-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
