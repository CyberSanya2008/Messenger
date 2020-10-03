const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu } = electron;

let mainWindow;

// Настройки окна
app.on("ready", function () {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    minHeight: 700,
    minWidth: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  //Загрузка Html в окне
  mainWindow.loadURL(
    url.format({
      pathname: path.join(
        __dirname,
        "templates/startup/startup.html"
      ),
      protocol: "file:",
      slashes: true,
    })
  );
  //mainWindow.webContents.openDevTools();
});
