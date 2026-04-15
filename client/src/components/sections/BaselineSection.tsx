/**
 * BaselineSection - Controls for baseline grid settings
 */

import { BaselineConfig } from "@/lib/grid-schema";

interface BaselineSectionProps {
  config: BaselineConfig;
  includeBaseline: boolean;
  onChange: (key: keyof BaselineConfig, value: any) => void;
  onIncludeChange: (value: boolean) => void;
}

export default function BaselineSection({
  config,
  includeBaseline,
  onChange,
  onIncludeChange,
}: BaselineSectionProps) {
  return (
    <div className="grid-section">
      <div className="flex items-center justify-between mb-3">
        <h2 className="grid-section-header">Baseline Grid</h2>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={includeBaseline}
            onChange={(e) => onIncludeChange(e.target.checked)}
            className="grid-checkbox"
          />
          <span className="text-xs text-muted-foreground">Include</span>
        </label>
      </div>

      <div>
        <label className="grid-label text-xs mb-1 block">Step</label>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            min="0.1"
            step="0.1"
            value={config.step}
            onChange={(e) => onChange("step", parseFloat(e.target.value))}
            disabled={!includeBaseline}
            className="grid-input flex-1"
          />
          <input
            type="range"
            min="1"
            max="50"
            value={config.step}
            onChange={(e) => onChange("step", parseFloat(e.target.value))}
            disabled={!includeBaseline}
            className="grid-slider flex-1"
          />
        </div>
      </div>
    </div>
  );
}
