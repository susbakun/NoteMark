import {
  createEmptyNoteAtom,
  deleteNoteAtom,
  notesAtom,
  selectedNoteIndexAtom
} from '@renderer/store'
import { NoteInfo } from '@shared/models'
import { useAtom, useSetAtom } from 'jotai'

export const useNotesList = ({ onSelect }: { onSelect?: () => void }) => {
  const [notes, setNotes] = useAtom(notesAtom)
  const [selectedNoteIndex, setSelectedNoteIndex] = useAtom(selectedNoteIndexAtom)
  const deleteNote = useSetAtom(deleteNoteAtom)
  const createEmptyNote = useSetAtom(createEmptyNoteAtom)

  const handleNoteSelect = (index: number) => async () => {
    setSelectedNoteIndex(index)

    if (onSelect) {
      onSelect()
    }
  }

  const filterNotes = (notes: NoteInfo[], searched: string): NoteInfo[] => {
    return notes.filter((note) => note.title.toLowerCase().includes(searched.toLowerCase()))
  }

  const getBookmarkedNotes = (notes: NoteInfo[]): NoteInfo[] => {
    return notes.filter((note) => note.bookmarked)
  }

  return {
    notes,
    setNotes,
    selectedNoteIndex,
    setSelectedNoteIndex,
    deleteNote,
    filterNotes,
    getBookmarkedNotes,
    createEmptyNote,
    handleNoteSelect
  }
}
