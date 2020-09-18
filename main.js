const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu } = electron;

let mainWindow;

// Listen for the app to be ready
app.on("ready", function () {
  mainWindow = new BrowserWindow({
    width: 700,
    height: 500,
    minHeight: 500,
    minWidth: 700,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  
  //load html into window
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "mainWindow.html"),
      protocol: "file:",
      slashes: true,
    })
  );

 
});