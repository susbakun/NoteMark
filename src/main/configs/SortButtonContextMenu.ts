import { BrowserWindow, Menu, MenuItem } from 'electron'

export const sortButtonContextMenu = () => {
  return Menu.buildFromTemplate([
    {
      label: 'File name (A-Z)',
      click(
        _menuItem: MenuItem,
        focusedWindow: BrowserWindow | undefined,
        _event: Electron.KeyboardEvent
      ) {
        //
      }
    },
    {
      label: 'File name (Z-A)',
      click(
        _menuItem: MenuItem,
        focusedWindow: BrowserWindow | undefined,
        _event: Electron.KeyboardEvent
      ) {
        //
      }
    },
    { type: 'separator' },
    {
      label: 'Modified time (new to old)',
      click(
        _menuItem: MenuItem,
        focusedWindow: BrowserWindow | undefined,
        _event: Electron.KeyboardEvent
      ) {
        //
      }
    },
    {
      label: 'Modified time (old to new)',
      click(
        _menuItem: MenuItem,
        focusedWindow: BrowserWindow | undefined,
        _event: Electron.KeyboardEvent
      ) {
        //
      }
    }
  ])
}
