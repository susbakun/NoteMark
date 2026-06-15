import { NotePreview } from '@/components'
import { useNotesList } from '@renderer/hooks/useNotesList'
import { NoteInfo } from '@shared/models'
import { isEmpty } from 'lodash'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type NotePreviewListProps = ComponentProps<'ul'> & {
  onSelect?: () => void
  onSidebarContextMenu: (index: number) => void
  searched: string
  showBookmarks: boolean
}

export const NotePreviewList = ({
  onSelect,
  onSidebarContextMenu,
  searched,
  showBookmarks,
  className,
  ...props
}: NotePreviewListProps) => {
  const { files, selectedNotePath, handleNoteSelect, getBookmarkedNotes, filterFiles } =
    useNotesList({ onSelect })

  if (!files) return null

  if (isEmpty(files)) {
    return (
      <ul className={twMerge('text-center pt-4', className)} {...props}>
        <span>No Notes Yet!</span>
      </ul>
    )
  }

  let filteredFiles = filterFiles(files, searched)

  if (showBookmarks) {
    filteredFiles = getBookmarkedNotes(filteredFiles)
  }

  return (
    <ul className={twMerge('transition-all duration-200 ease-out', className)} {...props}>
      {filteredFiles
        .filter((file): file is NoteInfo => file.type === 'note')
        .map((file, index) => (
          <NotePreview
            key={file.relativePath}
            isActive={selectedNotePath === file.relativePath}
            isHidden={filteredFiles.includes(file) ? false : true}
            onClick={handleNoteSelect(file.relativePath)}
            onContextMenu={() => onSidebarContextMenu(index)}
            {...file}
          />
        ))}
    </ul>
  )
}
