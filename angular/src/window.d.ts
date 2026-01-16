interface ElectronAPI {
  rendererReady(): void;
}

interface Window {
  electronAPI: ElectronAPI;
}
