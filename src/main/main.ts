/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import { BrowserWindow, app, ipcMain, session, shell } from 'electron';
import log from 'electron-log';
import Store from 'electron-store';
import { autoUpdater } from 'electron-updater';
import path from 'path';
import { handleLogin } from '../actions/userActions';
import { resolveHtmlPath } from './util';
import ViewsManager from './views';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

const store = new Store();

let views: ViewsManager;

let mainWindow: BrowserWindow | null = null;

function handleNavigation(url: string) {
  if (url.startsWith('oppaiman')) {
    console.log(url);
  } else if (
    url.startsWith('http://localhost3000') ||
    url.startsWith('localhost3000')
  ) {
    console.log(url);
  }
}

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

ipcMain.on('get-url', async (event) => {
  console.log('bateu');
  let url = '';
  const mainViewIsShowing = views.mainView.webContents.isOffscreen();

  url = mainViewIsShowing
    ? views.mainView.webContents.getURL()
    : mainWindow!.webContents.getURL();

  console.log(url);
  event.reply('get-url', url);
});

ipcMain.on('electron-store-get', async (event, val) => {
  event.returnValue = store.get(val);
});

ipcMain.on('electron-store-set', async (event, key, val) => {
  if (key === 'url') {
    handleNavigation(val);
  }

  store.set(key, val);
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    console.log(path.join(RESOURCES_PATH, ...paths));
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    // frame: false,
    titleBarStyle: 'hidden',
    show: false,
    width: 1500,
    height: 1000,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.removeMenu();

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // const menuBuilder = new MenuBuilder(mainWindow);
  // menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

const login = async (username: string, password: string) => {
  const { token, expiresAt } = await handleLogin({ password, username });

  store.set('token', token);

  const cookie = {
    url: 'http://localhost:3000',
    name: 'token',
    value: token,
    expirationDate: new Date(expiresAt).getTime() / 1000,
  };

  session.defaultSession.cookies
    .set(cookie)
    .then(() => console.log('session return'))
    .catch((err) => console.log(err));
};

ipcMain.on('login', async (_event, { username, password }) => {
  await login(username, password);
  store.set('username', username);
  mainWindow?.webContents.send('logged');
  views = new ViewsManager(mainWindow!);

  views.mainView.webContents.on('did-navigate-in-page', () => {
    const url = views.mainView.webContents.getURL();

    store.set('main-view-url', url);

    mainWindow?.webContents.send('main-view-url');
  });
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
