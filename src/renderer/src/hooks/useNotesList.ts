import {
  createDirAtom,
  createEmptyNoteAtom,
  deleteFileAtom,
  expandedDirsAtom,
  fileTreeAtom,
  selectedDirPathAtom,
  selectedNotePathAtom,
  sortFilesAtom,
  sortFunctionNameAtom
} from '@renderer/store'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'

export const useNotesList = ({ onSelect }: { onSelect?: () => void }) => {
  const files = useAtomValue(fileTreeAtom)
  const [selectedNotePath, setSelectedNotePath] = useAtom(selectedNotePathAtom)
  const [selectedDirPath, setSelectedDirPath] = useAtom(selectedDirPathAtom)
  const [expandedDirs, setExpandedDirs] = useAtom(expandedDirsAtom)
  const deleteFile = useSetAtom(deleteFileAtom)
  const createEmptyNote = useSetAtom(createEmptyNoteAtom)
  const createDir = useSetAtom(createDirAtom)
  const [sortFunctionName, setSortFunctionName] = useAtom(sortFunctionNameAtom)
  const sortFiles = useSetAtom(sortFilesAtom)

  const handleNoteSelect = (relativePath: string) => async () => {
    setSelectedDirPath(null)
    setSelectedNotePath(relativePath)

    await window.context.selectFile(relativePath, 'note')

    if (onSelect) {
      onSelect()
    }
  }

  const handleDirSelect = (relativePath: string) => async () => {
    setSelectedNotePath(null)
    setSelectedDirPath(relativePath)
    setExpandedDirs((prev) => new Set(prev).add(relativePath))

    await window.context.selectFile(relativePath, 'directory')

    if (onSelect) {
      onSelect()
    }
  }

  const toggleDirExpanded = (relativePath: string) => {
    setExpandedDirs((prev) => {
      const next = new Set(prev)
      if (next.has(relativePath)) {
        next.delete(relativePath)
      } else {
        next.add(relativePath)
      }
      return next
    })
  }

  return {
    files,
    sortFiles,
    selectedNotePath,
    selectedDirPath,
    expandedDirs,
    setSelectedNotePath,
    deleteFile,
    createEmptyNote,
    createDir,
    sortFunctionName,
    setSortFunctionName,
    handleDirSelect,
    handleNoteSelect,
    toggleDirExpanded
  }
}
