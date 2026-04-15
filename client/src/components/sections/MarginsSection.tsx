/**
 * MarginsSection - Controls for margin settings
 */

import { MarginConfig } from "@/lib/grid-schema";
import { Link2, Link2Off } from "lucide-react";

interface MarginsSectionProps {
  config: MarginConfig;
  includeMargins: boolean;
  onChange: (key: keyof MarginConfig, value: any) => void;
  onIncludeChange: (value: boolean) => void;
}

export default function MarginsSection({
  config,
  includeMargins,
  onChange,
  onIncludeChange,
}: MarginsSectionProps) {
  return (
    <div className="grid-section">
      <div className="flex items-center justify-between mb-3">
        <h2 className="grid-section-header">Margins</h2>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={includeMargins}
            onChange={(e) => onIncludeChange(e.target.checked)}
            className="grid-checkbox"
          />
          <span className="text-xs text-muted-foreground">Include</span>
        </label>
      </div>

      <div className="space-y-2">
        {/* Top and Right */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="grid-label text-xs mb-1 block">Top</label>
            <input
              type="number"
              value={config.top}
              onChange={(e) => onChange("top", parseFloat(e.target.value))}
              disabled={!includeMargins}
              className="grid-input"
            />
          </div>
          <div>
            <label className="grid-label text-xs mb-1 block">Right</label>
            <input
              type="number"
              value={config.right}
              onChange={(e) => onChange("right", parseFloat(e.target.value))}
              disabled={!includeMargins}
              className="grid-input"
            />
          </div>
        </div>

        {/* Bottom and Left with Link Icon */}
        <div className="grid grid-cols-2 gap-2 relative">
          <div>
            <label className="grid-label text-xs mb-1 block">Bottom</label>
            <input
              type="number"
              value={config.bottom}
              onChange={(e) => onChange("bottom", parseFloat(e.target.value))}
              disabled={!includeMargins}
              className="grid-input"
            />
          </div>
          <div>
            <label className="grid-label text-xs mb-1 block">Left</label>
            <input
              type="number"
              value={config.left}
              onChange={(e) => onChange("left", parseFloat(e.target.value))}
              disabled={!includeMargins}
              className="grid-input"
            />
          </div>

          {/* Link/Unlink Button */}
          <button
            onClick={() => onChange("linked", !config.linked)}
            disabled={!includeMargins}
            className="absolute -right-10 top-1/2 -translate-y-1/2 p-1.5 rounded-[8px] hover:bg-secondary transition-colors"
            title={config.linked ? "Unlink margins" : "Link margins"}
          >
            {config.linked ? (
              <Link2 className="w-4 h-4 text-accent" />
            ) : (
              <Link2Off className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
