import { app, BrowserWindow, Menu, MenuItem, MenuItemConstructorOptions } from 'electron'

export const createApplicationMenu = () => {
  const focusedWindow = BrowserWindow.getFocusedWindow()
  const hasFilePath = !!(focusedWindow && focusedWindow.getRepresentedFilename())
  const template: MenuItemConstructorOptions[] = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New Note',
          accelerator: 'CommandOrControl+N',
          click(
            _menuItem: MenuItem,
            focusedWindow: BrowserWindow | undefined,
            _event: Electron.KeyboardEvent
          ) {
            focusedWindow?.webContents.send('createNote')
          }
        },
        { type: 'separator' },
        {
          label: 'Show File',
          enabled: hasFilePath,
          click(
            _menuItem: MenuItem,
            focusedWindow: BrowserWindow | undefined,
            _event: Electron.KeyboardEvent
          ) {
            focusedWindow?.webContents.send('showFile')
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          accelerator: 'CommandOrControl+Z',
          role: 'undo'
        },
        {
          label: 'Redo',
          accelerator: 'Shift+CommandOrControl+Z',
          role: 'redo'
        },
        { type: 'separator' },
        {
          label: 'Cut',
          accelerator: 'CommandOrControl+X',
          role: 'cut'
        },
        {
          label: 'Copy',
          accelerator: 'commandOrControl+C',
          role: 'copy'
        },
        {
          label: 'Paste',
          accelerator: 'CommandOrControl+V',
          role: 'paste'
        },
        {
          label: 'Select All',
          accelerator: 'CommandOrControl+A',
          role: 'selectAll'
        }
      ]
    },
    {
      label: 'Window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'CommandOrControl+M',
          role: 'minimize'
        },
        {
          label: 'Close',
          accelerator: 'CommandOrControl+W',
          role: 'close'
        }
      ]
    },
    {
      label: 'Help',
      role: 'help',
      submenu: [
        {
          label: 'Visit Website',
          click() {
            /* */
          }
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: 'CommandOrControl+Alt+I',
          click(
            _menuItem: MenuItem,
            focusedWindow: BrowserWindow | undefined,
            _event: Electron.KeyboardEvent
          ) {
            if (focusedWindow) focusedWindow.webContents.toggleDevTools()
          }
        }
      ]
    }
  ]

  if (process.platform === 'darwin') {
    const name = 'Note Mark'
    template.unshift({
      label: name,
      submenu: [
        {
          label: `About ${name}`,
          accelerator: '',
          role: 'about'
        },
        { type: 'separator' },
        {
          label: 'Services',
          accelerator: '',
          role: 'services'
        },
        { type: 'separator' },
        {
          label: `Hide ${name}`,
          accelerator: 'Command+H',
          role: 'hide'
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Alt+H',
          role: 'hideOthers'
        },
        {
          label: 'Show All',
          accelerator: '',
          role: 'unhide'
        },
        { type: 'separator' },
        {
          label: `Quit ${name}`,
          accelerator: 'Command+Q',
          click() {
            app.quit()
          }
        }
      ]
    })
  }

  const windowMenu = template.find((item) => item.label === 'Window')
  windowMenu!.role = 'window'
  const windowSubMenu = windowMenu!.submenu as MenuItemConstructorOptions[]
  windowSubMenu.push(
    { type: 'separator' },
    {
      label: 'Bring All to Front',
      role: 'front'
    }
  )

  return Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}
