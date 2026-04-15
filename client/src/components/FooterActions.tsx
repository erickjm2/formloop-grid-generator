/**
 * FooterActions - Footer buttons for Apply Grid and Cancel
 */

import { Loader2 } from "lucide-react";

interface FooterActionsProps {
  isLoading: boolean;
  onApply: () => void;
  onCancel: () => void;
}

export default function FooterActions({ isLoading, onApply, onCancel }: FooterActionsProps) {
  return (
    <div className="border-t border-border p-4 flex gap-3">
      <button
        onClick={onCancel}
        disabled={isLoading}
        className="grid-button-secondary flex-1"
      >
        Cancel
      </button>
      <button
        onClick={onApply}
        disabled={isLoading}
        className="grid-button-primary flex-1 flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Applying...
          </>
        ) : (
          "Apply Grid"
        )}
      </button>
    </div>
  );
}
