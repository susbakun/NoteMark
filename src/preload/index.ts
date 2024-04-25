import {
  CreateNote,
  DeleteNote,
  GetNotes,
  Initialization,
  OpenLink,
  ReadNote,
  ShowContextMenu,
  ShowSideBarContextMenu,
  ShowSortNotesContextMenu,
  WriteNote
} from '@shared/types'
import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled in the BrowserWindow')
}

try {
  contextBridge.exposeInMainWorld('context', {
    locale: navigator.language,
    getNotes: (...args: Parameters<GetNotes>) => ipcRenderer.invoke('getNotes', ...args),
    readNote: (...args: Parameters<ReadNote>) => ipcRenderer.invoke('readNote', ...args),
    writeNote: (...args: Parameters<WriteNote>) => ipcRenderer.invoke('writeNote', ...args),
    createNote: (...args: Parameters<CreateNote>) => ipcRenderer.invoke('createNote', ...args),
    deleteNote: (...args: Parameters<DeleteNote>) => ipcRenderer.invoke('deleteNote', ...args),
    sortNotes: (...args: Parameters<ShowSortNotesContextMenu>) =>
      ipcRenderer.invoke('sortNotes', ...args),
    showContextMenu: (...args: Parameters<ShowContextMenu>) =>
      ipcRenderer.invoke('showContextMenu', ...args),
    showSideBarContextMenu: (...args: Parameters<ShowSideBarContextMenu>) =>
      ipcRenderer.invoke('showSideBarContextMenu', ...args),
    openLink: (...args: Parameters<OpenLink>) => ipcRenderer.invoke('openLink', ...args),
    initilization: (...args: Parameters<Initialization>) => {
      ipcRenderer.on('createNote', async () => {
        const handleCreation = args[0]
        handleCreation()
      })

      if (!ipcRenderer.listenerCount('showFile')) {
        ipcRenderer.on('showFile', () => {
          ipcRenderer.invoke('showFile')
        })
      }

      ipcRenderer.on('deleteNote', () => {
        const handleDeleteNote = args[1]
        handleDeleteNote()
      })

      ipcRenderer.on('sortNotes:AToZ', () => {
        const handleSortNotes = args[2]
        handleSortNotes('sortNotesFromAToZ')
      })

      ipcRenderer.on('sortNotes:ZToA', () => {
        const handleSortNotes = args[2]
        handleSortNotes('sortNotesFromZToA')
      })

      ipcRenderer.on('sortNotes:NewToOld', () => {
        const handleSortNotes = args[2]
        handleSortNotes('sortNotesFromNewToOld')
      })

      ipcRenderer.on('sortNotes:OldToNew', () => {
        const handleSortNotes = args[2]
        handleSortNotes('sortNotesFromOldToNew')
      })
    }
  })
} catch (error) {
  console.error(error)
}
