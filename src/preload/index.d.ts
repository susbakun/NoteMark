import {
  CreateNote,
  DeleteNote,
  GetNotes,
  Initialization,
  OpenLink,
  ReadNote,
  ShowContextMenu,
  ShowSideBarContextMenu,
  WriteNote
} from '@shared/types'

declare global {
  interface Window {
    // electron: ElectronAPI
    context: {
      locale: string
      getNotes: GetNotes
      readNote: ReadNote
      writeNote: WriteNote
      createNote: CreateNote
      deleteNote: DeleteNote
      openLink: OpenLink
      showContextMenu: ShowContextMenu
      showSideBarContextMenu: ShowSideBarContextMenu
      initilization: Initialization
    }
  }
}
