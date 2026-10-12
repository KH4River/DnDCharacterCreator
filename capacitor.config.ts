import type { CapacitorConfig } from '@capacitor/cli';

// Mobile and web only. Desktop is a separate raw-Electron shell; see
// electron/ and the DatabaseService port selection.
const config: CapacitorConfig = {
  appId: 'com.embercodex.app',
  appName: 'Ember Codex',
  webDir: 'angular/dist/dnd-character-creator/browser',
};

export default config;
