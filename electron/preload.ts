// Preload runs in the renderer's context. It exposes exactly the database
// primitives the renderer needs and nothing else.
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  rendererReady: () => ipcRenderer.send('renderer-ready'),
  db: {
    version: () => ipcRenderer.invoke('db:version'),
    exec: (sql: string) => ipcRenderer.invoke('db:exec', sql),
    run: (sql: string, params: unknown[]) => ipcRenderer.invoke('db:run', sql, params),
    all: (sql: string, params: unknown[]) => ipcRenderer.invoke('db:all', sql, params),
    get: (sql: string, params: unknown[]) => ipcRenderer.invoke('db:get', sql, params),
  },
});
