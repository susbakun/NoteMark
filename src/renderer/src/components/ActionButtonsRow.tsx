import { DeleteButton, NewDirectoryButton, NewNoteButton, SortButton } from '@/components'
import { cn } from '@renderer/utils'
import { ComponentProps } from 'react'

type ActionButtonRow = ComponentProps<'div'> & {
  onCreateEmptyNote: () => void
  onCreateDir: () => void
  onDeleteNote: () => void
  onSortNotes: () => void
  showSearchBar: boolean
}

export const ActionButtonsRow = ({
  className,
  onDeleteNote,
  onCreateEmptyNote,
  onSortNotes,
  onCreateDir,
  showSearchBar,
  ...props
}: ActionButtonRow) => {
  return (
    <div
      className={cn(
        'transition-opacity duration-200 linear flex justify-center',
        {
          'translate-x-[100%]': showSearchBar,
          'opacity-0': showSearchBar,
          'translate-x-0': !showSearchBar,
          'opacity-100': !showSearchBar,
          'h-0': showSearchBar,
          'mt-0': showSearchBar
        },
        className
      )}
      {...props}
    >
      <NewNoteButton onCreateEmptyNote={onCreateEmptyNote} />
      <NewDirectoryButton onCreateDir={onCreateDir} />
      <SortButton onSortNotes={onSortNotes} />
      <DeleteButton onDeleteNote={onDeleteNote} />
    </div>
  )
}
