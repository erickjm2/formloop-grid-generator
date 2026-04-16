/**
 * GridPanel - Main plugin panel component
 * 
 * This is the root component for the Formloop Grid & Margin Generator plugin.
 * It manages the overall layout, state, and CEP communication.
 */

import { useState, useEffect, useCallback } from "react";
import { GridConfig, DEFAULT_GRID_CONFIG, cloneGridConfig } from "@/lib/grid-schema";
import { 
  initializeCEPBridge, 
  isCEPAvailable,
  applyGrid,
  requestAutoDetect,
  getDocumentInfo,
  onGridError
} from "@/lib/cep-bridge";
import ModeToggle from "./ModeToggle";
import MarginsSection from "./sections/MarginsSection";
import ColumnsSection from "./sections/ColumnsSection";
import RowsSection from "./sections/RowsSection";
import BaselineSection from "./sections/BaselineSection";
import PresetsSection from "./sections/PresetsSection";
import ScopeSection from "./sections/ScopeSection";
import FooterActions from "./FooterActions";

export default function GridPanel() {
  const [config, setConfig] = useState<GridConfig>(cloneGridConfig(DEFAULT_GRID_CONFIG));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cepReady, setCepReady] = useState(false);
  const [showAutoDetectSuggestion, setShowAutoDetectSuggestion] = useState(false);
  const [autoDetectSuggestion, setAutoDetectSuggestion] = useState<GridConfig | null>(null);
  const [documentInfo, setDocumentInfo] = useState<any>(null);
  const [previewActive, setPreviewActive] = useState(false);

  // Initialize CEP bridge on mount
  useEffect(() => {
    const ready = initializeCEPBridge();
    setCepReady(ready);

    if (!ready) {
      console.warn("CEP Bridge not available - running in development mode");
    } else {
      // Load document info
      loadDocumentInfo();
      
      // Set up error listener
      const unsubscribe = onGridError((errorMsg) => {
        setError(errorMsg);
        setIsLoading(false);
      });

      return unsubscribe;
    }
  }, []);

  // Load document information
  const loadDocumentInfo = async () => {
    try {
      const info = await getDocumentInfo();
      setDocumentInfo(info);
    } catch (err) {
      console.error("Failed to load document info:", err);
    }
  };

  // Handle mode change
  const handleModeChange = (mode: "auto" | "custom") => {
    setConfig((prev) => ({
      ...prev,
      mode,
    }));
    setError(null);
    setShowAutoDetectSuggestion(false);

    // If switching to auto mode, trigger auto-detect
    if (mode === "auto") {
      handleAutoDetect();
    }
  };

  // Handle auto-detect
  const handleAutoDetect = useCallback(async () => {
    if (!cepReady || !documentInfo || documentInfo.artboardCount === 0) {
      setError("No document or artboards available");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Get the active artboard
      const activeIndex = documentInfo.activeArtboardIndex;
      if (activeIndex < 0 || activeIndex >= documentInfo.artboards.length) {
        setError("No active artboard");
        setIsLoading(false);
        return;
      }

      const artboard = documentInfo.artboards[activeIndex];
      const artboardRect: [number, number, number, number] = [
        0,
        artboard.height,
        artboard.width,
        0,
      ];

      // Request auto-detect from ExtendScript
      const suggestion = await requestAutoDetect(artboardRect);

      if (suggestion && suggestion.success) {
        setAutoDetectSuggestion(suggestion);
        setShowAutoDetectSuggestion(true);
        
        // Update config with suggestion
        setConfig(cloneGridConfig(suggestion));
      } else {
        setError(suggestion?.message || "Auto-detect failed");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Auto-detect error");
    } finally {
      setIsLoading(false);
    }
  }, [cepReady, documentInfo]);

  // Handle scope change
  const handleScopeChange = (scope: "activeArtboard" | "allArtboards") => {
    setConfig((prev) => ({
      ...prev,
      scope,
    }));
  };

  // Handle include toggles
  const handleIncludeChange = (key: keyof typeof config.include, value: boolean) => {
    setConfig((prev) => ({
      ...prev,
      include: {
        ...prev.include,
        [key]: value,
      },
    }));
  };

  // Handle margins change
  const handleMarginsChange = (
    key: keyof typeof config.margins,
    value: number | boolean | string
  ) => {
    setConfig((prev) => {
      const newConfig = cloneGridConfig(prev);
      
      if (key === "linked") {
        newConfig.margins.linked = value as boolean;
      } else if (["top", "right", "bottom", "left"].includes(key)) {
        const numValue = typeof value === "number" ? value : parseFloat(value as string);
        if (!isNaN(numValue)) {
          (newConfig.margins[key as "top" | "right" | "bottom" | "left"] as number) = numValue;
          
          // If margins are linked, update all
          if (newConfig.margins.linked) {
            newConfig.margins.top = numValue;
            newConfig.margins.right = numValue;
            newConfig.margins.bottom = numValue;
            newConfig.margins.left = numValue;
          }
        }
      } else if (key === "unit") {
        newConfig.margins.unit = value as any;
      }

      return newConfig;
    });
  };

  // Handle columns change
  const handleColumnsChange = (
    key: keyof typeof config.columns,
    value: number | string
  ) => {
    setConfig((prev) => ({
      ...prev,
      columns: {
        ...prev.columns,
        [key]: value,
      },
    }));
  };

  // Handle rows change
  const handleRowsChange = (
    key: keyof typeof config.rows,
    value: number | string
  ) => {
    setConfig((prev) => ({
      ...prev,
      rows: {
        ...prev.rows,
        [key]: value,
      },
    }));
  };

  // Handle baseline change
  const handleBaselineChange = (
    key: keyof typeof config.baseline,
    value: any
  ) => {
    setConfig((prev) => ({
      ...prev,
      baseline: {
        ...prev.baseline,
        [key]: value,
      },
    }));
  };

  // Handle apply grid
  const handleApplyGrid = async () => {
    setIsLoading(true);
    setError(null);
    setShowAutoDetectSuggestion(false);

    try {
      if (!cepReady) {
        setError("CEP Bridge not available");
        setIsLoading(false);
        return;
      }

      // Call CEP bridge to apply grid
      const result = await applyGrid(config);
      
      if (result.success) {
        // Success! Show message
        const message = result.message || "Grid applied successfully";
        console.log(message);
        setError(null);
        
        // Reload document info
        await loadDocumentInfo();
      } else {
        setError(result.message || "Failed to apply grid");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error applying grid");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle cancel/reset
  const handleCancel = () => {
    setConfig(cloneGridConfig(DEFAULT_GRID_CONFIG));
    setError(null);
    setShowAutoDetectSuggestion(false);
    setPreviewActive(false);
  };

  // Handle preset load
  const handlePresetLoad = (preset: any) => {
    setConfig(cloneGridConfig(preset.config));
    setError(null);
    setShowAutoDetectSuggestion(false);
  };

  return (
    <div className="grid-panel">
      {/* Header */}
      <div className="grid-panel-header">
        <h1 className="grid-panel-title">Grid Tool</h1>
        {documentInfo && (
          <p className="text-xs text-muted-foreground mt-1">
            {documentInfo.artboardCount} artboard{documentInfo.artboardCount !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {/* Content */}
      <div className="grid-panel-content scrollbar-thin">
        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 rounded-[12px] bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            {error}
          </div>
        )}

        {/* Auto-detect suggestion */}
        {showAutoDetectSuggestion && autoDetectSuggestion && (
          <div className="mb-4 p-3 rounded-[12px] bg-accent/10 border border-accent/20">
            <p className="text-xs font-medium text-accent mb-2">
              Format Class: {(autoDetectSuggestion as any).formatClass}
            </p>
            <p className="text-xs text-muted-foreground">
              Suggested grid: {autoDetectSuggestion.columns.count} cols × {autoDetectSuggestion.rows.count} rows
            </p>
          </div>
        )}

        {/* Mode Toggle */}
        <div className="grid-section">
          <ModeToggle
            mode={config.mode}
            onChange={handleModeChange}
          />
        </div>

        {/* Margins Section */}
        <MarginsSection
          config={config.margins}
          includeMargins={config.include.margins}
          onChange={handleMarginsChange}
          onIncludeChange={(value) => handleIncludeChange("margins", value)}
        />

        {/* Columns Section */}
        <ColumnsSection
          config={config.columns}
          includeColumns={config.include.columns}
          onChange={handleColumnsChange}
          onIncludeChange={(value) => handleIncludeChange("columns", value)}
        />

        {/* Rows Section */}
        <RowsSection
          config={config.rows}
          includeRows={config.include.rows}
          onChange={handleRowsChange}
          onIncludeChange={(value) => handleIncludeChange("rows", value)}
        />

        {/* Baseline Grid Section */}
        <BaselineSection
          config={config.baseline}
          includeBaseline={config.include.baseline}
          onChange={handleBaselineChange}
          onIncludeChange={(value) => handleIncludeChange("baseline", value)}
        />

        {/* Presets Section */}
        <PresetsSection onPresetLoad={handlePresetLoad} />

        {/* Scope Section */}
        <ScopeSection
          scope={config.scope}
          onChange={handleScopeChange}
        />
      </div>

      {/* Footer */}
      <FooterActions
        isLoading={isLoading}
        onApply={handleApplyGrid}
        onCancel={handleCancel}
      />
    </div>
  );
}
