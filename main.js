const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { spawn, exec } = require('child_process');
const fs = require('fs');
const { start } = require('repl');
const axios = require('axios');
const { clear } = require('console');
const { version } = require('os');

const packageInfo = require('./package.json');

let mainWindow;
const homeDir = app.getPath('home');

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    // fullscreen: true,
    // frame: false,
    resizable: false,
    width: 1440,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: false,
    },
    icon: path.join(__dirname, 'assets', 'icon.png'),
  });

  mainWindow.loadURL('https://isunfa.tw/users/login');
  mainWindow.on('closed', () => {
    mainWindow = null;
    app.quit();
  });  
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  mainWindow = null;
  app.quit();
});
