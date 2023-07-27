import { BrowserView, BrowserWindow, app } from 'electron';
import path from 'path';
import { resolveHtmlPath } from './util';

export default class ViewsManager {
  private mainWindow: BrowserWindow;
  public mainView: BrowserView;
  public bottomMenuView: BrowserView;

  SIDE_MENU_WIDTH = 350;
  TOP_MENU_HEIGHT = 100;
  BOTTOM_MENU_HEIGHT = 150;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
    this.mainView = new BrowserView();
    this.bottomMenuView = new BrowserView({
      webPreferences: {
        preload: app.isPackaged
          ? path.join(__dirname, 'preload.js')
          : path.join(__dirname, '../../.erb/dll/preload.js'),
      },
    });
    this.initializeViews();

    mainWindow.on('resize', () => {
      const [width, height] = this.mainWindow.getSize();
      this.updateViewsSize(width, height);
    });

    mainWindow.on('resized', () => {
      const [width, height] = this.mainWindow.getSize();
      this.updateViewsSize(width, height);
    });

    mainWindow.on('will-resize', () => {
      const [width, height] = this.mainWindow.getSize();
      this.updateViewsSize(width, height);
    });

    mainWindow.on('maximize', () => {
      const [width, height] = this.mainWindow.getSize();
      this.updateViewsSize(width, height);
    });

    mainWindow.on('moved', () => {
      const [width, height] = this.mainWindow.getSize();
      this.updateViewsSize(width, height);
    });

    mainWindow.on('will-move', () => {
      const [width, height] = this.mainWindow.getSize();
      this.updateViewsSize(width, height);
    });

    mainWindow.on('enter-full-screen', () => {
      const [width, height] = this.mainWindow.getSize();
      this.updateViewsSize(width, height);
    });

    mainWindow.on('leave-full-screen', () => {
      const [width, height] = this.mainWindow.getSize();
      this.updateViewsSize(width, height);
    });
  }

  private initializeViews() {
    const [width, height] = this.mainWindow.getSize();

    this.updateViewsSize(width, height);
    // this.initializeMainView();
    this.initializeBottomMenuView();
  }

  private initializeMainView() {
    this.mainWindow.addBrowserView(this.mainView);
    this.mainView.webContents.loadURL('http://localhost:3000');
  }

  private initializeBottomMenuView() {
    this.mainWindow.addBrowserView(this.bottomMenuView);
    this.bottomMenuView.webContents.loadURL(
      resolveHtmlPath('index.html', '/bottom-menu')
    );
  }

  private updateViewsSize(width: number, height: number) {
    this.mainView.setBounds({
      x: this.SIDE_MENU_WIDTH,
      y: this.TOP_MENU_HEIGHT,
      width: width - this.SIDE_MENU_WIDTH,
      height: height - this.TOP_MENU_HEIGHT,
    });

    this.bottomMenuView.setBounds({
      x: this.SIDE_MENU_WIDTH,
      y: height - this.BOTTOM_MENU_HEIGHT,
      width: width - this.SIDE_MENU_WIDTH,
      height: this.BOTTOM_MENU_HEIGHT,
    });
  }
}
