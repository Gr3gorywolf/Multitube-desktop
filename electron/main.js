
const { app } = require('electron');
const path = require('path');

global.sharedObj = { clienteses: [] };
app.commandLine.appendSwitch('max-old-space-size', '60');
const electron = require('electron');
const { BrowserWindow, ipcMain } = require('electron')
const { webFrame } = require('electron')

//server.listen(1337, '127.0.0.1');
const DownloadManager = require("electron-download-manager");

console.log(process.versions['chrome']);
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required')
app.on('window-all-closed', function () {

  app.quit();

});
DownloadManager.register();







function pressKey(keyCode) {

  win.webContents.sendInputEvent({
    type: "keyDown",
    keyCode: keyCode
  });

  win.webContents.sendInputEvent({
    type: "keyUp",
    keyCode: keyCode
  });

}



function createWindow() {
  // Create the browser window.



  win = new BrowserWindow({
    titleBarStyle: 'hidden',
    width: 800,
    height: 700,
    minHeight: 700,
    minWidth: 650,
    show: false,
    icon:__dirname + "/icon.ico",

    webPreferences: {
      nativeWindowOpen: true,
      nodeIntegration: true,
      webgl: true,
      webSecurity: false
    },
  })

  win.on('ready-to-show', function () {
    win.show();
    win.focus();
  });
 // win.toggleDevTools();
  win.setMenu(null);
  // and load the index.html of the app.
 // win.loadURL("http://localhost:4200");
    win.loadURL(`file://${__dirname}/dist/index.html`);
  win.webContents.frameRate = 60;



  win.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {

    if (frameName === 'settings') {
      // open window as modal
      event.preventDefault();
      event.newGuest = new BrowserWindow({
        //    parent: win,
        modal: true,
        width: 400,
        height: 360,
        titleBarStyle: 'hidden',
        minWidth: 400,
        minHeight: 360,
        maxWidth: 400,
        maxHeight: 360,
        webPreferences: {
          nodeIntegration: true
        }
      });
      event.newGuest.setMenu(null);
      event.newGuest.toggleDevTools();
      event.newGuest.loadFile('settings.html')
    }

    if (frameName.includes('Multitube web')) {
      // open window as modal
      event.preventDefault()
      Object.assign(options, {
        modal: true,
        //    parent: win,
        width: 800,
        height: 650,
        titleBarStyle: 'hidden',
        minWidth: 800,
        minHeight: 650,
        maxWidth: 800,
        maxHeight: 650
      })
      event.newGuest = new BrowserWindow(options)
      event.newGuest.setMenu(null);
      // event.newGuest.toggleDevTools();
    }


  })



}
ipcMain.on('pressKey', (evt, args) => {
  pressKey(args);
})
ipcMain.on('bringToFront', (evt, args) => {
  win.focus();
  //win.showInactive()
});


function abrirnavegador() {
  // Create the browser window.
  win = new BrowserWindow({ titleBarStyle: 'hidden', width: 600, height: 480, minHeight: 480, minWidth: 600 })
  win.setMenu(null);
  // and load the index.html of the app.
  win.loadFile('webbrowser.html');

}
app.on('ready', createWindow)



