import { NoteContent, NoteInfo } from '@shared/models'
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

  set(notesAtom, [newNote, ...notes.filter((note) => note.title !== newNote.title)])
  set(selectedNoteIndexAtom, 0)
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

  set(
    notesAtom,
    notes.filter((note) => note.title !== selectedNote.title)
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
