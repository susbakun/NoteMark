import { BrowserWindow, Menu, MenuItem } from 'electron'

export const createSideBarContextMenu = () => {
  return Menu.buildFromTemplate([
    {
      label: 'Delete File',
      click(
        _menuItem: MenuItem,
        focusedWindow: BrowserWindow | undefined,
        _event: Electron.KeyboardEvent
      ) {
        focusedWindow?.webContents.send('deleteFile')
      }
    }
  ])
}
