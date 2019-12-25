const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let win;

function createWindow()
{
    win = new BrowserWindow({ width: 800, height: 800, autoHideMenuBar: true, useContentSize: true, webPreferences: { additionalArguments: ['electron'] } });
    win.webContents.executeJavaScript('window.onresize = null;');

    win.on('resize', () => {
        win.webContents.executeJavaScript(`resize([${win.getBounds().width}, ${win.getBounds().height}]);`);
    });

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    win.on('closed', () => {
        win = null;
    });
    // win.webContents.openDevTools();
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
    {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null)
    {
        createWindow();
    }
});