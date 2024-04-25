import { NoteContent, NoteInfo } from '@shared/models'
import { SortType } from '@shared/types'
import { sortNotesSelector } from '@shared/utils'
import { atom } from 'jotai'
import { unwrap } from 'jotai/utils'
import { isEmpty } from 'lodash'

const loadNotes = async () => {
  let notes = await window.context.getNotes()

  if (localStorage.getItem('bookmarks')) {
    const bookmarks: string[] = JSON.parse(localStorage.getItem('bookmarks')!)
    if (!isEmpty(bookmarks)) {
      notes = notes.map((note) => {
        if (bookmarks.includes(note.title)) {
          return { ...note, bookmarked: true }
        }
        return note
      })
    }
  }

  // sort them by most recently edited
  return notes.sort((a, b) => b.lastEditTime - a.lastEditTime)
}

const notesAtomAsync = atom<NoteInfo[] | Promise<NoteInfo[]>>(loadNotes())

export const notesAtom = unwrap(notesAtomAsync, (prev) => {
  return prev
})

export const selectedNoteIndexAtom = atom<number | null>(null)

const selectedNoteAtomAsync = atom(async (get) => {
  const notes = get(notesAtom)
  const selectedNoteIndex = get(selectedNoteIndexAtom)

  if (selectedNoteIndex == null || !notes) return null

  const selectedNote = notes[selectedNoteIndex]

  const noteContent = await window.context.readNote(selectedNote.title)

  return {
    ...selectedNote,
    content: noteContent
  }
})

export const selectedNoteAtom = unwrap(
  selectedNoteAtomAsync,
  (prev) =>
    prev ?? {
      title: '',
      content: '',
      bookmarked: false,
      lastEditTime: Date.now()
    }
)

export const sortFunctionNameAtom = atom<SortType>('sortNotesFromNewToOld')

export const sortNotesAtom = atom(null, (get, set) => {
  const notes = get(notesAtom)
  const selectedNoteIndex = get(selectedNoteIndexAtom)

  if (!notes) return

  const sortFunctionName = get(sortFunctionNameAtom)
  const sortFunction = sortNotesSelector(sortFunctionName)

  const sortedNotes = sortFunction(notes)
  set(notesAtom, sortedNotes)

  if (selectedNoteIndex == null) return

  const selectedNote = notes[selectedNoteIndex]
  const newIndexOfSelectedNote = sortedNotes.indexOf(selectedNote)
  set(selectedNoteIndexAtom, newIndexOfSelectedNote)
})

export const saveNoteAtom = atom(null, async (get, set, newContent: NoteContent) => {
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)

  if (!notes || !selectedNote) return

  await window.context.writeNote(selectedNote.title, newContent)

  //update the saved note's last edit time
  set(
    notesAtom,
    notes.map((note) => {
      if (note.title === selectedNote.title) {
        return {
          ...note,
          lastEditTime: Date.now()
        }
      }
      return note
    })
  )
})

export const createEmptyNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom)

  if (!notes) return

  const title = await window.context.createNote()

  if (!title) return

  const newNote: NoteInfo = {
    title,
    lastEditTime: Date.now(),
    bookmarked: false
  }

  const sortFunctionName = get(sortFunctionNameAtom)
  const sortFunction = sortNotesSelector(sortFunctionName)

  const newNotes = sortFunction([newNote, ...notes.filter((note) => note.title !== newNote.title)])
  const indexOfNewNote = newNotes.indexOf(newNote)

  set(notesAtom, newNotes)
  set(selectedNoteIndexAtom, indexOfNewNote)
})

export const deleteNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom)

  const selectedNote = get(selectedNoteAtom)

  if (!selectedNote || !notes) return

  const isDeleted = await window.context.deleteNote(selectedNote.title)
  if (!isDeleted) return

  if (localStorage.getItem('bookmarks')) {
    const bookmarks: string[] = JSON.parse(localStorage.getItem('bookmarks')!)
    if (bookmarks.includes(selectedNote.title)) {
      bookmarks.filter((bookmark) => bookmark !== selectedNote.title)
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    }
  }

  const sortFunctionName = get(sortFunctionNameAtom)
  const sortFunction = sortNotesSelector(sortFunctionName)

  set(
    notesAtom,
    sortFunction(notes).filter((note) => note.title !== selectedNote.title)
  )

  set(selectedNoteIndexAtom, null)
})

export const bookmarkNoteAtom = atom(null, (get, set) => {
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)

  if (!selectedNote || !notes) return

  let bookmarks: string[] = []

  if (localStorage.getItem('bookmarks')) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks')!)
  }

  if (bookmarks.includes(selectedNote.title)) {
    bookmarks = bookmarks.filter((bookmark) => bookmark !== selectedNote.title)
  } else {
    bookmarks.push(selectedNote.title)
  }

  localStorage.setItem('bookmarks', JSON.stringify(bookmarks))

  set(
    notesAtom,
    notes.map((note) => {
      if (note.title === selectedNote.title) {
        return { ...note, bookmarked: !selectedNote.bookmarked }
      }
      return note
    })
  )
})
