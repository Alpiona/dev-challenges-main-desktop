// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels =
  | 'ipc-example'
  | 'login'
  | 'logged'
  | 'main-view-url'
  | 'maximize'
  | 'close'
  | 'minimize'
  | 'refresh'
  | 'forward'
  | 'backward'
  | 'side-menu-navigation'
  | 'register';
export type StoreKeys =
  | 'username'
  | 'main-view-url'
  | 'token'
  | 'game'
  | 'all-games';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  electronStore: {
    get(key: StoreKeys) {
      return ipcRenderer.sendSync('electron-store-get', key);
    },
    set(key: StoreKeys, val: unknown) {
      ipcRenderer.send('electron-store-set', key, val);
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
