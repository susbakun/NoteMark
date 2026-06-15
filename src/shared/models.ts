type BaseItem = {
  name: string
  relativePath: string
}

export type DirectoryInfo = BaseItem & {
  type: 'directory'
  lastEditTime: number
  children: FileSystemItem[]
}

export type NoteInfo = BaseItem & {
  type: 'note'
  lastEditTime: number
  bookmarked: boolean
}

export type FileSystemItem = DirectoryInfo | NoteInfo

export type NoteContent = string
