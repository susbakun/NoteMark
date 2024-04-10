import { handleRadioButtonsCheck } from '@/utils'
import { BrowserWindow, Menu, MenuItem } from 'electron'

let radioButtons = [false, false, true, false]

export const sortButtonContextMenu = () => {
  const menuTemplate = Menu.buildFromTemplate([
    {
      label: 'File name (A-Z)',
      type: 'checkbox',
      checked: radioButtons[0],
      click(
        _menuItem: MenuItem,
        focusedWindow: BrowserWindow | undefined,
        _event: Electron.KeyboardEvent
      ) {
        radioButtons = handleRadioButtonsCheck(radioButtons, 0)
        focusedWindow?.webContents.send('sortNotes:AToZ')
      }
    },
    {
      label: 'File name (Z-A)',
      type: 'checkbox',
      checked: radioButtons[1],
      click(
        _menuItem: MenuItem,
        focusedWindow: BrowserWindow | undefined,
        _event: Electron.KeyboardEvent
      ) {
        radioButtons = handleRadioButtonsCheck(radioButtons, 1)
        focusedWindow?.webContents.send('sortNotes:ZToA')
      }
    },
    { type: 'separator' },
    {
      label: 'Modified time (new to old)',
      type: 'checkbox',
      checked: radioButtons[2],
      click(
        _menuItem: MenuItem,
        focusedWindow: BrowserWindow | undefined,
        _event: Electron.KeyboardEvent
      ) {
        radioButtons = handleRadioButtonsCheck(radioButtons, 2)
        focusedWindow?.webContents.send('sortNotes:NewToOld')
      }
    },
    {
      label: 'Modified time (old to new)',
      type: 'checkbox',
      checked: radioButtons[3],
      click(
        _menuItem: MenuItem,
        focusedWindow: BrowserWindow | undefined,
        _event: Electron.KeyboardEvent
      ) {
        radioButtons = handleRadioButtonsCheck(radioButtons, 3)
        focusedWindow?.webContents.send('sortNotes:OldToNew')
      }
    }
  ])
  return menuTemplate
}
