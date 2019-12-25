
const {app} =require('electron');
const path = require('path');

global.sharedObj = {clienteses:[] };
app.commandLine.appendSwitch('max-old-space-size', '60');
const electron = require('electron');
const {BrowserWindow,ipcMain}= require('electron')
const {webFrame} = require('electron')

//server.listen(1337, '127.0.0.1');
const DownloadManager = require("electron-download-manager");

console.log(process.versions['chrome']);
app.commandLine.appendSwitch('autoplay-policy','no-user-gesture-required')
app.on('window-all-closed', function() {

      app.quit();
   
 });
DownloadManager.register();
  function createWindow () {
    // Create the browser window.


    ipcMain.on('imprimir', () => {
      console.log(global.sharedObj.clienteses.lenght);
    })

   
    win = new BrowserWindow({
      titleBarStyle: 'hidden',
      width: 800, 
      height: 700,
      minHeight:700,
      minWidth:600, 
      show: false,
     
      webPreferences: {
        nativeWindowOpen: true,
        nodeIntegration: true,
        webgl:true
      },
    
    })

    win.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
      if (frameName === 'webbrowser') {
        // open window as modal
        event.preventDefault()
        Object.assign(options, {
          modal: true,
      //    parent: win,
          width:450,
          height:450,
          minWidth:650,
          minHeight:600,
          titleBarStyle: 'hidden',
          
        })
        event.newGuest = new BrowserWindow(options)
        event.newGuest.setMenu(null);
      //  event.newGuest.toggleDevTools();
        event.newGuest.loadFile('webbrowser.html')
      }
      else
        if (frameName === 'connectdevices') {
          // open window as modal
          event.preventDefault()
          Object.assign(options, {
           modal: true,
        //    parent: win,
            width:360,
            height:500,
            titleBarStyle: 'hidden',
            minWidth:360,
            minHeight:500,
            maxWidth:360,
            maxHeight:500
        
       
          
            
            
          })
          event.newGuest = new BrowserWindow(options)
          event.newGuest.setMenu(null);
        // event.newGuest.toggleDevTools();
          event.newGuest.loadFile('connectdevices.html')
        }
        else
        if (frameName === 'settings') {
          // open window as modal
          event.preventDefault()
          Object.assign(options, {
           modal: true,
        //    parent: win,
            width:400,
            height:360,
            titleBarStyle: 'hidden',
            minWidth:400,
            minHeight:360,
            maxWidth:400,
            maxHeight:360
        
       
          
            
            
          })
          event.newGuest = new BrowserWindow(options)
          event.newGuest.setMenu(null);
        // event.newGuest.toggleDevTools();
          event.newGuest.loadFile('settings.html')
        }

       
    
    })
    win.on('ready-to-show', function() { 
      win.show(); 
      win.focus(); 
    });
  win.toggleDevTools();
  win.setMenu(null);
    // and load the index.html of the app.
    win.loadURL("http://localhost:4200");
//  win.loadURL(`file://${__dirname}/dist/index.html`);
  win.webContents.frameRate = 60;
  }
  function abrirnavegador () {
    // Create the browser window.
    win = new BrowserWindow({titleBarStyle: 'hidden',width: 600, height: 480,minHeight:480,minWidth:600 })
  win.setMenu(null);
    // and load the index.html of the app.
    win.loadFile('webbrowser.html');
  
  }
  app.on('ready', createWindow)

 
 
