import { ActionButton } from '@/components'
import { LuFileSignature } from 'react-icons/lu'

type NewNoteButtonProps = {
  onCreateEmptyNote: () => void
}

export const NewNoteButton = ({ onCreateEmptyNote, ...props }: NewNoteButtonProps) => {
  return (
    <ActionButton title="Create a Note" onClick={onCreateEmptyNote} {...props}>
      <LuFileSignature className="w-5 h-5 text-zinc-300" />
    </ActionButton>
  )
}
