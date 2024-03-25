import { CreateNote, DeleteNote, GetNotes, OpenLink, ReadNote, WriteNote } from '@shared/types'

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
    }
  }
}
