import {
  CreateNote,
  DeleteNote,
  GetNotes,
  Initialization,
  OpenLink,
  ReadNote,
  ShowContextMenu,
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
      initilization: Initialization
    }
  }
}
