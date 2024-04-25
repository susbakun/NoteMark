import {
  createEmptyNoteAtom,
  deleteNoteAtom,
  notesAtom,
  selectedNoteIndexAtom,
  sortFunctionNameAtom,
  sortNotesAtom
} from '@renderer/store'
import { NoteInfo } from '@shared/models'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'

export const useNotesList = ({ onSelect }: { onSelect?: () => void }) => {
  const notes = useAtomValue(notesAtom)
  const [selectedNoteIndex, setSelectedNoteIndex] = useAtom(selectedNoteIndexAtom)
  const deleteNote = useSetAtom(deleteNoteAtom)
  const createEmptyNote = useSetAtom(createEmptyNoteAtom)
  const [sortFunctionName, setSortFunctionName] = useAtom(sortFunctionNameAtom)
  const sortNotes = useSetAtom(sortNotesAtom)

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
    sortNotes,
    selectedNoteIndex,
    setSelectedNoteIndex,
    deleteNote,
    filterNotes,
    getBookmarkedNotes,
    createEmptyNote,
    sortFunctionName,
    setSortFunctionName,
    handleNoteSelect
  }
}
