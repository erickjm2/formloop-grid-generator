/**
 * ColumnsSection - Controls for column settings
 */

import { ColumnConfig } from "@/lib/grid-schema";

interface ColumnsSectionProps {
  config: ColumnConfig;
  includeColumns: boolean;
  onChange: (key: keyof ColumnConfig, value: any) => void;
  onIncludeChange: (value: boolean) => void;
}

export default function ColumnsSection({
  config,
  includeColumns,
  onChange,
  onIncludeChange,
}: ColumnsSectionProps) {
  return (
    <div className="grid-section">
      <div className="flex items-center justify-between mb-3">
        <h2 className="grid-section-header">Columns</h2>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={includeColumns}
            onChange={(e) => onIncludeChange(e.target.checked)}
            className="grid-checkbox"
          />
          <span className="text-xs text-muted-foreground">Include</span>
        </label>
      </div>

      <div className="space-y-3">
        {/* Count */}
        <div>
          <label className="grid-label text-xs mb-1 block">Count</label>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              min="1"
              value={config.count}
              onChange={(e) => onChange("count", parseInt(e.target.value))}
              disabled={!includeColumns}
              className="grid-input flex-1"
            />
            <input
              type="range"
              min="1"
              max="20"
              value={config.count}
              onChange={(e) => onChange("count", parseInt(e.target.value))}
              disabled={!includeColumns}
              className="grid-slider flex-1"
            />
          </div>
        </div>

        {/* Gutter */}
        <div>
          <label className="grid-label text-xs mb-1 block">Gutter</label>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              min="0"
              value={config.gutter}
              onChange={(e) => onChange("gutter", parseFloat(e.target.value))}
              disabled={!includeColumns}
              className="grid-input flex-1"
            />
            <input
              type="range"
              min="0"
              max="100"
              value={config.gutter}
              onChange={(e) => onChange("gutter", parseFloat(e.target.value))}
              disabled={!includeColumns}
              className="grid-slider flex-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
