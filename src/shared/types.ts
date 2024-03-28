import { NoteContent, NoteInfo } from './models'

export type GetNotes = () => Promise<NoteInfo[]>
export type ReadNote = (title: NoteInfo['title']) => Promise<NoteContent>
export type WriteNote = (title: NoteInfo['title'], content: NoteContent) => Promise<void>
export type CreateNote = () => Promise<NoteInfo['title'] | false>
export type DeleteNote = (title: NoteInfo['title']) => Promise<boolean>
export type OpenLink = (link: string) => Promise<void>
export type Initialization = (
  handleCreation: () => Promise<void>,
  getSelectedFileName: () => NoteInfo['title'] | false
) => void
export type ShowFile = (fileName: NoteInfo['title']) => void
export type ShowContextMenu = () => void
