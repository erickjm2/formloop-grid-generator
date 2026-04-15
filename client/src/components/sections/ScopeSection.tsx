/**
 * ScopeSection - Controls for artboard scope selection
 */

interface ScopeSectionProps {
  scope: "activeArtboard" | "allArtboards";
  onChange: (scope: "activeArtboard" | "allArtboards") => void;
}

export default function ScopeSection({ scope, onChange }: ScopeSectionProps) {
  return (
    <div className="grid-section">
      <h2 className="grid-section-header mb-3">Scope</h2>

      <div className="space-y-2">
        <label className="flex items-center gap-3 cursor-pointer p-2 rounded-[12px] hover:bg-secondary transition-colors">
          <input
            type="radio"
            name="scope"
            value="activeArtboard"
            checked={scope === "activeArtboard"}
            onChange={() => onChange("activeArtboard")}
            className="w-4 h-4"
          />
          <span className="text-sm font-medium">Active Artboard</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer p-2 rounded-[12px] hover:bg-secondary transition-colors">
          <input
            type="radio"
            name="scope"
            value="allArtboards"
            checked={scope === "allArtboards"}
            onChange={() => onChange("allArtboards")}
            className="w-4 h-4"
          />
          <span className="text-sm font-medium">All Artboards</span>
        </label>
      </div>
    </div>
  );
}
