import {
  createDirAtom,
  createEmptyNoteAtom,
  deleteFileAtom,
  fileTreeAtom,
  selectedNotePathAtom,
  sortFilesAtom,
  sortFunctionNameAtom
} from '@renderer/store'
import { FileSystemItem } from '@shared/models'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'

export const useNotesList = ({ onSelect }: { onSelect?: () => void }) => {
  const files = useAtomValue(fileTreeAtom)
  const [selectedNotePath, setSelectedNotePath] = useAtom(selectedNotePathAtom)
  const deleteFile = useSetAtom(deleteFileAtom)
  const createEmptyNote = useSetAtom(createEmptyNoteAtom)
  const createDir = useSetAtom(createDirAtom)
  const [sortFunctionName, setSortFunctionName] = useAtom(sortFunctionNameAtom)
  const sortFiles = useSetAtom(sortFilesAtom)

  const handleNoteSelect = (relativePath: string) => async () => {
    setSelectedNotePath(relativePath)

    if (onSelect) {
      onSelect()
    }
  }

  const filterFiles = (files: FileSystemItem[], searched: string): FileSystemItem[] => {
    return files.filter((file) => file.name.toLowerCase().includes(searched.toLowerCase()))
  }

  const getBookmarkedNotes = (files: FileSystemItem[]): FileSystemItem[] => {
    return files.filter((file) => file.type === 'note' && file.bookmarked)
  }

  return {
    files,
    sortFiles,
    selectedNotePath,
    setSelectedNotePath,
    deleteFile,
    filterFiles,
    getBookmarkedNotes,
    createEmptyNote,
    createDir,
    sortFunctionName,
    setSortFunctionName,
    handleNoteSelect
  }
}
