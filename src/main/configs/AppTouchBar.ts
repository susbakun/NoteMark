import { BrowserWindow, TouchBar } from 'electron'

export const createApplicationTouchBar = (mainWindow?: BrowserWindow) => {
  const { TouchBarButton } = TouchBar

  const newNote = new TouchBarButton({
    click: () => {
      mainWindow?.webContents.send('createNote')
    },
    icon: '/Users/amir/Electron-Projects/notemark/resources/new_note.png'
  })

  const deleteNote = new TouchBarButton({
    click: () => {
      mainWindow?.webContents.send('deleteNote')
    },
    icon: '/Users/amir/Electron-Projects/notemark/resources/delete_note.png'
  })

  return new TouchBar({
    items: [newNote, deleteNote]
  })
}
