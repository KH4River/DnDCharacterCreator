import type { CapacitorConfig } from '@capacitor/cli';

// Mobile and web only. Desktop is a separate raw-Electron shell; see
// electron/ and the DatabaseService port selection.
const config: CapacitorConfig = {
  appId: 'com.dndcharactercreator.app',
  appName: 'D&D Character Creator',
  webDir: 'angular/dist/dnd-character-creator/browser',
};

export default config;
