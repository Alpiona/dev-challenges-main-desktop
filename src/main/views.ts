import { BrowserView, BrowserWindow, app } from 'electron';
import path from 'path';
import { resolveHtmlPath } from './util';

export default class ViewsManager {
  private mainWindow: BrowserWindow;
  public hideMainView = false;
  public mainView: BrowserView;
  public bottomMenuView: BrowserView | undefined;

  SIDE_MENU_WIDTH = 350;
  TOP_MENU_HEIGHT = 100;
  BOTTOM_MENU_HEIGHT = 150;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
    this.mainView = new BrowserView();
    this.initializeViews();

    mainWindow.on('resize', () => {
      this.updateViewsSize();
    });
  }

  private initializeViews() {
    this.updateViewsSize();
    this.initializeMainView();
  }

  private initializeMainView() {
    this.mainWindow.addBrowserView(this.mainView);
    this.mainView.webContents.loadURL('http://localhost:3000');
  }

  public initializeBottomMenuView() {
    this.bottomMenuView = new BrowserView({
      webPreferences: {
        preload: app.isPackaged
          ? path.join(__dirname, 'preload.js')
          : path.join(__dirname, '../../.erb/dll/preload.js'),
      },
    });
    this.mainWindow.addBrowserView(this.bottomMenuView);
    this.updateViewsSize();
    this.bottomMenuView.webContents.loadURL(
      resolveHtmlPath('index.html', '/bottom-menu')
    );
  }

  public finalizeBottomMenuView() {
    if (this.bottomMenuView) {
      this.bottomMenuView.webContents.close();
    }
  }

  public updateViewsSize() {
    const [width, height] = this.mainWindow.getSize();

    this.mainView.setBounds({
      x: this.SIDE_MENU_WIDTH,
      y: this.TOP_MENU_HEIGHT,
      width: this.hideMainView ? 0 : width - this.SIDE_MENU_WIDTH,
      height: height - this.TOP_MENU_HEIGHT,
    });

    if (this.bottomMenuView) {
      this.bottomMenuView.setBounds({
        x: this.SIDE_MENU_WIDTH,
        y: height - this.BOTTOM_MENU_HEIGHT,
        width: this.hideMainView ? 0 : width - this.SIDE_MENU_WIDTH,
        height: this.BOTTOM_MENU_HEIGHT,
      });
    }
  }
}
