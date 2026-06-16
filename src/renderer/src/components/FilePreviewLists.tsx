import { FileTreeItem } from '@/components/FileTreeItem'
import { useNotesList } from '@renderer/hooks/useNotesList'
import { FileSystemItem } from '@shared/models'
import { isEmpty } from 'lodash'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type FilePreviewListProps = ComponentProps<'ul'> & {
  onSelect?: () => void
  onSidebarContextMenu: (relativePath: string) => void
  searched: string
  showBookmarks: boolean
}

const fileMatchesSearch = (file: FileSystemItem, searched: string): boolean => {
  if (!searched) return true
  const query = searched.toLowerCase()
  if (file.name.toLowerCase().includes(query)) return true
  if (file.type === 'directory') {
    return file.children.some((child) => fileMatchesSearch(child, searched))
  }
  return false
}

const fileMatchesBookmarks = (file: FileSystemItem, bookmarksOnly: boolean): boolean => {
  if (!bookmarksOnly) return true
  if (file.type === 'note') return file.bookmarked
  return file.children.some((child) => fileMatchesBookmarks(child, true))
}

export const FilePreviewList = ({
  onSelect,
  onSidebarContextMenu,
  searched,
  showBookmarks,
  className,
  ...props
}: FilePreviewListProps) => {
  const {
    files,
    selectedNotePath,
    selectedDirPath,
    expandedDirs,
    handleNoteSelect,
    handleDirSelect,
    toggleDirExpanded
  } = useNotesList({ onSelect })

  if (!files) return null

  if (isEmpty(files)) {
    return (
      <ul className={twMerge('text-center pt-4', className)} {...props}>
        <span className="text-sm text-zinc-400">No notes yet</span>
      </ul>
    )
  }

  const hasVisibleFiles = files.some(
    (file) => fileMatchesSearch(file, searched) && fileMatchesBookmarks(file, showBookmarks)
  )

  if (!hasVisibleFiles) {
    return (
      <ul className={twMerge('text-center pt-4', className)} {...props}>
        <span className="text-sm text-zinc-400">No matching notes</span>
      </ul>
    )
  }

  return (
    <ul
      className={twMerge('transition-all duration-200 ease-out space-y-0.5', className)}
      {...props}
    >
      {files.map((file) => (
        <FileTreeItem
          key={file.relativePath}
          file={file}
          depth={0}
          searched={searched}
          showBookmarks={showBookmarks}
          selectedNotePath={selectedNotePath}
          selectedDirPath={selectedDirPath}
          expandedDirs={expandedDirs}
          onNoteSelect={handleNoteSelect}
          onDirSelect={handleDirSelect}
          onToggleDir={toggleDirExpanded}
          onSidebarContextMenu={onSidebarContextMenu}
          fileMatchesSearch={fileMatchesSearch}
          fileMatchesBookmarks={fileMatchesBookmarks}
        />
      ))}
    </ul>
  )
}
