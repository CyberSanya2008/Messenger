const electron = require("electron");
const url = require("url");
const path = require("path");
const fs = require("fs");

const { app, BrowserWindow, Menu } = electron;

let mainWindow;

let rawdata = fs.readFileSync("current_user.json");
let user = JSON.parse(rawdata);
let startPage;
if (user.name == 0) {
  startPage = "templates/login_signup/login_signup.html";
} else {
  startPage = "templates/main_page/Profile/profile.html";
}

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
      pathname: path.join(__dirname, startPage),
      protocol: "file:",
      slashes: true,
    })
  );

  //mainWindow.webContents.openDevTools();
});
