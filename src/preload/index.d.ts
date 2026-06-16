import {
  CreateDir,
  CreateNote,
  GetRootDir,
  Initialization,
  OpenLink,
  ReadNote,
  ScanDirectory,
  SelectFile,
  ShowContextMenu,
  ShowSideBarContextMenu,
  SortNotes,
  WriteNote
} from '@shared/types'

declare global {
  interface Window {
    // electron: ElectronAPI
    context: {
      locale: string
      getRootDir: GetRootDir
      scanDirectory: ScanDirectory
      selectFile: SelectFile
      readNote: ReadNote
      writeNote: WriteNote
      createNote: CreateNote
      createDir: CreateDir
      deleteFile: DeleteFile
      sortNotes: SortNotes
      openLink: OpenLink
      showContextMenu: ShowContextMenu
      showSideBarContextMenu: ShowSideBarContextMenu
      initilization: Initialization
    }
  }
}
