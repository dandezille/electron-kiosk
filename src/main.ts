import { app, BrowserWindow } from 'electron';
import * as path from 'path';

import fetch from 'node-fetch';

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    kiosk: true,
    show: false
  });

  win.setFullScreen(true);
  win.loadURL('http://localhost:9000');
  // win.webContents.openDevTools();

  win.once('ready-to-show', () => win.show()); 
}

function waitForServer() {
  fetch('http://localhost:9000')
    .then(_ => {
      console.log('Server response received');
      createWindow();
    })
    .catch(err => {
      console.error(err);
      console.log('Waiting for server to start...');
      setTimeout(waitForServer, 1000);
    });
}

app.whenReady().then(waitForServer);

app.on('window-all-closed', () => {
  app.quit()
});
