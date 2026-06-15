import { joinPath } from '@renderer/utils'
import { appDirectoryName, homeDir } from '@shared/constants'
import { DirectoryInfo, FileSystemItem, NoteContent, NoteInfo } from '@shared/models'
import { SortType } from '@shared/types'
import { sortNotesSelector } from '@shared/utils'
import { atom } from 'jotai'
import { unwrap } from 'jotai/utils'
import { isEmpty } from 'lodash'

const getRootDir = () => {
  return joinPath(homeDir, appDirectoryName)
}

const getFileTree = async () => {
  let files = await window.context.scanDirectory(getRootDir())

  if (localStorage.getItem('bookmarks')) {
    const bookmarks: string[] = JSON.parse(localStorage.getItem('bookmarks')!)
    if (!isEmpty(bookmarks)) {
      files = files.map((file) => {
        if (bookmarks.includes(file.relativePath)) {
          return { ...file, bookmarked: true }
        }
        return file
      })
    }
  }

  // sort them by most recently edited
  return files.sort((a, b) => b.lastEditTime - a.lastEditTime)
}

const fileTreeAtomAsync = atom<FileSystemItem[] | Promise<FileSystemItem[]>>(getFileTree())

export const fileTreeAtom = unwrap(fileTreeAtomAsync, (prev) => {
  return prev
})

export const selectedNotePathAtom = atom<string | null>(null)
export const expandedDirsAtom = atom<Set<string>>(new Set<string>())
export const selectedDirPathAtom = atom<string | null>(null)

const selectedNoteAtomAsync = atom(async (get) => {
  const files = get(fileTreeAtom)
  const selectedNotePath = get(selectedNotePathAtom)

  if (selectedNotePath == null || !files) return null

  const selectedNote = files.find((note) => note.relativePath == selectedNotePath)
  if (!selectedNote) return null
  const noteContent = await window.context.readNote(selectedNotePath)

  return {
    ...selectedNote,
    content: noteContent
  }
})

export const selectedNoteAtom = unwrap(
  selectedNoteAtomAsync,
  (prev) =>
    prev ?? {
      type: 'note',
      relativePath: getRootDir(),
      name: '',
      content: '',
      bookmarked: false,
      lastEditTime: Date.now()
    }
)

export const sortFunctionNameAtom = atom<SortType>('sortNotesFromNewToOld')

export const sortFilesAtom = atom(null, (get, set) => {
  const files = get(fileTreeAtom)

  if (!files) return

  const sortFunctionName = get(sortFunctionNameAtom)
  const sortFunction = sortNotesSelector(sortFunctionName)

  const sortedFiles = sortFunction(files)

  set(fileTreeAtom, sortedFiles)
})

export const saveNoteAtom = atom(null, async (get, set, newContent: NoteContent) => {
  const files = get(fileTreeAtom)
  const selectedNote = get(selectedNoteAtom)

  if (!files || !selectedNote) return

  await window.context.writeNote(selectedNote.relativePath, newContent)

  //update the saved note's last edit time
  set(
    fileTreeAtom,
    files.map((file) => {
      if (file.relativePath === selectedNote.relativePath) {
        return {
          ...file,
          lastEditTime: Date.now()
        }
      }
      return file
    })
  )
})

export const createEmptyNoteAtom = atom(null, async (get, set) => {
  const files = get(fileTreeAtom)

  if (!files) return
  const parentRelativePath = get(selectedDirPathAtom) ?? ''

  const name = await window.context.createNote(parentRelativePath)

  if (!name) return

  const relativePath = joinPath(parentRelativePath, name)

  const newNote: NoteInfo = {
    name,
    type: 'note',
    relativePath,
    lastEditTime: Date.now(),
    bookmarked: false
  }

  const sortFunctionName = get(sortFunctionNameAtom)
  const sortFunction = sortNotesSelector(sortFunctionName)

  const newFiles = sortFunction([
    newNote,
    ...files.filter((file) => file.relativePath !== newNote.relativePath)
  ])

  set(fileTreeAtom, newFiles)
  set(selectedNotePathAtom, relativePath)
})

// used for both note and dir
export const deleteFileAtom = atom(null, async (get, set) => {
  const files = get(fileTreeAtom)

  const selectedNote = get(selectedNoteAtom)

  if (!selectedNote || !files) return

  const isDeleted = await window.context.deleteFile(selectedNote.relativePath, selectedNote.type)
  if (!isDeleted) return

  if (localStorage.getItem('bookmarks')) {
    let bookmarks: string[] = JSON.parse(localStorage.getItem('bookmarks')!)
    if (bookmarks.includes(selectedNote.relativePath)) {
      bookmarks = bookmarks.filter((bookmark) => bookmark !== selectedNote.relativePath)
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    }
  }

  const sortFunctionName = get(sortFunctionNameAtom)
  const sortFunction = sortNotesSelector(sortFunctionName)

  set(
    fileTreeAtom,
    sortFunction(files).filter((file) => file.relativePath !== selectedNote.relativePath)
  )

  set(selectedNotePathAtom, null)
})

export const createDirAtom = atom(null, async (get, set) => {
  const files = get(fileTreeAtom)

  if (!files) return

  const parentRelativePath = get(selectedDirPathAtom) ?? ''
  const name = await window.context.createDir(parentRelativePath)

  if (!name) return

  const relativePath = joinPath(parentRelativePath, name)

  const newDirectory: DirectoryInfo = {
    name,
    type: 'directory',
    children: [],
    relativePath,
    lastEditTime: Date.now()
  }

  const sortFunctionName = get(sortFunctionNameAtom)
  const sortFunction = sortNotesSelector(sortFunctionName)

  const newFiles = sortFunction([
    newDirectory,
    ...files.filter((file) => file.relativePath !== newDirectory.relativePath)
  ])

  set(fileTreeAtom, newFiles)
  set(selectedDirPathAtom, relativePath)
})

export const bookmarkNoteAtom = atom(null, (get, set) => {
  const files = get(fileTreeAtom)
  const selectedNote = get(selectedNoteAtom)

  if (!selectedNote || !files) return

  let bookmarks: string[] = []

  if (localStorage.getItem('bookmarks')) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks')!)
  }

  if (bookmarks.includes(selectedNote.relativePath)) {
    bookmarks = bookmarks.filter((bookmark) => bookmark !== selectedNote.relativePath)
  } else {
    bookmarks.push(selectedNote.relativePath)
  }

  localStorage.setItem('bookmarks', JSON.stringify(bookmarks))

  set(
    fileTreeAtom,
    files.map((file) => {
      if (file.relativePath === selectedNote.relativePath && selectedNote.type === 'note') {
        return { ...file, bookmarked: !selectedNote.bookmarked }
      }
      return file
    })
  )
})
