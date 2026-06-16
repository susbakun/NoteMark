import { DirectoryPreview, NotePreview } from '@/components'
import { FileSystemItem } from '@shared/models'

type FileTreeItemProps = {
  file: FileSystemItem
  depth: number
  searched: string
  showBookmarks: boolean
  selectedNotePath: string | null
  selectedDirPath: string | null
  expandedDirs: Set<string>
  onNoteSelect: (relativePath: string) => () => void
  onDirSelect: (relativePath: string) => () => void
  onToggleDir: (relativePath: string) => void
  onSidebarContextMenu: (relativePath: string) => void
  fileMatchesSearch: (file: FileSystemItem, searched: string) => boolean
  fileMatchesBookmarks: (file: FileSystemItem, bookmarksOnly: boolean) => boolean
}

export const FileTreeItem = ({
  file,
  depth,
  searched,
  showBookmarks,
  selectedNotePath,
  selectedDirPath,
  expandedDirs,
  onNoteSelect,
  onDirSelect,
  onToggleDir,
  onSidebarContextMenu,
  fileMatchesSearch,
  fileMatchesBookmarks
}: FileTreeItemProps) => {
  const isVisible = fileMatchesSearch(file, searched) && fileMatchesBookmarks(file, showBookmarks)

  if (!isVisible) return null

  if (file.type === 'note') {
    return (
      <li key={file.relativePath}>
        <NotePreview
          isActive={selectedNotePath === file.relativePath}
          isHidden={false}
          onClick={onNoteSelect(file.relativePath)}
          onContextMenu={() => onSidebarContextMenu(file.relativePath)}
          className="!py-2.5"
          style={{ paddingLeft: `${depth * 12 + 28}px` }}
          {...file}
        />
      </li>
    )
  }

  const hasVisibleChild = file.children.some(
    (child) => fileMatchesSearch(child, searched) && fileMatchesBookmarks(child, showBookmarks)
  )
  const forceExpand = searched.length > 0 && hasVisibleChild
  const isExpanded = expandedDirs.has(file.relativePath) || forceExpand

  return (
    <li key={file.relativePath}>
      <DirectoryPreview
        name={file.name}
        relativePath={file.relativePath}
        isExpanded={isExpanded}
        isSelected={selectedDirPath === file.relativePath}
        isHidden={false}
        depth={depth}
        onClick={() => onDirSelect(file.relativePath)()}
        onChevronClick={() => onToggleDir(file.relativePath)}
        onContextMenu={() => onSidebarContextMenu(file.relativePath)}
      />
      {isExpanded && file.children.length > 0 && (
        <ul className="space-y-0.5 transition-all duration-200">
          {file.children.map((child) => (
            <FileTreeItem
              key={child.relativePath}
              file={child}
              depth={depth + 1}
              searched={searched}
              showBookmarks={showBookmarks}
              selectedNotePath={selectedNotePath}
              selectedDirPath={selectedDirPath}
              expandedDirs={expandedDirs}
              onNoteSelect={onNoteSelect}
              onDirSelect={onDirSelect}
              onToggleDir={onToggleDir}
              onSidebarContextMenu={onSidebarContextMenu}
              fileMatchesSearch={fileMatchesSearch}
              fileMatchesBookmarks={fileMatchesBookmarks}
            />
          ))}
        </ul>
      )}
    </li>
  )
}
