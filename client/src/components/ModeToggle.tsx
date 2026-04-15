/**
 * ModeToggle - Segmented control for Auto-Detect vs Custom mode
 */

interface ModeToggleProps {
  mode: "auto" | "custom";
  onChange: (mode: "auto" | "custom") => void;
}

export default function ModeToggle({ mode, onChange }: ModeToggleProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onChange("auto")}
        className={`flex-1 py-2 px-4 rounded-[14px] text-sm font-medium transition-all duration-200 ${
          mode === "auto"
            ? "bg-accent text-accent-foreground"
            : "bg-secondary text-foreground hover:bg-muted border border-border"
        }`}
      >
        Auto-Detect
      </button>
      <button
        onClick={() => onChange("custom")}
        className={`flex-1 py-2 px-4 rounded-[14px] text-sm font-medium transition-all duration-200 ${
          mode === "custom"
            ? "bg-accent text-accent-foreground"
            : "bg-secondary text-foreground hover:bg-muted border border-border"
        }`}
      >
        Custom
      </button>
    </div>
  );
}
