/**
 * CEP Bridge - Communication layer between React UI and ExtendScript host
 * 
 * This utility handles all communication between the CEP panel UI and
 * the ExtendScript host running inside Adobe Illustrator.
 */

interface CSInterface {
  evalScript(script: string, callback?: (result: string) => void): void;
  addEventListener(eventType: string, callback: (event: any) => void): void;
  removeEventListener(eventType: string, callback: (event: any) => void): void;
  dispatchEvent(event: any): void;
  getSystemPath(pathType: string): string;
  getExtensionID(): string;
  getHostEnvironment(): string;
}

declare global {
  interface Window {
    cep: {
      fs: any;
    };
  }
}

// Get CSInterface instance (injected by Adobe)
let csInterface: CSInterface | null = null;

/**
 * Initialize the CEP bridge
 * This should be called once when the panel loads
 */
export function initializeCEPBridge(): boolean {
  try {
    // CSInterface is injected by Adobe in the global scope
    if (typeof (window as any).CSInterface !== "undefined") {
      csInterface = new (window as any).CSInterface();
      console.log("CEP Bridge initialized successfully");
      return true;
    } else {
      console.warn("CSInterface not available - running in non-CEP environment");
      return false;
    }
  } catch (error) {
    console.error("Failed to initialize CEP Bridge:", error);
    return false;
  }
}

/**
 * Check if CEP is available
 */
export function isCEPAvailable(): boolean {
  return csInterface !== null;
}

/**
 * Send a command to ExtendScript and wait for response
 * @param eventType - Event type identifier
 * @param data - Data to send
 * @returns Promise that resolves with the response
 */
export function sendCommand(
  eventType: string,
  data: Record<string, any>
): Promise<any> {
  return new Promise((resolve, reject) => {
    if (!csInterface) {
      reject(new Error("CEP Bridge not initialized"));
      return;
    }

    try {
      // Create event object
      const event = new (window as any).CSXSEvent();
      event.type = eventType;
      event.data = JSON.stringify(data);

      // Send to host
      csInterface.dispatchEvent(event);

      // Note: Response handling is done via event listeners
      // Set up a one-time listener for the response
      const responseHandler = (response: any) => {
        csInterface!.removeEventListener(eventType + ".response", responseHandler);
        try {
          const result = JSON.parse(response.data);
          resolve(result);
        } catch (e) {
          resolve(response.data);
        }
      };

      csInterface.addEventListener(eventType + ".response", responseHandler);

      // Timeout after 30 seconds
      setTimeout(() => {
        csInterface!.removeEventListener(eventType + ".response", responseHandler);
        reject(new Error(`Command timeout: ${eventType}`));
      }, 30000);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Apply grid configuration
 * @param config - Grid configuration object
 * @returns Promise with result
 */
export async function applyGrid(config: Record<string, any>): Promise<any> {
  return sendCommand("com.formloop.grid.apply", config);
}

/**
 * Preview grid configuration
 * @param config - Grid configuration object
 * @returns Promise with preview result
 */
export async function previewGrid(config: Record<string, any>): Promise<any> {
  return sendCommand("com.formloop.grid.preview", config);
}

/**
 * Request auto-detect configuration
 * @param artboardRect - Artboard dimensions [left, top, right, bottom]
 * @returns Promise with auto-detected config
 */
export async function requestAutoDetect(
  artboardRect: [number, number, number, number]
): Promise<any> {
  return sendCommand("com.formloop.grid.autodetect", { artboardRect });
}

/**
 * Listen for grid application results
 * @param callback - Function to call when grid is applied
 */
export function onGridApply(
  callback: (result: any) => void
): () => void {
  if (!csInterface) {
    console.warn("CEP Bridge not initialized");
    return () => {};
  }

  const handler = (event: any) => {
    try {
      const result = JSON.parse(event.data);
      callback(result);
    } catch (e) {
      callback(event.data);
    }
  };

  csInterface.addEventListener("com.formloop.grid.apply.result", handler);

  // Return unsubscribe function
  return () => {
    csInterface?.removeEventListener("com.formloop.grid.apply.result", handler);
  };
}

/**
 * Listen for grid preview results
 * @param callback - Function to call when preview is generated
 */
export function onGridPreview(
  callback: (result: any) => void
): () => void {
  if (!csInterface) {
    console.warn("CEP Bridge not initialized");
    return () => {};
  }

  const handler = (event: any) => {
    try {
      const result = JSON.parse(event.data);
      callback(result);
    } catch (e) {
      callback(event.data);
    }
  };

  csInterface.addEventListener("com.formloop.grid.preview.result", handler);

  // Return unsubscribe function
  return () => {
    csInterface?.removeEventListener("com.formloop.grid.preview.result", handler);
  };
}

/**
 * Listen for errors
 * @param callback - Function to call when an error occurs
 */
export function onGridError(
  callback: (error: string) => void
): () => void {
  if (!csInterface) {
    console.warn("CEP Bridge not initialized");
    return () => {};
  }

  const handler = (event: any) => {
    callback(event.data);
  };

  csInterface.addEventListener("com.formloop.grid.error", handler);

  // Return unsubscribe function
  return () => {
    csInterface?.removeEventListener("com.formloop.grid.error", handler);
  };
}

/**
 * Evaluate a script in ExtendScript context
 * @param script - ExtendScript code to evaluate
 * @returns Promise with result
 */
export function evalExtendScript(script: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!csInterface) {
      reject(new Error("CEP Bridge not initialized"));
      return;
    }

    try {
      csInterface.evalScript(script, (result: string) => {
        resolve(result);
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Get system information
 * @returns Object with system info
 */
export function getSystemInfo(): Record<string, any> {
  if (!csInterface) {
    return {};
  }

  try {
    return {
      extensionId: csInterface.getExtensionID(),
      hostEnvironment: csInterface.getHostEnvironment(),
      userDataPath: csInterface.getSystemPath("user"),
      commonDataPath: csInterface.getSystemPath("common"),
      extensionPath: csInterface.getSystemPath("extension"),
    };
  } catch (error) {
    console.error("Failed to get system info:", error);
    return {};
  }
}

/**
 * Get the active document info
 * @returns Promise with document info
 */
export async function getDocumentInfo(): Promise<any> {
  const script = `
    (function() {
      if (!app.documents.length) {
        return JSON.stringify({ success: false, message: "No document open" });
      }
      
      var doc = app.activeDocument;
      var info = {
        success: true,
        documentName: doc.name,
        artboardCount: doc.artboards.length,
        activeArtboardIndex: doc.artboards.getActiveArtboardIndex(),
        artboards: []
      };
      
      for (var i = 0; i < doc.artboards.length; i++) {
        var ab = doc.artboards[i];
        var rect = ab.artboardRect;
        info.artboards.push({
          index: i,
          name: ab.name,
          width: rect[2] - rect[0],
          height: rect[1] - rect[3]
        });
      }
      
      return JSON.stringify(info);
    })();
  `;

  try {
    const result = await evalExtendScript(script);
    return JSON.parse(result);
  } catch (error) {
    console.error("Failed to get document info:", error);
    return { success: false, message: String(error) };
  }
}

export default {
  initializeCEPBridge,
  isCEPAvailable,
  sendCommand,
  applyGrid,
  previewGrid,
  requestAutoDetect,
  onGridApply,
  onGridPreview,
  onGridError,
  evalExtendScript,
  getSystemInfo,
  getDocumentInfo,
};
