/**
 * useGridPreview - Hook for managing grid preview functionality
 * 
 * Handles debounced preview requests and preview layer management
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { GridConfig } from "@/lib/grid-schema";
import { previewGrid, isCEPAvailable } from "@/lib/cep-bridge";

interface PreviewState {
  isPreviewActive: boolean;
  previewLayerId: string | null;
  isGenerating: boolean;
  error: string | null;
}

const PREVIEW_DEBOUNCE_MS = 500;

export function useGridPreview() {
  const [state, setState] = useState<PreviewState>({
    isPreviewActive: false,
    previewLayerId: null,
    isGenerating: false,
    error: null,
  });

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastConfigRef = useRef<GridConfig | null>(null);

  /**
   * Generate preview for a grid configuration
   */
  const generatePreview = useCallback(
    async (config: GridConfig) => {
      if (!isCEPAvailable()) {
        setState((prev) => ({
          ...prev,
          error: "CEP not available",
        }));
        return;
      }

      // Skip if config hasn't changed
      if (JSON.stringify(lastConfigRef.current) === JSON.stringify(config)) {
        return;
      }

      lastConfigRef.current = config;

      setState((prev) => ({
        ...prev,
        isGenerating: true,
        error: null,
      }));

      try {
        const result = await previewGrid(config);

        if (result.success) {
          setState((prev) => ({
            ...prev,
            isPreviewActive: true,
            previewLayerId: result.previewLayerId,
            isGenerating: false,
            error: null,
          }));
        } else {
          setState((prev) => ({
            ...prev,
            isGenerating: false,
            error: result.message || "Preview generation failed",
          }));
        }
      } catch (err) {
        setState((prev) => ({
          ...prev,
          isGenerating: false,
          error: err instanceof Error ? err.message : "Preview error",
        }));
      }
    },
    []
  );

  /**
   * Request preview with debouncing
   */
  const requestPreview = useCallback((config: GridConfig) => {
    // Clear existing debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new debounce timer
    debounceTimerRef.current = setTimeout(() => {
      generatePreview(config);
    }, PREVIEW_DEBOUNCE_MS);
  }, [generatePreview]);

  /**
   * Clear preview
   */
  const clearPreview = useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    setState({
      isPreviewActive: false,
      previewLayerId: null,
      isGenerating: false,
      error: null,
    });

    lastConfigRef.current = null;
  }, []);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return {
    ...state,
    requestPreview,
    clearPreview,
    generatePreview,
  };
}
