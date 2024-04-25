import {
  createNote,
  deleteNote,
  getNotes,
  openLink,
  readNote,
  showContextMenu,
  showFile,
  showSideBarContextMenu,
  showSortNotesContextMenu,
  writeNote
} from '@/lib'
import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import {
  CreateNote,
  DeleteNote,
  GetNotes,
  OpenLink,
  ReadNote,
  ShowContextMenu,
  ShowFile,
  ShowSideBarContextMenu,
  ShowSortNotesContextMenu,
  WriteNote
} from '@shared/types'
import { app, BrowserWindow, ipcMain, shell } from 'electron'
import { join } from 'path'
import icon from '../../resources/icon.png?asset'
import { createApplicationMenu } from './configs/AppMenu'
import { createApplicationTouchBar } from './configs/AppTouchBar'

export function createWindow(): BrowserWindow {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 760,
    height: 550,
    minWidth: 500,
    minHeight: 285,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    center: true,
    title: 'NoteMark',
    vibrancy: 'fullscreen-ui',
    titleBarStyle: 'hidden',
    trafficLightPosition: { x: 15, y: 13 },
    frame: false,
    visualEffectState: 'active',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: true,
      contextIsolation: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.on('closed', () => {})

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  return mainWindow
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('ping', () => console.log('pong'))

  ipcMain.handle('getNotes', (_, ...args: Parameters<GetNotes>) => getNotes(...args))
  ipcMain.handle('readNote', (_, ...args: Parameters<ReadNote>) => readNote(...args))
  ipcMain.handle('writeNote', (_, ...args: Parameters<WriteNote>) => writeNote(...args))
  ipcMain.handle('createNote', (_, ...args: Parameters<CreateNote>) => createNote(...args))
  ipcMain.handle('deleteNote', (_, ...args: Parameters<DeleteNote>) => deleteNote(...args))
  ipcMain.handle('openLink', (_, ...args: Parameters<OpenLink>) => openLink(...args))
  ipcMain.handle('showFile', (_, ...args: Parameters<ShowFile>) => showFile(...args))
  ipcMain.handle('sortNotes', (_, ...args: Parameters<ShowSortNotesContextMenu>) =>
    showSortNotesContextMenu(...args)
  )
  ipcMain.handle('showContextMenu', (_, ...args: Parameters<ShowContextMenu>) =>
    showContextMenu(...args)
  )
  ipcMain.handle('showSideBarContextMenu', (_, ...args: Parameters<ShowSideBarContextMenu>) =>
    showSideBarContextMenu(...args)
  )

  let mainWindow = createWindow()

  createApplicationMenu()
  const touchBar = createApplicationTouchBar(mainWindow)
  mainWindow.setTouchBar(touchBar)

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      mainWindow = createWindow()
      mainWindow.setTouchBar(touchBar)
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
