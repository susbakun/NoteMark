import {
  createEmptyNoteAtom,
  deleteNoteAtom,
  notesAtom,
  selectedNoteIndexAtom
} from '@renderer/store'
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

  return {
    notes,
    setNotes,
    selectedNoteIndex,
    setSelectedNoteIndex,
    deleteNote,
    createEmptyNote,
    handleNoteSelect
  }
}
