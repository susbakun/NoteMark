import { NotePreview } from '@/components'
import { useNotesList } from '@renderer/hooks/useNotesList'
import { filterNotes, getBookmarkedNotes } from '@renderer/utils'
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
  const { notes, selectedNoteIndex, handleNoteSelect } = useNotesList({ onSelect })

  if (!notes) return null

  if (isEmpty(notes)) {
    return (
      <ul className={twMerge('text-center pt-4', className)} {...props}>
        <span>No Notes Yet!</span>
      </ul>
    )
  }

  let filteredNotes = filterNotes(notes, searched)

  if (showBookmarks) {
    filteredNotes = getBookmarkedNotes(filteredNotes)
  }

  return (
    <ul className={twMerge('transition-all duration-200 ease-out', className)} {...props}>
      {filteredNotes.map((note, index) => (
        <NotePreview
          key={note.title + note.lastEditTime}
          isActive={selectedNoteIndex === index}
          onClick={handleNoteSelect(index)}
          onContextMenu={() => onSidebarContextMenu(index)}
          {...note}
        />
      ))}
    </ul>
  )
}
