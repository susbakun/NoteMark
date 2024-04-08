import { DeleteButton, NewDirectoryButton, NewNoteButton, SortButton } from '@/components'
import { ComponentProps } from 'react'

type ActionButtonRow = ComponentProps<'div'> & {
  onCreateEmptyNote: () => void
  onDeleteNote: () => void
  onSortNotes: () => void
}

export const ActionButtonsRow = ({
  onDeleteNote,
  onCreateEmptyNote,
  onSortNotes,
  ...props
}: ActionButtonRow) => {
  return (
    <div {...props}>
      <NewNoteButton onCreateEmptyNote={onCreateEmptyNote} />
      <NewDirectoryButton />
      <SortButton onSortNotes={onSortNotes} />
      <DeleteButton onDeleteNote={onDeleteNote} />
    </div>
  )
}
