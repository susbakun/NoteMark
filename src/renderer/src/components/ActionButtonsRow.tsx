import { DeleteButton, NewNoteButton } from '@/components'
import { ComponentProps } from 'react'

type ActionButtonRow = ComponentProps<'div'> & {
  onCreateEmptyNote: () => void
  onDeleteNote: () => void
}

export const ActionButtonsRow = ({
  onDeleteNote,
  onCreateEmptyNote,
  ...props
}: ActionButtonRow) => {
  return (
    <div {...props}>
      <NewNoteButton onCreateEmptyNote={onCreateEmptyNote} />
      <DeleteButton onDeleteNote={onDeleteNote} />
    </div>
  )
}
