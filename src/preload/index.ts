import {
  CreateDir,
  CreateNote,
  DeleteFile,
  GetRootDir,
  Initialization,
  OpenLink,
  ReadNote,
  ScanDirectory,
  SelectFile,
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
    getRootDir: (...args: Parameters<GetRootDir>) => ipcRenderer.invoke('getRootDir', ...args),
    scanDirectory: (...args: Parameters<ScanDirectory>) =>
      ipcRenderer.invoke('scanDirectory', ...args),
    selectFile: (...args: Parameters<SelectFile>) => ipcRenderer.invoke('selectFile', ...args),
    readNote: (...args: Parameters<ReadNote>) => ipcRenderer.invoke('readNote', ...args),
    writeNote: (...args: Parameters<WriteNote>) => ipcRenderer.invoke('writeNote', ...args),
    createNote: (...args: Parameters<CreateNote>) => ipcRenderer.invoke('createNote', ...args),
    createDir: (...args: Parameters<CreateDir>) => ipcRenderer.invoke('createDir', ...args),
    deleteFile: (...args: Parameters<DeleteFile>) => ipcRenderer.invoke('deleteFile', ...args),
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

      ipcRenderer.on('deleteFile', () => {
        const handleDeleteFile = args[1]
        handleDeleteFile()
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
