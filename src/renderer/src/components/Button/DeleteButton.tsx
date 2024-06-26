import { ActionButton } from '@/components'
import { FaRegTrashCan } from 'react-icons/fa6'

type DeleteButtonProps = {
  onDeleteNote: () => void
}

export const DeleteButton = ({ onDeleteNote, ...props }: DeleteButtonProps) => {
  return (
    <ActionButton title="Delete the Note" onClick={onDeleteNote} {...props}>
      <FaRegTrashCan className="w-5 h-[18px] text-zinc-300/80" />
    </ActionButton>
  )
}
