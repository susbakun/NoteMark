import {
  bookmarkCheck,
  findFileRecursively,
  joinPath,
  mapRecursively,
  relativePathComparison,
  relativePathTypeComparison
} from '@renderer/utils'
import { DirectoryInfo, FileSystemItem, NoteContent, NoteWithContent } from '@shared/models'
import { SortType } from '@shared/types'
import { sortFilesSelector } from '@shared/utils'
import { Atom, atom } from 'jotai'
import { unwrap } from 'jotai/utils'
import { isEmpty } from 'lodash'

const getRootDir = async () => {
  return await window.context.getRootDir()
}

const getFileTree = async () => {
  let files = await window.context.scanDirectory(await getRootDir())

  if (localStorage.getItem('bookmarks')) {
    const bookmarks: string[] = JSON.parse(localStorage.getItem('bookmarks')!)
    if (!isEmpty(bookmarks)) {
      files = mapRecursively(files, bookmarkCheck(bookmarks), false, true)
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

const selectFileAtomAsync = atom(async (get) => {
  const files = get(fileTreeAtom)
  const selectedNotePath = get(selectedNotePathAtom)
  const selectedDirPath = get(selectedDirPathAtom)
  let selectedPath: string

  if (!files) return null
  if (selectedNotePath) {
    selectedPath = selectedNotePath
  } else if (selectedDirPath) {
    selectedPath = selectedDirPath
  } else {
    return null
  }

  const selectedFile = findFileRecursively(
    files,
    (relativePath) => relativePath === selectedNotePath
  )
  if (!selectedFile) return null

  if (selectedFile.type === 'directory') {
    return {
      ...selectedFile
    }
  }
  const noteContent = await window.context.readNote(selectedPath)

  return {
    ...selectedFile,
    content: noteContent
  }
})

export const selectedFileAtom: Atom<DirectoryInfo | NoteWithContent> = unwrap(
  selectFileAtomAsync,
  (prev) =>
    prev ?? {
      type: 'note',
      relativePath: '.',
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
  const sortFunction = sortFilesSelector(sortFunctionName)

  const sortedFiles = sortFunction(files)

  set(fileTreeAtom, sortedFiles)
})

export const saveNoteAtom = atom(null, async (get, set, newContent: NoteContent) => {
  const files = get(fileTreeAtom)
  const selectedFile = get(selectedFileAtom)

  if (!files || !selectedFile) return
  if (selectedFile.type !== 'note') return

  await window.context.writeNote(selectedFile.relativePath, newContent)

  //update the saved note's last edit time
  set(fileTreeAtom, mapRecursively(files, relativePathComparison(selectedFile)))
})

export const createEmptyNoteAtom = atom(null, async (get, set) => {
  const files = get(fileTreeAtom)

  if (!files) return
  const parentRelativePath = get(selectedDirPathAtom) ?? ''

  const name = await window.context.createNote(parentRelativePath)

  if (!name) return

  const relativePath = joinPath(parentRelativePath, name)

  set(fileTreeAtom, await getFileTree())
  set(selectedNotePathAtom, relativePath)
})

// used for both note and dir
export const deleteFileAtom = atom(null, async (get, set) => {
  const files = get(fileTreeAtom)

  const selectedFile = get(selectedFileAtom)

  if (!selectedFile || !files) return

  const isDeleted = await window.context.deleteFile(selectedFile.relativePath, selectedFile.type)
  if (!isDeleted) return

  if (localStorage.getItem('bookmarks')) {
    let bookmarks: string[] = JSON.parse(localStorage.getItem('bookmarks')!)
    if (bookmarks.includes(selectedFile.relativePath)) {
      bookmarks = bookmarks.filter((bookmark) => bookmark !== selectedFile.relativePath)
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    }
  }

  set(fileTreeAtom, await getFileTree())

  set(selectedNotePathAtom, null)
})

export const createDirAtom = atom(null, async (get, set) => {
  const files = get(fileTreeAtom)

  if (!files) return

  const parentRelativePath = get(selectedDirPathAtom) ?? ''
  const name = await window.context.createDir(parentRelativePath)

  if (!name) return

  const relativePath = joinPath(parentRelativePath, name)

  set(fileTreeAtom, await getFileTree())
  set(selectedDirPathAtom, relativePath)
})

export const bookmarkNoteAtom = atom(null, (get, set) => {
  const files = get(fileTreeAtom)
  const selectedFile = get(selectedFileAtom)

  if (!selectedFile || !files) return
  if (selectedFile.type === 'directory') return

  let bookmarks: string[] = []

  if (localStorage.getItem('bookmarks')) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks')!)
  }

  if (bookmarks.includes(selectedFile.relativePath)) {
    bookmarks = bookmarks.filter((bookmark) => bookmark !== selectedFile.relativePath)
  } else {
    bookmarks.push(selectedFile.relativePath)
  }

  localStorage.setItem('bookmarks', JSON.stringify(bookmarks))

  set(fileTreeAtom, mapRecursively(files, relativePathTypeComparison(selectedFile), true))
})
