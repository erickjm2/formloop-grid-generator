/**
 * GridPanel - Main plugin panel component
 * 
 * This is the root component for the Formloop Grid & Margin Generator plugin.
 * It manages the overall layout and state of the panel.
 */

import { useState, useEffect } from "react";
import { GridConfig, DEFAULT_GRID_CONFIG, cloneGridConfig } from "@/lib/grid-schema";
import { initializeCEPBridge, isCEPAvailable } from "@/lib/cep-bridge";
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

  // Initialize CEP bridge on mount
  useEffect(() => {
    const ready = initializeCEPBridge();
    setCepReady(ready);

    if (!ready) {
      console.warn("CEP Bridge not available - running in development mode");
    }
  }, []);

  // Handle mode change
  const handleModeChange = (mode: "auto" | "custom") => {
    setConfig((prev) => ({
      ...prev,
      mode,
    }));
    setError(null);
  };

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

    try {
      if (!cepReady) {
        setError("CEP Bridge not available");
        return;
      }

      // TODO: Call CEP bridge to apply grid
      // const result = await applyGrid(config);
      // if (!result.success) {
      //   setError(result.message);
      // }

      console.log("Apply grid with config:", config);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle cancel/reset
  const handleCancel = () => {
    setConfig(cloneGridConfig(DEFAULT_GRID_CONFIG));
    setError(null);
  };

  return (
    <div className="grid-panel">
      {/* Header */}
      <div className="grid-panel-header">
        <h1 className="grid-panel-title">Grid Tool</h1>
      </div>

      {/* Content */}
      <div className="grid-panel-content scrollbar-thin">
        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 rounded-[12px] bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            {error}
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
        <PresetsSection onPresetLoad={(preset: any) => setConfig(cloneGridConfig(preset.config))} />

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
