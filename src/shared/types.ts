import { DirectoryInfo, FileSystemItem, NoteContent, NoteInfo } from './models'

export type ScanDirectory = (dirPath: string, relativePrefix?: string) => Promise<FileSystemItem[]>
export type ReadNote = (relativePath: NoteInfo['relativePath']) => Promise<NoteContent>
export type WriteNote = (
  relativePath: NoteInfo['relativePath'],
  content: NoteContent
) => Promise<void>
export type CreateNote = (
  parentRelativePath?: NoteInfo['relativePath']
) => Promise<NoteInfo['name'] | false>
export type CreateDir = (
  parentRelativePath?: NoteInfo['relativePath']
) => Promise<DirectoryInfo['name'] | false>
export type DeleteFile = (
  relativePath: NoteInfo['relativePath'],
  type: NoteInfo['type'] | DirectoryInfo['type']
) => Promise<boolean>
export type OpenLink = (link: string) => Promise<void>
export type Initialization = (
  handleCreation: () => Promise<void>,
  handleDeleteNote: () => Promise<void>,
  handleSortNotes: (sortType: SortType) => void
) => void
export type ShowFile = (relativePath: NoteInfo['relativePath']) => void
export type ShowContextMenu = () => void
export type ShowSideBarContextMenu = () => void
export type ShowSortNotesContextMenu = () => void
export type SortFunction = (notes: FileSystemItem[]) => FileSystemItem[]
export type SortType =
  | 'sortNotesFromAToZ'
  | 'sortNotesFromZToA'
  | 'sortNotesFromNewToOld'
  | 'sortNotesFromOldToNew'
