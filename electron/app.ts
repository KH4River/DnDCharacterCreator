import { app, BrowserWindow } from 'electron';

const createWindow = () => {
  const win = new BrowserWindow({ show: false });

  // start window maximized
  win.maximize();
  win.show();

  // remove default upper menu
  win.removeMenu();

  // open Angular app with hot module reloading in development mode
  // and in production build when in prod mode
  if (!app.isPackaged) {
    setTimeout(() => {
      win.loadURL('http://localhost:4200/');
    }, 500);
  }

  // TODO: add logic for production (when app is packaged)
};

app.whenReady().then(() => {
  createWindow();

  // macOS apps generally continue running even without any windows open, so this
  // opens a new window if none is available and the app is activated
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// quitting the app when no windows are open on non-macOS platforms
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
