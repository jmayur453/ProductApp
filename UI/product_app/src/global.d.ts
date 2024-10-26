// src/global.d.ts

declare global {
    interface Window {
      getToken: {
        postMessage: (message: string) => void;
      };
      device: {
        postMessage: (message: string) => void;
      };
      receiveToken: (receivedToken: string) => void;
    }
  }
  
  // This is required to make the file a module
  export {};
  