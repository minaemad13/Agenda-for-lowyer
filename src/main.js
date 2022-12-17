// Modules to control application life and create native browser window
const {app, BrowserWindow , Tray,nativeImage} = require('electron')
const path = require('path')
const windowStateKepper=require('electron-window-state');
let mainWindow , tray


function create_tray() {
  tray=new Tray(nativeImage.createFromPath("../assets/images/law-transformed.png"));
}
function createWindow () {
  create_tray()
  let winState= windowStateKepper({
    defaultHeight:100,
    defaultWidth:1500,
  })
  // Create the browser window.
   mainWindow = new BrowserWindow({
    width: winState.width,
    height: winState.height,
    x:winState.x,
    y:winState.y,
    // center:true,
    // skipTaskbar:true,
    icon: path.join(__dirname, '../assets/images/law-transformed.png'),
    // useContentSize:true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,

      preload: path.join(__dirname, 'preload.js')
    },
    show:false
  })
  
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  winState.manage(mainWindow)
  mainWindow.once("ready-to-show",mainWindow.show)
  mainWindow.removeMenu()
  // Open the DevTmaools.
  // mainWindow.webContents.openDevTools()
  
  // mainWindow.webContents.insertCSS('html, body { overflow: hidden; }')
  mainWindow.on("closed",()=>{
    mainWindow=null
  })

  
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// SET ENV
process.env.NODE_ENV = 'production';

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
